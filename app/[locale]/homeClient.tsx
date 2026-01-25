"use client";

import Image from "next/image";
import { LanguageSwitch } from "@/app/components/LanguageSwitch";
import { ContactForm } from "@/app/components/ContactForm";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { useEffect, useState } from "react";

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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel a cada 4 segundos
  useEffect(() => {
    const images = t.hero?.images || [];
    if (images.length <= 1) return; // Não roda se tiver só 1 imagem

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [t.hero?.images]);

  const openVideo = (videoId: string) => {
    if (!videoId || videoId.trim() === '') return;
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

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
      className={[
        "w-full max-w-xs md:max-w-sm px-8 bg-black rounded-[10px] shadow-md flex items-center justify-center gap-2.5 mt-2 mx-auto lg:mx-0 hover:bg-orange-600 transition-colors",
        "h-12",
        locale === "pt" ? "h-18 md:h-12" : "",
      ].join(" ")}
    >
      <span className="text-white text-xl font-medium font-satoshi">
        {t.letsChat}
      </span>
    </a>
  </div>

  {/* Carousel de Imagens */}
<div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md mt-6 lg:mt-0">
<div className="relative overflow-hidden rounded-[5px] shadow-lg w-64 h-80 md:w-80 md:h-96 lg:w-120 lg:h-140 mx-auto">
    {t.hero?.images?.map((image: any, index: number) => (
      <Image
        key={index}
        alt={image.alt}
        src={image.src}
        height={551}
        width={327}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
        }`}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
    ))}
  </div>

  {/* Indicadores (dots) */}
  {t.hero?.images && t.hero.images.length > 1 && (
    <div className="flex justify-center gap-2 mt-4">
      {t.hero.images.map((_: any, index: number) => (
        <button
          key={index}
          onClick={() => setCurrentImageIndex(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            index === currentImageIndex
              ? 'bg-orange-600 w-8'
              : 'bg-black/20 hover:bg-black/40'
          }`}
          aria-label={`Ir para imagem ${index + 1}`}
        />
      ))}
    </div>
  )}
</div>
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

        {/* 🎯 NOVA SEÇÃO: Projetos Reais */}
        <section className="mt-16 px-4 md:px-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
            {t.sections.realProjects}
          </h2>
          
          {t.realProjects?.subtitle && (
            <p className="text-black/70 text-lg mb-8 text-center md:text-left">
              {t.realProjects.subtitle}
            </p>
          )}

          <div className="space-y-8">
            {t.realProjects?.projects?.map((project: any) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-orange-100"
              >
                {/* Header do Projeto */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black font-satoshi mb-2">
                      {project.title}
                    </h3>
                    <p className="text-orange-600 font-medium text-lg mb-3">
                      {project.company}
                    </p>
                    <p className="text-black/80 text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-orange-600 transition-colors font-medium whitespace-nowrap self-start"
                  >
                    {t.realProjects.viewProject}
                    <span>→</span>
                  </a>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-black font-satoshi mb-3">
                      {locale === "pt" ? "Destaques:" : "Highlights:"}
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight: string, index: number) => (
                        <li
                          key={index}
                          className="text-black/70 text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Results */}
                {project.results && (
                  <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-base font-bold text-black font-satoshi mb-2">
                      📈 {locale === "pt" ? "Resultados:" : "Results:"}
                    </h4>
                    <p className="text-black/80 text-sm leading-relaxed">
                      {project.results}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-black/60 font-satoshi mb-3 uppercase tracking-wide">
                      {locale === "pt" ? "Tecnologias:" : "Tech Stack:"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

{/* 🎯 NOVA SEÇÃO: Youtube */}
<section className="mt-16 px-4 md:px-12">
  <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
    {t.sections.youtube}
  </h2>
  
  <div className="bg-white rounded-lg shadow-lg p-8 border border-orange-100 mb-8">
    <div className="flex items-center gap-4 mb-4">
      <img
        src="/youtube-black.svg"
        alt="YouTube"
        className="w-12 h-12"
      />
      <div>
        <h3 className="text-xl font-bold text-black font-satoshi">
          {t.youtube?.channelName || "@atirson-dev"}
        </h3>
        <a
          href="https://www.youtube.com/@atirson-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline"
        >
          {t.youtube?.visitChannel || (locale === "pt" ? "Visitar Canal" : "Visit Channel")}
        </a>
      </div>
    </div>
    <p className="text-black/70 text-base leading-relaxed">
      {t.youtube?.channelDescription || (locale === "pt"
        ? "Confira meus vídeos sobre desenvolvimento web, tutoriais e dicas de programação."
        : "Check out my videos about web development, tutorials, and programming tips.")}
    </p>
  </div>

  {/* Playlist de Vídeos */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    {t.youtube?.videos?.map((video: any) => (
      <div
        key={video.id}
        className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 cursor-pointer"
        onClick={() => openVideo(video.id)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info do Vídeo */}
        <div className="p-4">
          <h4 className="text-lg font-bold text-black font-satoshi mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
            {video.title}
          </h4>
          {video.description && (
            <p className="text-black/70 text-sm line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

{/* Modal de Vídeo */}
{selectedVideo && (
  <div
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    onClick={closeVideo}
  >
    <div
      className="relative w-full max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botão Fechar */}
      <button
        onClick={closeVideo}
        className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors text-sm font-bold flex items-center gap-2"
      >
        <span>{t.youtube?.closeVideo || 'Fechar'}</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Container do Vídeo */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {selectedVideo && (
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  </div>
)}

       {/* 🎯 NOVA SEÇÃO: Artigos Publicados */}
<section className="mt-16 px-4 md:px-12">
  <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
    {t.sections.publishedArticles}
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {t.articles?.list?.map((article: any, index: number) => (
      <a
        key={index}
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white rounded-lg shadow-lg p-6 border border-orange-100 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
              article.platform === 'LinkedIn' 
                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                : 'bg-gray-50 text-gray-600 border border-gray-100'
            }`}>
              {article.platform}
            </span>
            <svg 
              className="w-5 h-5 text-black/20 group-hover:text-orange-600 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-black font-satoshi mb-3 group-hover:text-orange-600 transition-colors leading-tight">
            {article.title}
          </h3>
          
          <p className="text-black/70 text-sm mb-6 line-clamp-3">
            {article.description}
          </p>
        </div>

        <span className="text-orange-600 text-sm font-bold flex items-center gap-2">
          {t.articles.readMore}
        </span>
      </a>
    ))}
  </div>
</section>

       {/* 🎯 NOVA SEÇÃO: Setup de Trabalho */}
<section className="mt-16 px-4 md:px-12">
  <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-orange-100">
    <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-4 text-center md:text-left">
      {t.sections.workSetup}
    </h2>
    
    {t.workSetup?.subtitle && (
      <p className="text-black/70 text-lg mb-10 text-center md:text-left">
        {t.workSetup.subtitle}
      </p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      {Object.entries(
        t.workSetup?.items?.reduce((acc: any, item: any) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {}) || {}
      ).map(([category, items]: [string, any]) => (
        <div key={category} className="flex flex-col">
          <h3 className="text-xl font-bold text-black font-satoshi mb-6 pb-2 border-b border-orange-100">
            {t.workSetup.categories?.[category as keyof typeof t.workSetup.categories] ?? category}
          </h3>
          
          <ul className="space-y-5">
            {items.map((item: any, index: number) => (
              <li key={index} className="flex items-start gap-4 group">
                <span className="text-2xl bg-orange-50 w-12 h-12 flex items-center justify-center rounded-xl border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-black text-base leading-tight group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-black/60 text-sm mt-1">
                    {item.specs}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
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