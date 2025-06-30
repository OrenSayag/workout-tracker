//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // transpilePackages: ['@workout-tracker/ui'],
  output: 'standalone',
  // // Solution for pino worker thread error when using nextjs.
  // webpack(config) {
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,

  //     fs: false,
  //   };

  //   // NOTE: Must use this instead of serverExternalPackages | serverComponentsExternalPackages
  //   // because node:crypto for some reason only works below.
  //   // Also, when the below is defined, it overrides the serverExternalPackages,
  //   // so pino and pino-pretty must be included here.
  //   config.externals.push({
  //     'node:fs': 'commonjs fs',
  //     'node:crypto': 'commonjs crypto',
  //     argon2: 'argon2',
  //     pino: 'pino',
  //     'thread-stream': 'thread-stream',
  //     'pino-worker': 'pino-worker',
  //     'pino-file': 'pino-file',
  //     'pino-pretty': 'pino-pretty',
  //     pg: 'pg',
  //     'pg-native': 'pg-native',
  //   });
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
