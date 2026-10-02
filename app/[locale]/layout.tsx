import Script from "next/script";
import type { ReactNode } from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { GA_TRACKING_ID } from "@/app/lib/gtag";
import { LINKEDIN_URL, SITE_URL } from "@/app/lib/site";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

const keywords = [
  "Atirson Fabiano",
  "Senior React Engineer",
  "Senior Software Engineer",
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "Micro-frontends",
  "Design Systems",
  "AI-First Development",
  "Remote",
  "LATAM",
];

const meta = {
  pt: {
    title:
      "Atirson Fabiano | Engenheiro React Sênior — React Web & React Native",
    description:
      "Engenheiro de Software Sênior especializado em React Web e React Native, TypeScript e Next.js. Arquitetura front-end, micro-frontends, design systems, performance e desenvolvimento AI-First para produtos de alto tráfego. Remoto a partir do Brasil.",
    keywords,
    locale: "pt_BR",
  },
  en: {
    title: "Atirson Fabiano | Senior React Engineer — React Web & React Native",
    description:
      "Senior Software Engineer specializing in React Web and React Native, TypeScript and Next.js. Front-end architecture, micro-frontends, design systems, performance and AI-first development for high-traffic products. Remote from Brazil.",
    keywords,
    locale: "en_US",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const data = locale === "pt" ? meta.pt : meta.en;
  const canonical = `${SITE_URL}/${locale === "pt" ? "pt" : "en"}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    authors: [{ name: "Atirson Fabiano", url: LINKEDIN_URL }],
    creator: "Atirson Fabiano",
    publisher: "Atirson Fabiano",

    openGraph: {
      title: data.title,
      description: data.description,
      url: canonical,
      siteName: "Atirson Fabiano",
      locale: data.locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      creator: "@atirson_dev",
    },

    icons: {
      icon: "/favicon.ico",
    },

    alternates: {
      canonical,
      languages: {
        "pt-BR": `${SITE_URL}/pt`,
        "en-US": `${SITE_URL}/en`,
        "x-default": SITE_URL,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}
