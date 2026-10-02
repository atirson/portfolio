"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { photoUrl } from "./gallery-data";

const subscribeNoop = () => () => {};

interface PhotoLightboxProps {
  photos: number[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  primaryColor: string;
}

export default function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
  primaryColor,
}: PhotoLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  // createPortal precisa de document: só renderiza no cliente
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const goPrev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const goNext = () => onNavigate((index + 1) % photos.length);

  // Mantém os handlers mais recentes sem reinstalar o listener a cada foto
  const handlersRef = useRef({ onClose, goPrev, goNext });
  useEffect(() => {
    handlersRef.current = { onClose, goPrev, goNext };
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const handlers = handlersRef.current;
      if (e.key === "Escape") handlers.onClose();
      if (e.key === "ArrowLeft") handlers.goPrev();
      if (e.key === "ArrowRight") handlers.goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    touchStartX.current = null;
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-2000 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotos do casamento"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar visualizador"
        className="absolute inset-0 bg-black/90 cursor-default"
      ></button>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl shadow-lg z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        aria-label="Fechar"
      >
        <i className="fas fa-times"></i>
      </button>

      <div
        className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full text-white text-sm font-semibold z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        {index + 1} / {photos.length}
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 md:left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
        aria-label="Foto anterior"
      >
        <i className="fas fa-chevron-left text-white text-xl"></i>
      </button>

      {/* Full-size photo of unknown aspect ratio, sized with max-w/max-h */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoUrl(photos[index])}
        alt={`Foto do casamento ${index + 1}`}
        className="relative min-w-0 min-h-0 max-w-full max-h-[85dvh] object-contain rounded-lg shadow-2xl pointer-events-none"
      />

      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 md:right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
        aria-label="Próxima foto"
      >
        <i className="fas fa-chevron-right text-white text-xl"></i>
      </button>
    </div>,
    document.body,
  );
}
