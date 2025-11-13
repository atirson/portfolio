// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [`${base}/sitemap.xml`],
    host: base,
  };
}