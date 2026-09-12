'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import QRCode from "react-qr-code";
import { sendGAEvent } from '@/app/lib/gtag'; // 👈 Importa a função de analytics
import { FEATURED_PHOTOS, thumbUrl } from './gallery-data';
import PhotoLightbox from './PhotoLightbox';

// ============================================
// 🎨 CONFIGURAÇÕES DO SITE (EDITE AQUI)
// ============================================

const CONFIG = {
  // 🎵 Arquivos de Mídia
  MUSIC_PATH: '/casamento.mp3',

  // 🖼️ Carousel do Banner (topo da página, rotação automática)
  HERO_PHOTOS: [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.jpg',
    '/hero-4.jpg',
  ],

  // 🖼️ Carousel de Fotos do Casal (adicione quantas quiser)
  COUPLE_PHOTOS: [
    '/CAROUSEL_1.jpg',
    '/CAROUSEL_2.jpg',
    '/CAROUSEL_3.jpg',
    '/CAROUSEL_4.jpg',
  ],
  
  LOGO: '/logo.png',

  // 🎨 Cores do Tema (Azul Elegante)
  COLORS: {
    primary: '#00357A',        // Azul royal principal
    secondary: '#C5A572',      // Dourado champagne
    tertiary: '#E8DCC4',       // Bege claro elegante
    background: '#F8F6F3',     // Off-white sofisticado
    backgroundAlt: '#FFFFFF',  // Branco puro
    accent: '#1A4D8F',         // Azul médio
    textDark: '#2C3E50',       // Cinza escuro
    textLight: '#FFFFFF',      // Branco
  },

  // 💑 Informações do Casal
  BRIDE_NAME: 'Ravyla Rachel',
  GROOM_NAME: 'Atirson Fabiano',
  INITIALS: 'R&A',
  WEDDING_DATE: '2026-05-16T16:00:00',
  WEDDING_DATE_DISPLAY: '16 DE MAIO DE 2026',

  // 📍 Local do Evento (só o essencial - a página com endereço/mapa foi substituída pela galeria)
  VENUE: {
    name: 'Chácara do Italiano',
    city: 'Anápolis - GO',
  },

  // 🎁 Presentes
  GIFTS: {
    pixKeyMessage: 'Tel: 62 99422-9811 - Ravyla Rachel',
    pixKeyURL: 'https://nubank.com.br/cobrar/3xpyj/69762c55-6e51-4116-8653-61ff6ddf7851',
    pixKey: '62 99422-9811',
    giftListUrl: 'https://lista.havan.com.br/Convidado/ItensListaPresente/891945#/',
  },

  // 🎬 Vídeo do Casamento (YouTube não listado)
  VIDEO: {
    YOUTUBE_ID: 'J6165wplUdE',
  },

  // 📅 Programação do Dia (SEM pista de dança e SEM bebida alcoólica)
  SCHEDULE: [
    { hora: '16:00', evento: 'Chegada dos Convidados' },
    { hora: '16:30', evento: 'Cerimônia de Casamento' },
    { hora: '17:30', evento: 'Confraternização' },
    { hora: '18:30', evento: 'Jantar' },
    { hora: '20:30', evento: 'Bolo e Agradecimentos' },
  ],
};

// ============================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================

