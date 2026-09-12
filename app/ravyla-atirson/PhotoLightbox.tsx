'use client';

import { useEffect, useRef } from 'react';
import { photoUrl } from './gallery-data';

interface PhotoLightboxProps {
  photos: number[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  primaryColor: string;
}

export default function PhotoLightbox({ photos, index, onClose, onNavigate, primaryColor }: PhotoLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const goPrev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const goNext = () => onNavigate((index + 1) % photos.length);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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

  return (
    <div
      className="fixed inset-0 z-2000 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotos do casamento"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        aria-label="Fechar visualizador"
        className="absolute inset-0 bg-black/90 cursor-default"
      ></button>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl shadow-lg z-10"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        aria-label="Fechar"
      >
        <i className="fas fa-times"></i>
      </button>

      <div
        className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full text-white text-sm font-semibold z-10"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
      >
        {index + 1} / {photos.length}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-2 md:left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
        aria-label="Foto anterior"
      >
        <i className="fas fa-chevron-left text-white text-xl"></i>
      </button>

      <img
        src={photoUrl(photos[index])}
        alt={`Foto do casamento ${index + 1}`}
        className="relative z-10 max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
      />

      <button
        onClick={goNext}
        className="absolute right-2 md:right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
        aria-label="Próxima foto"
      >
        <i className="fas fa-chevron-right text-white text-xl"></i>
      </button>
    </div>
  );
}
