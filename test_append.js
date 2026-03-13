const fs = require('fs');
const path = require('path');

const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';

// Test: Append a single test company to verify
const testCompany = `"TestCo","testco","Test description",2020,الرياض,50-100,Seed - $5M,https://testco.sa,https://placehold.co/80x80?text=TestCo,https://placehold.co/400x300?text=TestCo,SaaS,feature1,feature2,Mada,Zid,ISO27001,Saudi-owned`;

try {
  const before = fs.readFileSync(csvPath, 'utf8');
  console.log(`File size before: ${before.length} bytes`);
  console.log(`Line count before: ${before.split('\n').length}`);

  // Append test company
  fs.appendFileSync(csvPath, '\n' + testCompany);

  const after = fs.readFileSync(csvPath, 'utf8');
  console.log(`File size after: ${after.length} bytes`);
  console.log(`Line count after: ${after.split('\n').length}`);

  // Check if TestCo appears
  if (after.includes('TestCo')) {
    console.log('SUCCESS: TestCo found in file');
  } else {
    console.log('FAILURE: TestCo not found in file');
  }

  process.exit(0);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