export default function WeddingPage() {
  const [timeMarried, setTimeMarried] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const WEDDING_DATE = new Date(CONFIG.WEDDING_DATE).getTime();

  // Smooth scroll para navegação
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
      
      // 📊 Evento: Navegação no menu
      sendGAEvent('navigation_click', {
        section: targetId.replace('#', ''),
        page_location: window.location.href,
      });
    }
  };

  // Funções do Carousel
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % CONFIG.COUPLE_PHOTOS.length);
    
    // 📊 Evento: Próxima foto do carousel
    sendGAEvent('carousel_next', {
      photo_index: (currentPhotoIndex + 1) % CONFIG.COUPLE_PHOTOS.length,
      total_photos: CONFIG.COUPLE_PHOTOS.length,
    });
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + CONFIG.COUPLE_PHOTOS.length) % CONFIG.COUPLE_PHOTOS.length);
    
    // 📊 Evento: Foto anterior do carousel
    sendGAEvent('carousel_prev', {
      photo_index: (currentPhotoIndex - 1 + CONFIG.COUPLE_PHOTOS.length) % CONFIG.COUPLE_PHOTOS.length,
      total_photos: CONFIG.COUPLE_PHOTOS.length,
    });
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
    
    // 📊 Evento: Clique direto em dot do carousel
    sendGAEvent('carousel_dot_click', {
      photo_index: index,
      total_photos: CONFIG.COUPLE_PHOTOS.length,
    });
  };

  // Auto-play do carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play do carousel de banners (hero)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhotoIndex((prev) => (prev + 1) % CONFIG.HERO_PHOTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Tempo de casados (o casamento já aconteceu, então contamos para frente a partir da data)
  useEffect(() => {
    const updateTimeMarried = () => {
      const elapsed = Date.now() - WEDDING_DATE;

      setTimeMarried({
        days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
        hours: Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((elapsed % (1000 * 60)) / 1000)
      });
    };

    updateTimeMarried();
    const interval = setInterval(updateTimeMarried, 1000);
    return () => clearInterval(interval);
  }, [WEDDING_DATE]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            
            // 📊 Evento: Seção visualizada
            const sectionId = entry.target.id;
            if (sectionId) {
              sendGAEvent('section_view', {
                section_name: sectionId,
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Tentar autoplay ao carregar
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          localStorage.setItem('isMusicPaused', 'false');
          
          // 📊 Evento: Música iniciada automaticamente
          sendGAEvent('music_autoplay', {
            status: 'success',
          });
        } catch (error) {
          console.log('Autoplay bloqueado pelo navegador. Clique no botão para tocar.');
          setIsPlaying(false);
          localStorage.setItem('isMusicPaused', 'true');
          
          // 📊 Evento: Autoplay bloqueado
          sendGAEvent('music_autoplay', {
            status: 'blocked',
          });
        }
      }
    };

    const timer = setTimeout(playAudio, 1000);
    return () => clearTimeout(timer);
  }, []);

  const copyPixKey = () => {
    navigator.clipboard.writeText(CONFIG.GIFTS.pixKey).then(() => {
      alert('✅ Chave PIX copiada com sucesso!');
      
      // 📊 Evento: Chave PIX copiada
      sendGAEvent('pix_key_copied', {
        pix_key: CONFIG.GIFTS.pixKey,
      });
    });
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem('isMusicPaused', 'true');
        
        // 📊 Evento: Música pausada
        sendGAEvent('music_control', {
          action: 'pause',
        });
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem('isMusicPaused', 'false');
        
        // 📊 Evento: Música tocada
        sendGAEvent('music_control', {
          action: 'play',
        });
      }
    } catch (error) {
      console.error('Erro ao controlar áudio:', error);
    }
  };

  // 📊 Função para rastrear play do vídeo do casamento
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    sendGAEvent('wedding_video_play', {
      video_id: CONFIG.VIDEO.YOUTUBE_ID,
    });
  };

  // 📊 Função para rastrear clique na lista de presentes
  const handleGiftListClick = () => {
    sendGAEvent('gift_list_click', {
      gift_type: 'online_store',
      url: CONFIG.GIFTS.giftListUrl,
    });
  };

  // 📊 Função para rastrear visualização do QR Code PIX
  const handlePixQRView = () => {
    sendGAEvent('pix_qr_view', {
      pix_key: CONFIG.GIFTS.pixKey,
    });
  };

  return (
    <div className="font-montserrat text-gray-800 overflow-x-hidden" style={{ backgroundColor: CONFIG.COLORS.background }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 25px rgba(0, 53, 122, 0.4); }
          50% { box-shadow: 0 8px 35px rgba(197, 165, 114, 0.6); }
        }

        @keyframes fadeInCarousel {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-custom { animation: pulse 2s infinite; }
        .animate-fade-carousel { animation: fadeInCarousel 0.5s ease-in-out; }
        
        .text-shadow-strong {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6);
        }

        .carousel-button {
          transition: all 0.3s ease;
        }

        .carousel-button:hover {
          transform: scale(1.1);
          background-color: rgba(0, 53, 122, 0.9) !important;
        }

        .carousel-dot {
          transition: all 0.3s ease;
        }

        .carousel-dot:hover {
          transform: scale(1.2);
        }

        /* Estilos do Tooltip */
          .tooltip {
            position: absolute;
            bottom: 80px; /* Fica acima do botão de 60px */
            right: 0;
            background-color: white;
            color: #333;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            animation: float 2s ease-in-out infinite;
            z-index: 1000;
          }

          /* A setinha do balão */
          .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            right: 20px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          }

          /* Animação de flutuar */
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          /* Sua animação de pulso que já estava no botão */
          .animate-pulse-custom {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(0,0,0,0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
          }
      `}</style>

      {/* Elemento de áudio */}
      <audio ref={audioRef} loop preload="auto">
        <source src={CONFIG.MUSIC_PATH} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full shadow-md z-[1000] transition-all duration-300" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <nav className="flex justify-center items-center px-8 py-5 md:py-4 max-w-[1400px] mx-auto relative">
          <button
            className="md:hidden absolute right-8 flex flex-col gap-1.5 cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              // 📊 Evento: Menu mobile aberto/fechado
              sendGAEvent('mobile_menu_toggle', {
                action: !isMenuOpen ? 'open' : 'close',
              });
            }}
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 rounded transition-all" style={{ backgroundColor: CONFIG.COLORS.primary }}></span>
            <span className="w-6 h-0.5 rounded transition-all" style={{ backgroundColor: CONFIG.COLORS.primary }}></span>
            <span className="w-6 h-0.5 rounded transition-all" style={{ backgroundColor: CONFIG.COLORS.primary }}></span>
          </button>

          <ul className={`${isMenuOpen ? 'left-0' : '-left-full'} md:left-auto fixed md:relative md:top-0 flex flex-col md:flex-row list-none gap-6 md:gap-10 items-center md:bg-transparent w-full md:w-auto p-8 md:p-0 shadow-lg md:shadow-none transition-all duration-300`} style={{ backgroundColor: isMenuOpen ? CONFIG.COLORS.backgroundAlt : 'transparent', top: isMenuOpen ? '-10px' : '0', marginTop: isMenuOpen ? '50px' : '0' }}>
            <li><a href="#home" onClick={(e) => smoothScroll(e, '#home')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Home</a></li>
            <li><a href="#historia" onClick={(e) => smoothScroll(e, '#historia')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Nossa História</a></li>
            <li><a href="#video" onClick={(e) => smoothScroll(e, '#video')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Vídeo</a></li>
            <li><a href="#galeria" onClick={(e) => smoothScroll(e, '#galeria')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Galeria</a></li>
            <li className="w-[70px] h-[70px]">
              <img src={CONFIG.LOGO} alt="Logo" className="w-full h-full object-contain" />
            </li>
            <li><a href="#programacao" onClick={(e) => smoothScroll(e, '#programacao')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Programação</a></li>
            <li><a href="#manual" onClick={(e) => smoothScroll(e, '#manual')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Manual</a></li>
            <li><a href="#presentes" onClick={(e) => smoothScroll(e, '#presentes')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Presentes</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-8 pt-32 pb-16 relative overflow-hidden">
        {/* Carousel de fotos de fundo (banner) */}
        {CONFIG.HERO_PHOTOS.map((photo, index) => (
          <div
            key={photo}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${photo})`,
              backgroundPosition: 'center 20%',
              filter: 'brightness(0.7)',
              opacity: index === heroPhotoIndex ? 1 : 0
            }}
          ></div>
        ))}

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 53, 122, 0.25)' }}></div>

        {/* Elementos decorativos */}
        <div className="absolute top-[10%] left-[10%] text-5xl opacity-40 animate-float z-10" style={{ color: CONFIG.COLORS.secondary }}>✦</div>
        <div className="absolute bottom-[15%] right-[10%] text-6xl opacity-30 animate-float z-10" style={{ animationDuration: '8s', color: CONFIG.COLORS.secondary }}>❀</div>
        
        {/* Conteúdo */}
        <div className="max-w-4xl animate-[fadeInUp_1s_ease] relative z-20">
          <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-4 leading-tight text-shadow-strong" style={{ color: CONFIG.COLORS.textLight }}>
            {CONFIG.BRIDE_NAME}
            <span className="text-4xl md:text-6xl mx-4" style={{ color: CONFIG.COLORS.secondary }}>&</span>
            {CONFIG.GROOM_NAME}
          </h1>
          <p className="text-xl md:text-2xl my-6 font-normal tracking-[2px] text-shadow-strong" style={{ color: CONFIG.COLORS.textLight }}>Nos casamos em {CONFIG.WEDDING_DATE_DISPLAY}</p>
          <p className="text-lg md:text-xl italic mb-4 text-shadow-strong" style={{ color: CONFIG.COLORS.tertiary }}>{CONFIG.VENUE.name}, {CONFIG.VENUE.city}</p>
          <p className="text-sm md:text-base uppercase tracking-[3px] mb-12 text-shadow-strong" style={{ color: CONFIG.COLORS.secondary }}>💍 Já Somos Casados! 💍</p>

          <div className="flex gap-8 justify-center mt-12 flex-wrap">
            {[
              { value: timeMarried.days, label: 'Dias Casados' },
              { value: timeMarried.hours, label: 'Horas' },
              { value: timeMarried.minutes, label: 'Minutos' },
              { value: timeMarried.seconds, label: 'Segundos' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/95 px-8 py-6 rounded-2xl shadow-2xl min-w-[100px] transition-all hover:-translate-y-2 hover:shadow-xl border-2 backdrop-blur-sm" style={{ borderColor: CONFIG.COLORS.secondary }}>
                <span className="font-cormorant text-5xl font-bold block" style={{ color: CONFIG.COLORS.primary }}>{item.value}</span>
                <span className="text-sm uppercase tracking-wider font-medium" style={{ color: CONFIG.COLORS.textDark }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTÓRIA COM CAROUSEL */}
      <section id="historia" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* CAROUSEL DE FOTOS */}
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Imagem atual */}
              <img 
                src={CONFIG.COUPLE_PHOTOS[currentPhotoIndex]} 
                alt={`Foto do Casal ${currentPhotoIndex + 1}`} 
                className="w-full h-full object-cover animate-fade-carousel"
                key={currentPhotoIndex}
              />

              {/* Botão Anterior */}
              <button
                onClick={prevPhoto}
                className="carousel-button absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
                style={{ backgroundColor: 'rgba(0, 53, 122, 0.7)' }}
                aria-label="Foto anterior"
              >
                <i className="fas fa-chevron-left text-white text-xl"></i>
              </button>

              {/* Botão Próximo */}
              <button
                onClick={nextPhoto}
                className="carousel-button absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
                style={{ backgroundColor: 'rgba(0, 53, 122, 0.7)' }}
                aria-label="Próxima foto"
              >
                <i className="fas fa-chevron-right text-white text-xl"></i>
              </button>

              {/* Indicadores (dots) */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {CONFIG.COUPLE_PHOTOS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPhoto(index)}
                    className="carousel-dot w-3 h-3 rounded-full cursor-pointer"
                    style={{ 
                      backgroundColor: index === currentPhotoIndex ? CONFIG.COLORS.secondary : 'rgba(255, 255, 255, 0.5)',
                      border: index === currentPhotoIndex ? `2px solid ${CONFIG.COLORS.textLight}` : 'none'
                    }}
                    aria-label={`Ir para foto ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* Contador de fotos */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg" style={{ backgroundColor: 'rgba(0, 53, 122, 0.7)' }}>
                {currentPhotoIndex + 1} / {CONFIG.COUPLE_PHOTOS.length}
              </div>
            </div>
            
            <div>
              <h2 className="font-cormorant text-5xl mb-6" style={{ color: CONFIG.COLORS.primary }}>Nossa História</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: CONFIG.COLORS.textDark }}>
                Nosso amor começou de forma inesperada, mas desde o primeiro momento soubemos que era especial. 
                Cada dia ao seu lado é uma nova aventura, repleta de sorrisos, cumplicidade e muito amor.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: CONFIG.COLORS.textDark }}>
                No dia {CONFIG.WEDDING_DATE_DISPLAY}, celebramos não apenas o nosso casamento, mas a união de
                duas almas que se encontraram e decidiram caminhar juntas para sempre. Obrigado por ter feito
                parte deste momento único com a gente.
              </p>

              <div className="p-8 rounded-2xl border-l-4 mt-8" style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})`, borderColor: CONFIG.COLORS.secondary }}>
                <p className="font-cormorant text-xl italic text-white mb-4">
                  "Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém o separe"
                </p>
                <cite className="block text-right text-white/90">— Mateus 19:6</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEO DO CASAMENTO */}
      <section id="video" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ background: `linear-gradient(to bottom, ${CONFIG.COLORS.background}, ${CONFIG.COLORS.tertiary})` }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
          <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Reviva Nosso Grande Dia</h2>
          <p className="max-w-2xl mx-auto mb-12 text-lg" style={{ color: CONFIG.COLORS.textDark }}>
            Preparamos um vídeo especial para você reviver com a gente os melhores momentos da nossa cerimônia.
          </p>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4" style={{ borderColor: CONFIG.COLORS.secondary }}>
            {isVideoPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${CONFIG.VIDEO.YOUTUBE_ID}?autoplay=1&rel=0`}
                title={`Vídeo do casamento de ${CONFIG.BRIDE_NAME} e ${CONFIG.GROOM_NAME}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <button
                onClick={handlePlayVideo}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                aria-label="Assistir ao vídeo do casamento"
              >
                <img
                  src={`https://img.youtube.com/vi/${CONFIG.VIDEO.YOUTUBE_ID}/maxresdefault.jpg`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://img.youtube.com/vi/${CONFIG.VIDEO.YOUTUBE_ID}/hqdefault.jpg`;
                  }}
                  alt="Prévia do vídeo do casamento"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 53, 122, 0.35)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 animate-pulse-custom"
                    style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.secondary})` }}
                  >
                    <i className="fas fa-play text-white text-3xl ml-1"></i>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* GALERIA DE FOTOS */}
      <section id="galeria" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Galeria de Fotos</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg" style={{ color: CONFIG.COLORS.textDark }}>
              Alguns dos nossos momentos favoritos do grande dia.
            </p>
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:balance]">
            {FEATURED_PHOTOS.map((num, i) => (
              <button
                key={num}
                onClick={() => {
                  setGalleryLightboxIndex(i);
                  sendGAEvent('gallery_photo_open', { photo_number: num, source: 'home_preview' });
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

          <div className="text-center mt-12">
            <Link
              href="/ravyla-atirson/galeria"
              onClick={() => sendGAEvent('gallery_view_all_click', {})}
              className="inline-block px-10 py-4 text-white rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: `linear-gradient(to right, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})` }}
            >
              <i className="fas fa-images mr-2"></i> Ver Todas as Fotos
            </Link>
          </div>
        </div>

        {galleryLightboxIndex !== null && (
          <PhotoLightbox
            photos={FEATURED_PHOTOS}
            index={galleryLightboxIndex}
            onClose={() => setGalleryLightboxIndex(null)}
            onNavigate={setGalleryLightboxIndex}
            primaryColor={CONFIG.COLORS.primary}
          />
        )}
      </section>

      {/* PROGRAMAÇÃO */}
      <section id="programacao" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Como Foi o Nosso Grande Dia</h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden md:block" style={{ background: `linear-gradient(to bottom, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.secondary})` }}></div>

            {CONFIG.SCHEDULE.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-12 relative">
                <div className={`bg-white p-8 rounded-2xl shadow-lg w-full md:w-[45%] transition-all hover:-translate-y-2 hover:shadow-xl ${idx % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
                  <div className="font-cormorant text-3xl font-bold mb-2" style={{ color: CONFIG.COLORS.secondary }}>{item.hora}</div>
                  <div className="text-xl font-semibold" style={{ color: CONFIG.COLORS.primary }}>{item.evento}</div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 border-4 border-white rounded-full shadow-lg hidden md:block" style={{ backgroundColor: CONFIG.COLORS.primary, boxShadow: `0 0 0 4px ${CONFIG.COLORS.tertiary}` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGRADECIMENTO AOS PADRINHOS E MADRINHAS */}
      <section id="manual" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.tertiary}, ${CONFIG.COLORS.background})` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Obrigado, Padrinhos e Madrinhas!</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg" style={{ color: CONFIG.COLORS.textDark }}>
              Vocês tornaram nosso grande dia ainda mais especial. Fica aqui o nosso carinho e gratidão.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* MADRINHAS */}
            <div className="bg-white p-12 rounded-3xl shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6 text-center" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-female"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-6 text-center" style={{ color: CONFIG.COLORS.primary }}>Madrinhas</h3>
              <p className="text-lg leading-relaxed text-center" style={{ color: CONFIG.COLORS.textDark }}>
                Obrigado por estarem ao nosso lado, lindas de azul royal, cuidando de cada detalhe com tanto
                carinho. A presença de vocês deixou nossa cerimônia ainda mais bonita e cheia de amor.
              </p>
            </div>

            {/* PADRINHOS */}
            <div className="bg-white p-12 rounded-3xl shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6 text-center" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-male"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-6 text-center" style={{ color: CONFIG.COLORS.primary }}>Padrinhos</h3>
              <p className="text-lg leading-relaxed text-center" style={{ color: CONFIG.COLORS.textDark }}>
                Obrigado por caminharem ao nosso lado, elegantes de terno bege e gravata azul royal. Ter vocês
                por perto nesse momento tão importante fez toda a diferença para nós.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTES */}
      <section id="presentes" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Lista de Presentes</h2>
            <p className="max-w-2xl mx-auto mt-4" style={{ color: CONFIG.COLORS.textDark }}>
              Já celebramos nosso grande dia, mas se ainda quiser nos presentear,
              ficaremos muito felizes em receber sua contribuição.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* LISTA ONLINE COM QR CODE */}
            <div className="bg-white p-12 rounded-3xl text-center shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-gift"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Lista Online</h3>
              <p className="mb-8 leading-relaxed" style={{ color: CONFIG.COLORS.textDark }}>Escolha um presente especial da nossa lista de desejos nas melhores lojas.</p>
              
              <div className="my-8 flex justify-center">
                <QRCode value={CONFIG.GIFTS.giftListUrl} size={200} className="rounded-2xl shadow-lg" />
              </div>

              <a href={CONFIG.GIFTS.giftListUrl} target="_blank" rel="noopener noreferrer" onClick={handleGiftListClick} className="inline-block px-10 py-4 text-white rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-xl" style={{ background: `linear-gradient(to right, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})` }}>
                <i className="fas fa-shopping-cart mr-2"></i> Acessar Lista
              </a>
            </div>

            {/* PIX COM QR CODE */}
            <div className="bg-white p-12 rounded-3xl text-center shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-qrcode"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-4" style={{ color: CONFIG.COLORS.primary }}>PIX</h3>
              <p className="mb-8" style={{ color: CONFIG.COLORS.textDark }}>Contribua via PIX escaneando o QR Code ou copiando a chave abaixo.</p>

              <div className="my-8 flex justify-center" onClick={handlePixQRView}>
                <QRCode value={CONFIG.GIFTS.pixKeyURL} size={200} className="rounded-2xl shadow-lg" />
              </div>

              <div className="p-4 rounded-xl my-4 font-mono text-sm break-all" style={{ backgroundColor: CONFIG.COLORS.tertiary, color: CONFIG.COLORS.primary }}>
                {CONFIG.GIFTS.pixKeyMessage}
              </div>

              <button onClick={copyPixKey} className="inline-block px-10 py-4 text-white rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-xl mt-4" style={{ background: `linear-gradient(to right, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})` }}>
                <i className="fas fa-copy mr-2"></i> Copiar Chave PIX
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-white text-center py-12 px-8" style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})` }}>
        <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
        <p className="font-cormorant text-2xl mb-2">{CONFIG.BRIDE_NAME} & {CONFIG.GROOM_NAME}</p>
        <p className="mb-8">{CONFIG.WEDDING_DATE_DISPLAY}</p>
        <p className="mt-8 text-sm opacity-80">Feito com ♥ para celebrar nosso amor</p>
      </footer>

      {/* BOTÃO MÚSICA */}
      <div className="fixed bottom-8 right-8 z-[999]">
  {!isPlaying && (
    <div className="tooltip">
      Clique aqui para uma surpresa! 🎵
    </div>
  )}
  <button
    onClick={toggleMusic}
    className={`w-[60px] h-[60px] border-0 rounded-full cursor-pointer flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:rotate-12 ${isPlaying ? 'animate-pulse-custom' : ''}`}
    style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.secondary})` }}
    title="Controlar Música"
  >
    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl text-white`}></i>
  </button>
</div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}