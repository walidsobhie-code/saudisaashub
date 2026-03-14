const fs = require('fs');

// Read generated articles
const file = 'lib/generated-articles.ts';
const content = fs.readFileSync(file, 'utf8');

// Extract articles array (simple regex)
const match = content.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
if (!match) {
  console.log('❌ No articles array found');
  process.exit(1);
}

// Parse articles (safe-ish eval)
const articlesStr = match[1];
const articles = eval('[' + articlesStr + ']');

console.log('✅ Total articles:', articles.length);

if (articles.length > 0) {
  const first = articles[0];

  // Check for Chinese chars
  const hasChinese = /[\u4e00-\u9fff]/.test(first.content);
  console.log('   Has Chinese chars:', hasChinese ? '❌ YES' : '✅ NO');

  // Count paragraphs
  const paragraphCount = (first.content.match(/<p>/g) || []).length;
  console.log('   Paragraph count (<p>):', paragraphCount);

  // Check for duplicate blocks (>100 chars)
  const blocks = first.content.split(/<h[1-6]|<p>/);
  const seen = new Set();
  let duplicateCount = 0;

  for (const block of blocks) {
    const plain = block.replace(/<[^>]*>/g, '').trim();
    if (plain.length > 100) {
      if (seen.has(plain)) {
        duplicateCount++;
      } else {
        seen.add(plain);
      }
    }
  }

  console.log('   Duplicate blocks detected:', duplicateCount);

  // Summary
  if (!hasChinese && duplicateCount < 3 && paragraphCount < 30) {
    console.log('✅ Content looks clean!');
  } else {
    console.log('⚠️ Issues remain');
  }
}
