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
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, { isServer, dev }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'onnxruntime-web': require.resolve('onnxruntime-web'),
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'onnxruntime-web': false,
      fs: false,
      'fs/promises': false,
      os: false,
      path: false,
    };
    if (!dev) {
      config.cache = true;
    }
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'fs/promises': false,
        path: false,
        crypto: false,
      };
    }

    config.externals = [...(config.externals || []), { canvas: "canvas" }];

    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
