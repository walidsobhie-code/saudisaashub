// Process articles - remove duplicates and add structure
const fs = require('fs');
const path = require('path');

const xmlDir = '/Users/walidsobhi/SEO_Articles_All/Clean_Articles';
const xmlFiles = [
  'saudisaashub-fully-cleaned.xml',
  'saudisaashub-clean-part2.xml',
  'saudisaashub-clean-part3.xml'
];

// Fix encoding
function fixEncoding(text) {
  if (!text) return '';
  try {
    if (text.includes('M-XM-') || text.includes('M-YM-^')) {
      text = text
        .replace(/M-XM-([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16) + 0x80))
        .replace(/M-YM-\^([A-Z])/g, (_, letter) => String.fromCharCode(letter.charCodeAt(0) < 64 ? letter.charCodeAt(0) + 0x40 : letter.charCodeAt(0)));
      text = Buffer.from(text, 'latin1').toString('utf-8');
    }
    else if (/[Ø§ÙÌÃ¢Ã©]/.test(text)) {
      text = Buffer.from(text, 'latin1').toString('utf-8');
    }
    return text.replace(/\uFFFD/g, ' ').replace(/\s+/g, ' ').trim();
  } catch {
    return text;
  }
}

// Clean text - remove Chinese, Russian, duplicates
function cleanText(text) {
  if (!text) return '';
  let cleaned = text;

  // Remove Chinese
  cleaned = cleaned.replace(/[\u4e00-\u9fff]/g, '');
  // Remove Russian/Cyrillic
  cleaned = cleaned.replace(/[\u0400-\u04FF]/g, '');
  // Remove specific foreign
  cleaned = cleaned.replace(/将这些/g, '');
  cleaned = cleaned.replace(/для/g, '');
  // Remove box chars
  cleaned = cleaned.replace(/[█▓▒░]/g, '');
  cleaned = cleaned.replace(/\uFFFD/g, '');
  cleaned = cleaned.replace(/،,/g, '،');

  return cleaned;
}

// Remove duplicate paragraphs/sections
function removeDuplicates(content) {
  const paragraphs = content.split(/\n\n+/);
  const seen = new Set();
  const unique = [];

  for (const p of paragraphs) {
    const normalized = p.toLowerCase().replace(/[^a-zأ-ي0-9]/g, '').substring(0, 50);
    if (normalized.length > 10 && !seen.has(normalized)) {
      seen.add(normalized);
      unique.push(p);
    }
  }

  return unique.join('\n\n');
}

// Add structure - convert sections to better format
function structureContent(content) {
  let structured = content;

  // Convert numbered sections to better headings
  structured = structured.replace(/<p>(\d+\.)\s*([^<]+)<\/p>/gi, '<h3>$2</h3>');

  // Convert list items that look like tips to callouts
  structured = structured.replace(/<li>(نصيحة|tip|تنبيه|ملاحظة)/gi, '<li class="callout">');

  return structured;
}

// Process
for (const file of xmlFiles) {
  const filePath = path.join(xmlDir, file);
  const outputPath = path.join(xmlDir, 'cleaned-' + file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} not found`);
    continue;
  }

  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix encoding in titles
  content = content.replace(/title="([^"]*)"/g, (match, title) => {
    return `title="${cleanText(fixEncoding(title))}"`;
  });

  // Fix encoding in content
  content = content.replace(/<content:encoded>([\s\S]*?)<\/content:encoded>/g, (match, encoded) => {
    let fixed = fixEncoding(encoded);
    fixed = cleanText(fixed);
    // Remove obvious duplicates
    fixed = removeDuplicates(fixed);
    // Add structure
    fixed = structureContent(fixed);
    return `<content:encoded>${fixed}</content:encoded>`;
  });

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Saved to cleaned-${file}`);
}

console.log('\n✅ All articles cleaned and structured!');
console.log('Files saved: cleaned-saudisaashub-*.xml');
