import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { CALENDAR_EVENTS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowUpRight, MapPin, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  'All Events',
  'Art & Culture',
  'Dining',
  'Fashion',
  'Music',
  'Sport',
  'Family',
  'London After Dark',
  'Private Invitations',
];

const MONTHS = ['ALL', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER'] as const;

const MONTH_LABELS: Record<(typeof MONTHS)[number], string> = {
  ALL: 'All Months',
  JUNE: 'June',
  JULY: 'July',
  AUGUST: 'August',
  SEPTEMBER: 'September',
  OCTOBER: 'October',
};

const CALENDAR_HERO_SLIDES = [
  {
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    title: 'Covent Garden & Royal Opera Season',
    subtitle: 'Private Grand Tier boxes, interval drawing rooms, and maestro introductions',
  },
  {
    image: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
    title: 'Wimbledon SW19 & Guards Polo',
    subtitle: 'Centre Court debenture allocations, Guards Polo Windsor, and organic estate feasts',
  },
  {
    image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    title: 'Frieze Masters & Closed Cellar Dinners',
    subtitle: 'Unlisted dining rooms, Chateau Margaux masterclasses, and Frieze Masters breakfasts',
  },
  {
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    title: 'Vauxhall Sound Vaults & Shoreditch Vinyl Nights',
    subtitle: 'Closed-door hip-hop sound rooms, touring selector lofts, and satin Maybach arrivals',
  },
  {
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    title: 'Sub-Rosa London Nocturne & Vault Suppers',
    subtitle: 'Midnight stealth river launches, 280-year-old bullion vaults, and Soho jazz dens',
  },
  {
    image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
    title: 'Airfield Paddock & Static Aviation Days',
    subtitle: 'Goodwood Drivers Club, Farnborough flight-line access, and VIP JetVan mobility',
  },
];

export const CalendarPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');
  const [selectedMonth, setSelectedMonth] = useState<(typeof MONTHS)[number]>('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CALENDAR_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const filteredEvents = CALENDAR_EVENTS.filter((e) => {
    const matchCat =
      selectedCategory === 'All Events' ||
      (selectedCategory === 'Private Invitations' ? e.isPrivateInvitation : e.category === selectedCategory);
    const matchMonth = selectedMonth === 'ALL' || e.month === selectedMonth;
    return matchCat && matchMonth;
  });

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pb-14 overflow-hidden">
      {/* 1. Cinematic Moving Ken-Burns Calendar Hero Carousel */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center border-b border-[#1D2230] pt-14 sm:pt-18 pb-14 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: [1.08, 1, 1.04] }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              opacity: { duration: 1.1, ease: 'easeInOut' },
              scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute inset-0 z-0"
          >
            <img
              src={CALENDAR_HERO_SLIDES[currentSlide].image}
              alt={CALENDAR_HERO_SLIDES[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/50 to-[#07080B]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-transparent to-[#07080B]/65" />

        {/* Carousel Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + CALENDAR_HERO_SLIDES.length) % CALENDAR_HERO_SLIDES.length)}
            className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#E2BA6B]/30 transition-all backdrop-blur-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % CALENDAR_HERO_SLIDES.length)}
            className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#E2BA6B]/30 transition-all backdrop-blur-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter & Indicators */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-3">
          <div className="px-3 py-1 bg-[#07080B]/85 border border-[#E2BA6B]/30 text-[10px] tracking-widest text-[#E2BA6B] font-mono tabular-nums backdrop-blur-md">
            0{currentSlide + 1} / 0{CALENDAR_HERO_SLIDES.length} · {CALENDAR_HERO_SLIDES[currentSlide].title}
          </div>
          <div className="flex gap-1.5">
            {CALENDAR_HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.title}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all ${
                  idx === currentSlide ? 'w-8 bg-[#E2BA6B]' : 'w-2 bg-[#FAF7F0]/30 hover:bg-[#FAF7F0]/60'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tglc-kicker block"
          >
            Seasonal Agenda · Summer & Autumn 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F0] leading-tight text-balance"
          >
            The London Calendar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-2xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            “London, understood from every angle.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#D4D8E2] leading-relaxed font-normal max-w-2xl mx-auto"
          >
            A curated seasonal schedule spanning private gallery previews, Wimbledon Centre Court debentures, subterranean cellar suppers, Royal Opera House boxes, and weekend retreats across the British countryside.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10 pt-8 sm:pt-10">
        {/* 2. Precision-Aligned Filter & View Command Bar */}
        <section aria-label="Calendar filters" className="bg-[#0D1017] border border-[#242630] overflow-hidden">
          {/* Top Header Bar: Result Count + Flush Segmented Cards / Timeline Switcher */}
          <div className="px-5 sm:px-6 py-4 border-b border-[#1D2230] flex flex-wrap items-center justify-between gap-4 bg-[#10131C]">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="tglc-kicker text-[10px]">Curated Schedule</span>
              <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
              <span className="text-[#D4D8E2] tabular-nums">
                Showing <strong className="text-[#E2BA6B] font-semibold">{filteredEvents.length}</strong> of {CALENDAR_EVENTS.length} gatherings
              </span>
              {(selectedCategory !== 'All Events' || selectedMonth !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All Events');
                    setSelectedMonth('ALL');
                  }}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="inline-flex items-center bg-[#07080B] border border-[#242630] p-1 h-10 shrink-0">
              {(['cards', 'timeline'] as const).map((mode) => {
                const active = viewMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    aria-label={mode === 'cards' ? 'Gallery cards view' : 'Chronological timeline view'}
                    className={`relative h-8 px-4 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                      active ? 'text-[#07080B]' : 'text-[#8F98AA] hover:text-[#FAF7F0]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="calendarViewPill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 bg-[#E2BA6B]"
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5">
                      {mode === 'cards' ? <Grid className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
                      <span className="capitalize">{mode}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 1: Discipline Filter Matrix */}
          <div className="px-5 sm:px-6 py-4 border-b border-[#1D2230] flex flex-col lg:flex-row lg:items-start gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B] shrink-0 lg:w-28 lg:pt-2">
              Discipline
            </span>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-9 px-3.5 text-xs font-medium whitespace-nowrap shrink-0 inline-flex items-center justify-center transition-colors border ${
                      active
                        ? 'bg-[#B98633] text-[#07080B] border-[#E2BA6B] font-semibold'
                        : 'text-[#D4D8E2] hover:text-[#FAF7F0] bg-[#131722] border-[#262936] hover:border-[#8B672B]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Flush Month Selector Bar */}
          <div className="px-5 sm:px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B] shrink-0 lg:w-28">
              Month
            </span>
            <div className="inline-flex flex-wrap items-center gap-1 bg-[#07080B] border border-[#242630] p-1 w-full lg:w-auto">
              {MONTHS.map((m) => {
                const active = selectedMonth === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMonth(m)}
                    className={`relative h-8 px-4 text-xs font-medium whitespace-nowrap shrink-0 inline-flex items-center justify-center transition-colors ${
                      active ? 'text-[#FAF7F0]' : 'text-[#8F98AA] hover:text-[#FAF7F0]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="calendarMonthPill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 bg-[#181C28] border border-[#8B672B]"
                      />
                    )}
                    <span className="relative z-10">{MONTH_LABELS[m]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Editorial Essay + Featured Seasonal Diptych & Signature Highlights */}
        <section className="space-y-6">
          <div className="bg-[#0D1017] border border-[#1E2332] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-1.5">
              <span className="tglc-kicker block">
                Custody Before Commerce
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] text-balance">
                How TGLC Secures Over-Subscribed Dates
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-2.5 text-sm text-[#D4D8E2] leading-relaxed font-normal">
              <p>
                TGLC never scrambles on secondary ticket exchanges forty-eight hours before curtain up. Our cultural practice holds direct multi-year debentures across Centre Court at SW19, Royal Opera House boxes in Covent Garden, and private estate shooting syndicates across Hampshire and Oxfordshire.
              </p>
              <p>
                Every entry below is curated months in advance with matching chauffeur staging, interval salons, and private post-performance suppers handled through your Albemarle Street director.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5 }}
              onClick={() => openIntroductionModal('Private Debenture & Estate Allocation')}
              className="group cursor-pointer relative aspect-[16/9] overflow-hidden border border-[#1E2332] hover:border-[#E2BA6B]/60 bg-black"
            >
              <img
                src="/assets/aistudio/highland_stone_estate_1794391698042.jpg"
                alt="Summer Estate Withdrawals"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <span className="tglc-kicker block">
                  Countryside & Estate Season
                </span>
                <h3 className="font-serif text-2xl text-[#FAF7F0] text-balance">
                  Private Shooting Weekends, Polo Boxes & Goodwood Revival
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              onClick={() => openIntroductionModal('Autumn Gallery & Private Supper Allocation')}
              className="group cursor-pointer relative aspect-[16/9] overflow-hidden border border-[#1E2332] hover:border-[#E2BA6B]/60 bg-black"
            >
              <img
                src="/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg"
                alt="Frieze Masters Private Pavilion & Cellar Dinners"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <span className="tglc-kicker block">
                  Mayfair & St James’s Season
                </span>
                <h3 className="font-serif text-2xl text-[#FAF7F0] text-balance">
                  Frieze Previews, Cellar Dinners & Late-Autumn Wine Tastings
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Seasonal Signature Highlights 3-Photo Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
                title: 'Paddock & Concours Access',
                tag: 'Goodwood · Private Fleet',
              },
              {
                img: '/assets/aistudio/ufc_arena_ringside.jpg',
                title: 'Championship Cageside & Suites',
                tag: 'The O2 · Arena Hospitality',
              },
              {
                img: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
                title: 'Urban Vinyl & Sound Buyouts',
                tag: 'Shoreditch · Closed Doors',
              },
            ].map((sig, i) => (
              <motion.div
                key={sig.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                onClick={() => openIntroductionModal(`Signature Inquiry: ${sig.title}`)}
                className="bg-[#0D1017] border border-[#1E2332] hover:border-[#8B672B] overflow-hidden cursor-pointer group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={sig.img}
                    alt={sig.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 flex items-center justify-between text-xs gap-2">
                  <span className="font-serif text-base text-[#FAF7F0] truncate">{sig.title}</span>
                  <span className="font-mono text-[#E2BA6B] text-[10px] uppercase tracking-wider shrink-0">{sig.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 4. Events Layout */}
        {filteredEvents.length === 0 ? (
          <div className="p-10 text-center bg-[#0E1016] border border-[#20222E] space-y-3">
            <h3 className="font-serif text-2xl text-[#F4F1EA]">No matching dates for this filter combination</h3>
            <p className="text-xs text-[#9C968A]">Reset to All Events or ask your Mayfair director for unlisted private invitations.</p>
            <button
              onClick={() => { setSelectedCategory('All Events'); setSelectedMonth('ALL'); }}
              className="btn-outline-gold px-5 py-2 text-xs mt-2"
            >
              Reset Calendar Filters
            </button>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredEvents.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.04 }}
                className="group bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/65 p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden mb-5 bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105"
                    />
                  </div>

                    <div className="flex items-center justify-between text-xs mb-2.5 gap-2 font-mono tabular-nums">
                      <span className="text-[#E2BA6B] font-medium">{item.category}</span>
                      <span className="text-[#8F98AA]">{item.dates}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed line-clamp-3 mb-4 font-normal">
                      {item.description}
                    </p>

                    <div className="p-3.5 bg-[#121622] border border-[#1E2332] text-xs text-[#E2BA6B] italic leading-relaxed mb-4 font-serif">
                      “{item.curatorNote}”
                    </div>
                </div>

                <div className="pt-4 border-t border-[#1D1F28] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-[#9C968A] flex items-center gap-1.5 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-[#B98633] shrink-0" />
                    <span className="truncate">{item.neighbourhood}</span>
                  </div>

                  <button
                    onClick={() => openIntroductionModal(`Inquiry / RSVP for: ${item.title}`)}
                    className="text-xs text-[#CFA85E] hover:text-white transition-colors flex items-center gap-1 font-medium shrink-0"
                  >
                    <span>Inquire / RSVP</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#1D1F28] border-y border-[#1D1F28]">
            {filteredEvents.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#0E1016] px-4 transition-colors"
              >
                <div className="flex items-start md:items-center gap-6">
                  <div className="w-20 text-center shrink-0">
                    <span className="block text-[11px] uppercase tracking-widest text-[#C4933F]">{item.month}</span>
                    <span className="font-serif text-3xl text-[#F4F1EA] tabular-nums">{item.day}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#CFA85E]">
                      <span>{item.category}</span>
                      <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
                      <span className="text-[#D9D4CA]">{item.neighbourhood}</span>
                      {item.isPrivateInvitation && (
                        <>
                          <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
                          <span className="text-[#DDB872] font-medium">Invitation Only</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">{item.title}</h3>
                    <p className="text-xs text-[#9C968A] max-w-2xl leading-relaxed font-light">{item.description}</p>
                    <p className="text-[11px] text-[#8E8A83] flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3 h-3 text-[#B98633]" />
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => openIntroductionModal(`Inquiry / RSVP for: ${item.title}`)}
                    className="btn-outline-gold px-5 py-2.5 text-xs flex items-center gap-1.5"
                  >
                    <span>Inquire / RSVP</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#CFA85E]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <GoldDivider />

        {/* Bottom Editorial Callout */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          className="p-8 sm:p-10 bg-[#0E1016] border border-[#20222E] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-[#C4933F]">Custom Itineraries</span>
            <h3 className="font-serif text-2xl text-[#F4F1EA]">Seeking an Unlisted Private Opening?</h3>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-xl font-light">
              Our cultural practice routinely arranges bespoke weekends built around private museum access, historic estate stays, or sporting debentures not listed in any public calendar.
            </p>
          </div>
          <button
            onClick={() => openIntroductionModal('Bespoke Cultural Itinerary')}
            className="btn-gold px-7 py-3.5 text-xs whitespace-nowrap shrink-0"
          >
            Design a Bespoke Weekend
          </button>
        </motion.div>
      </div>
    </div>
  );
};
