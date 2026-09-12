'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@/app/lib/gtag';
import { ALL_PHOTOS, thumbUrl } from '../gallery-data';
import PhotoLightbox from '../PhotoLightbox';

const COLORS = {
  primary: '#00357A',
  secondary: '#C5A572',
  tertiary: '#E8DCC4',
  background: '#F8F6F3',
  backgroundAlt: '#FFFFFF',
  accent: '#1A4D8F',
  textDark: '#2C3E50',
  textLight: '#FFFFFF',
};

const PAGE_SIZE = 30;

export default function GaleriaPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = ALL_PHOTOS.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_PHOTOS.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, ALL_PHOTOS.length));
    sendGAEvent('gallery_load_more', { visible_count: visibleCount + PAGE_SIZE });
  };

  return (
    <div className="font-montserrat text-gray-800 min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 left-0 w-full shadow-md z-100" style={{ backgroundColor: COLORS.backgroundAlt }}>
        <nav className="flex justify-between items-center px-6 md:px-8 py-5 max-w-[1400px] mx-auto">
          <Link
            href="/ravyla-atirson"
            className="font-medium text-sm tracking-wide flex items-center gap-2"
            style={{ color: COLORS.primary, textDecoration: 'none' }}
          >
            <i className="fas fa-arrow-left"></i> Voltar para o site
          </Link>
          <span className="font-cormorant text-2xl" style={{ color: COLORS.primary }}>R&A</span>
        </nav>
      </header>

      {/* TÍTULO */}
      <div className="text-center px-8 pt-16 pb-12 max-w-3xl mx-auto">
        <div className="text-3xl mb-4" style={{ color: COLORS.secondary }}>✦ ❀ ✦</div>
        <h1 className="font-cormorant text-5xl md:text-6xl mb-4" style={{ color: COLORS.primary }}>Galeria Completa</h1>
        <p className="text-lg" style={{ color: COLORS.textDark }}>
          {ALL_PHOTOS.length} fotos do nosso grande dia. Clique em qualquer uma para ver em tamanho maior.
        </p>
      </div>

      {/* GRID PINTEREST */}
      <div className="px-4 md:px-8 pb-12 max-w-6xl mx-auto">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:balance]">
          {visiblePhotos.map((num, i) => (
            <button
              key={num}
              onClick={() => {
                setLightboxIndex(i);
                sendGAEvent('gallery_photo_open', { photo_number: num, source: 'full_gallery' });
              }}
              className="block w-full mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-lg cursor-zoom-in group"
            >
              <img
                src={thumbUrl(num)}
                loading="lazy"
                alt={`Foto do casamento ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              className="inline-block px-10 py-4 text-white rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent})` }}
            >
              Carregar Mais Fotos ({visibleCount}/{ALL_PHOTOS.length})
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={ALL_PHOTOS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          primaryColor={COLORS.primary}
        />
      )}
    </div>
  );
}
