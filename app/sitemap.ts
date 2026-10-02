import type { MetadataRoute } from "next";
import { LOCALES } from "@/app/lib/locale";
import { SITE_URL } from "@/app/lib/site";

const languages = {
  "pt-BR": `${SITE_URL}/pt`,
  "en-US": `${SITE_URL}/en`,
};

// "/" only redirects to a locale, so it is left out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
