const fs = require('fs');
const content = fs.readFileSync('lib/generated-articles.ts', 'utf8');
const match = content.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
const articles = eval('[' + match[1] + ']');
const first = articles[0];

// Extract all sections with heading text and first paragraph
const sectionRegex = /(<h2[^>]*>.*?<\/h2>)([\s\S]*?)(?=<h2|$)/gi;
const sections = [];
let m;
while ((m = sectionRegex.exec(first.content)) !== null) {
  const heading = m[1].replace(/<[^>]*>/g, '').trim().toLowerCase();
  const body = m[2];
  // Get first paragraph text
  const firstP = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const preview = firstP ? firstP[1].replace(/<[^>]*>/g, '').trim().substring(0, 100) : '';
  sections.push({ heading, preview });
}

// Find duplicates by heading similarity (first 10 chars)
const seen = new Set();
const duplicates = [];

sections.forEach((sec, idx) => {
  const key = sec.heading.substring(0, 15) + '|' + sec.preview.substring(0, 50);
  if (seen.has(key)) {
    duplicates.push({ index: idx+1, heading: sec.heading });
  } else {
    seen.add(key);
  }
});

console.log(`Total sections: ${sections.length}`);
console.log(`Duplicates found (by heading prefix + preview): ${duplicates.length}\n`);
duplicates.forEach(d => {
  console.log(`  Section ${d.index}: ${d.heading.substring(0, 50)}...`);
});
