import type { Metadata } from "next";
import { description, labels, route, site, t, type Locale, type Page } from "./site";
export function metadataFor(lang: Locale, page?: Page): Metadata {
  const title = page ? `${t(lang, labels[page])} | ${site.name}` : site.name;
  const summary = t(lang, description);
  const path = (language: Locale) => site.basePath + route(language, page);
  return {
    title,
    description: summary,
    ...(site.origin && { metadataBase: new URL(site.origin) }),
    alternates: { canonical: path(lang), languages: { "zh-TW": path("zh-TW"), en: path("en"), "x-default": path("zh-TW") } },
    openGraph: {
      title, description: summary, siteName: site.name, type: "website",
      locale: lang === "en" ? "en_US" : "zh_TW", alternateLocale: [lang === "en" ? "zh_TW" : "en_US"],
      ...(site.origin && { url: path(lang), images: [{ url: site.basePath + "/social.png", width: 1200, height: 630, alt: site.name }] }),
    },
    twitter: { card: "summary_large_image", title, description: summary, ...(site.origin && { images: [site.basePath + "/social.png"] }) },
  };
}
