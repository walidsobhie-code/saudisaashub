const fs = require('fs');
const csv = require('csv-parser');

const inputCSV = 'data/additional-companies.csv';
const companiesFile = 'lib/companies.json';

if (!fs.existsSync(inputCSV)) {
  console.error(`❌ Additional companies CSV not found: ${inputCSV}`);
  process.exit(1);
}

// Load existing companies
const existing = JSON.parse(fs.readFileSync(companiesFile, 'utf-8'));
console.log(`Existing companies: ${existing.length}`);

// Parse additional CSV
const additional = [];
fs.createReadStream(inputCSV)
  .pipe(csv())
  .on('data', (row) => additional.push(row))
  .on('end', () => {
    console.log(`Additional companies from CSV: ${additional.length}`);

    // Normalize additional to match existing schema
    const normalized = additional.map(c => ({
      id: c.id || String(Math.random()).slice(2),
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      founded_year: c.founded_year ? parseInt(c.founded_year) : null,
      headquarters: c.headquarters || '',
      employees: c.employees || '',
      funding: c.funding || '',
      website: c.website || '',
      logo_url: c.logo_url || null,
      categories: c.categories ? c.categories.split(',').map(s => s.trim()).filter(Boolean) : [],
      integrations: c.integrations ? c.integrations.split(',').map(s => s.trim()).filter(Boolean) : [],
      certifications: c.certifications ? c.certifications.split(',').map(s => s.trim()).filter(Boolean) : [],
      badges: c.badges ? c.badges.split(',').map(b => b.trim()).filter(Boolean) : [],
      pricing_plans: c.pricing_plans ? JSON.parse(c.pricing_plans) : [],
      screenshot_urls: c.screenshot_url ? [c.screenshot_url] : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // Merge and dedupe by slug
    const merged = [...existing, ...normalized];
    const unique = Array.from(new Map(merged.map(c => [c.slug, c])).values());

    console.log(`Merged total: ${unique.length} (added ${unique.length - existing.length} new)`);

    // Write back
    fs.writeFileSync(companiesFile, JSON.stringify(unique, null, 2));
    console.log('✅ lib/companies.json updated with additional companies');

    // Also output stats
    const withArr = unique.filter(c => c.arr !== undefined && c.arr !== null).length;
    const withCompliance = unique.filter(c => c.compliance_status).length;
    console.log(` enrichment: ${withArr} have ARR, ${withCompliance} have compliance_status`);
  });
