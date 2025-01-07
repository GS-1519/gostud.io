/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    NEXT_PUBLIC_PADDLE_ENV: process.env.NEXT_PUBLIC_PADDLE_ENV
  },
  
  // Image configuration
  images: {
    domains: ['res.cloudinary.com', 'gostudio.ai', 'www.gostudio.ai', 'localhost'],
    unoptimized: true,
  },
  
  // API configurations
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
  
  // Webpack configuration with WebAssembly support
  webpack: (config, { isServer }) => {
    // Original image rules
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/i,
      type: 'asset/resource'
    });

    // WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Add rules for WASM and binary files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // Node.js polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Fix for WASM loading
    if (!isServer) {
      config.output = {
        ...config.output,
        webassemblyModuleFilename: 'static/wasm/[modulehash].wasm',
      };
    }

    return config;
  },
  
  // Package transpilation
  transpilePackages: ['react-tabs'],
  
  // Required for @huggingface/transformers
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["@huggingface/transformers"],
    webassembly: true,
  },
  
  // Redirects configuration
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