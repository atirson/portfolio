"use client";
import Image from "next/image";
import { LanguageSwitch } from "../components/LanguageSwitch";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";

const translations = { pt, en };

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "pt" | "en" }>;
}) {
  const { locale } = await params;
  const t = translations[locale];

  return (
    <div className="bg-orange-50 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-6 md:px-12">
          {/* Menu Icon */}
          <div className="flex flex-col gap-1 w-10 h-10 justify-center md:hidden">
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
            <span className="block w-7 h-1 bg-black rounded" />
          </div>

          {/* Espaço para centralizar */}
          <div className="hidden md:block" />

          {/* Resume + Switch */}
          <div className="flex items-center gap-4">
            <div className="text-black text-xl font-medium font-satoshi text-center">
              {t.resume}
            </div>
            <LanguageSwitch locale={locale as string} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 md:px-12 mt-8">
          {/* Text Block */}
          <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
            <div className="text-black text-2xl font-medium font-satoshi">
              {t.hi}
            </div>
            <div className="flex flex-row items-baseline justify-center lg:justify-start space-x-2">
              <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                {t.role1}
              </span>
              <span className="text-black text-4xl md:text-5xl font-bold font-satoshi">
                {t.role2}
              </span>
            </div>
            <div className="text-black/90 text-base font-medium font-satoshi leading-8 max-w-md mx-auto lg:mx-0 whitespace-pre-line">
              {t.about}
            </div>
            <button className="w-full max-w-xs md:max-w-sm h-12 px-8 bg-black rounded-[10px] shadow-md flex items-center justify-center gap-2.5 mt-2 mx-auto lg:mx-0">
              <span className="text-white text-xl font-medium font-satoshi">
                {t.letsChat}
              </span>
            </button>
          </div>

          {/* Main Image */}
          <Image
            about="Atirson Fabiano"
            alt="Atirson Fabiano"
            src={`/atirson.jpg`}
            height={551}
            width={397}
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-[5px] shadow-lg mt-6 lg:mt-0"
          />
        </section>

        {/* Featured Projects */}
        <section className="mt-16 px-4 md:px-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold font-satoshi mb-8 text-center md:text-left">
            {t.featuredProjects}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-rose-100 rounded-[5px] shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  className="w-full h-auto max-h-[300px] object-cover rounded"
                  src={`https://placehold.co/${400 + i * 20}x${400 + i * 10}`}
                  alt={`Project ${i}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-20 px-4 md:px-12 flex flex-col items-center">
          <h3 className="text-black text-3xl md:text-4xl font-medium font-satoshi leading-8 mb-6 text-center">
            {t.letsWork}
          </h3>

          <form className="flex flex-col gap-6 w-full max-w-xl">
            <label className="text-black text-xl md:text-2xl font-medium font-satoshi leading-8">
              {t.name}
            </label>
            <input
              type="text"
              placeholder=""
              className="w-full h-14 rounded-[5px] border border-black px-4"
            />

            <label className="text-black text-xl md:text-2xl font-medium font-satoshi leading-8">
              {t.message}
            </label>
            <textarea
              className="w-full h-28 rounded-[5px] border border-black px-4 py-2 resize-none"
              defaultValue=""
            />

            <div className="text-black/40 text-base font-medium font-satoshi leading-8">
              {t.placeholderMessage}
            </div>

            <button
              type="submit"
              className="w-full max-w-xs md:max-w-sm px-8 py-3 bg-black rounded-[5px] flex items-center justify-center gap-2.5 mx-auto"
            >
              <span className="text-white text-base font-medium font-satoshi leading-8">
                {t.sendMessage}
              </span>
            </button>
          </form>

          {/* Download resume link */}
          <a
            href="#"
            className="block mt-6 text-black text-base font-medium font-satoshi leading-8 underline"
          >
            {t.downloadResume}
          </a>
        </section>

        {/* Social Icons */}
        <footer className="mt-16 px-4 md:px-12 pb-10 flex justify-center">
          <div className="flex gap-6">
            <div className="w-8 h-8 bg-black rounded-full" /> {/* Behance */}
            <div className="w-8 h-8 bg-black rounded-full" /> {/* GitHub */}
            <div className="w-8 h-8 bg-black rounded-full" /> {/* LinkedIn */}
            <div className="w-8 h-8 bg-black rounded-full" /> {/* Twitter */}
            <div className="w-8 h-8 bg-black rounded-full" /> {/* Instagram */}
          </div>
        </footer>
      </div>
    </div>
  );
}