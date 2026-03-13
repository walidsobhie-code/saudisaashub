const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const csv = require('csv-parser');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function ensureLookup(table, name, slug) {
  try {
    const safeSlug = slug.replace(/'/g, "''");
    const safeName = name.replace(/'/g, "''");
    
    const existing = await sql.unsafe(`SELECT id FROM ${table} WHERE slug = '${safeSlug}'`);
    if (existing.length > 0) return existing[0].id;
    
    const result = await sql.unsafe(`INSERT INTO ${table} (name, slug) VALUES ('${safeName}', '${safeSlug}') RETURNING id`);
    return result[0].id;
  } catch (error) {
    console.error(`Error ensuring ${table} (${name}): ${error.message}`);
    return null;
  }
}

async function addRelationships() {
  console.log('Reading CSV to add relationships...');
  
  const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';
  
  return new Promise((resolve, reject) => {
    let processed = 0;
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const companySlug = row.slug?.trim();
          if (!companySlug) return;
          
          // Get company ID by slug
          const companyResult = await sql`SELECT id FROM companies WHERE slug = ${companySlug}`;
          if (companyResult.length === 0) {
            console.log(`Company not found: ${companySlug}`);
            return;
          }
          const companyId = companyResult[0].id;
          
          // Categories
          if (row.categories) {
            for (const catName of row.categories.split(',').map(c => c.trim()).filter(Boolean)) {
              const catSlug = catName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const catId = await ensureLookup('categories', catName, catSlug);
              if (catId) {
                await sql.unsafe(
                  `INSERT INTO company_categories (company_id, category_id) VALUES ('${companyId}', '${catId}') ON CONFLICT DO NOTHING`
                );
              }
            }
          }
          
          // Features
          if (row.features) {
            for (const featName of row.features.split(',').map(f => f.trim()).filter(Boolean)) {
              const featSlug = featName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const featId = await ensureLookup('features', featName, featSlug);
              if (featId) {
                await sql.unsafe(
                  `INSERT INTO company_features (company_id, feature_id) VALUES ('${companyId}', '${featId}') ON CONFLICT DO NOTHING`
                );
              }
            }
          }
          
          // Integrations
          if (row.integrations) {
            for (const intName of row.integrations.split(',').map(i => i.trim()).filter(Boolean)) {
              const intSlug = intName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const intId = await ensureLookup('integrations', intName, intSlug);
              if (intId) {
                await sql.unsafe(
                  `INSERT INTO company_integrations (company_id, integration_id) VALUES ('${companyId}', '${intId}') ON CONFLICT DO NOTHING`
                );
              }
            }
          }
          
          // Certifications
          if (row.certifications) {
            for (const certName of row.certifications.split(',').map(c => c.trim()).filter(Boolean)) {
              const certSlug = certName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const certId = await ensureLookup('certifications', certName, certSlug);
              if (certId) {
                await sql.unsafe(
                  `INSERT INTO company_certifications (company_id, certification_id) VALUES ('${companyId}', '${certId}') ON CONFLICT DO NOTHING`
                );
              }
            }
          }
          
          // Badges
          if (row.badges) {
            for (const badgeName of row.badges.split(',').map(b => b.trim()).filter(Boolean)) {
              const badgeSlug = badgeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const safeBadgeSlug = badgeSlug.replace(/'/g, "''");
              const safeBadgeName = badgeName.replace(/'/g, "''");
              
              const existingBadge = await sql.unsafe(`SELECT id FROM badges WHERE slug = '${safeBadgeSlug}'`);
              let badgeId;
              if (existingBadge.length > 0) {
                badgeId = existingBadge[0].id;
              } else {
                const result = await sql.unsafe(
                  `INSERT INTO badges (name, slug, color) VALUES ('${safeBadgeName}', '${safeBadgeSlug}', '#3B82F6') RETURNING id`
                );
                badgeId = result[0].id;
              }
              
              await sql.unsafe(
                `INSERT INTO company_badges (company_id, badge_id) VALUES ('${companyId}', '${badgeId}') ON CONFLICT DO NOTHING`
              );
            }
          }
          
          processed++;
          if (processed % 10 === 0) {
            console.log(`Processed ${processed} companies...`);
          }
          
        } catch (error) {
          console.error(`Error processing row:`, error.message);
        }
      })
      .on('end', async () => {
        console.log(`\n✅ Relationships added for ${processed} companies!`);
        
        try {
          const catCount = await sql`SELECT COUNT(*) as count FROM categories`;
          const featCount = await sql`SELECT COUNT(*) as count FROM features`;
          const intCount = await sql`SELECT COUNT(*) as count FROM integrations`;
          const certCount = await sql`SELECT COUNT(*) as count FROM certifications`;
          const badgeCount = await sql`SELECT COUNT(*) as count FROM badges`;
          
          console.log('Lookup table counts:');
          console.log(`  Categories: ${catCount[0].count}`);
          console.log(`  Features: ${featCount[0].count}`);
          console.log(`  Integrations: ${intCount[0].count}`);
          console.log(`  Certifications: ${certCount[0].count}`);
          console.log(`  Badges: ${badgeCount[0].count}`);
        } catch (error) {
          console.error('Error getting counts:', error);
        }
        
        resolve();
      })
      .on('error', (error) => {
        console.error('CSV read error:', error);
        reject(error);
      });
  });
}

addRelationships().catch(console.error);
