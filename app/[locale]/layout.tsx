import { ReactNode } from "react";
import Script from "next/script";
import "@/app/globals.css";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const isPortuguese = locale === "pt";

  // ✅ Versão atualizada dos metadados multilíngues
  const meta = {
    pt: {
      title: "Atirson Fabiano | Especialista Front-End e Engenheiro de Software",
      description:
        "Portfólio profissional de Atirson Fabiano — especialista em desenvolvimento front-end com sólidos conhecimentos em back-end usando Node.js e PHP. Experiência em React, Next.js e criação de aplicações modernas de alta performance.",
      keywords: [
        "Atirson Fabiano",
        "Especialista Front-End",
        "Desenvolvedor Full Stack",
        "React",
        "Next.js",
        "Node.js",
        "PHP",
        "JavaScript",
        "TypeScript",
        "Portfolio",
      ],
      locale: "pt_BR",
      canonical: "https://atirson.com/pt",
      ogTitle:
        "Atirson Fabiano | Especialista Front-End com experiência em Back-End (Node.js e PHP)",
      ogDescription:
        "Descubra o portfólio de Atirson Fabiano — especialista em front-end com conhecimentos em back-end, apaixonado por criar interfaces performáticas e escaláveis utilizando React e Next.js.",
    },
    en: {
      title: "Atirson Fabiano | Front-End Specialist & Software Developer",
      description:
        "Professional portfolio of Atirson Fabiano — front-end specialist with strong back-end knowledge in Node.js and PHP. Experienced in React, Next.js, and building high-performance modern applications.",
      keywords: [
        "Atirson Fabiano",
        "Front-End Specialist",
        "Full Stack Developer",
        "React",
        "Next.js",
        "Node.js",
        "PHP",
        "JavaScript",
        "TypeScript",
        "Portfolio",
      ],
      locale: "en_US",
      canonical: "https://atirson.com/en",
      ogTitle:
        "Atirson Fabiano | Front-End Specialist with Back-End Experience (Node.js & PHP)",
      ogDescription:
        "Explore Atirson Fabiano’s portfolio — front-end specialist with back-end experience using Node.js and PHP, focused on building scalable web applications with React and Next.js.",
    },
  };

  const data = isPortuguese ? meta.pt : meta.en;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    authors: [
      {
        name: "Atirson Fabiano",
        url: "https://www.linkedin.com/in/atirson-fabiano/",
      },
    ],
    creator: "Atirson Fabiano",
    publisher: "Atirson Fabiano",

    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: data.canonical,
      siteName: "Atirson Fabiano",
      locale: data.locale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Atirson Fabiano — Front-End Specialist & Software Developer",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      creator: "@atirson_dev",
      images: ["/og-image.png"],
    },

    icons: {
      icon: "/favicon.ico",
    },

    alternates: {
      canonical: data.canonical,
      languages: {
        "pt-BR": "https://atirson.com/pt",
        "en-US": "https://atirson.com/en",
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics 4 com rastreamento global */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-Z36DMC9GRF`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z36DMC9GRF', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}