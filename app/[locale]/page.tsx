import Head from "next/head";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import {
  useGetPersonalInfo,
  useGetProjects,
  useGetSkills,
} from "@/app/services/usePortfolioDetails";
import HomeClient from "./homeClient";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

const translations = { pt, en };

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "pt" | "en" }>;
}) {
  const { locale } = await params;
  const t = translations[locale];
  if (!t?.about) throw new Error("Translation for 'about' not found");

  const startYear = 2019;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;
  const aboutText = t.about.replace("{years}", experienceYears.toString());

  const [projects, skills, personalInfo] = await Promise.all([
    useGetProjects(),
    useGetSkills(),
    useGetPersonalInfo(),
  ]);

  const resumeUrl =
    locale === "pt" ? personalInfo?.resumePt?.url : personalInfo?.resume?.url;

  const siteUrl = "https://atirson.com";
  const pageUrl = `${siteUrl}/${locale}`;
  const pageTitle =
    locale === "pt"
      ? "Atirson Fabiano — Desenvolvedor Front-End e Engenheiro de Software"
      : "Atirson Fabiano — Front-End Developer & Software Engineer";
  const pageDescription =
    locale === "pt"
      ? "Portfólio de Atirson Fabiano, desenvolvedor front-end especializado em React, Next.js e tecnologias modernas. Explore meus projetos e entre em contato."
      : "Portfolio of Atirson Fabiano, front-end developer specializing in React, Next.js, and modern web technologies. Explore my projects and get in touch.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="author" content="Atirson Fabiano" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Atirson Fabiano, Front-End, React, Next.js, TypeScript, JavaScript, Portfolio, Desenvolvedor Web, UI, UX, Engenheiro de Software"
        />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" href={`${siteUrl}/pt`} hrefLang="pt" />
        <link rel="alternate" href={`${siteUrl}/en`} hrefLang="en" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta
          property="og:locale"
          content={locale === "pt" ? "pt_BR" : "en_US"}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Atirson Fabiano" />
        <meta property="og:image" content={`${siteUrl}/preview.jpg`} />
        <meta
          property="og:image:alt"
          content="Atirson Fabiano — Front-End Developer Portfolio"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteUrl}/preview.jpg`} />
        <meta name="twitter:creator" content="@atirson_dev" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atirson Fabiano",
              jobTitle: "Front-End Developer",
              url: siteUrl,
              sameAs: [
                "https://github.com/atirson",
                "https://linkedin.com/in/atirson-fabiano",
                "https://x.com/atirson_dev",
                "https://www.youtube.com/@atirson-dev",
              ],
              image: `${siteUrl}/atirson.jpg`,
              worksFor: {
                "@type": "Organization",
                name: "Freelancer / Independent Developer",
              },
              description: pageDescription,
            }),
          }}
        />
      </Head>

      {/* Passa todos os dados para o Client Component */}
      <HomeClient
        locale={locale}
        t={t}
        aboutText={aboutText}
        resumeUrl={resumeUrl}
        projects={projects}
        skills={skills}
        pageTitle={pageTitle}
      />
    </>
  );
}