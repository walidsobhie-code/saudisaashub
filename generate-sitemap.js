#!/usr/bin/env node

/**
 * SaudiSaaSHub - Dynamic Sitemap Generator
 * Generates sitemap.xml from sample-data.json
 * Usage: node generate-sitemap.js [--base-url https://saudisaashub.com]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  dataFile: 'sample-data.json',
  outputFile: 'sitemap.xml',
  defaultBaseUrl: 'https://saudisaashub.com',
  changefreq: {
    homepage: 'daily',
    categories: 'weekly',
    companies: 'weekly',
    articles: 'weekly',
    events: 'weekly',
    static: 'yearly'
  },
  priority: {
    homepage: 1.0,
    categories: 0.9,
    category: 0.8,
    companies: 0.7,
    company: 0.6,
    articles: 0.8,
    article: 0.7,
    events: 0.7,
    event: 0.6,
    about: 0.5,
    contact: 0.4,
    legal: 0.3
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const baseUrl = args.find(arg => !arg.startsWith('--')) || args[0] || CONFIG.defaultBaseUrl;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateUrlEntry(loc, lastmod, changefreq, priority, alternateHreflangs = []) {
  const entries = [];

  // Main URL entry
  entries.push(`  <url>`);
  entries.push(`    <loc>${escapeXml(loc)}</loc>`);
  entries.push(`    <lastmod>${lastmod}</lastmod>`);
  entries.push(`    <changefreq>${changefreq}</changefreq>`);
  entries.push(`    <priority>${priority}</priority>`);

  // Alternate language versions
  if (alternateHreflangs.length > 0) {
    alternateHreflangs.forEach(alt => {
      entries.push(`    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}" />`);
    });
  }

  entries.push(`  </url>`);
  return entries.join('\n');
}

function generateSitemap(data, baseUrl) {
  const entries = [];
  const today = formatDate(new Date());

  // Ensure base URL doesn't end with slash
  const cleanBase = baseUrl.replace(/\/$/, '');

  // 1. Homepage (both Arabic and English)
  entries.push(generateUrlEntry(
    `${cleanBase}/`,
    today,
    CONFIG.changefreq.homepage,
    CONFIG.priority.homepage,
    [
      { lang: 'ar', href: `${cleanBase}/` },
      { lang: 'en', href: `${cleanBase}/en/` },
      { lang: 'x-default', href: `${cleanBase}/` }
    ]
  ));

  // 2. Categories main page
  entries.push(generateUrlEntry(
    `${cleanBase}/categories`,
    today,
    CONFIG.changefreq.categories,
    CONFIG.priority.categories,
    [
      { lang: 'ar', href: `${cleanBase}/categories` },
      { lang: 'en', href: `${cleanBase}/en/categories` }
    ]
  ));

  // 3. Individual Categories (from data)
  if (data.categories && Array.isArray(data.categories)) {
    data.categories.forEach(category => {
      const lastmod = category.updatedAt ? formatDate(new Date(category.updatedAt)) : today;

      // Arabic version
      entries.push(generateUrlEntry(
        `${cleanBase}/category/${category.slug}`,
        lastmod,
        CONFIG.changefreq.category,
        CONFIG.priority.category,
        [
          { lang: 'ar', href: `${cleanBase}/category/${category.slug}` },
          { lang: 'en', href: `${cleanBase}/en/category/${category.slug}` }
        ]
      ));
    });
  }

  // 4. Companies main page
  entries.push(generateUrlEntry(
    `${cleanBase}/companies`,
    today,
    CONFIG.changefreq.companies,
    CONFIG.priority.companies,
    [
      { lang: 'ar', href: `${cleanBase}/companies` },
      { lang: 'en', href: `${cleanBase}/en/companies` }
    ]
  ));

  // 5. Individual Companies (from featured_companies data)
  // In a real app, you'd fetch ALL companies from your database
  // For now, we'll use featured companies as a sample
  if (data.featured_companies && Array.isArray(data.featured_companies)) {
    data.featured_companies.forEach(company => {
      const lastmod = company.updatedAt ? formatDate(new Date(company.updatedAt)) : today;

      entries.push(generateUrlEntry(
        `${cleanBase}/company/${company.slug}`,
        lastmod,
        CONFIG.changefreq.company,
        CONFIG.priority.company
      ));
    });
  }

  // 6. Articles main page
  entries.push(generateUrlEntry(
    `${cleanBase}/articles`,
    today,
    CONFIG.changefreq.articles,
    CONFIG.priority.articles,
    [
      { lang: 'ar', href: `${cleanBase}/articles` },
      { lang: 'en', href: `${cleanBase}/en/articles` }
    ]
  ));

  // 7. Individual Articles
  if (data.articles && Array.isArray(data.articles)) {
    data.articles.forEach(article => {
      const lastmod = article.updatedAt ? formatDate(new Date(article.updatedAt)) : formatDate(new Date(article.publishedAt));

      entries.push(generateUrlEntry(
        `${cleanBase}/article/${article.slug}`,
        lastmod,
        CONFIG.changefreq.article,
        CONFIG.priority.article
      ));
    });
  }

  // 8. Events main page
  entries.push(generateUrlEntry(
    `${cleanBase}/events`,
    today,
    CONFIG.changefreq.events,
    CONFIG.priority.events
  ));

  // 9. Individual Events
  if (data.events && Array.isArray(data.events)) {
    data.events.forEach(event => {
      const lastmod = event.updatedAt ? formatDate(new Date(event.updatedAt)) : today;

      entries.push(generateUrlEntry(
        `${cleanBase}/event/${event.slug}`,
        lastmod,
        CONFIG.changefreq.event,
        CONFIG.priority.event
      ));
    });
  }

  // 10. Static pages
  const staticPages = [
    { path: '/about', changefreq: CONFIG.changefreq.static, priority: CONFIG.priority.about },
    { path: '/contact', changefreq: CONFIG.changefreq.static, priority: CONFIG.priority.contact },
    { path: '/privacy', changefreq: CONFIG.changefreq.static, priority: CONFIG.priority.legal },
    { path: '/terms', changefreq: CONFIG.changefreq.static, priority: CONFIG.priority.legal }
  ];

  staticPages.forEach(page => {
    entries.push(generateUrlEntry(
      `${cleanBase}${page.path}`,
      today,
      page.changefreq,
      page.priority
    ));
  });

  // Build final XML
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const xmlFooter = `</urlset>`;

  return [xmlHeader, ...entries, xmlFooter].join('\n');
}

function main() {
  try {
    log('\n🗺️  SaudiSaaSHub Sitemap Generator\n', 'cyan');

    // Read data file
    const dataPath = path.join(__dirname, CONFIG.dataFile);
    if (!fs.existsSync(dataPath)) {
      log(`❌ Error: ${CONFIG.dataFile} not found`, 'red');
      process.exit(1);
    }

    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(dataContent);
    log(`✓ Loaded ${CONFIG.dataFile}`, 'green');

    // Generate sitemap
    const sitemap = generateSitemap(data, baseUrl);

    // Write sitemap
    const outputPath = path.join(__dirname, CONFIG.outputFile);
    fs.writeFileSync(outputPath, sitemap);
    log(`✓ Generated ${CONFIG.outputFile}`, 'green');

    // Count URLs
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    const fileSize = (Buffer.byteLength(sitemap, 'utf8') / 1024).toFixed(2);

    log(`\n📊 Sitemap Summary:`, 'cyan');
    log(`  URLs: ${urlCount}`, 'yellow');
    log(`  Size: ${fileSize} KB`, 'yellow');
    log(`  Base URL: ${baseUrl}`, 'yellow');
    log(`  Output: ${outputPath}`, 'yellow');
    log('\n✅ Sitemap generation complete!', 'green');

    // Recommendations
    log('\n📝 Next steps:', 'cyan');
    log('  1. Submit sitemap to Google Search Console', 'yellow');
    log('  2. Submit sitemap to Bing Webmaster Tools', 'yellow');
    log('  3. Add sitemap reference to robots.txt', 'yellow');
    log('  4. Set up scheduled regeneration if content updates frequently\n', 'yellow');

  } catch (error) {
    log(`\n❌ Sitemap generation failed: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap };