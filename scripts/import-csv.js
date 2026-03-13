const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function getOrCreateId(table, name, slug) {
  // Use raw SQL with string interpolation for table name
  const existing = await sql.unsafe(`SELECT id FROM ${table} WHERE slug = '${slug.replace(/'/g, "''")}'`);
  if (existing.length > 0) return existing[0].id;
  const result = await sql.unsafe(`INSERT INTO ${table} (name, slug) VALUES ('${name.replace(/'/g, "''")}', '${slug.replace(/'/g, "''")}') RETURNING id`);
  return result[0].id;
}

async function importCSV() {
  const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    console.error('CSV is empty or has no data');
    return;
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV with quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    
    if (values.length === headers.length) {
      const record = {};
      headers.forEach((header, idx) => {
        record[header.trim()] = values[idx]?.trim() || '';
      });
      records.push(record);
    }
  }
  
  console.log(`Parsed ${records.length} records from CSV`);
  
  // Clear existing data
  console.log('Clearing existing data...');
  await sql`TRUNCATE TABLE pricing_plans CASCADE;`;
  await sql`TRUNCATE TABLE company_badges CASCADE;`;
  await sql`TRUNCATE TABLE company_certifications CASCADE;`;
  await sql`TRUNCATE TABLE company_integrations CASCADE;`;
  await sql`TRUNCATE TABLE company_features CASCADE;`;
  await sql`TRUNCATE TABLE company_categories CASCADE;`;
  await sql`TRUNCATE TABLE companies CASCADE;`;
  
  // Insert lookup data and companies
  console.log('Inserting data...');
  
  for (const record of records) {
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
      
      // Categories
      if (record.categories) {
        for (const catName of record.categories.split(',').map(c => c.trim()).filter(Boolean)) {
          const catSlug = catName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const catId = await getOrCreateId('categories', catName, catSlug);
          await sql`
            INSERT INTO company_categories (company_id, category_id)
            VALUES (${companyId}, ${catId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
      
      // Features
      if (record.features) {
        for (const featName of record.features.split(',').map(f => f.trim()).filter(Boolean)) {
          const featSlug = featName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const featId = await getOrCreateId('features', featName, featSlug);
          await sql`
            INSERT INTO company_features (company_id, feature_id)
            VALUES (${companyId}, ${featId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
      
      // Integrations
      if (record.integrations) {
        for (const intName of record.integrations.split(',').map(i => i.trim()).filter(Boolean)) {
          const intSlug = intName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const intId = await getOrCreateId('integrations', intName, intSlug);
          await sql`
            INSERT INTO company_integrations (company_id, integration_id)
            VALUES (${companyId}, ${intId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
      
      // Certifications
      if (record.certifications) {
        for (const certName of record.certifications.split(',').map(c => c.trim()).filter(Boolean)) {
          const certSlug = certName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const certId = await getOrCreateId('certifications', certName, certSlug);
          await sql`
            INSERT INTO company_certifications (company_id, certification_id)
            VALUES (${companyId}, ${certId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
      
      // Badges
      if (record.badges) {
        for (const badgeName of record.badges.split(',').map(b => b.trim()).filter(Boolean)) {
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
        }
      }
      
      if (records.length > 0 && (records.indexOf(record) + 1) % 10 === 0) {
        console.log(`Imported ${records.indexOf(record) + 1}/${records.length} companies...`);
      }
      
    } catch (error) {
      console.error(`Error importing company ${record.name}:`, error);
      // Continue with next company instead of throwing
      // throw error;
    }
  }
  
  console.log('✅ Import completed! Total companies: ' + records.length);
}

importCSV().catch(console.error);
