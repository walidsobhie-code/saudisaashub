const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function simpleImport() {
  // Read CSV
  const fs = require('fs');
  const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    console.error('CSV empty');
    return;
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  
  console.log('Importing companies only (basic fields)...');
  
  let imported = 0;
  let skipped = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parsing - split by commas but respect quotes
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
    
    if (values.length < 15) {
      console.log(`Skipping line ${i+1}: wrong number of columns (${values.length})`);
      skipped++;
      continue;
    }
    
    const record = {
      name: values[0]?.trim() || '',
      slug: values[1]?.trim() || '',
      description: values[2]?.trim() || '',
      founded_year: values[3]?.trim() || null,
      headquarters: values[4]?.trim() || '',
      employees: values[5]?.trim() || '',
      funding: values[6]?.trim() || '',
      website: values[7]?.trim() || '',
      logo_url: values[8]?.trim() || '',
      screenshot_url: values[9]?.trim() || '',
      categories: values[10]?.trim() || '',
      features: values[11]?.trim() || '',
      integrations: values[12]?.trim() || '',
      certifications: values[13]?.trim() || '',
      badges: values[14]?.trim() || ''
    };
    
    if (!record.name || !record.slug) {
      skipped++;
      continue;
    }
    
    try {
      // Simple insert - no relationships yet
      await sql`
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
        ON CONFLICT (slug) DO NOTHING
      `;
      imported++;
      
      if (imported % 10 === 0) {
        console.log(`Imported ${imported} companies...`);
      }
      
    } catch (error) {
      console.error(`Error inserting ${record.name}:`, error.message);
      skipped++;
    }
  }
  
  console.log(`\n✅ Done! Imported: ${imported}, Skipped: ${skipped}`);
  
  // Verify count
  const count = await sql`SELECT COUNT(*) as count FROM companies`;
  console.log('Total in database:', count[0].count);
}

simpleImport().catch(console.error);
