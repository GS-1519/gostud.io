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
  transpilePackages: ['react-tabs'],
  async redirects() {
    return [
      // Redirect from old headshot-types to new headshot-packs
      {
        source: '/headshot-types/:slug',
        destination: '/headshot-packs/:slug',
        permanent: true,
      },
      // Redirect from old photos to new photoshoot-packs
      {
        source: '/photos/:slug',
        destination: '/photoshoot-packs/:slug',
        permanent: true,
      },
      // Redirect old root paths
      {
        source: '/headshot-types',
        destination: '/headshot-packs',
        permanent: true,
      },
      {
        source: '/photos',
        destination: '/photoshoot-packs',
        permanent: true,
      },
      // Handle any old URLs that might be indexed
      {
        source: '/headshots/:slug',
        destination: '/headshot-packs/:slug',
        permanent: true,
      },
      {
        source: '/photoshoot/:slug',
        destination: '/photoshoot-packs/:slug',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig