// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().replace(/\/+$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "en-US": `${base}/en`,
          "pt-BR": `${base}/pt`,
        },
      },
    },
    {
      url: `${base}/pt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "en-US": `${base}/en`,
          "pt-BR": `${base}/pt`,
        },
      },
    },
  ];
}