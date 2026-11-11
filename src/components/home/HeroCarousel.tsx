import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  id: number;
  image: string;
  tag: string;
  locationLabel: string;
  headline: string;
  supporting: string;
  ctaText: string;
  targetPage: any;
  targetParams?: any;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    tag: 'Private Fleet & Chauffeur',
    locationLabel: 'Mayfair & St James’s · Curated Chauffeur Service',
    headline: 'Discretion by Default. British Poise by Nature.',
    supporting:
      'A black Rolls-Royce Cullinan waiting in the evening lamplight, coach doors held open with quiet precision, and London moving in seamless harmony with your calendar.',
    ctaText: 'Explore Chauffeur & Fleet',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'transport-security' },
  },
  {
    id: 2,
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    tag: 'Savile Row & Haute Horlogerie',
    locationLabel: 'Savile Row, Mayfair & Private Dressing Suites',
    headline: 'The Art of the British Gentleman & Lady.',
    supporting:
      'Hand-cut Savile Row evening attire arranged in private suites alongside provenance-verified acquisitions of elusive Rolex, Patek Philippe, and Cartier timepieces.',
    ctaText: 'Explore Sourcing & Tailoring',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'luxury-sourcing' },
  },
  {
    id: 3,
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    tag: 'Closed-Door Salons',
    locationLabel: 'Old Bond Street, Mount Street & Knightsbridge',
    headline: 'Closed-Door Shopping & Heritage Salons.',
    supporting:
      'After-hours access to Bond Street vaults, penthouse styling suites in Knightsbridge, and private haute couture viewings presented prior to public release.',
    ctaText: 'Explore Luxury Salons',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'experiences-culture' },
  },
  {
    id: 4,
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    tag: 'Private Sanctums & Gastronomy',
    locationLabel: 'St James’s & Mayfair · Private Table Custody',
    headline: 'The Table Nobody Else Can Book.',
    supporting:
      'Private wine cellars, discreet corner alcoves at London’s oldest clubs, and bespoke tasting menus orchestrated directly with celebrated chef-proprietors.',
    ctaText: 'Explore Dining & Clubs',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'dining-nightlife' },
  },
  {
    id: 5,
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    tag: 'Private Aviation',
    locationLabel: 'RAF Northolt & Farnborough · Global Mobility',
    headline: 'Every Departure, Pure Elegance.',
    supporting:
      'Ultra-long-range cabin comfort, direct tarmac transfers at thirty seconds’ notice, and effortless flight dispatch to Geneva, Milan, Aspen, and Tokyo.',
    ctaText: 'Explore Private Aviation',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'travel-aviation' },
  },
  {
    id: 6,
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    tag: 'Stately Residences',
    locationLabel: 'The Cotswolds, Belgravia & Surrey Enclaves',
    headline: 'English Sanctuaries, Flawlessly Kept.',
    supporting:
      'Turnkey country house provisioning, prime Belgravia townhouses, and heritage rural estates prepared to the quiet standard of a private hotel.',
    ctaText: 'Explore Residences & Relocation',
    targetPage: 'service-detail',
    targetParams: { serviceId: 'residences-relocation' },
  },
  {
    id: 7,
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    tag: 'Urban Sound & Nocturne Vaults',
    locationLabel: 'Vauxhall, Shoreditch & Mayfair Mews · After 00:00',
    headline: 'Where Street Culture Meets Sovereign Stealth.',
    supporting:
      'Subterranean hip-hop bass vaults, Shoreditch vinyl selector lofts, and locked alleyways entered straight from satin-black Maybachs under Tier 2 close protection.',
    ctaText: 'Explore Urban Sound & Sub-Rosa',
    targetPage: 'hidden-london-urban-clubs',
  },
];

export const HeroCarousel: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handleCta = () => {
    navigateTo(slide.targetPage, slide.targetParams);
  };

  return (
    <div
      className="relative w-full h-[94vh] min-h-[660px] max-h-[1080px] bg-[#08090C] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with smooth Ken-Burns crossfade (never blanks between slides) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />
          {/* Balanced bright-friendly scrim so photography shines on mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/35 to-[#07080B]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-[#07080B]/25 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Top-Right Medallion Crest Plaque */}
      <motion.div
        initial={{ opacity: 0.92, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute top-24 right-8 sm:right-14 z-10 pointer-events-none hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-24 h-28 bg-black/90 backdrop-blur-sm border border-[#E2BA6B]/45 p-3 shadow-2xl flex items-center justify-center">
          <img
            src="/assets/aistudio/tglc_crest_transparent.png"
            alt="TGLC Official Medallion"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain block"
          />
        </div>
      </motion.div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <motion.div
          key={`marker-${slide.id}`}
          initial={{ opacity: 0.88, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#E2BA6B]"
        >
          <span className="w-8 h-[1.5px] bg-[#E2BA6B]" />
          <span className="tglc-kicker">{slide.tag}</span>
          <span className="text-[#8F98AA] hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-[#D4D8E2] font-light hidden sm:inline">{slide.locationLabel}</span>
        </motion.div>

        <motion.h1
          key={`headline-${slide.id}`}
          initial={{ opacity: 0.9, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal text-[#FAF7F0] tracking-tight leading-[1.04] max-w-4xl text-balance"
        >
          {slide.headline}
        </motion.h1>

        <motion.p
          key={`support-${slide.id}`}
          initial={{ opacity: 0.9, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-[#D4D8E2] max-w-2xl font-normal leading-relaxed"
        >
          {slide.supporting}
        </motion.p>

        {/* Action Controls & Slide Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-6 pt-5 border-t border-white/15"
        >
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={handleCta}
              className="btn-gold px-6 sm:px-7 py-3.5 text-xs flex items-center gap-2.5 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => openIntroductionModal('General Membership & Private Consultation')}
              className="btn-outline-gold px-6 py-3.5 text-xs bg-[#0B0C10]/75 backdrop-blur-md"
            >
              Request an Introduction
            </button>

            <button
              onClick={() => navigateTo('commission-studio')}
              className="px-5 py-3.5 text-xs text-[#E2BA6B] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span className="hidden sm:inline">Commission Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>

          <div className="flex items-center gap-5 sm:gap-7 text-xs text-[#D4D8E2]">
            <div className="hidden md:flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[3px] transition-all duration-500 ${
                    idx === currentSlide
                      ? 'w-8 bg-[#E2BA6B]'
                      : 'w-2.5 bg-[#4A4E5E] hover:bg-[#8B672B]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono tracking-widest text-xs tabular-nums">
              <span className="text-[#E2BA6B] font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-[#5C6476]">/</span>
              <span className="text-[#8F98AA]">{String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="p-2.5 border border-[#8B672B]/60 hover:border-[#CFA85E] bg-[#0B0C10]/80 text-[#D9D4CA] hover:text-[#CFA85E] transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-2.5 border border-[#8B672B]/60 hover:border-[#CFA85E] bg-[#0B0C10]/80 text-[#D9D4CA] hover:text-[#CFA85E] transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
