const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xmlFiles = [
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-fully-cleaned.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part2.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part3.xml',
];

const articles = [];

for (const xmlFile of xmlFiles) {
  if (!fs.existsSync(xmlFile)) {
    console.log('Missing:', xmlFile);
    continue;
  }

  try {
    const xmlData = fs.readFileSync(xmlFile, 'utf-8');
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const result = parser.parse(xmlData);
    const items = result?.rss?.channel?.item || [];
    const itemsArray = Array.isArray(items) ? items : [items];
    console.log(xmlFile, '-> items:', itemsArray.length);

    for (const item of itemsArray) {
      if (!item || item['wp:status'] !== 'publish') continue;

      const content = item['content:encoded'] || '';
      const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      const wordCount = plainText.split(/\s+/).length;

      if (wordCount >= 1500) {
        articles.push({ title: item.title, words: wordCount });
      }
    }
  } catch (error) {
    console.log('Error:', xmlFile, error.message);
  }
}

console.log('Total articles >= 1500 words:', articles.length);
console.log('Articles:', articles.map(a => `${a.title.substring(0, 40)}... (${a.words} words)`));
