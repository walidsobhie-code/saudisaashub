const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('data/saudi-saas-companies.csv')
  .pipe(csv())
  .on('data', (row) => results.push(row))
  .on('end', () => {
    // Normalize
    const normalized = results.map(c => ({
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

    // Dedupe
    const unique = Array.from(new Map(normalized.map(c => [c.slug, c])).values());

    console.log(`Parsed ${unique.length} unique companies from CSV`);

    fs.writeFileSync('lib/companies.json', JSON.stringify(unique, null, 2));
    console.log('✅ lib/companies.json updated');
  });
