"use client";

import Image from "next/image";
import { LanguageSwitch } from "@/app/components/LanguageSwitch";
import { ContactForm } from "@/app/components/ContactForm";
import { useAnalytics } from "@/app/hooks/useAnalytics";

type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  language: string;
  languageColor: string;
  githubUrl: string;
  stars: number;
  forks: number;
  featured: boolean;
  tags: string[];
};

type Skill = {
  id: string;
  src: string;
  href: string;
};

type HomeClientProps = {
  locale: "pt" | "en";
  t: any;
  aboutText: string;
  resumeUrl?: string;
  projects: Project[];
  skills: Skill[];
  pageTitle: string;
};

export default function HomeClient({
  locale,
  t,
  aboutText,
  resumeUrl,
  projects,
  skills,
  pageTitle,
}: HomeClientProps) {
  // 🔥 Ativa o rastreamento de Analytics
  useAnalytics();

  return (
    <div className="bg-orange-50 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-6 md:px-12">
          <h1 className="sr-only">{pageTitle}</h1>
          <div className="flex flex-col gap-1 w-10 h-10 justify-center md:hidden">
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
          </div>

          <div className="hidden md:block" />

          <div className="flex items-center gap-4">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-xl font-medium font-satoshi text-center hover:text-orange-600 transition-colors cursor-pointer"
              >
                {t.resume}
              </a>
            )}
            <LanguageSwitch locale={locale as string} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 md:px-12 mt-8">
          <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
            <div className="text-black text-2xl font-medium font-satoshi">
              {t.hi}
            </div>
            <h2 className="flex flex-row items-baseline justify-center lg:justify-start space-x-2">
              <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                {t.role1}
              </span>
              <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                {t.role2}
              </span>
            </h2>
            <p className="text-black/90 text-base font-medium font-satoshi leading-8 max-w-md mx-auto lg:mx-0 whitespace-pre-line">
              {aboutText}
            </p>
            <a
              href="https://www.linkedin.com/in/atirson-fabiano/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs md:max-w-sm h-12 px-8 bg-black rounded-[10px] shadow-md flex items-center justify-center gap-2.5 mt-2 mx-auto lg:mx-0 hover:bg-orange-600 transition-colors"
            >
              <span className="text-white text-xl font-medium font-satoshi">
                {t.letsChat}
              </span>
            </a>
          </div>

          <Image
            alt="Foto de Atirson Fabiano — Desenvolvedor Front-End"
            src={`/atirson.jpg`}
            height={551}
            width={327}
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-[5px] shadow-lg mt-6 lg:mt-0"
            loading="lazy"
          />
        </section>

        {/* Skills Section */}
        <section className="mt-16 px-4 md:px-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
            {t.mySkills}
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {skills.map((skill) => (
              <a
                key={skill.id}
                href={skill.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-3 border border-orange-100 hover:border-orange-300 hover:scale-110"
              >
                <img
                  src={skill.src}
                  alt={`Skill: ${skill.id || "Tecnologia"}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50">
                  Ver mais
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mt-16 px-4 md:px-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
            {t.featuredProjects}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length === 0 ? (
              <p className="text-black/70 text-center w-full col-span-2">
                {locale === "pt"
                  ? "Nenhum projeto encontrado."
                  : "No projects found."}
              </p>
            ) : (
              projects.map((project) => (
                <a
                  key={project.id}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-orange-100 flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-black font-satoshi group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </h3>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: `${project.languageColor}20`,
                        color: project.languageColor,
                      }}
                    >
                      {project.language}
                    </span>
                  </div>

                  <p className="text-black/70 text-sm mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-black/60 pt-3 border-t border-orange-100">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        ⭐ {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        🍴 {project.forks}
                      </span>
                    </div>
                    <span className="text-xs text-orange-600 font-medium group-hover:underline">
                      Ver no GitHub →
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-20 px-4 md:px-12 flex flex-col items-center">
          <h3 className="text-black text-3xl md:text-4xl font-medium font-satoshi leading-8 mb-6 text-center">
            {t.letsWork}
          </h3>

          <ContactForm t={t} />

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 text-base font-medium font-satoshi leading-8 underline hover:text-orange-600 transition-colors"
            >
              {t.downloadResume}
            </a>
          )}
        </section>

        {/* Social Icons */}
        <footer className="mt-16 px-4 md:px-12 pb-10 flex justify-center">
          <div className="flex gap-6">
            {[
              {
                href: "https://www.youtube.com/@atirson-dev",
                src: "/youtube-black.svg",
                alt: "YouTube",
              },
              {
                href: "https://www.linkedin.com/in/atirson-fabiano/",
                src: "/linkedin-black.svg",
                alt: "LinkedIn",
              },
              {
                href: "https://x.com/atirson_dev",
                src: "/x.svg",
                alt: "Twitter",
              },
              {
                href: "https://github.com/atirson",
                src: "/github.svg",
                alt: "GitHub",
              },
            ].map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-13 h-13 flex items-center justify-center rounded-full border-2 border-black hover:border-orange-400 transition-colors"
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-7 h-7 object-contain"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}