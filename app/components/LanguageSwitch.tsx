"use client";
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitch({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function toggleLanguage() {
    const nextLocale = locale === 'en' ? 'pt' : 'en';
    router.replace(`/${nextLocale}${pathname.replace(/^\/(en|pt)/, '')}`);
  }

  return (
    <button
      aria-label="Switch language"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-2 py-1 rounded-full bg-orange-200"
    >
      <span className="text-xs font-bold text-black">
        {locale === 'en' ? 'EN' : 'PT'}
      </span>
      <span className="relative w-10 h-5 bg-orange-100 rounded-full p-1">
        <span 
          className={`absolute top-0.5 w-4 h-4 bg-orange-400 rounded-full shadow-md transition-all duration-300 ${
            locale === 'pt' ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  );
}