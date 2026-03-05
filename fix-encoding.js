const fs = require('fs');
const path = require('path');

const xmlDir = '/Users/walidsobhi/SEO_Articles_All/Clean_Articles';
const xmlFiles = [
  'saudisaashub-fully-cleaned.xml',
  'saudisaashub-clean-part2.xml',
  'saudisaashub-clean-part3.xml'
];

// Decode the mojibake: M-XM-XX -> byte 0x80-0xFF -> proper UTF-8
function decodeMojibake(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Pattern: M-XM-XX (where XX is hex) represents byte 0x80-0xFF
  // We need to reverse the double-encoding
  let result = text;
  
  // First, handle M-YM-^X patterns (control characters 0x00-0x1F)
  result = result.replace(/M-YM-\^([A-Z\[\]\\^])/g, (match, char) => {
    const code = char.charCodeAt(0);
    // Characters @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^
    // map to 0x00-0x1F
    const map = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^';
    const idx = map.indexOf(char);
    if (idx >= 0) return String.fromCharCode(idx);
    return match;
  });
  
  // Handle M-XM-XX patterns (bytes 0x80-0xFF)
  result = result.replace(/M-XM-([0-9A-F]{2})/g, (match, hex) => {
    const byte = parseInt(hex, 16);
    // These bytes 0x80-0xFF are UTF-8 continuation bytes or leading bytes
    // The original UTF-8 was read as Latin-1, so we need to reconstruct
    // But we also need to account for the double-encoding
    return String.fromCharCode(byte);
  });
  
  // Now the text is in a weird state - Latin-1 interpretation of UTF-8
  // Convert back to proper UTF-8
  try {
    // The text is currently: each original UTF-8 byte is now a separate character
    // We need to group them back into multi-byte UTF-8 sequences
    const bytes = [];
    for (let i = 0; i < result.length; i++) {
      bytes.push(result.charCodeAt(i));
    }
    
    // Re-decode as UTF-8
    result = Buffer.from(bytes).toString('utf-8');
  } catch (e) {
    // If that fails, try a simpler approach
  }
  
  return result;
}

// More aggressive fix - treat the entire content as Latin-1 and re-encode as UTF-8
function fixEncoding(text) {
  if (!text) return text;
  
  // If it has M-XM- or M-YM-^ patterns, it's corrupted
  if (!text.includes('M-XM-') && !text.includes('M-YM-^')) {
    return text; // Already clean
  }
  
  // Try: treat the whole thing as Latin-1 bytes that were incorrectly stored
  try {
    // Convert M-XM-XX to actual bytes
    let step1 = text.replace(/M-XM-([0-9A-F]{2})/g, (_, hex) => 
      String.fromCharCode(parseInt(hex, 16)));
    
    // Convert M-YM-^X to control chars
    const ctrlMap = {'@': 0, 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7,
                     'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15,
                     'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23,
                     'X': 24, 'Y': 25, 'Z': 26, '[': 27, '\\': 28, ']': 29, '^': 30, '_': 31};
    step1 = step1.replace(/M-YM-\^([@A-Z\[\\\]^_])/g, (_, c) => 
      String.fromCharCode(ctrlMap[c] || 0));
    
    // Now interpret as Latin-1 and convert to UTF-8
    return Buffer.from(step1, 'latin1').toString('utf-8');
  } catch (e) {
    console.error('Fix failed:', e.message);
    return text;
  }
}

// Process each XML file
for (const file of xmlFiles) {
  const filePath = path.join(xmlDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    continue;
  }
  
  console.log(`Processing ${file}...`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already clean
  if (!content.includes('M-XM-') && !content.includes('M-YM-^')) {
    console.log(`  Already clean, skipping`);
    continue;
  }
  
  // Fix the encoding
  const fixed = fixEncoding(content);
  
  // Check if fix worked
  if (fixed.includes('M-XM-') || fixed.includes('M-YM-^')) {
    console.log(`  WARNING: Still contains corrupted characters after fix`);
  } else {
    console.log(`  Fixed! Writing...`);
    
    // Backup original
    const backupPath = filePath + '.backup-mojibake';
    fs.writeFileSync(backupPath, content);
    console.log(`  Backed up to ${backupPath}`);
    
    // Write fixed version
    fs.writeFileSync(filePath, fixed);
    console.log(`  Written fixed version`);
  }
}

console.log('Done!');
