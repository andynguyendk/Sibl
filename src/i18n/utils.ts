import type { Lang } from '../i18n/translations';
import { translations } from '../i18n/translations';
import type { Translations } from '../i18n/translations';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return 'vi';
}

export function useTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}
