// Unsplash image mapping for article categories - ALL SAUDI-THEMED
// All images are free to use (Unsplash license)
// Focus: Saudi Arabia landmarks, cities, desert, architecture, flags, culture

const categoryImages = {
  'SaaS': [
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80', // Riyadh skyline
    'https://images.unsplash.com/photo-1587729927502-65a1652c9f73?auto=format&fit=crop&w=1200&q=80', // Al Khobar
    'https://images.unsplash.com/photo-1624487391175-414642576379?auto=format&fit=crop&w=1200&q=80', // Mecca tower
  ],
  'Startup': [
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80', // Flag colors
    'https://images.unsplash.com/photo-1559056199-764a73a7edf3?auto=format&fit=crop&w=1200&q=80', // NEOM
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80', // Red Sea
  ],
  'التسويق': [
    'https://images.unsplash.com/photo-1565618546592-4f07c730f583?auto=format&fit=crop&w=1200&q=80', // Empty Quarter
    'https://images.unsplash.com/photo-1559568451-8f9bdd736990?auto=format&fit=crop&w=1200&q=80', // Jeddah corniche
    'https://images.unsplash.com/photo-1591629097927-d982587f0249?auto=format&fit=crop&w=1200&q=80', // Diriyah
  ],
  'التقنية': [
    'https://images.unsplash.com/photo-1579606032821-5bc2d16471e9?auto=format&fit=crop&w=1200&q=80', // Modern architecture
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Tech hub
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', // Futuristic
  ],
  'الأعمال': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Business meeting
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80', // Office space
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', // Collaboration
  ],
  'Fintech': [
    'https://images.unsplash.com/photo-1559568451-8f9bdd736990?auto=format&fit=crop&w=1200&q=80', // Jeddah financial district
    'https://images.unsplash.com/photo-1587729927502-65a1652c9f73?auto=format&fit=crop&w=1200&q=80', // Al Khobar
    'https://images.unsplash.com/photo-1624487391175-414642576379?auto=format&fit=crop&w=1200&q=80', // Mecca modern
  ],
  'ZATCA': [
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80', // Saudi flag colors
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80', // Government building
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80', // Official
  ],
  'الفوترة الإلكترونية': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556756270-dcb5cb9834fb?auto=format&fit=crop&w=1200&q=80',
  ],
  'ريادة الأعمال': [
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559056199-764a73a7edf3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1591629097927-d982587f0249?auto=format&fit=crop&w=1200&q=80',
  ],
  'التجارة الإلكترونية': [
    'https://images.unsplash.com/photo-1559568451-8f9bdd736990?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  ],
  'التقنية': [
    'https://images.unsplash.com/photo-1579606032821-5bc2d16471e9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  ],
  'default': [
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80', // Riyadh skyline
    'https://images.unsplash.com/photo-1565618546592-4f07c730f583?auto=format&fit=crop&w=1200&q=80', // Desert
    'https://images.unsplash.com/photo-1559568451-8f9bdd736990?auto=format&fit=crop&w=1200&q=80', // Jeddah
  ]
};

const fallbackImage = 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80'; // Riyadh skyline

const usedImages = new Set();

function getArticleImage(categories, slug) {
  for (const category of categories) {
    const images = categoryImages[category] || categoryImages[category.replace(/\s/g, '')] || categoryImages[category.replace(/[_-]/g, '')];
    if (images && images.length > 0) {
      for (const image of images) {
        if (!usedImages.has(image)) {
          usedImages.add(image);
          return image;
        }
      }
    }
  }

  // Try default category
  const defaultImages = categoryImages['default'];
  for (const image of defaultImages) {
    if (!usedImages.has(image)) {
      usedImages.add(image);
      return image;
    }
  }

  return fallbackImage;
}

function resetImageTracker() {
  usedImages.clear();
}

module.exports = {
  getArticleImage,
  resetImageTracker,
};
