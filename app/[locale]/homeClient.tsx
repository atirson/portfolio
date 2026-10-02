"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactForm } from "@/app/components/ContactForm";
import { LanguageSwitch } from "@/app/components/LanguageSwitch";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import { sendGAEvent } from "@/app/lib/gtag";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  PORTFOLIO_REPO_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/app/lib/site";
import type { Project, Skill } from "@/app/services/usePortfolioDetails";
import type en from "@/locales/en.json";

type Translations = typeof en;
type RealProject = Translations["realProjects"]["projects"][number];
type Video = Translations["youtube"]["videos"][number];
type Article = Translations["articles"]["list"][number];

type HomeClientProps = {
  locale: "pt" | "en";
  t: Translations;
  aboutText: string;
  resumeUrl?: string;
  projects: Project[];
  skills: Skill[];
};

const sectionTitle =
  "text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left";
const card = "bg-white rounded-lg shadow-lg border border-orange-100";
const pill =
  "text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 font-medium";

const socialLinks = [
  { href: YOUTUBE_URL, src: "/youtube-black.svg", alt: "YouTube" },
  { href: LINKEDIN_URL, src: "/linkedin-black.svg", alt: "LinkedIn" },
  { href: X_URL, src: "/x.svg", alt: "X" },
  { href: GITHUB_URL, src: "/github.svg", alt: "GitHub" },
];

