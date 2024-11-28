/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  staticPageGenerationTimeout: 3000,
  images: {
    domains: [
      'x3rkl8tapynlmqus.public.blob.vercel-storage.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools/:path*',
        destination: '/free-tools/background-library/:path*',
        permanent: true,
      },
      {
        source: '/free-tools/:color-background',
        destination: '/free-tools/background-library/:color-background',
        permanent: true,
      }
    ]
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'onnxruntime-web': require.resolve('onnxruntime-web'),
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'onnxruntime-web': false,
    };
    return config;
  },
}

module.exports = nextConfig
