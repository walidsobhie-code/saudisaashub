const { parseArticlesFromXML } = require('../lib/xml-parser');
const { db } = require('../lib/database');

console.log('Importing articles into SQLite database...');

const main = async () => {
  const articles = await parseArticlesFromXML();

  if (articles.length === 0) {
    console.error('No articles found to import!');
    process.exit(1);
  }

  console.log(`Found ${articles.length} articles to import`);

  // Clear existing articles
  db.prepare('DELETE FROM articles').run();

  // Insert articles
  const insert = db.prepare(`
    INSERT INTO articles (title, slug, content, excerpt, date, categories, author, readingTime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let imported = 0;
  for (const article of articles) {
    try {
      insert.run(
        article.title,
        article.slug,
        article.content,
        article.excerpt,
        article.date || null,
        JSON.stringify(article.categories),
        article.author,
        article.readingTime
      );
      imported++;
    } catch (error) {
      console.error(`Failed to import article "${article.title}":`, error.message);
    }
  }

  console.log(`Successfully imported ${imported} articles`);
  console.log('Database ready at: ./data/saudisaashub.db');

  // Verify
  const count = db.prepare('SELECT COUNT(*) as count FROM articles').get();
  console.log(`Total articles in database: ${count.count}`);
};

main().catch(console.error);
