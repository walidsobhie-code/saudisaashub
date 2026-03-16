const fs = require('fs');
const path = require('path');

// Load all article sources
const generatedContent = fs.readFileSync(path.join(__dirname, 'lib', 'generated-articles.ts'), 'utf8');
const newArticlesContent = fs.readFileSync(path.join(__dirname, 'lib', 'new-articles.ts'), 'utf8');

// Count articles by parsing the exports
const generatedMatch = generatedContent.match(/export const articles = \[([\s\S]*?)\];/);
const newMatch = newArticlesContent.match(/export const newArticles: Article\[\] = \[([\s\S]*?)\];/);
const moreMatch = newArticlesContent.match(/export const moreArticles: Article\[\] = \[([\s\S]*?)\];/);

let generatedCount = 0;
let newCount = 0;
let moreCount = 0;

if (generatedMatch) {
  const articlesStr = generatedMatch[1];
  generatedCount = (articlesStr.match(/\{[\s\S]*?slug:/g) || []).length;
}

if (newMatch) {
  const articlesStr = newMatch[1];
  newCount = (articlesStr.match(/\{[\s\S]*?slug:/g) || []).length;
}

if (moreMatch) {
  const articlesStr = moreMatch[1];
  moreCount = (articlesStr.match(/\{[\s\S]*?slug:/g) || []).length;
}

console.log('📰 ARTICLES CONTENT ANALYSIS\n');
console.log('='.repeat(60));
console.log('Article counts by source:');
console.log('   Generated articles: ' + generatedCount);
console.log('   New articles: ' + newCount);
console.log('   More articles: ' + moreCount);
console.log('   Total: ' + (generatedCount + newCount + moreCount));

// Check for Arabic vs English content
const arabicRegex = /[\u0600-\u06FF]/;
const englishRegex = /[a-zA-Z]/;

function detectLanguage(text) {
  const arabicMatches = text.match(arabicRegex) || [];
  const englishMatches = text.match(englishRegex) || [];
  const arabicRatio = arabicMatches.length / (text.length || 1);
  const englishRatio = englishMatches.length / (text.length || 1);

  if (arabicRatio > 0.1 && englishRatio > 0.1) return 'Mixed';
  if (arabicRatio > 0.1) return 'Arabic';
  if (englishRatio > 0.1) return 'English';
  return 'Other';
}

// Sample analysis of first few articles from each source
function sampleArticles(content, label, limit = 3) {
  const match = content.match(/export const \w+[:\s]*\[([\s\S]*?)\];/);
  if (!match) return;

  const articlesStr = match[1];
  // Split articles by },{ pattern (naive but works for simple cases)
  const parts = articlesStr.split(/},\s*{/);
  console.log('\n📄 Sample from ' + label + ':');
  parts.slice(0, limit).forEach((part, idx) => {
    part = part.startsWith('{') ? part : '{' + part;
    part = part.endsWith('}') ? part : part + '}';
    const titleMatch = part.match(/title:\s*[\"']([^\"']+)[\"']/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';
    const contentMatch = part.match(/content:\s*[\"\'`]([\s\S]*?)[\"\'`](?=,\s*\w+:|$)/);
    const content = contentMatch ? contentMatch[1] : '';
    const language = detectLanguage(content);
    console.log('   ' + (idx+1) + '. ' + title.substring(0, 60) + (title.length > 60 ? '...' : ''));
    console.log('      Language: ' + language + ', Content length: ' + content.length + ' chars');
  });
}

sampleArticles(generatedContent, 'generated-articles');
sampleArticles(newArticlesContent, 'new-articles');

// Check for placeholder or incomplete articles (very short content)
function checkShortArticles(content, label) {
  const match = content.match(/export const \w+[:\s]*\[([\s\S]*?)\];/);
  if (!match) return [];

  const articlesStr = match[1];
  const parts = articlesStr.split(/},\s*{/);
  const shortArticles = [];

  parts.forEach((part, idx) => {
    part = part.startsWith('{') ? part : '{' + part;
    part = part.endsWith('}') ? part : part + '}';
    const slugMatch = part.match(/slug:\s*[\"']([^\"']+)[\"']/);
    const slug = slugMatch ? slugMatch[1] : 'unknown';
    const contentMatch = part.match(/content:\s*[\"\'`]([\s\S]*?)[\"\'`](?=,\s*\w+:|$)/);
    const content = contentMatch ? contentMatch[1] : '';

    if (content.length < 500) {
      shortArticles.push({ slug, length: content.length });
    }
  });

  return shortArticles;
}

const shortGenerated = checkShortArticles(generatedContent, 'generated-articles');
const shortNew = checkShortArticles(newArticlesContent, 'new-articles');

console.log('\n🔍 Checking for incomplete/short articles (<500 chars):');
console.log('   Generated: ' + shortGenerated.length);
console.log('   New/More: ' + shortNew.length);
console.log('   Total short: ' + (shortGenerated.length + shortNew.length));

if (shortGenerated.length > 0) {
  console.log('\n   Short generated articles (first 5):');
  shortGenerated.slice(0, 5).forEach(a => console.log('     - ' + a.slug + ' (' + a.length + ' chars)'));
}
if (shortNew.length > 0) {
  console.log('   Short new articles (first 5):');
  shortNew.slice(0, 5).forEach(a => console.log('     - ' + a.slug + ' (' + a.length + ' chars)'));
}

// Check for date formatting consistency
function checkDates(content, label) {
  const match = content.match(/export const \w+[:\s]*\[([\s\S]*?)\];/);
  if (!match) return { total: 0, iso: 0, invalid: 0 };

  const articlesStr = match[1];
  const parts = articlesStr.split(/},\s*{/);
  let isoCount = 0;
  let invalidCount = 0;

  parts.forEach(part => {
    part = part.startsWith('{') ? part : '{' + part;
    part = part.endsWith('}') ? part : part + '}';
    const dateMatch = part.match(/date:\s*[\"']([^\"']+)[\"']/);
    if (dateMatch) {
      const date = dateMatch[1];
      // Check ISO-like format: YYYY-MM-DD HH:MM:SS or similar
      if (/\d{4}-\d{2}-\d{2}/.test(date)) {
        isoCount++;
      } else {
        invalidCount++;
      }
    }
  });

  return { total: parts.length, iso: isoCount, invalid: invalidCount };
}

const genDates = checkDates(generatedContent, 'generated-articles');
const newDates = checkDates(newArticlesContent, 'new-articles');

console.log('\n📅 Date format analysis:');
console.log('   Generated: ' + genDates.iso + '/' + genDates.total + ' have ISO-like dates');
console.log('   New/More: ' + newDates.iso + '/' + newDates.total + ' have ISO-like dates');

console.log('\n✅ Analysis complete');
console.log('   Recommendations:');
if (shortGenerated.length + shortNew.length > 0) {
  console.log('   - Review short articles for completeness; may be placeholders or need expansion');
}
if (genDates.invalid + newDates.invalid > 0) {
  console.log('   - Standardize date formats to ISO (YYYY-MM-DD HH:MM:SS)');
}

// Export summary
fs.writeFileSync('articles-analysis.json', JSON.stringify({
  generatedCount,
  newCount,
  moreCount,
  total: generatedCount + newCount + moreCount,
  shortArticles: {
    generated: shortGenerated.length,
    new: shortNew.length,
    total: shortGenerated.length + shortNew.length,
    details: [...shortGenerated.slice(0, 10), ...shortNew.slice(0, 10)].map(a => a.slug)
  },
  dateFormatting: {
    generated: genDates,
    new: newDates
  }
}, null, 2));
console.log('\n📊 Full analysis saved to articles-analysis.json');
