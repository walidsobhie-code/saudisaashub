// Re-export database functions for backward compatibility
const { getArticles, getArticleBySlug, getRelatedArticles, getAllCategories } = require('./database.js');

module.exports = {
  getArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAllCategories,
  // Keep Article type for compatibility (no-op in JS)
  Article: Object
};