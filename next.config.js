/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a fallback for the 'fs' module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Handle the webgpu module
    config.resolve.alias = {
      ...config.resolve.alias,
      './webgpu': false,
    };

    return config;
  },
};

module.exports = nextConfig;
