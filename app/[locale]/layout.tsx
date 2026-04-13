import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { Providers } from '@/components/layouts/Providers';
import { Toaster } from '@/components/ui/sonner';
import '../globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: false,
    fallback: ['system-ui', 'arial']
});

const syne = Syne({
    subsets: ['latin'],
    variable: '--font-syne',
    display: 'swap',
    preload: false,
    fallback: ['sans-serif']
});

export const metadata: Metadata = {
    title: 'AIR DIASS | Premium Services',
    description: 'Premium airport & automotive services platform for West Africa.',
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            <body className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <Navbar />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                        <Toaster position="top-right" />
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
