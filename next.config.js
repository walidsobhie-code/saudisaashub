/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export for any hosting
  images: {
    domains: [],
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
