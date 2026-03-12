/**
 * SaudiSaaSHub - Starfield Web Worker
 * Offloads star animation to background thread to reduce main thread load
 */

self.onmessage = function(e) {
  const { width, height, starCount = 150 } = e.data;

  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      alpha: Math.random()
    });
  }

  self.postMessage({ stars });

  // Handle resize messages
  self.onmessage = function(e) {
    if (e.data.type === 'resize') {
      const { width: newWidth, height: newHeight } = e.data;
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * newWidth,
          y: Math.random() * newHeight,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          alpha: Math.random()
        });
      }
      self.postMessage({ stars: newStars });
    }
  };
};
