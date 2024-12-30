/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'gostudio.ai', 'www.gostudio.ai'],
    unoptimized: true,
  },
  // Add this to handle larger payloads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
  // Ensure static files are handled correctly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/i,
      type: 'asset/resource'
    })
    return config
  },
  transpilePackages: ['react-tabs'],
  async redirects() {
    return [
      // Redirect from non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'gostudio.ai',
          },
        ],
        destination: 'https://www.gostudio.ai/:path*',
        permanent: true,
      },
      // Redirect from http to https
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.gostudio.ai/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig