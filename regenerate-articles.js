// Regenerate and clean all articles
const fs = require('fs');
const path = require('path');

const xmlDir = '/Users/walidsobhi/SEO_Articles_All/Clean_Articles';
const xmlFiles = [
  'saudisaashub-fully-cleaned.xml',
  'saudisaashub-clean-part2.xml',
  'saudisaashub-clean-part3.xml'
];

// Comprehensive encoding and cleaning fix
function fixAllIssues(text) {
  if (!text) return '';

  let fixed = text;

  try {
    // Fix mojibake patterns
    if (text.includes('M-XM-') || text.includes('M-YM-^')) {
      fixed = text
        .replace(/M-XM-([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16) + 0x80))
        .replace(/M-YM-\^([A-Z])/g, (_, letter) => {
          const code = letter.charCodeAt(0);
          return String.fromCharCode(code < 64 ? code + 0x40 : code);
        });
      fixed = Buffer.from(fixed, 'latin1').toString('utf-8');
    }
    // UTF-8 as Latin-1
    else if (/[Ø§ÙÌÃ¢Ã©]/.test(text)) {
      fixed = Buffer.from(text, 'latin1').toString('utf-8');
    }

    // Remove foreign characters
    fixed = fixed
      .replace(/[\u4e00-\u9fff]/g, '')  // Chinese
      .replace(/[\u0400-\u04FF]/g, '')   // Russian/Cyrillic
      .replace(/将这些/g, '')
      .replace(/для/g, '')
      .replace(/[█▓▒░]/g, '')
      .replace(/\uFFFD/g, '')
      .replace(/،,/g, '،')
      .replace(/\s+/g, ' ')
      .trim();

    return fixed;
  } catch (e) {
    return text;
  }
}

// Remove duplicate content patterns
function removeDuplicates(content) {
  let cleaned = content;

  // Split into paragraphs/sections
  const sections = cleaned.split(/\n\n+/);

  // Remove exact duplicate paragraphs
  const seen = new Set();
  const uniqueSections = sections.filter(section => {
    const key = section.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return uniqueSections.join('\n\n');
}

// Enhance content with structure
function enhanceContent(content) {
  let enhanced = content;

  // Convert numbered sections to proper h3 headings if not already
  enhanced = enhanced.replace(/^(\d+\.\s+)(.+)$/gm, '<h3>$2</h3>');

  // Add table structure where appropriate
  // For content about pricing, features, comparisons
  if (enhanced.includes('مقارنة') || enhanced.includes('السعر') || enhanced.includes('الميزات')) {
    // Wrap comparison data in table tags if detected
  }

  return enhanced;
}

// Process each XML file
for (const file of xmlFiles) {
  const filePath = path.join(xmlDir, file);
  const outputPath = path.join(xmlDir, 'cleaned-' + file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} not found`);
    continue;
  }

  console.log(`Processing ${file}...`);

  let content = fs.readFileSync(filePath, 'utf-8');
  let fixes = 0;
  let duplicates = 0;

  // Fix all titles
  content = content.replace(/title="([^"]*)"/g, (match, text) => {
    const fixed = fixAllIssues(text);
    if (fixed !== text) fixes++;
    return `title="${fixed}"`;
  });

  // Fix all content
  content = content.replace(/<content:encoded>([\s\S]*?)<\/content:encoded>/g, (match, encoded) => {
    let fixed = fixAllIssues(encoded);
    const cleaned = removeDuplicates(fixed);
    if (cleaned !== fixed) duplicates++;
    fixes++;
    return `<content:encoded>${cleaned}</content:encoded>`;
  });

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ ${file}: ${fixes} fixes, ${duplicates} duplicates removed`);
}

console.log('\n✅ Regeneration complete!');
console.log('New files: cleaned-saudisaashub-*.xml');
