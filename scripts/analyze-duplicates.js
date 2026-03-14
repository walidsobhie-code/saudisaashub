const fs = require('fs');
const content = fs.readFileSync('lib/generated-articles.ts', 'utf8');
const match = content.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
const articles = eval('[' + match[1] + ']');
const first = articles[0];

// Extract clean paragraphs
const paragraphs = first.content
  .split(/<p>/)
  .map(p => p.replace(/<[^>]*>/g, '').trim())
  .filter(p => p.length > 50);

console.log(`Total paragraphs (>50 chars): ${paragraphs.length}\n`);

const seen = new Map();
paragraphs.forEach((p, i) => {
  const norm = p.substring(0, 100);
  if (seen.has(norm)) {
    const indices = seen.get(norm);
    console.log(`Duplicate of paragraph ${indices[0]}:`);
    console.log(`  [${i}] ${p.substring(0, 80)}...`);
    indices.push(i);
  } else {
    seen.set(norm, [i]);
  }
});

// Show which paragraphs have duplicates
console.log('\nDuplicates summary:');
for (const [norm, indices] of seen) {
  if (indices.length > 1) {
    console.log(`  Paragraph ${indices[0]} repeated ${indices.length - 1}x`);
  }
}
