'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from "react-qr-code";
import { sendGAEvent } from '@/app/lib/gtag'; // 👈 Importa a função de analytics

// ============================================
// 🎨 CONFIGURAÇÕES DO SITE (EDITE AQUI)
// ============================================

const CONFIG = {
  // 🎵 Arquivos de Mídia
  MUSIC_PATH: '/casamento.mp3',
  HERO_PHOTO: '/casa_fake.jpg',
  
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

  // 📍 Local do Evento
  VENUE: {
    name: 'Chácara do Italiano',
    address: 'BR-414 - Jardim Promissão',
    city: 'Anápolis - GO',
    cep: 'CEP 75073-815',
    time: '16h00',
    dresscode: 'Esporte Fino / Passeio Completo',
    parking: 'Estacionamento gratuito no local',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.7129614134537!2d-48.933898600000006!3d-16.2351898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea71335202019%3A0xef1729b983104328!2sCh%C3%A1cara%20do%20italiano!5e0!3m2!1spt-BR!2sbr!4v1768486848196!5m2!1spt-BR!2sbr',
    mapsLink: 'https://maps.app.goo.gl/oUUx8G2uGTDTs3Z16',
  },

  // 🎁 Presentes
  GIFTS: {
    pixKeyMessage: 'Tel: 62 99422-9811 - Ravyla Rachel',
    pixKeyURL: 'https://nubank.com.br/cobrar/3xpyj/69762c55-6e51-4116-8653-61ff6ddf7851',
    pixKey: '62 99422-9811',
    giftListUrl: 'https://lista.havan.com.br/Convidado/ItensListaPresente/891945#/',
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
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = WEDDING_DATE - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
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

  // 📊 Função para rastrear clique no botão "Como Chegar"
  const handleMapClick = () => {
    sendGAEvent('map_directions_click', {
      venue_name: CONFIG.VENUE.name,
      venue_city: CONFIG.VENUE.city,
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
            <li><a href="#local" onClick={(e) => smoothScroll(e, '#local')} className="font-medium text-sm tracking-wide transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full" style={{ color: CONFIG.COLORS.primary, textDecoration: 'none' }}>Local</a></li>
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
        {/* Imagem de fundo com overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${CONFIG.HERO_PHOTO})`,
            filter: 'brightness(0.7)'
          }}
        ></div>
        
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
          <p className="text-xl md:text-2xl my-6 font-normal tracking-[2px] text-shadow-strong" style={{ color: CONFIG.COLORS.textLight }}>{CONFIG.WEDDING_DATE_DISPLAY}</p>
          <p className="text-lg md:text-xl italic mb-12 text-shadow-strong" style={{ color: CONFIG.COLORS.tertiary }}>{CONFIG.VENUE.name}, {CONFIG.VENUE.city}</p>

          <div className="flex gap-8 justify-center mt-12 flex-wrap">
            {[
              { value: countdown.days, label: 'Dias' },
              { value: countdown.hours, label: 'Horas' },
              { value: countdown.minutes, label: 'Minutos' },
              { value: countdown.seconds, label: 'Segundos' }
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
                Hoje, celebramos não apenas o nosso casamento, mas a união de duas almas que se encontraram 
                e decidiram caminhar juntas para sempre. Queremos compartilhar este momento único com você, 
                que faz parte da nossa história.
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

      {/* LOCAL */}
      <section id="local" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ background: `linear-gradient(to bottom, ${CONFIG.COLORS.background}, ${CONFIG.COLORS.tertiary})` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Local da Cerimônia</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[435px]">
              <iframe 
                src={CONFIG.VENUE.mapsEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-xl">
              <h3 className="font-cormorant text-4xl mb-6" style={{ color: CONFIG.COLORS.primary }}>{CONFIG.VENUE.name}</h3>
              <p className="text-lg mb-4 leading-relaxed" style={{ color: CONFIG.COLORS.textDark }}>
                <i className="fas fa-map-marker-alt mr-2" style={{ color: CONFIG.COLORS.secondary }}></i>
                {CONFIG.VENUE.address}<br />
                {CONFIG.VENUE.city}, {CONFIG.VENUE.cep}
              </p>
              <p className="text-lg mb-4" style={{ color: CONFIG.COLORS.textDark }}>
                <i className="fas fa-clock mr-2" style={{ color: CONFIG.COLORS.secondary }}></i>
                Cerimônia às {CONFIG.VENUE.time}
              </p>
              <p className="text-lg mb-4" style={{ color: CONFIG.COLORS.textDark }}>
                <i className="fas fa-parking mr-2" style={{ color: CONFIG.COLORS.secondary }}></i>
                {CONFIG.VENUE.parking}
              </p>
              <p className="text-lg mb-6" style={{ color: CONFIG.COLORS.textDark }}>
                <i className="fas fa-info-circle mr-2" style={{ color: CONFIG.COLORS.secondary }}></i>
                Traje: {CONFIG.VENUE.dresscode}
              </p>
              <a href={CONFIG.VENUE.mapsLink} target="_blank" rel="noopener noreferrer" onClick={handleMapClick} className="inline-block px-10 py-4 text-white rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-xl" style={{ background: `linear-gradient(to right, ${CONFIG.COLORS.primary}, ${CONFIG.COLORS.accent})` }}>
                <i className="fas fa-directions mr-2"></i> Como Chegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAÇÃO */}
      <section id="programacao" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ backgroundColor: CONFIG.COLORS.backgroundAlt }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Programação do Dia</h2>
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

      {/* MANUAL DOS PADRINHOS */}
      <section id="manual" className="fade-in opacity-0 translate-y-8 transition-all duration-700 py-24 px-8" style={{ background: `linear-gradient(135deg, ${CONFIG.COLORS.tertiary}, ${CONFIG.COLORS.background})` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl mb-4" style={{ color: CONFIG.COLORS.secondary }}>✦ ❀ ✦</div>
            <h2 className="font-cormorant text-6xl mb-4" style={{ color: CONFIG.COLORS.primary }}>Manual dos Padrinhos</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg" style={{ color: CONFIG.COLORS.textDark }}>
              Preparamos um guia especial para que todos fiquem lindos e harmonizados no nosso grande dia!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* MADRINHAS */}
            <div className="bg-white p-12 rounded-3xl shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6 text-center" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-female"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-6 text-center" style={{ color: CONFIG.COLORS.primary }}>Madrinhas</h3>
              <p className="text-lg leading-relaxed mb-8 text-center" style={{ color: CONFIG.COLORS.textDark }}>
                Nesse dia queremos que você fique ainda mais bonita do que já é, por isso escolhemos a cor 
                <strong> azul royal</strong> e definimos uma paleta para você escolher seu tom preferido. 
                Como nossa cerimônia será ao ar livre na grama, recomendamos o uso de <strong>saltos blocados (quadrados)</strong> ou adaptadores de salto para que você aproveite cada momento com total conforto e segurança!
              </p>
              
              {/* Paleta de cores para madrinhas */}
              <div className="flex justify-center gap-4 mt-6">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#00357A' }} title="Azul Royal"></div>
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#1A4D8F' }} title="Azul Médio"></div>
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#2E5FA3' }} title="Azul Claro"></div>
              </div>
            </div>

            {/* PADRINHOS */}
            <div className="bg-white p-12 rounded-3xl shadow-xl transition-all hover:-translate-y-4 hover:shadow-2xl">
              <div className="text-6xl mb-6 text-center" style={{ color: CONFIG.COLORS.secondary }}>
                <i className="fas fa-male"></i>
              </div>
              <h3 className="font-cormorant text-4xl mb-6 text-center" style={{ color: CONFIG.COLORS.primary }}>Padrinhos</h3>
              <p className="text-lg leading-relaxed mb-8 text-center" style={{ color: CONFIG.COLORS.textDark }}>
                Para você nós pensamos em uma cor de gravata complementar ao vestido das madrinhas, por isso, use 
                um <strong>terno bege</strong> com uma <strong>camisa branca</strong> e <strong>gravata azul royal</strong>. 
                Definimos a paleta abaixo para o terno.
              </p>
              
              {/* Paleta de cores para padrinhos */}
              <div className="flex justify-center gap-4 mt-6">
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#E8DCC4' }} title="Bege Claro"></div>
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#D4C5A9' }} title="Bege Médio"></div>
                <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: '#C5A572' }} title="Bege Escuro"></div>
              </div>
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
              Sua presença é o nosso maior presente! Mas se desejar nos presentear, 
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