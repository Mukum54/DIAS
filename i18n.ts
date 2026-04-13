import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './i18n-config';

export default getRequestConfig(async ({ requestLocale }) => {
    // next-intl v4: locale is a Promise resolving to the current locale
    const locale = await requestLocale;

    if (!locale || !locales.includes(locale as Locale)) notFound();

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
