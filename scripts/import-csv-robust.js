const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function getOrCreateId(table, name, slug) {
  try {
    const existing = await sql`SELECT id FROM ${table} WHERE slug = ${slug}`;
    if (existing.length > 0) return existing[0].id;
    const result = await sql`INSERT INTO ${table} (name, slug) VALUES (${name}, ${slug}) RETURNING id`;
    return result[0].id;
  } catch (error) {
    console.error(`Error in getOrCreateId for table=${table}, name=${name}, slug=${slug}:`, error);
    throw error;
  }
}

async function importCSV() {
  const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';
  
  return new Promise((resolve, reject) => {
    const records = [];
    let count = 0;
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        // Convert row object to our expected format
        const record = {
          name: row.name || '',
          slug: row.slug || '',
          description: row.description || '',
          founded_year: row.founded_year || '',
          headquarters: row.headquarters || '',
          employees: row.employees || '',
          funding: row.funding || '',
          website: row.website || '',
          logo_url: row.logo_url || '',
          screenshot_url: row.screenshot_url || '',
          categories: row.categories || '',
          features: row.features || '',
          integrations: row.integrations || '',
          certifications: row.certifications || '',
          badges: row.badges || ''
        };
        records.push(record);
      })
      .on('end', async () => {
        console.log(`Parsed ${records.length} records from CSV`);
        
        try {
          // Clear existing data
          console.log('Clearing existing data...');
          await sql`TRUNCATE TABLE pricing_plans CASCADE;`;
          await sql`TRUNCATE TABLE company_badges CASCADE;`;
          await sql`TRUNCATE TABLE company_certifications CASCADE;`;
          await sql`TRUNCATE TABLE company_integrations CASCADE;`;
          await sql`TRUNCATE TABLE company_features CASCADE;`;
          await sql`TRUNCATE TABLE company_categories CASCADE;`;
          await sql`TRUNCATE TABLE companies CASCADE;`;
          
          // Insert companies
          console.log('Inserting data...');
          
          for (let i = 0; i < records.length; i++) {
            const record = records[i];
            try {
              // Insert/upsert company
              const companyResult = await sql`
                INSERT INTO companies (name, slug, description, founded_year, headquarters, employees, funding, website, logo_url, screenshots)
                VALUES (
                  ${record.name},
                  ${record.slug},
                  ${record.description},
                  ${record.founded_year ? parseInt(record.founded_year) : null},
                  ${record.headquarters},
                  ${record.employees},
                  ${record.funding},
                  ${record.website},
                  ${record.logo_url},
                  ${record.screenshot_url ? [record.screenshot_url] : null}
                )
                ON CONFLICT (slug) DO UPDATE SET
                  name = EXCLUDED.name,
                  description = EXCLUDED.description,
                  founded_year = EXCLUDED.founded_year,
                  headquarters = EXCLUDED.headquarters,
                  employees = EXCLUDED.employees,
                  funding = EXCLUDED.funding,
                  website = EXCLUDED.website,
                  logo_url = EXCLUDED.logo_url,
                  screenshots = EXCLUDED.screenshots,
                  updated_at = NOW()
                RETURNING id
              `;
              
              const companyId = companyResult[0].id;
              count++;
              
              // Helper to split and process multi-value fields
              const processMultiValues = (value, processor) => {
                if (!value) return;
                const items = value.split(',').map(v => v.trim()).filter(Boolean);
                for (const item of items) {
                  processor(item);
                }
              };
              
              // Categories
              processMultiValues(record.categories, async (catName) => {
                const catSlug = catName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const catId = await getOrCreateId('categories', catName, catSlug);
                await sql`
                  INSERT INTO company_categories (company_id, category_id)
                  VALUES (${companyId}, ${catId})
                  ON CONFLICT DO NOTHING
                `;
              });
              
              // Features
              processMultiValues(record.features, async (featName) => {
                const featSlug = featName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const featId = await getOrCreateId('features', featName, featSlug);
                await sql`
                  INSERT INTO company_features (company_id, feature_id)
                  VALUES (${companyId}, ${featId})
                  ON CONFLICT DO NOTHING
                `;
              });
              
              // Integrations
              processMultiValues(record.integrations, async (intName) => {
                const intSlug = intName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const intId = await getOrCreateId('integrations', intName, intSlug);
                await sql`
                  INSERT INTO company_integrations (company_id, integration_id)
                  VALUES (${companyId}, ${intId})
                  ON CONFLICT DO NOTHING
                `;
              });
              
              // Certifications
              processMultiValues(record.certifications, async (certName) => {
                const certSlug = certName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const certId = await getOrCreateId('certifications', certName, certSlug);
                await sql`
                  INSERT INTO company_certifications (company_id, certification_id)
                  VALUES (${companyId}, ${certId})
                  ON CONFLICT DO NOTHING
                `;
              });
              
              // Badges
              processMultiValues(record.badges, async (badgeName) => {
                const badgeSlug = badgeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const badgeExisting = await sql`SELECT id FROM badges WHERE slug = '${badgeSlug}'`;
                let badgeId;
                if (badgeExisting.length > 0) {
                  badgeId = badgeExisting[0].id;
                } else {
                  const badgeResult = await sql.unsafe(`
                    INSERT INTO badges (name, slug, color) 
                    VALUES ('${badgeName.replace(/'/g, "''")}', '${badgeSlug}', '#3B82F6')
                    RETURNING id
                  `);
                  badgeId = badgeResult[0].id;
                }
                await sql`
                  INSERT INTO company_badges (company_id, badge_id)
                  VALUES (${companyId}, ${badgeId})
                  ON CONFLICT DO NOTHING
                `;
              });
              
              if (i % 10 === 0) {
                console.log(`Imported ${i + 1}/${records.length} companies...`);
              }
              
            } catch (error) {
              console.error(`Error importing company ${record.name}:`, error.message);
              // Continue with next company
            }
          }
          
          console.log('✅ Import completed! Total companies imported: ' + count);
          resolve();
          
        } catch (error) {
          console.error('Import failed:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      });
  });
}

importCSV().catch(console.error);
