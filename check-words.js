const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xmlFiles = [
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-fully-cleaned.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part2.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part3.xml',
];

console.log('=== Article Word Counts ===\n');

let total1500 = 0;
let totalArticles = 0;

for (const xmlFile of xmlFiles) {
  if (!fs.existsSync(xmlFile)) continue;

  const xml = fs.readFileSync(xmlFile, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
  const result = parser.parse(xml);
  const items = result.rss.channel.item || [];
  const itemsArray = Array.isArray(items) ? items : [items];

  for (const item of itemsArray) {
    if (item['wp:status'] != 'publish') continue;

    const title = item.title || '';
    const content = item['content:encoded'] || '';
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const words = text.split(/\s+/).length;

    totalArticles++;
    if (words >= 1500) total1500++;

    const status = words >= 1500 ? '✓' : '✗';
    console.log(`${status} ${totalArticles}. ${title.substring(0, 45)}... => ${words} words`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Total Articles: ${totalArticles}`);
console.log(`Articles with 1500+ words: ${total1500}`);
console.log(`Articles below 1500 words: ${totalArticles - total1500}`);
