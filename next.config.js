/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  output: 'export',
  trailingSlash: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // SEO: Generate ETags for caching
  generateEtags: true,
  // Improve Core Web Vitals
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
