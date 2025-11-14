import { serverConfig } from '@/lib/config';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/de-DE.json',
  },
});

const config: NextConfig = {
  assetPrefix:
    serverConfig.app.vercelEnv === 'production'
      ? `${process.env.VERCEL_DOMAIN}/`
      : undefined,

  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'coin-images.coingecko.com',
    //     port: '',
    //     pathname: '/coins/**',
    //   },
    // ],
  },
  skipTrailingSlashRedirect: true,
  trailingSlash: true,
  rewrites: async () => {
    if (
      serverConfig.app.env === 'local' ||
      serverConfig.app.env === 'development'
    ) {
      return [
        {
          source: '/api/:path*',
          destination: `https://api.crypto-insiders.datalumina.solutions/:path*`,
        },
      ];
    } else {
      return [];
    }
  },
};

export default withNextIntl(config);
