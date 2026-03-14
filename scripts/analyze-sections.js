const fs = require('fs');
const content = fs.readFileSync('lib/generated-articles.ts', 'utf8');
const match = content.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
const articles = eval('[' + match[1] + ']');
const first = articles[0];

// Split into top-level sections (by h2 headings as delimiters)
const sections = first.content.split(/<h2[^>]*>/i);
console.log(`Total sections (split by <h2>): ${sections.length}\n`);

// Show first few section starts
sections.slice(1, 6).forEach((sec, i) => {
  const text = sec.replace(/<[^>]*>/g, '').trim().substring(0, 100);
  console.log(`Section ${i+1}: ${text}...\n`);
});

// Now check for duplicate sections
const seenSections = new Set();
const duplicateSections = [];

sections.slice(1).forEach((sec, idx) => {
  const plain = sec.replace(/<[^>]*>/g, '').trim().substring(0, 150);
  if (plain.length > 100) {
    if (seenSections.has(plain)) {
      duplicateSections.push(idx+1);
    } else {
      seenSections.add(plain);
    }
  }
});

console.log(`\nDuplicate sections found: ${duplicateSections.length}`);
if (duplicateSections.length > 0) {
  console.log('Duplicate section indices:', duplicateSections);
}
