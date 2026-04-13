import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales } from './i18n-config';

const publicPages = ['/', '/services', '/suivi', '/auth/login', '/auth/register', '/auth/verify'];

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'fr',
    localePrefix: 'as-needed'
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;
                const role = token?.role as string | undefined;

                if (!token) return false;

                if (path.includes('/admin') && role !== 'ADMIN') return false;
                if (path.includes('/agent') && role !== 'AGENT' && role !== 'ADMIN') return false;
                if (path.includes('/garage') && role !== 'TECHNICIEN' && role !== 'ADMIN') return false;

                return true;
            }
        },
        pages: {
            signIn: '/auth/login'
        }
    }
);

export default function middleware(req: NextRequest) {
    // Strip locale prefix to check against public pages
    const pathname = req.nextUrl.pathname;
    const pathnameWithoutLocale = locales.reduce(
        (acc, locale) => acc.replace(new RegExp(`^/${locale}`), '') || '/',
        pathname
    );

    const isPublicPage = publicPages.some(page =>
        pathnameWithoutLocale === page ||
        pathnameWithoutLocale.startsWith(`${page}/`)
    );

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
