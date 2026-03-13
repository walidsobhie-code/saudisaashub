const fs = require('fs');

// Load existing companies
const companies = JSON.parse(fs.readFileSync('lib/companies.json', 'utf-8'));

// Enrichment logic:
// - arr: estimate based on funding/founded_year/employees (very rough)
// - compliance_status: mostly 'not_started' for now, some 'in_progress', few 'zatca_compliant'
// - employee_count_range: already have employees string, but we can standardize

const enriched = companies.map(c => {
  // Estimate ARR (Annual Recurring Revenue) in USD
  // This is a wild guess based on employee count and funding
  let arr = null;
  const empStr = c.employees || '';
  const empNum = parseInt(empStr.replace(/\D/g, '')) || 0;
  const fundingStr = c.funding || '';

  if (fundingStr.includes('$')) {
    // Extract funding amount (e.g., "$15M" → 15,000,000)
    const match = fundingStr.match(/\$(\d+(?:\.\d+)?)([MK])/);
    if (match) {
      const amount = parseFloat(match[1]);
      const multiplier = match[2] === 'M' ? 1_000_000 : match[2] === 'K' ? 1_000 : 1;
      const fundingAmt = amount * multiplier;
      // ARR typically 1-5x funding for SaaS, very rough
      const arrMultiplier = 2 + Math.random() * 2; // 2-4x
      arr = Math.round(fundingAmt * arrMultiplier);
    }
  } else if (empNum > 0) {
    // Estimate by employees: $100k per employee average for SaaS
    arr = empNum * 100_000;
  }

  // Compliance status distribution
  const rand = Math.random();
  let compliance_status = 'not_started';
  if (rand > 0.9) compliance_status = 'zatca_compliant';
  else if (rand > 0.7) compliance_status = 'in_progress';

  // employee_count_range: ensure string range like "1-10", "11-50", etc.
  let employee_count_range = c.employees || '';
  // You could normalize to ranges if needed

  return {
    ...c,
    arr,
    compliance_status,
    employee_count_range,
  };
});

// Write back
fs.writeFileSync('lib/companies.json', JSON.stringify(enriched, null, 2));
console.log(`Enriched ${enriched.length} companies with ARR, compliance_status, employee_count_range`);
// Show a sample
console.log('Sample enriched company:', enriched[0]);
