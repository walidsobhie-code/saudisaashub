/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Use if not using Vercel image optimization
  },
};

module.exports = nextConfig;
