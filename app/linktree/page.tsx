"use client";

import { useCallback, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import Image from "next/image";
import { useAnalytics } from "@/app/hooks/useAnalytics";
import {
  Globe,
  Github,
  Linkedin,
  Youtube,
  Mail,
  Twitter,
  ArrowRight,
  Check,
} from "lucide-react";
import { logLinkTreeClick } from "@/app/lib/gtag";

// 🔗 Configuração central dos links (edite aqui)
const LINKTREE_CONFIG = {
  profile: {
    name: "Atirson Fabiano",
    bio: "Senior Software Engineer | Frontend Lead (React, Next.js, React Native) | Node.js & PHP | Performance, Scalability & DX",
    avatar: "/atirson.jpg",
  },
  links: [
    {
      id: "portfolio",
      title: "Meu Portfólio",
      url: "https://atirson.com",
      icon: Globe,
    },
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com/atirson",
      icon: Github,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/atirson-fabiano/",
      icon: Linkedin,
    },
    {
      id: "youtube",
      title: "YouTube",
      url: "https://www.youtube.com/@atirson-dev",
      icon: Youtube,
    },
    {
      id: "twitter",
      title: "Twitter / X",
      url: "https://x.com/atirson_dev",
      icon: Twitter,
    },
    {
      id: "email",
      title: "Email",
      url: "mailto:fabiano.oliveira2213@gmail.com",
      icon: Mail,
    },
  ],
  socialIcons: [
    {
      id: "github",
      url: "https://github.com/atirson",
      icon: Github,
    },
    {
      id: "linkedin",
      url: "https://www.linkedin.com/in/atirson-fabiano/",
      icon: Linkedin,
    },
    {
      id: "youtube",
      url: "https://www.youtube.com/@atirson-dev",
      icon: Youtube,
    },
    {
      id: "twitter",
      url: "https://x.com/atirson_dev",
      icon: Twitter,
    },
  ],
};

type AnalyticsState = {
  [key: string]: {
    clicks: number;
    lastClick: string;
    title: string;
    url: string;
  };
};

export default function LinktreePage() {
  // Hook global de analytics do seu projeto
  useAnalytics();

  const [analyticsState, setAnalyticsState] = useState<AnalyticsState>({});

  const trackLinkClick = useCallback(
    (linkId: string, linkTitle: string, linkUrl: string) => {
      const timestamp = new Date().toISOString();

      // Atualiza analytics local (para UI)
      setAnalyticsState((prev) => ({
        ...prev,
        [linkId]: {
          clicks: (prev[linkId]?.clicks || 0) + 1,
          lastClick: timestamp,
          title: linkTitle,
          url: linkUrl,
        },
      }));

      // Envia analytics para o Google Analytics
      logLinkTreeClick(linkId, linkTitle, linkUrl);

      console.log("[Analytics] LinkTree click", {
        linkId,
        linkTitle,
        linkUrl,
        timestamp,
      });
    },
    []
  );

  type LinkItem = (typeof LINKTREE_CONFIG.links)[number];

  const LinkButton = ({ link }: { link: LinkItem }) => {
    const Icon = link.icon;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      trackLinkClick(link.id, link.title, link.url);

      // Se quiser garantir abertura em nova aba para http(s)
      if (link.url.startsWith("http")) {
        e.preventDefault();
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    };

    return (
      <a
        href={link.url}
        onClick={handleClick}
        className="group w-full max-w-2xl bg-white hover:bg-orange-50 border-2 border-black hover:border-orange-500 rounded-full px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 border border-orange-200">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-black text-lg font-semibold font-satoshi group-hover:text-orange-600 transition-colors">
            {link.title}
          </span>
        </div>
        <ArrowRight className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
      </a>
    );
  };

  type SocialItem = (typeof LINKTREE_CONFIG.socialIcons)[number];

  const SocialIconButton = ({ social }: { social: SocialItem }) => {
    const Icon = social.icon;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
      trackLinkClick(`social_${social.id}`, social.id, social.url);
    };

    return (
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-black hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 hover:scale-110"
      >
        <Icon className="h-5 w-5 text-black" />
      </a>
    );
  };

  return (
    <div className="bg-orange-50 min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="relative">
            <Image
              src={LINKTREE_CONFIG.profile.avatar}
              alt={LINKTREE_CONFIG.profile.name}
              width={112}
              height={112}
              className="w-28 h-28 rounded-full border-4 border-black shadow-xl object-cover"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-black text-3xl font-bold font-satoshi mb-2">
              {LINKTREE_CONFIG.profile.name}
            </h1>
            <p className="text-black/70 text-base font-medium font-satoshi">
              {LINKTREE_CONFIG.profile.bio}
            </p>
          </div>
        </div>

        {/* Links principais */}
        <div className="w-full flex flex-col items-center gap-4 mt-4">
          {LINKTREE_CONFIG.links.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>

        {/* Redes sociais */}
        <div className="flex gap-4 mt-8">
          {LINKTREE_CONFIG.socialIcons.map((social) => (
            <SocialIconButton key={social.id} social={social} />
          ))}
        </div>

        <footer className="mt-8 text-center">
          <p className="text-black/50 text-sm font-satoshi">
            Então você é Dev ou um saco de batatas? 😉
          </p>
          <a
            href="asd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 text-sm font-medium font-satoshi hover:text-orange-600 transition-colors"
          >
            Post LinkedIn Dev Batata
          </a>
        </footer>
      </div>
    </div>
  );
}