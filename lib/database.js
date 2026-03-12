const Database = require('better-sqlite3');
const path = require('path');
const { mkdirSync } = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'saudisaashub.db');

mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    date TEXT,
    categories TEXT,
    author TEXT DEFAULT 'Saudi SaaS Hub',
    readingTime INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
  CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date);
  CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
`);

exports.db = db;

exports.getArticles = function() {
  const rows = db.prepare('SELECT * FROM articles ORDER BY date DESC').all();
  return rows.map(row => ({
    ...row,
    categories: JSON.parse(row.categories || '[]')
  }));
};

exports.getArticleBySlug = function(slug) {
  const row = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
  if (!row) return undefined;
  return {
    ...row,
    categories: JSON.parse(row.categories || '[]')
  };
};

exports.getRelatedArticles = function(currentSlug, categories, limit = 3) {
  const placeholders = categories.map(() => '?').join(',');
  // Note: This simplified version doesn't filter by category in SQL due to JSON array complexity
  // It just returns recent articles
  const rows = db.prepare('SELECT * FROM articles WHERE slug != ? ORDER BY date DESC LIMIT ?').all(currentSlug, limit);
  return rows.map(row => ({
    ...row,
    categories: JSON.parse(row.categories || '[]')
  }));
};

exports.getAllCategories = function() {
  const rows = db.prepare('SELECT categories FROM articles').all();
  const categorySet = new Set();
  for (const row of rows) {
    const cats = JSON.parse(row.categories || '[]');
    cats.forEach((cat) => categorySet.add(cat));
  }
  return Array.from(categorySet).sort();
};

exports.addContactMessage = function(name, email, message) {
  db.prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)').run(name, email, message);
};

const _isNewsletterSubscriber = function(email) {
  const row = db.prepare('SELECT 1 FROM newsletter_subscribers WHERE email = ?').get(email);
  return !!row;
};

exports.isNewsletterSubscriber = _isNewsletterSubscriber;

exports.addNewsletterSubscriber = function(email) {
  if (!_isNewsletterSubscriber(email)) {
    db.prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)').run(email);
  }
};
