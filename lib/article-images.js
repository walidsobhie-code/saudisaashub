// Unsplash image mapping for article categories
// All images are free to use (Unsplash license)
// Source: https://unsplash.com/photos (free for commercial use, no attribution required)

const categoryImages = {
  'SaaS': [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  ],
  'Startup': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  ],
  'التسويق': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80',
  ],
  'التقنية': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  ],
  'الأعمال': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  ],
  'ZATCA': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e7d?auto=format&fit=crop&w=1200&q=80',
  ],
  'الفوترة الإلكترونية': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556756270-dcb5cb9834fb?auto=format&fit=crop&w=1200&q=80',
  ],
};

const fallbackImage = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80';

const usedImages = new Set();

function getArticleImage(categories, slug) {
  for (const category of categories) {
    const images = categoryImages[category];
    if (images && images.length > 0) {
      for (const image of images) {
        if (!usedImages.has(image)) {
          usedImages.add(image);
          return image;
        }
      }
    }
  }

  const allImages = Object.values(categoryImages).flat();
  for (const image of allImages) {
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
