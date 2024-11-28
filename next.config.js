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

    // Properly handle externals
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : []),
      {
        "onnxruntime-web/webgpu": "commonjs onnxruntime-web/webgpu"
      }
    ];

    return config;
  },
};

module.exports = nextConfig;
