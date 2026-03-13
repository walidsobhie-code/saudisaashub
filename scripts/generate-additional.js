const fs = require('fs');
const csv = require('csv-parser');

// Load existing companies to learn patterns
const existing = JSON.parse(fs.readFileSync('lib/companies.json', 'utf-8'));

// Sample data patterns
const categories = ['FinTech', 'HealthTech', 'EdTech', 'SaaS Platforms', 'AI & ML', 'Cybersecurity', 'E-commerce', 'PropTech', 'InsurTech', 'AgriTech', 'DevOps', 'MarTech', 'HR Tech', 'Logistics Tech', 'FoodTech'];
const cities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Al Khobar', 'Jubail', 'Taif'];
const suffixes = ['Tech', 'Solutions', 'Digital', 'Systems', 'Innovations', 'Labs', 'AI', 'Cloud', ' Services', 'Platform'];
const prefixes = ['Saudi', 'Al', 'Neo', 'Future', 'Smart', 'Digital', 'Advanced', 'Unified', 'Global', 'Arabian'];

// Company name generator (Arabic/English mix like existing)
function generateName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const num = Math.random() > 0.7 ? Math.floor(Math.random() * 99) + 1 : '';
  return `${prefix} ${suffix}${num ? ' ' + num : ''}`;
}

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function generateDescription(name, category) {
  const templates = [
    `A leading ${category} company in Saudi Arabia, providing innovative solutions for businesses.`,
    `${name} offers cutting-edge ${category.toLowerCase()} services to enterprises across the MENA region.`,
    `Empowering Saudi businesses with scalable ${category.toLowerCase()} platforms and tools.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateEmployees() {
  const sizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function generateFunding() {
  const types = ['Seed', 'Series A', 'Series B', 'Bootstrap', 'Undisclosed'];
  const type = types[Math.floor(Math.random() * types.length)];
  if (type === 'Bootstrap' || type === 'Undisclosed') return type;

  const amounts = ['$2M', '$5M', '$10M', '$15M', '$25M', '$40M', '$75M'];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  return `${type} - ${amount}`;
}

function generateWebsite(slug) {
  const tlds = ['.sa', '.com', '.io'];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  return `https://${slug}${tld}`;
}

function generateLogo(slug) {
  return `https://logo.clearbit.com/${slug.replace(/[^a-z0-9-]/g, '')}.com`;
}

// Generate 150 new companies
const generated = [];
const existingSlugs = new Set(existing.map(c => c.slug));

for (let i = 0; i < 150; i++) {
  const name = generateName();
  const slug = generateSlug(name);
  
  // Ensure uniqueness
  if (existingSlugs.has(slug)) {
    i--;
    continue;
  }
  existingSlugs.add(slug);

  const category = categories[Math.floor(Math.random() * categories.length)];
  const founded = 2015 + Math.floor(Math.random() * 12);
  const headquarters = cities[Math.floor(Math.random() * cities.length)] + ', Saudi Arabia';

  generated.push({
    id: `gen-${Date.now()}-${i}`,
    name,
    slug,
    description: generateDescription(name, category),
    founded_year: founded,
    headquarters,
    employees: generateEmployees(),
    funding: generateFunding(),
    website: generateWebsite(slug),
    logo_url: generateLogo(slug),
    categories: [category],
    integrations: [],
    certifications: [],
    badges: [],
    pricing_plans: [],
    screenshot_urls: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

// Write CSV
const headers = [
  'id', 'name', 'slug', 'description', 'founded_year', 'headquarters',
  'employees', 'funding', 'website', 'logo_url', 'screenshot_url',
  'categories', 'integrations', 'certifications', 'badges', 'pricing_plans'
];

const csvRows = [headers.join(',')];
generated.forEach(company => {
  const row = headers.map(header => {
    let val = company[header];
    if (Array.isArray(val)) {
      val = `"${val.join(';')}"`;
    } else if (typeof val === 'string') {
      val = `"${val.replace(/"/g, '""')}"`;
    } else if (val === null || val === undefined) {
      val = '';
    }
    return val;
  });
  csvRows.push(row.join(','));
});

fs.writeFileSync('data/generated-additional.csv', csvRows.join('\n'));
console.log(`✅ Generated ${generated.length} additional companies to data/generated-additional.csv`);

// Also show sample
console.log('Sample:', generated[0]);
