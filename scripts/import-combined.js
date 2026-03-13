const fs = require('fs');

// Read combined CSV
const csv = fs.readFileSync('data/combined-companies.csv', 'utf-8');

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let j = 0; j < lines[i].length; j++) {
      const ch = lines[i][j];
      if (ch === '"' && (j === 0 || lines[i][j-1] !== '\\')) inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { values.push(cur); cur = ''; }
      else cur += ch;
    }
    values.push(cur);

    if (values.length === headers.length) {
      const obj = {};
      headers.forEach((h, idx) => {
        let v = values[idx]?.trim() || '';
        if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        obj[h] = v;
      });
      records.push(obj);
    }
  }
  return records;
}

const companies = parseCSV(csv);

// Normalize
const normalized = companies.map(c => ({
  id: c.id,
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

// Dedupe by slug
const unique = Array.from(new Map(normalized.map(c => [c.slug, c])).values());

console.log(`Parsed ${unique.length} unique companies from combined CSV`);

// Write
fs.writeFileSync('lib/companies.json', JSON.stringify(unique, null, 2));
console.log('✅ lib/companies.json updated');
