/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      'fs/promises': false,
      os: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;
