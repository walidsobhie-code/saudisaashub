const { XMLParser } = require('fast-xml-parser');
const fs = require('fs');

exports.ParsedArticle = null; // placeholder

function generateSlug(title, existingSlugs) {
  const arabicToEnglish = {
    'في': 'in', 'المملكة': 'saudi', 'السعودية': 'arabia', 'الرياض': 'riyadh',
    'جدة': 'jeddah', 'دليل': 'guide', 'أفضل': 'best', 'شركات': 'companies',
    'تطبيقات': 'apps', 'منصات': 'platforms', 'خدمات': 'services', 'حلول': 'solutions',
    'تسويق': 'marketing', 'تجارة': 'ecommerce', 'إلكترونية': 'electronic',
    'الأعمال': 'business', 'التمويل': 'fintech', 'العقاري': 'real-estate',
    'الصحة': 'health', 'الأمن': 'security', 'السيبراني': 'cybersecurity',
    'الاستضافة': 'hosting', 'المواقع': 'websites', 'التعليم': 'elearning',
    'المشاريع': 'projects', 'الفرق': 'teams', 'الدفع': 'payments',
    'البريد': 'email', 'البحث': 'search', 'الترجمة': 'translation',
    'المحتوى': 'content', 'الفيديو': 'video', 'الصور': 'images',
    'التصميم': 'design', 'البرمجة': 'coding', 'التطوير': 'development',
    'الذكاء': 'ai', 'الاصطناعي': 'artificial', 'الفوترة': 'invoicing',
    'ZATCA': 'zatca', 'القيمة': 'value', 'المضافة': 'added',
  };

  let slug = (title || '').toLowerCase();
  for (const [arabic, english] of Object.entries(arabicToEnglish)) {
    slug = slug.replace(new RegExp(arabic, 'g'), english);
  }
  slug = slug.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (slug && !slug.includes('2026') && !slug.includes('2025')) slug = slug + '-2026';
  if (!slug) slug = 'article';

  let finalSlug = slug;
  let counter = 1;
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  existingSlugs.add(finalSlug);
  return finalSlug;
}

function fixEncoding(text) {
  if (!text) return '';

  let fixed = text;

  try {
    if (text.includes('M-XM-') || text.includes('M-YM-^')) {
      fixed = text
        .replace(/M-XM-([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16) + 0x80))
        .replace(/M-YM-\^([A-Z])/g, (_, letter) => {
          const code = letter.charCodeAt(0);
          return String.fromCharCode(code < 64 ? code + 0x40 : code);
        });
      fixed = Buffer.from(fixed, 'latin1').toString('utf-8');
    }
    else if (/[Ø§ÙÌÃ¢Ã©]/.test(text)) {
      fixed = Buffer.from(text, 'latin1').toString('utf-8');
    }
    else if (text.includes('\uFFFD')) {
      fixed = Buffer.from(text, 'latin1').toString('utf-8');
    }

    return fixed.replace(/\uFFFD/g, ' ').replace(/\s+/g, ' ').trim();
  } catch {
    return text;
  }
}

function cleanArabicText(text) {
  if (!text) return '';

  let cleaned = text;
  cleaned = cleaned.replace(/[\u4e00-\u9fff]/g, '');
  cleaned = cleaned.replace(/[\u0400-\u04FF]/g, '');
  cleaned = cleaned.replace(/将这些/g, '');
  cleaned = cleaned.replace(/для/g, '');
  cleaned = cleaned.replace(/[█▓▒░]/g, '');
  cleaned = cleaned.replace(/\uFFFD/g, '');
  cleaned = cleaned.replace(/،,/g, '،');

  return cleaned;
}

exports.parseArticlesFromXML = async function() {
  const path = require('path');
  // __dirname is the directory of this file (lib/)
  // We need to go up one level to project root, then to data/xml/
  const xmlDir = path.join(__dirname, '..', 'data', 'xml');
  
  const xmlFiles = [
    path.join(xmlDir, 'saudisaashub-fully-cleaned.xml'),
    path.join(xmlDir, 'saudisaashub-clean-part2.xml'),
    path.join(xmlDir, 'saudisaashub-clean-part3.xml'),
  ];

  const articles = [];
  const existingSlugs = new Set();

  for (const xmlFile of xmlFiles) {
    if (!fs.existsSync(xmlFile)) {
      console.warn(`XML file not found: ${xmlFile}`);
      continue;
    }

    try {
      const xmlData = fs.readFileSync(xmlFile, 'utf-8');

      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        parseTagValue: false,
        parseAttributeValue: false,
      });
      const result = parser.parse(xmlData);

      const items = result?.rss?.channel?.item || [];
      const itemsArray = Array.isArray(items) ? items : [items];

      for (const item of itemsArray) {
        if (!item || item['wp:status'] !== 'publish') continue;

        const title = cleanArabicText(fixEncoding(item.title || ''));
        const slug = item['wp:post_name'] || generateSlug(title, existingSlugs);
        const content = cleanArabicText(fixEncoding(item['content:encoded'] || ''));
        const pubDate = item.pubDate || '';

        if (!title || !content) continue;

        const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount < 1500) continue;

        const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;

        const categories = [];
        const categoryData = item.category;
        if (categoryData) {
          const cats = Array.isArray(categoryData) ? categoryData : [categoryData];
          for (const cat of cats) {
            if (cat.domain === 'category') {
              const catName = fixEncoding(cat['#text'] || cat);
              if (catName && !categories.includes(catName)) categories.push(catName);
            }
          }
        }

        const readingTime = Math.ceil(wordCount / 200);

        articles.push({
          title,
          slug,
          content,
          excerpt,
          date: pubDate,
          categories,
          author: 'Saudi SaaS Hub',
          readingTime
        });
      }
    } catch (error) {
      console.error(`Error parsing ${xmlFile}:`, error);
    }
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
};
