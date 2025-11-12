"use client";

import { useEffect } from "react";
import { logScrollDepth, logTimeOnPage, logClick } from "@/app/lib/gtag";

export function useAnalytics() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent % 25 === 0 && scrollPercent > 0) {
        logScrollDepth(scrollPercent);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds += 5;
      logTimeOnPage(seconds);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        const link = (target.closest("a") as HTMLAnchorElement).href;
        logClick(link);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}