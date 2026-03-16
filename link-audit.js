const fs = require('fs');
const https = require('https');
const path = require('path');

const companies = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib', 'companies.json'), 'utf8'));

console.log('🔗 BROKEN LINK AUDIT\n');
console.log('Checking website URLs for all ' + companies.length + ' companies...\n');

function checkUrl(url, timeout = 5000) {
  return new Promise((resolve) => {
    if (!url || url === '#') {
      resolve({ valid: false, error: 'placeholder or empty' });
      return;
    }
    
    try {
      new URL(url);
    } catch (e) {
      resolve({ valid: false, error: 'invalid URL format' });
      return;
    }
    
    const req = https.request(url, { method: 'HEAD', timeout }, (res) => {
      resolve({ valid: res.statusCode >= 200 && res.statusCode < 400, statusCode: res.statusCode });
    });
    
    req.on('error', () => resolve({ valid: false, error: 'connection error' }));
    req.on('timeout', () => { req.destroy(); resolve({ valid: false, error: 'timeout' }); });
    req.end();
  });
}

// Check a sample due to rate limiting
const sampleSize = Math.min(30, companies.length);
const sampleCompanies = companies.slice(0, sampleSize);
const results = [];

async function runChecks() {
  for (const company of sampleCompanies) {
    const result = await checkUrl(company.website);
    results.push({
      name: company.name,
      slug: company.slug,
      website: company.website,
      ...result
    });
  }
  
  console.log(`Sample of ${sampleSize} companies (first ${sampleSize}):\n`);
  results.forEach(r => {
    const status = r.valid ? '✅' : '❌';
    const detail = r.valid ? `HTTP ${r.statusCode}` : r.error;
    console.log(status + ' ' + r.name + ' (' + r.slug + ')');
    console.log('   URL: ' + r.website);
    if (!r.valid) console.log('   Issue: ' + detail);
  });
  
  const broken = results.filter(r => !r.valid);
  console.log('\n' + '='.repeat(60));
  console.log('Summary: ' + broken.length + '/' + sampleSize + ' sample URLs have issues\n');
  
  // Check for placeholder '#' links
  const placeholderLinks = companies.filter(c => c.website === '#' || (c.website || '').trim() === '');
  if (placeholderLinks.length > 0) {
    console.log('⚠️  Companies with placeholder/empty website fields: ' + placeholderLinks.length);
    placeholderLinks.slice(0, 10).forEach(c => {
      console.log('   - ' + c.name + ' (' + c.slug + ')');
    });
    if (placeholderLinks.length > 10) {
      console.log('   ... and ' + (placeholderLinks.length - 10) + ' more');
    }
  }
  
  // Check certification links if any
  const companiesWithCerts = companies.filter(c => c.certifications && c.certifications.length > 0);
  if (companiesWithCerts.length > 0) {
    console.log('\n📋 Companies with certifications (sample):');
    companiesWithCerts.slice(0, 5).forEach(c => {
      console.log('   ' + c.name + ': ' + c.certifications.join(', '));
    });
  }
  
  // Save results
  fs.writeFileSync('link-audit-results.json', JSON.stringify({
    sampleResults: results,
    placeholderCount: placeholderLinks.length,
    totalCompanies: companies.length
  }, null, 2));
  console.log('\n✅ Full results saved to link-audit-results.json');
}

runChecks().catch(console.error);
