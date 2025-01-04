/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'gostudio.ai', 'www.gostudio.ai'],
    unoptimized: true,
  },
  // Remove the standalone api config and add it to serverRuntimeConfig
  serverRuntimeConfig: {
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
      {
        source: '/photos/red-carpet-photos',
        destination: '/photoshoot-packs/actor-red-carpet-photos',
        permanent: true
      },
      {
        source: '/photos/helmut-newton-photos',
        destination: '/headshot-packs/model-headshots',
        permanent: true
      },
      {
        source: '/photoshoot-packs/model-headshots',
        destination: '/headshot-packs/model-headshots',
        permanent: true
      },
      {
        source: '/photos/realtor-photos',
        destination: '/headshot-packs/realtor-headshot',
        permanent: true
      },
      {
        source: '/headshot-types',
        destination: '/headshot-packs',
        permanent: true
      },
      {
        source: '/photos/birthday-party-save-the-date-photoshoot',
        destination: '/photoshoot-packs/birthday-party-save-the-date-photoshoot',
        permanent: true
      },
      {
        source: '/photos/artistic-portraits',
        destination: '/photoshoot-packs/artistic-portraits',
        permanent: true
      },
      {
        source: '/photoshoot-packs/pop-color-photos',
        destination: '/photoshoot-packs/pop-color-photos',
        permanent: true
      },
      {
        source: '/photos/:slug',
        destination: '/photoshoot-packs/:slug',
        permanent: true
      },
      {
        source: '/headshot-types/:slug',
        destination: '/headshot-packs/:slug',
        permanent: true
      },
      {
        source: '/photoshoot/:slug',
        destination: '/photoshoot-packs/:slug',
        permanent: true
      },
      {
        source: '/headshot-packs/model-headshots',
        destination: '/photoshoot-packs/model-headshots',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig