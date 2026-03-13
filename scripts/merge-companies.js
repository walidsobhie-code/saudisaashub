const fs = require('fs');

// Load existing companies
const companiesData = JSON.parse(fs.readFileSync('lib/companies.json', 'utf-8'));

// Parse the remaining CSV file
const csv = fs.readFileSync('data/saudi-saas-companies-remaining.csv', 'utf-8');

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

const remainingRecords = parseCSV(csv);

// Normalize function (same as in db-companies.ts)
const normalizeCompany = (c: any) => {
  const toObjArray = (arr: string[] | undefined) =>
    arr?.map((name, idx) => ({
      id: `${c.id}-${idx}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    })) || [];

  const now = new Date().toISOString();

  return {
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
    categories: c.categories ? c.categories.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    integrations: c.integrations ? c.integrations.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    certifications: c.certifications ? c.certifications.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    badges: c.badges ? c.badges.split(',').map((b: string) => b.trim()).filter(Boolean) : [],
    pricing_plans: c.pricing_plans ? JSON.parse(c.pricing_plans) : [],
    screenshot_urls: c.screenshot_url ? [c.screenshot_url] : [],
    created_at: now,
    updated_at: now,
  };
};

// Merge with existing data
const all Companies = [...companiesData, ...remainingRecords.map(normalizeCompany)];

// Remove duplicates by slug (keep first)
const unique = Array.from(new Map(allCompanies.map(c => [c.slug, c])).values());

console.log(`Total companies: ${unique.length} (existing: ${companiesData.length}, added: ${remainingRecords.length})`);

// Write back
fs.writeFileSync('lib/companies.json', JSON.stringify(unique, null, 2));
console.log('✅ Updated lib/companies.json');