export default function HomeClient({
  locale,
  t,
  aboutText,
  resumeUrl,
  projects,
  skills,
}: HomeClientProps) {
  // 🔥 Ativa o rastreamento de Analytics
  useAnalytics();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const imageIndexRef = useRef(0);

  const heroImages = t.hero.images;

  const navItems = [
    { id: "impact", label: t.nav.impact },
    { id: "experience", label: t.nav.experience },
    { id: "ai", label: t.nav.ai },
    { id: "skills", label: t.nav.skills },
    { id: "content", label: t.nav.content },
    { id: "contact", label: t.nav.contact },
  ];

  // Auto-rotate carousel a cada 4 segundos
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      const next = (imageIndexRef.current + 1) % heroImages.length;
      imageIndexRef.current = next;
      setCurrentImageIndex(next);
      // 📊 Evento: rotação automática do hero
      sendGAEvent("hero_image_rotate", {
        index: next,
        total: heroImages.length,
        mode: "auto",
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const closeVideo = useCallback(() => {
    // 📊 Evento: fechar modal de vídeo
    if (selectedVideo) {
      sendGAEvent("youtube_video_close", {
        video_id: selectedVideo,
      });
    }

    setSelectedVideo(null);
  }, [selectedVideo]);

  // Trava o scroll e fecha com Esc enquanto o modal de vídeo está aberto
  useEffect(() => {
    if (!selectedVideo) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedVideo, closeVideo]);

  const openVideo = (videoId: string) => {
    if (!videoId || videoId.trim() === "") return;
    setSelectedVideo(videoId);

    // 📊 Evento: abrir vídeo do YouTube
    sendGAEvent("youtube_video_open", {
      video_id: videoId,
      origin_section: "youtube",
    });
  };

  const handleHeroImageDotClick = (index: number) => {
    imageIndexRef.current = index;
    setCurrentImageIndex(index);
    // 📊 Evento: clique manual no dot do hero
    sendGAEvent("hero_image_select", {
      index,
      total: heroImages.length,
      mode: "manual",
    });
  };

  const handleResumeClick = (origin: "header" | "contact") => {
    if (!resumeUrl) return;
    // 📊 Evento: clique para abrir currículo
    sendGAEvent("resume_click", {
      origin,
      locale,
      resume_url: resumeUrl,
    });
  };

  const handleCtaClick = (ctaId: string, destination: string) => {
    // 📊 Evento: clique nos CTAs do hero
    sendGAEvent("cta_click", {
      cta_id: ctaId,
      destination,
      locale,
    });
  };

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    sendGAEvent("nav_click", { section: sectionId, locale });
  };

  const handleSkillClick = (skill: Skill) => {
    // 📊 Evento: clique em skill
    sendGAEvent("skill_click", {
      skill_id: skill.id,
      href: skill.href,
    });
  };

  const handleFeaturedProjectClick = (project: Project) => {
    // 📊 Evento: clique em projeto destacado (GitHub)
    sendGAEvent("project_click", {
      project_id: project.id,
      project_name: project.name,
      slug: project.slug,
      destination: "github",
      url: project.githubUrl,
      featured: project.featured,
    });
  };

  const handleRealProjectClick = (project: RealProject) => {
    // 📊 Evento: clique em projeto real (seção Experiência)
    sendGAEvent("real_project_click", {
      project_id: project.id,
      title: project.title,
      company: project.company,
      link: project.link,
    });
  };

  const handleYoutubeCardClick = (video: Video) => {
    // o openVideo já manda um evento; esse complementa com metadados
    sendGAEvent("youtube_card_click", {
      video_id: video.id,
      title: video.title,
    });
    openVideo(video.id);
  };

  const handleArticleClick = (article: Article) => {
    // 📊 Evento: clique em artigo publicado
    sendGAEvent("article_click", {
      platform: article.platform,
      title: article.title,
      link: article.link,
    });
  };

  const handleSocialClick = (
    platform: string,
    href: string,
    location: string,
  ) => {
    // 📊 Evento: clique em link social
    sendGAEvent("social_click", {
      platform,
      href,
      location,
    });
  };

  return (
    <div className="bg-orange-50 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="relative flex items-center justify-between px-4 py-6 md:px-12">
          <button
            type="button"
            className="flex flex-col gap-1 w-10 h-10 justify-center lg:hidden"
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
          </button>

          <nav
            id="main-nav"
            aria-label={t.nav.menu}
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute top-full left-4 right-4 z-40 flex-col gap-1 ${card} p-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:p-0 lg:bg-transparent lg:shadow-none lg:border-0`}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-black text-base font-medium font-satoshi py-2 lg:py-0 hover:text-orange-600 transition-colors"
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-xl font-medium font-satoshi text-center hover:text-orange-600 transition-colors cursor-pointer"
                onClick={() => handleResumeClick("header")}
              >
                {t.resume}
              </a>
            )}
            <LanguageSwitch locale={locale} />
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 md:px-12 mt-8">
            <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
              <p className="text-black text-2xl font-medium font-satoshi">
                {t.hi}
              </p>
              <h1 className="flex flex-row flex-wrap items-baseline justify-center lg:justify-start gap-x-2">
                <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                  {t.role1}
                </span>
                <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                  {t.role2}
                </span>
              </h1>
              <p className="text-orange-700 text-base md:text-lg font-semibold font-satoshi">
                {t.tagline}
              </p>
              <p className="text-black/90 text-base font-medium font-satoshi leading-8 max-w-xl mx-auto lg:mx-0 whitespace-pre-line">
                {aboutText}
              </p>
              <p className="text-black/70 text-sm font-medium font-satoshi max-w-xl">
                {t.availability}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-xs sm:max-w-none justify-center lg:justify-start">
                {/* biome-ignore lint/a11y/useValidAnchor: in-page navigation to #contact; onClick only tracks it */}
                <a
                  href="#contact"
                  className="px-8 h-12 bg-black rounded-[10px] shadow-md flex items-center justify-center hover:bg-orange-600 transition-colors"
                  onClick={() =>
                    handleCtaClick("hero_work_together", "contact")
                  }
                >
                  <span className="text-white text-lg font-medium font-satoshi">
                    {t.ctaPrimary}
                  </span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 h-12 rounded-[10px] border-2 border-black flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-colors"
                  onClick={() => handleCtaClick("hero_lets_chat", "linkedin")}
                >
                  <span className="text-lg font-medium font-satoshi">
                    {t.letsChat}
                  </span>
                </a>
              </div>
            </div>

            {/* Carousel de Imagens */}
            <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md mt-6 lg:mt-0">
              <div className="relative overflow-hidden rounded-[5px] shadow-lg w-64 h-80 md:w-80 md:h-96 lg:w-120 lg:h-140 mx-auto">
                {heroImages.map((image, index) => (
                  <Image
                    key={image.src}
                    alt={image.alt}
                    src={image.src}
                    height={551}
                    width={327}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                      index === currentImageIndex
                        ? "opacity-100"
                        : "opacity-0 absolute top-0 left-0"
                    }`}
                    priority={index === 0}
                  />
                ))}
              </div>

              {/* Indicadores (dots) */}
              {heroImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {heroImages.map((image, index) => (
                    <button
                      type="button"
                      key={image.src}
                      onClick={() => handleHeroImageDotClick(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-orange-600 w-8"
                          : "bg-black/20 hover:bg-black/40"
                      }`}
                      aria-label={t.hero.selectImage.replace(
                        "{n}",
                        String(index + 1),
                      )}
                      aria-current={index === currentImageIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Impacto em números */}
          <section id="impact" className="mt-16 px-4 md:px-12 scroll-mt-8">
            <h2 className={sectionTitle}>{t.impact.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.impact.items.map((item) => (
                <div key={item.value} className={`${card} p-6`}>
                  <p className="text-3xl md:text-4xl font-bold font-satoshi text-orange-600">
                    {item.value}
                  </p>
                  <p className="text-black/70 text-sm leading-relaxed mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Empresas e produtos */}
          <section className="mt-12 px-4 md:px-12">
            <h2 className="text-black/60 text-sm font-bold font-satoshi uppercase tracking-wide mb-4 text-center md:text-left">
              {t.trustedBy.title}
            </h2>
            <ul className="flex flex-wrap justify-center md:justify-start gap-3">
              {t.trustedBy.names.map((name) => (
                <li
                  key={name}
                  className="text-base font-semibold font-satoshi text-black bg-white px-4 py-2 rounded-lg border border-orange-100"
                >
                  {name}
                </li>
              ))}
            </ul>
          </section>

          {/* Experiência e case studies */}
          <section id="experience" className="mt-16 px-4 md:px-12 scroll-mt-8">
            <h2 className={sectionTitle}>{t.sections.realProjects}</h2>
            <p className="text-black/70 text-lg mb-8 text-center md:text-left">
              {t.realProjects.subtitle}
            </p>

            <div className="space-y-8">
              {t.realProjects.projects.map((project) => (
                <article key={project.id} className={`${card} p-6 md:p-8`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black font-satoshi mb-1">
                        {project.title}
                      </h3>
                      <p className="text-orange-600 font-medium text-lg">
                        {project.company}
                      </p>
                      <p className="text-black/60 text-sm font-medium mt-1">
                        {project.role} · {project.period}
                      </p>
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-orange-600 transition-colors font-medium whitespace-nowrap self-start"
                        onClick={() => handleRealProjectClick(project)}
                      >
                        {t.realProjects.viewProject}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-black font-satoshi mb-2">
                      {t.realProjects.challenge}
                    </h4>
                    <p className="text-black/80 text-base leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  {project.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-black font-satoshi mb-3">
                        {t.realProjects.highlights}
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-black/70 text-sm leading-relaxed flex items-start gap-2"
                          >
                            <span
                              aria-hidden="true"
                              className="text-orange-600 font-bold mt-1"
                            >
                              •
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.results && (
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="text-base font-bold text-black font-satoshi mb-2">
                        <span aria-hidden="true">📈 </span>
                        {t.realProjects.results}
                      </h4>
                      <p className="text-black/80 text-sm leading-relaxed">
                        {project.results}
                      </p>
                    </div>
                  )}

                  {project.techStack.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-black/60 font-satoshi mb-3 uppercase tracking-wide">
                        {t.realProjects.techStack}
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <li key={tech} className={pill}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* AI-First */}
          <section id="ai" className="mt-16 px-4 md:px-12 scroll-mt-8">
            <div className="bg-black text-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold font-satoshi mb-4 text-center md:text-left">
                {t.aiFirst.title}
              </h2>
              <p className="text-white/80 text-lg mb-8 text-center md:text-left">
                {t.aiFirst.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {t.aiFirst.metrics.map((metric) => (
                  <div
                    key={metric.value}
                    className="rounded-lg border border-white/20 p-6"
                  >
                    <p className="text-3xl md:text-4xl font-bold font-satoshi text-orange-400">
                      {metric.value}
                    </p>
                    <p className="text-white/80 text-sm mt-2">{metric.label}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 mb-8">
                {t.aiFirst.points.map((point) => (
                  <li
                    key={point}
                    className="text-white/90 text-base leading-relaxed flex items-start gap-2"
                  >
                    <span
                      aria-hidden="true"
                      className="text-orange-400 font-bold"
                    >
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PORTFOLIO_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 font-bold hover:underline"
                onClick={() =>
                  handleSocialClick("github", PORTFOLIO_REPO_URL, "ai_section")
                }
              >
                {t.aiFirst.repoLink}
              </a>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="mt-16 px-4 md:px-12 scroll-mt-8">
            <h2 className={sectionTitle}>{t.skillsSection.title}</h2>

            {skills.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-10">
                {skills.map((skill) => (
                  <a
                    key={skill.id}
                    href={skill.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-3 border border-orange-100 hover:border-orange-300 hover:scale-110"
                    onClick={() => handleSkillClick(skill)}
                  >
                    {/* Remote SVG icons from the CMS: next/image does not optimize SVG */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.src}
                      alt={`Skill: ${skill.id}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-30">
                      {t.seeMore}
                    </span>
                  </a>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.skillsSection.groups.map((group) => (
                <div key={group.name} className={`${card} p-6`}>
                  <h3 className="text-lg font-bold text-black font-satoshi mb-4">
                    {group.name}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className={pill}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Formação e idiomas */}
          <section className="mt-16 px-4 md:px-12">
            <h2 className={sectionTitle}>{t.education.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.education.items.map((item) => (
                <div key={item.degree} className={`${card} p-6`}>
                  <h3 className="text-lg font-bold text-black font-satoshi">
                    {item.degree}
                  </h3>
                  <p className="text-orange-600 font-medium mt-1">
                    {item.school}
                  </p>
                  <p className="text-black/60 text-sm mt-1">{item.period}</p>
                </div>
              ))}
            </div>
            <p className="text-black/80 text-base font-medium mt-6 text-center md:text-left">
              {t.education.languages}
            </p>
          </section>

          {/* Open source e projetos pessoais (Hygraph) */}
          <section className="mt-16 px-4 md:px-12">
            <h2 className={sectionTitle}>{t.featuredProjects}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.length === 0 ? (
                <p className="text-black/70 text-center w-full md:col-span-2">
                  {t.noProjects}
                </p>
              ) : (
                projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${card} hover:shadow-xl transition-all duration-300 p-6 flex flex-col group`}
                    onClick={() => handleFeaturedProjectClick(project)}
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
                        {t.seeOnGithub}
                      </span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>

          {/* Conteúdo: YouTube + artigos */}
          <section id="content" className="mt-16 px-4 md:px-12 scroll-mt-8">
            <h2 className={sectionTitle}>{t.sections.youtube}</h2>

            <div className={`${card} p-8 mb-8`}>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/youtube-black.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-bold text-black font-satoshi">
                    {t.youtube.channelName}
                  </h3>
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                    onClick={() =>
                      handleSocialClick(
                        "youtube",
                        YOUTUBE_URL,
                        "youtube_section_header",
                      )
                    }
                  >
                    {t.youtube.visitChannel}
                  </a>
                </div>
              </div>
              <p className="text-black/70 text-base leading-relaxed whitespace-pre-line">
                {t.youtube.channelDescription}
              </p>
            </div>

            {/* Playlist de Vídeos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.youtube.videos.map((video: Video) => (
                <button
                  type="button"
                  key={video.id}
                  className={`group ${card} hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer text-left`}
                  onClick={() => handleYoutubeCardClick(video)}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <Image
                      src={
                        "thumbnail" in video && video.thumbnail
                          ? `/${video.thumbnail}`
                          : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
                      }
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-black font-satoshi mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-black/70 text-sm line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <h2 className={`${sectionTitle} mt-16`}>
              {t.sections.publishedArticles}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.articles.list.map((article) => (
                <a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${card} p-6 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                  onClick={() => handleArticleClick(article)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                          article.platform === "LinkedIn"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-gray-50 text-gray-600 border border-gray-100"
                        }`}
                      >
                        {article.platform}
                      </span>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-black/20 group-hover:text-orange-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
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

          {/* Contact Section */}
          <section
            id="contact"
            className="mt-20 px-4 md:px-12 flex flex-col items-center scroll-mt-8"
          >
            <h2 className="text-black text-3xl md:text-4xl font-medium font-satoshi leading-tight mb-3 text-center">
              {t.letsWork}
            </h2>
            <p className="text-black/70 text-lg mb-6 text-center">
              {t.contactSubtitle}
            </p>

            <ContactForm t={t} />

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 text-base font-medium font-satoshi leading-8 underline hover:text-orange-600 transition-colors"
                onClick={() => handleResumeClick("contact")}
              >
                {t.downloadResume}
              </a>
            )}
          </section>
        </main>

        {/* Modal de Vídeo */}
        {selectedVideo && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: Esc is handled by a window listener
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            {/* biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: only stops backdrop clicks */}
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeVideo}
                // biome-ignore lint/a11y/noAutofocus: move focus into the dialog
                autoFocus
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors text-sm font-bold flex items-center gap-2"
              >
                <span>{t.youtube.closeVideo}</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  title={
                    t.youtube.videos.find((video) => video.id === selectedVideo)
                      ?.title ?? "YouTube"
                  }
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Social Icons */}
        <footer className="mt-16 px-4 md:px-12 pb-10 flex justify-center">
          <ul className="flex gap-6">
            {socialLinks.map((icon) => (
              <li key={icon.alt}>
                <a
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.alt}
                  className="w-13 h-13 flex items-center justify-center rounded-full border-2 border-black hover:border-orange-400 transition-colors"
                  onClick={() =>
                    handleSocialClick(
                      icon.alt.toLowerCase(),
                      icon.href,
                      "footer",
                    )
                  }
                >
                  <Image
                    src={icon.src}
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}
