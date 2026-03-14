const fs = require('fs');
const content = fs.readFileSync('lib/generated-articles.ts', 'utf8');
const match = content.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
const articles = eval('[' + match[1] + ']');
const first = articles[0];

// Get all h2 headings
const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
const headings = [];
let m;
while ((m = h2Regex.exec(first.content)) !== null) {
  headings.push(m[1].replace(/<[^>]*>/g, '').trim());
}

console.log(`Total h2 headings: ${headings.length}\n`);
headings.forEach((h, i) => {
  console.log(`${i+1}. ${h.substring(0, 80)}`);
});

// Check for duplicate heading text
const seenHeadings = new Set();
const dupHeadings = [];
headings.forEach((h, i) => {
  const norm = h.substring(0, 60);
  if (seenHeadings.has(norm)) {
    dupHeadings.push({ index: i+1, text: h.substring(0, 50) });
  } else {
    seenHeadings.add(norm);
  }
});

console.log(`\nDuplicate headings: ${dupHeadings.length}`);
if (dupHeadings.length > 0) {
  dupHeadings.forEach(d => console.log(`  ${d.index}: ${d.text}...`));
}
