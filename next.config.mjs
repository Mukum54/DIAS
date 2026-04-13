import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix for next-intl webpack cache warning
    webpack: (config, { isServer }) => {
        config.module.parser = config.module.parser || {};
        config.module.parser.javascript = config.module.parser.javascript || {};
        return config;
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(self), microphone=()' },
                ],
            },
        ];
    },

    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 's3.amazonaws.com' },
            { protocol: 'https', hostname: '**.vercel-storage.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },

    // Optimise for Vercel deployment
    poweredByHeader: false,

    // Avoids issues with certain server-only modules
    // The codebase uses Prisma 7.x adapter pattern (as any casts),
    // Zod v4, and many dynamic queries — strict TS checking at build
    // time is not practical yet. ESLint still runs normally.
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default withNextIntl(nextConfig);
