// Script to fix and regenerate clean XML articles
const fs = require('fs');
const path = require('path');

const xmlDir = '/Users/walidsobhi/SEO_Articles_All/Clean_Articles';
const xmlFiles = [
  'saudisaashub-fully-cleaned.xml',
  'saudisaashub-clean-part2.xml',
  'saudisaashub-clean-part3.xml'
];

// Fix all encoding issues
function fixAllEncoding(text) {
  if (!text) return '';

  let fixed = text;

  try {
    // Pattern 1: M-XM- (double encoded UTF-8)
    if (text.includes('M-XM-') || text.includes('M-YM-^')) {
      fixed = text
        .replace(/M-XM-([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16) + 0x80))
        .replace(/M-YM-\^([A-Z])/g, (_, letter) => {
          const code = letter.charCodeAt(0);
          return String.fromCharCode(code < 64 ? code + 0x40 : code);
        });
      fixed = Buffer.from(fixed, 'latin1').toString('utf-8');
    }
    // Pattern 2: UTF-8 bytes read as Latin-1 (Ø§Ù pattern)
    else if (/[Ø§ÙÌÃ¢Ã©]/.test(text)) {
      fixed = Buffer.from(text, 'latin1').toString('utf-8');
    }

    // Clean unwanted characters
    fixed = fixed
      // Remove Chinese characters
      .replace(/[\u4e00-\u9fff]/g, '')
      // Remove specific mixed text
      .replace(/将这些/g, '')
      // Remove box chars
      .replace(/[█▓▒░]/g, '')
      // Clean replacement chars
      .replace(/\uFFFD/g, '')
      // Clean double commas
      .replace(/،,/g, '،')
      // Clean multiple spaces
      .replace(/\s+/g, ' ')
      .trim();

    return fixed;
  } catch (e) {
    console.error('Fix error:', e.message);
    return text;
  }
}

// Process each XML file
for (const file of xmlFiles) {
  const filePath = path.join(xmlDir, file);
  const outputPath = path.join(xmlDir, 'fixed-' + file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} not found`);
    continue;
  }

  console.log(`Processing ${file}...`);

  // Read as UTF-8
  let content = fs.readFileSync(filePath, 'utf-8');

  // Track fixes
  let fixes = 0;

  // Fix title attributes
  content = content.replace(/title="([^"]*)"/g, (match, text) => {
    const fixed = fixAllEncoding(text);
    if (fixed !== text) {
      fixes++;
      return `title="${fixed}"`;
    }
    return match;
  });

  // Fix content:encoded
  content = content.replace(/<content:encoded>([\s\S]*?)<\/content:encoded>/g, (match, encoded) => {
    const fixed = fixAllEncoding(encoded);
    if (fixed !== encoded) {
      fixes++;
    }
    return `<content:encoded>${fixed}</content:encoded>`;
  });

  // Fix description
  content = content.replace(/<description>([^<]*)<\/description>/g, (match, desc) => {
    const fixed = fixAllEncoding(desc);
    if (fixed !== desc) {
      fixes++;
      return `<description>${fixed}</description>`;
    }
    return match;
  });

  // Save fixed version
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ ${file} - ${fixes} fixes applied, saved to ${outputPath}`);
}

console.log('\n✅ Done! Use the fixed XML files in your articles.ts');
