/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gostudio.ai', 'www.gostudio.ai'],
    unoptimized: true,
  },
  // Ensure static files are handled correctly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/i,
      type: 'asset/resource'
    })
    return config
  },
  transpilePackages: ['react-tabs']
}

module.exports = nextConfig