import { getExperienceYears } from "@/app/lib/experience";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/app/lib/site";
import {
  getPersonalInfo,
  getProjects,
  getSkills,
} from "@/app/services/usePortfolioDetails";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
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

  const aboutText = t.about.replace("{years}", String(getExperienceYears()));

  const [projects, skills, personalInfo] = await Promise.all([
    getProjects(),
    getSkills(),
    getPersonalInfo(),
  ]);

  const resumeUrl =
    locale === "pt" ? personalInfo?.resumePt?.url : personalInfo?.resume?.url;

  // Page <title>/description/OG come from generateMetadata in layout.tsx.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atirson Fabiano",
    jobTitle: "Senior Software Engineer",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/atirson.jpg`,
    sameAs: [GITHUB_URL, LINKEDIN_URL, X_URL, YOUTUBE_URL],
    worksFor: { "@type": "Organization", name: "GFT Technologies" },
    knowsAbout: t.skillsSection.groups.flatMap((group) => group.items),
    knowsLanguage: ["pt-BR", "en"],
    description: aboutText.split("\n")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from local data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeClient
        locale={locale}
        t={t}
        aboutText={aboutText}
        resumeUrl={resumeUrl}
        projects={projects}
        skills={skills}
      />
    </>
  );
}
