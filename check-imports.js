const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xmlFiles = [
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-wordpress-import-part10.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-wordpress-import-part11.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-wordpress-import-part12.xml',
];

console.log('=== WordPress Import Files Word Counts ===\n');

let total1500 = 0;
let totalArticles = 0;
let allArticles = [];

for (const xmlFile of xmlFiles) {
  if (!fs.existsSync(xmlFile)) continue;

  const xml = fs.readFileSync(xmlFile, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
  const result = parser.parse(xml);
  const items = result.rss.channel.item || [];
  const itemsArray = Array.isArray(items) ? items : [items];

  for (const item of itemsArray) {
    if (item['wp:status'] !== 'publish') continue;

    const title = item.title || '';
    const content = item['content:encoded'] || '';
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const words = text.split(/\s+/).length;

    totalArticles++;
    allArticles.push({ title, words, xmlFile });

    if (words >= 1500) total1500++;
  }
}

console.log(`Total Articles: ${totalArticles}`);
console.log(`Articles with 1500+ words: ${total1500}`);
console.log(`Articles below 1500 words: ${totalArticles - total1500}`);
console.log('\n=== Longest Articles ===');

allArticles.sort((a, b) => b.words - a.words);

allArticles.slice(0, 15).forEach((a, i) => {
  console.log(`${i+1}. ${a.title.substring(0, 50)} => ${a.words} words`);
});
