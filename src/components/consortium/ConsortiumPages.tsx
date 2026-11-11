import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { TEAM_MEMBERS, ETHOS_PRINCIPLES, APPROACH_STEPS, LONDON_NEIGHBOURHOODS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowUpRight, Shield, Award, Lock, Check, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { ConsortiumLocationsMap } from './ConsortiumLocationsMap';

const CONSORTIUM_HERO_SLIDES = [
  {
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    title: 'Albemarle Drawing Room',
    caption: 'Private chambers at 45 Albemarle Street, Mayfair',
  },
  {
    image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    title: 'St James’s & Mayfair Heritage',
    caption: 'Curated architectural stewardship across prime London',
  },
  {
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    title: 'English Country Manors',
    caption: 'Cotswolds & Oxfordshire weekend estates under single-desk oversight',
  },
  {
    image: '/assets/aistudio/florence_palazzo_courtyard.jpg',
    title: 'European Keyholder Access',
    caption: 'Tuscan private palazzos and Geneva vaults',
  },
  {
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    title: 'Bespoke Patronage',
    caption: 'Master ateliers and heritage craftsmanship appointments',
  },
];

interface ConsortiumPagesProps {
  subPage?: 'overview' | 'about' | 'ethos' | 'approach' | 'network' | 'our-london' | 'privacy';
}

const REVEAL_SECTION = {
  initial: { opacity: 0.9, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

const HERO_KEN_BURNS = {
  initial: { scale: 1.05, opacity: 0.9 },
  animate: { scale: [1.05, 1, 1.04], opacity: 1 },
  transition: {
    scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
    opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SUB_TABS: {
  key: NonNullable<ConsortiumPagesProps['subPage']>;
  route: Parameters<ReturnType<typeof useNavigation>['navigateTo']>[0];
  label: string;
}[] = [
  { key: 'overview', route: 'consortium', label: 'Consortium Overview' },
  { key: 'about', route: 'about', label: 'About & Leadership' },
  { key: 'ethos', route: 'ethos', label: 'Our Ethos' },
  { key: 'approach', route: 'approach', label: 'Our Approach' },
  { key: 'network', route: 'network', label: 'The TGLC Network' },
  { key: 'our-london', route: 'our-london', label: 'Our London & Map' },
  { key: 'privacy', route: 'privacy-discretion', label: 'Privacy & Discretion' },
];

export const ConsortiumPages: React.FC<ConsortiumPagesProps> = ({ subPage = 'overview' }) => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [selectedLondonArea, setSelectedLondonArea] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const activeTabLabel = SUB_TABS.find((t) => t.key === subPage)?.label ?? 'Overview';

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % CONSORTIUM_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pt-6 sm:pt-8 pb-14 overflow-hidden">
      {/* Compact Sub-Navigation Rail */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1A1C24]">
          <div className="flex items-center gap-2 text-xs tracking-wide text-[#CFA85E]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#F4F1EA] transition-colors">
              Home
            </button>
            <span className="text-[#8B672B]">/</span>
            <button onClick={() => navigateTo('consortium')} className="text-[#D9D4CA] hover:text-[#F4F1EA] transition-colors">
              The Consortium
            </button>
            {subPage !== 'overview' && (
              <>
                <span className="text-[#8B672B]">/</span>
                <span className="text-[#F4F1EA] font-medium">{activeTabLabel}</span>
              </>
            )}
          </div>
          <span className="text-[11px] text-[#9C968A] hidden sm:inline tabular-nums">
            TGLC House · 3rd Floor, 45 Albemarle Street, Mayfair
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#222530] pb-3 text-xs sm:text-[13px] tracking-wide scrollbar-none">
          {SUB_TABS.map((tab) => {
            const active = subPage === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => navigateTo(tab.route)}
                className={`relative px-3.5 py-2 whitespace-nowrap transition-colors ${
                  active ? 'text-[#F4F1EA] font-medium' : 'text-[#9C968A] hover:text-[#F4F1EA]'
                }`}
              >
                <span>{tab.label}</span>
                {active && (
                  <motion.span
                    layoutId="consortiumActiveTab"
                    className="absolute inset-x-3 -bottom-3 h-[2px] bg-[#CFA85E]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. Consortium Overview Subpage */}
      {/* ========================================================= */}
      {subPage === 'overview' && (
        <div className="space-y-10 sm:space-y-12">
          {/* Full-Width Matching Photographic Hero with Moving Carousel */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
              className="relative min-h-[420px] sm:min-h-[500px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={heroSlide}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: [1.08, 1, 1.04] }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{
                    opacity: { duration: 1.1, ease: 'easeInOut' },
                    scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={CONSORTIUM_HERO_SLIDES[heroSlide].image}
                    alt={CONSORTIUM_HERO_SLIDES[heroSlide].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              {/* Prev / Next controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHeroSlide((prev) => (prev - 1 + CONSORTIUM_HERO_SLIDES.length) % CONSORTIUM_HERO_SLIDES.length)}
                  className="p-2 bg-[#07080B]/75 hover:bg-[#B98633] text-[#E2BA6B] hover:text-[#07080B] border border-[#B98633]/30 backdrop-blur-md transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-2 py-1 bg-[#07080B]/80 border border-[#B98633]/30 text-[10px] tracking-widest text-[#E2BA6B] font-mono tabular-nums">
                  {String(heroSlide + 1).padStart(2, '0')} / {String(CONSORTIUM_HERO_SLIDES.length).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => setHeroSlide((prev) => (prev + 1) % CONSORTIUM_HERO_SLIDES.length)}
                  className="p-2 bg-[#07080B]/75 hover:bg-[#B98633] text-[#E2BA6B] hover:text-[#07080B] border border-[#B98633]/30 backdrop-blur-md transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Progress Line Indicator */}
              <div className="absolute top-0 inset-x-0 z-20 grid grid-cols-5 gap-1 p-1 bg-[#07080B]/40">
                {CONSORTIUM_HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.title}
                    onClick={() => setHeroSlide(idx)}
                    className={`h-0.5 transition-all ${
                      idx === heroSlide ? 'bg-[#E2BA6B]' : 'bg-[#FAF7F0]/25 hover:bg-[#FAF7F0]/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Mayfair, London W1S 4JL · Private Office
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  A private house built on trust, instinct, and sound judgement.
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “The right introduction, at the right moment.”
                </p>
                <p className="tglc-prose text-sm sm:text-base max-w-2xl">
                  The Global Luxury Consortium exists for individuals and families who have outgrown scripted hotel desks and impersonal call centres. From TGLC House at 3rd Floor, 45 Albemarle Street, we steward every practical and cultural contour of life in London and abroad with calm poise and unwavering discretion.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Editorial Narrative + Paired Large Photographs */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
            <motion.div {...REVEAL_SECTION} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                  Life Behind Unmarked Doors
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] leading-tight">
                  Stewardship shaped by human relationships, never software queues.
                </h2>
                <p className="text-sm sm:text-base text-[#C8C2B7] leading-relaxed font-light">
                  When a diplomatic aircraft touches down at Farnborough ahead of schedule, or a rare pocket watch needs discreet authentication by an independent horologist in Mayfair, your Lifestyle Director does not log a ticket into an outsourced portal. They speak directly with colleagues they have broken bread with for fifteen years.
                </p>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  We intentionally keep our member roster small so our principals actually recognise the voices of every household in their care—your preferred corners in St James’s dining rooms, your seasonal countryside shooting calendar, and the unhurried rhythm your family values most.
                </p>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Nothing is templated or delegated to scripted call centres. Whether negotiating an off-market Belgravia townhouse lease or lighting the hearth at a Cotswolds estate six hours before arrival, every decision settles quietly behind our third-floor Albemarle Street doors.
                </p>
              </div>
              <div className="lg:col-span-6 overflow-hidden border border-[#242630] bg-[#12141A] group">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg"
                    alt="Mayfair private Georgian residence drawing room"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-5 py-3.5 border-t border-[#222530] flex flex-wrap items-center justify-between gap-2 text-xs text-[#D4D8E2]">
                  <span>Morning fireplace checks and fresh floral staging completed prior to household arrival</span>
                  <span className="text-[#E2BA6B] font-mono text-[11px]">Mayfair · Belgravia SW1</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 overflow-hidden border border-[#242630] bg-[#12141A] group">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/assets/aistudio/florence_palazzo_courtyard.jpg"
                    alt="European palazzo courtyard privately prepared for TGLC members"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-5 py-3.5 border-t border-[#222530] flex flex-wrap items-center justify-between gap-2 text-xs text-[#D4D8E2]">
                  <span>Private Florentine palazzo courtyards prepared exclusively for single-household stays</span>
                  <span className="text-[#E2BA6B] font-mono text-[11px]">Florence · Geneva · Paris</span>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                  Borderless Continuity
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] leading-tight">
                  A single standard of quiet precision across continents.
                </h2>
                <p className="text-sm sm:text-base text-[#C8C2B7] leading-relaxed font-light">
                  Although Mayfair is our philosophical and operational heart, contemporary life moves effortlessly between London, Geneva, the Tuscan hills, and Tokyo. Rather than passing your family to unfamiliar regional affiliates, your single TGLC desk coordinates every flight leg, private museum keyholder, and villa staff roster under one roof.
                </p>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Our regional fixers in Italy, France, Switzerland, and Japan report directly to Camilla Vance-Moreau and Julian Sterling, preserving the exact tone, billing transparency, and security discipline established in London.
                </p>
              </div>
            </motion.div>
          </section>

          <GoldDivider />

          {/* Life in the House — Visual Triptych Gallery */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1D1F28] pb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1">
                  Visual Chronicle
                </span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">
                  Morning Dispatch to Late-Evening Sanctums
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#9C968A] max-w-md font-light">
                Every hour of a household’s week supported with serene attention across Mayfair, Savile Row, and Royal Covent Garden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  img: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
                  kicker: 'Precision Transit',
                  title: 'Wing-to-Townhouse Chauffeur',
                  caption: 'Direct tarmac coordination out of Farnborough and Northolt in armoured and luxury British fleets.',
                  action: () => navigateTo('service-detail', { serviceId: 'transport-security' }),
                },
                {
                  img: '/assets/aistudio/savile_row_bespoke.jpg',
                  kicker: 'Master Commissions',
                  title: 'Savile Row & Bond Street Suites',
                  caption: 'Private off-hour dressing salons and independent master cutters attending your London residence.',
                  action: () => navigateTo('service-detail', { serviceId: 'luxury-sourcing' }),
                },
                {
                  img: '/assets/aistudio/mayfair_fine_dining.jpg',
                  kicker: 'Evening Hospitality',
                  title: 'Unlisted Tables & Wine Vaults',
                  caption: 'Acoustic corner alcoves, private dining rooms, and pre-pulled vintages arranged by personal introduction.',
                  action: () => navigateTo('service-detail', { serviceId: 'dining-nightlife' }),
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={card.action}
                  className="group cursor-pointer bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={card.img}
                        alt={card.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-[11px] uppercase tracking-widest text-[#CFA85E] block">
                        {card.kicker}
                      </span>
                      <h3 className="font-serif text-2xl text-[#F4F1EA] group-hover:text-[#DDB872] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#9C968A] leading-relaxed font-light">{card.caption}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 pt-3 border-t border-[#1D1F28] text-xs text-[#CFA85E] flex items-center justify-between">
                    <span>Inspect Practice</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Three Pillars Cards */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                num: '01 · Purpose',
                title: 'Curated Attention',
                body: 'We strictly cap the number of families entrusted to each Senior Principal, preserving the unhurried time required to anticipate nuances before they ever become urgent requests.',
                cta: 'Meet Leadership',
                route: 'about' as const,
              },
              {
                num: '02 · Principles',
                title: 'Sound Judgement',
                body: 'Real access is earned through years of mutual decency—never paid directories or scripted pitches. Our introductions carry personal accountability on both sides of the door.',
                cta: 'Read Our Ethos',
                route: 'ethos' as const,
              },
              {
                num: '03 · Trust',
                title: 'Privacy by Default',
                body: 'Every dossier is governed under English Law non-disclosure covenants. Where anonymity matters most, pseudonymised arrivals and encrypted briefings come as standard.',
                cta: 'Confidentiality Code',
                route: 'privacy-discretion' as const,
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0.9, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-7 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <span className="text-xs tracking-[0.18em] text-[#E2BA6B] font-medium block">
                    {card.num}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed font-light">
                    {card.body}
                  </p>
                </div>
                <button
                  onClick={() => navigateTo(card.route)}
                  className="text-xs tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] pt-2 inline-flex items-center gap-1.5 transition-colors self-start"
                >
                  <span>{card.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </section>

          {/* Governance Charter & Hard Operational Limits */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { val: '12 : 1', label: 'Capped Household Ratio per Senior Director' },
                { val: '0.0%', label: 'Supplier Commissions or Referral Mark-Ups' },
                { val: 'English Law', label: 'Perpetual Non-Disclosure Covenants' },
                { val: '24 / 7 / 365', label: 'Mayfair Duty Line & Crisis Despatch' },
              ].map((stat) => (
                <div key={stat.label} className="p-5 bg-[#0D1017] border border-[#242630] space-y-1.5">
                  <span className="font-serif text-2xl sm:text-3xl text-[#E2BA6B] tabular-nums block">
                    {stat.val}
                  </span>
                  <p className="text-xs text-[#D4D8E2] font-light leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#20232E] pb-4">
                <div>
                  <span className="tglc-kicker text-[11px] block mb-1">House Governance Charter</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                    Four Structural Distinctions of Albemarle Street Stewardship
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#E2BA6B]">Charter Schedule · Rev. 2026</span>
              </div>

              <div className="divide-y divide-[#1E212B]">
                {[
                  {
                    clause: 'Clause I · Single-Account Continuity',
                    obligation: 'No Ticket Numbers or Rotational Junior Handlers',
                    standard:
                      'Your nominated Lifestyle Director and named deputy hold complete authority across property, flight dispatch, cultural tables, and security—preserving context year after year.',
                  },
                  {
                    clause: 'Clause II · Direct Ledger Transparency',
                    obligation: '100% Pass-Through Cost Settlement',
                    standard:
                      'Every aircraft invoice, art auction hammer settlement, and estate staffing bill is presented alongside primary vendor vouchers for seamless family office audit.',
                  },
                  {
                    clause: 'Clause III · Diplomatic & Sub-Rosa Range',
                    obligation: 'Equally Fluent in St James’s and East London',
                    standard:
                      'Our directors navigate Savile Row houses, Royal Opera gala boxes, and late-night sound-system lofts in Dalston or Soho with identical composure.',
                  },
                  {
                    clause: 'Clause IV · Sovereign Crisis Readiness',
                    obligation: 'Direct Extraction, Medical & Aviation Mobilisation',
                    standard:
                      'Unscheduled medical repatriations, airspace diversions, and SIA close-protection details launch under standing pre-cleared mandates without bureaucratic delay.',
                  },
                ].map((row) => (
                  <div key={row.clause} className="py-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                    <span className="lg:col-span-3 font-mono text-xs text-[#E2BA6B]">{row.clause}</span>
                    <span className="lg:col-span-4 font-serif text-lg text-[#FAF7F0]">{row.obligation}</span>
                    <p className="lg:col-span-5 text-xs text-[#D4D8E2] font-light leading-relaxed">{row.standard}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Admissions CTA */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <motion.div
              {...REVEAL_SECTION}
              className="p-8 sm:p-10 bg-[#12141A] border border-[#2A2D38] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#CFA85E]">Admissions Inquiry</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                  Explore Membership with TGLC
                </h3>
                <p className="text-xs sm:text-sm text-[#9C968A] max-w-2xl font-light leading-relaxed">
                  Our Membership Committee meets weekly at 3rd Floor, 45 Albemarle Street, Mayfair to consider private introductions by referral or direct inquiry. Conversations unfold in person over tea or by encrypted call, with transparent terms tailored to your household’s rhythm.
                </p>
              </div>
              <button
                onClick={() => openIntroductionModal('Consortium Overview Inquiry')}
                className="btn-gold px-7 py-3.5 text-xs whitespace-nowrap shrink-0"
              >
                Request an Introduction
              </button>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. About TGLC & Leadership Subpage */}
      {/* ========================================================= */}
      {subPage === 'about' && (
        <div className="space-y-10 sm:space-y-12">
          {/* Cinematic Hero */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[400px] sm:min-h-[460px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg"
                alt="45 Albemarle Street Mayfair private house architecture"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block tabular-nums">
                  Leadership & Heritage · 3rd Floor, 45 Albemarle Street
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  About The Global Luxury Consortium
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “A life arranged with precision, warmth, and unhurried grace.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  Founded by Mickell Washington and a four-person senior council to bring private-bank steadiness and genuine cultural fluency back to personal lifestyle management.
                </p>
              </motion.div>
            </div>
          </section>

          {/* House Story (Removed Sticking Logo, Enriched Editorial Text) + Two Large Photographs */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-4 text-sm sm:text-base text-[#C8C2B7] leading-relaxed font-light">
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                  Origin & Heritage
                </span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">
                  Built as an antidote to transactional concierge brokerage.
                </h2>
                <p>
                  The Global Luxury Consortium was established by Mickell Washington alongside a circle of family office strategists, art historians, and private aviation directors who shared a quiet frustration: modern concierge work had grown noisy, commission-driven, and increasingly indifferent to taste.
                </p>
                <p>
                  Anchored at TGLC House on historic Albemarle Street in Mayfair—moments from the Royal Academy, Old Bond Street galleries, and Berkeley Square—our third-floor office acts as a discreet extension of your household rather than an outside supplier.
                </p>
                <p>
                  Because we turn away high-volume volume retainers, every conversation happens person-to-person with principals who remember your estate preferences, your family’s travelling rhythm, and the subtler points of life in London.
                </p>

                <div className="pt-2 border-t border-[#1E202B] grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#12141A] border border-[#242630]">
                    <span className="font-serif text-2xl text-[#CFA85E] tabular-nums block">24/7</span>
                    <span className="text-[#9C968A]">Senior Duty Coverage</span>
                  </div>
                  <div className="p-3 bg-[#12141A] border border-[#242630]">
                    <span className="font-serif text-2xl text-[#CFA85E] block">Zero Mark-Ups</span>
                    <span className="text-[#9C968A]">Unconflicted Counsel</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="overflow-hidden border border-[#242630] bg-[#12141A] group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/assets/aistudio/tglc_st_james_salon.jpg"
                      alt="Members consultation drawing room at TGLC House"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 border-t border-[#222530]">
                    <span className="text-[11px] text-[#CFA85E] block uppercase tracking-wider">Mayfair Advisory Chamber</span>
                    <p className="text-xs text-[#9C968A] mt-1 font-light leading-relaxed">
                      Where family itineraries, UK educational placements, and private relocations are reviewed quietly over afternoon tea.
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden border border-[#242630] bg-[#12141A] group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/assets/aistudio/savile_row_bespoke.jpg"
                      alt="Traditional London tailoring craft and bespoke attention"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 border-t border-[#222530]">
                    <span className="text-[11px] text-[#CFA85E] block uppercase tracking-wider">Bespoke by Measurement</span>
                    <p className="text-xs text-[#9C968A] mt-1 font-light leading-relaxed">
                      Just like our neighbours on Savile Row, no two member dossiers ever borrow the same template or routine.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <GoldDivider />

          {/* Four Executive Stewards */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="border-b border-[#222530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#CFA85E] font-medium block mb-1.5">
                  Executive Leadership
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                  The Stewards of TGLC House
                </h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                Each principal directs a specialist desk while remaining personally reachable to the households in their care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#12141A] border border-[#242630] p-6 flex flex-col justify-between hover:border-[#CFA85E]/65 transition-all duration-300 group"
                >
                  <div>
                    <div className="aspect-[4/5] w-full overflow-hidden mb-5 bg-[#181A22] border border-[#2A2D38]">
                      <img
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[11px] tracking-wider text-[#E2BA6B] font-medium block">
                      {member.title}
                    </span>
                    <h3 className="font-serif text-xl text-[#FAF7F0] mt-1 mb-1 group-hover:text-[#E2BA6B] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#E2BA6B]/85 italic mb-3">{member.role}</p>
                    <p className="text-xs text-[#D4D8E2] leading-relaxed mb-4 font-light">{member.bio}</p>
                  </div>
                  <div className="pt-3 border-t border-[#20232E] text-xs text-[#FAF7F0]">
                    <span className="text-[#E2BA6B] block text-[10px] uppercase tracking-wider mb-0.5 font-mono">
                      Primary Command & Regions
                    </span>
                    {member.specialism}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* House Milestones & Institutional Heritage */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="tglc-kicker text-xs block mb-1">Chronicle of the House</span>
                <h2 className="font-serif text-3xl text-[#FAF7F0]">Milestones Across Two Decades of Quiet Practice</h2>
              </div>
              <span className="text-xs font-mono text-[#E2BA6B]">London W1S · Geneva · Florence</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  year: 'Founding Year',
                  heading: 'Established as an Anti-Commission Practice',
                  note: 'Mickell Washington inaugurates the first Mayfair advisory ledger to serve Sovereign and Principal households purely on retained neutrality.',
                },
                {
                  year: '2019 · Aviation Desk',
                  heading: 'Direct FBO Tarmac Protocols Secured',
                  note: 'Permanent ramp clearance agreements executed with Farnborough, RAF Northolt, and Geneva Cointrin ground commanders.',
                },
                {
                  year: '2022 · Albemarle St',
                  heading: 'Acquisition of 3rd Floor Drawing Rooms',
                  note: 'TGLC House opens at 45 Albemarle Street with acoustically shielded briefing salons, horology vault inspection lighting, and archive library.',
                },
                {
                  year: '2025 · Sub-Rosa Arm',
                  heading: 'Late-Hours & Urban Culture Desk Formalised',
                  note: 'Expanded patronage covering closed-door East London sound-system spaces, unadvertised Soho rooms, and rapid street-couture sourcing.',
                },
              ].map((m) => (
                <div key={m.year} className="p-6 bg-[#0D1017] border border-[#242630] space-y-2.5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] block">{m.year}</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0] leading-snug">{m.heading}</h4>
                  <p className="text-xs text-[#D4D8E2] leading-relaxed font-light">{m.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Visual Diptych: Albemarle Street & Collector Craft */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg"
                  alt="Private Mayfair clubs and cultural institutions"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Personal Representation</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Stepping Through W1S Doors</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Membership introductions are backed by the personal standing of our founders across London’s traditional clubs, art foundations, and private educational trusts.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/About-Luxury-Watches_77cb4520.jpg"
                  alt="Independent horology verification and collector stewardship"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Specialist Custody</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Independent Horology & Art Counsel</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Whether authenticating an estate movement or commissioning a private dining cellar, we sit permanently on the member’s side of the table—never accepting dealer rebates.
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. Our Ethos Subpage */}
      {/* ========================================================= */}
      {subPage === 'ethos' && (
        <div className="space-y-10 sm:space-y-12">
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[390px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/savile_row_bespoke.jpg"
                alt="Master craft and founding principles at Savile Row"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Founding Creed & Fiduciary Standard
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our Ethos & Five Immutable Principles
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “A rare breadth of access, guided always by quiet conviction.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  Everything we agree to undertake is governed by five unchanging convictions written before our first client joined—prioritising impartiality, taste, and absolute protection of household privacy.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Editorial Essay + Two Large Spreads */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="max-w-3xl space-y-3">
              <span className="tglc-kicker text-xs block">
                Why Brokerage Fails Families
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                Replacing Commercial Incentives with Quiet Stewardship
              </h2>
              <p className="tglc-prose text-sm">
                Traditional concierge services frequently disguise middleman commissions behind membership dues, nudging principals toward venues and charter operators that pay the highest referral fees. TGLC rejects affiliate incentives in their entirety. Every invoice passes through cleanly at direct provider cost, freeing your director to recommend an eight-seat East London omakase cellar or a Grand Hotel suite based purely on merit.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/bond_street_jewellery.jpg"
                    alt="High jewellery provenance and ethical independence on Bond Street"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Zero Commission Conflicts</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">Impartial Advice in Every Acquisition</h3>
                  <p className="text-xs sm:text-sm tglc-prose">
                    When guiding a household toward a timepiece, rare vintage cellar lot, or Mayfair pied-à-terre, our counsel stays completely independent from seller commissions.
                  </p>
                </div>
              </motion.div>

              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/highland_stone_estate_1794391698042.jpg"
                    alt="Historic Scottish and English country estate reserved privately for TGLC families"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Stewardship Across Generations</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">Long-Horizon Family Relationships</h3>
                  <p className="text-xs sm:text-sm tglc-prose">
                    Households often join us during a move to London and stay across decades—spanning school placements, Highland & Oxfordshire summer estates, and multi-generational family milestones.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Five Ethos Principles */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-5">
            {ETHOS_PRINCIPLES.map((principle, idx) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0.9, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ x: 3 }}
                className="p-6 sm:p-8 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-4 space-y-1.5">
                  <span className="font-serif italic text-3xl sm:text-4xl text-[#CFA85E] tabular-nums block">
                    {principle.number}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA] leading-snug">
                    {principle.title}
                  </h3>
                </div>

                <div className="lg:col-span-8 space-y-2.5">
                  <p className="font-serif text-lg sm:text-xl text-[#D9D4CA] leading-relaxed">
                    {principle.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                    {principle.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Ethos in Action Diptych */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/royal_opera_gallery.jpg"
                  alt="Covent Garden patronage and cultural access"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Cultural Patronage</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Preserving Institutions Through Discretion</h3>
                <p className="text-xs tglc-prose">
                  Private boxes and after-hours gallery views are extended because our patrons respect every institution’s quiet dignity.
                </p>
              </div>
            </motion.div>
              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png"
                  alt="Private aviation cabin preparation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Invisible Preparation</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Fifty Small Choices Decided Ahead of Time</h3>
                <p className="text-xs text-[#D4D8E2] tglc-prose">
                  Cabin temperature, nursery transfers, and preferred Mayfair morning newspapers are readied before you ask.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Four-Gate Partner Vetting Standard */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="tglc-kicker text-xs block mb-1">Procurement Discipline</span>
                <h2 className="font-serif text-3xl text-[#FAF7F0]">Four-Gate Partner Vetting & Conflict-Free Audit</h2>
              </div>
              <span className="text-xs font-mono text-[#E2BA6B]">Annual Compliance Verification</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  gate: 'Gate 01',
                  title: 'Operator & Solvency Audit',
                  body: 'Every aviation AOC holder, marine captain, and specialist courier clears annual hull insurance, maintenance log, and balance-sheet diligence.',
                },
                {
                  gate: 'Gate 02',
                  title: 'Unannounced Field Inspection',
                  body: 'Our principals personally test lighting, acoustics, security exits, and kitchen standards before recommending any new London or European dining room.',
                },
                {
                  gate: 'Gate 03',
                  title: 'Zero Commission Covenant',
                  body: 'Suppliers sign explicit non-rebate declarations; any discretionary trade discount achieved is credited directly onto the household ledger.',
                },
                {
                  gate: 'Gate 04',
                  title: 'Perpetual NDA Execution',
                  body: 'No subcontractor receives surname details or photographic permission without express written sign-off from the household Principal.',
                },
              ].map((g) => (
                <div key={g.gate} className="p-6 bg-[#0D1017] border border-[#242630] space-y-2.5">
                  <span className="font-mono text-xs text-[#E2BA6B] uppercase tracking-widest block">{g.gate}</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0] leading-snug">{g.title}</h4>
                  <p className="text-xs text-[#D4D8E2] leading-relaxed font-light">{g.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. Our Approach Subpage */}
      {/* ========================================================= */}
      {subPage === 'approach' && (
        <div className="space-y-10 sm:space-y-12">
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[390px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/florence_palazzo_courtyard.jpg"
                alt="Curated travel itinerary across Florence and London"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Methodology & Onboarding Journey
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our Approach to Bespoke Management
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  From quiet introduction over tea on Albemarle Street to seamless execution across time zones.
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We begin by listening—learning your household patterns, tastes, and security boundaries so future requests resolve effortlessly with minimal back-and-forth.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Two Visual Chapters */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/mayfair_fine_dining.jpg"
                  alt="Candlelit Mayfair dining table arranged discreetly for a member"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Warmth Before Efficiency</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Listening First, Solving Effortlessly</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We begin with an unhurried private conversation—never a rigid intake survey—so we grasp your household rhythm, humour, and unspoken standards from day one.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png"
                  alt="Farnborough private aviation hangar and diplomatic ground coordination"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">24/7 Duty Readiness</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Synchronised Wing-to-Door Transitions</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Our aviation desk communicates directly with residence housekeepers and chauffeurs in real time, ensuring nursery rooms, supper tables, and keys await on touchdown.
                </p>
              </div>
            </motion.div>
          </section>

          {/* 5 Step Onboarding Track */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1">
                  Onboarding Architecture
                </span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">Five Considered Stages of Induction</h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                Once introduced, most families complete induction quietly within two weeks while immediate requests activate on day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {APPROACH_STEPS.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="p-6 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif italic text-3xl text-[#CFA85E] tabular-nums block mb-2.5">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-xl text-[#F4F1EA] mb-2.5 leading-snug">{item.title}</h3>
                    <p className="text-xs text-[#9C968A] leading-relaxed font-light">{item.description}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#20232E] text-[10px] text-[#CFA85E] uppercase tracking-widest">
                    Stage {item.step}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Operational Imagery Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-[#12141A] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp"
                    alt="Chauffeur event coordination in Central London"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Stage-Managed Punctuality</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0]">Ceremonial & Private Event Fleet Standby</h4>
                  <p className="text-xs tglc-prose">
                    Every chauffeur briefs with venue security in advance so exits happen calmly from discreet side courtyards.
                  </p>
                </div>
              </div>

              <div className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg"
                    alt="Turnkey London residence staging"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Continuous Memory</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0]">Turnkey Residence & Wardrobe Preparation</h4>
                  <p className="text-xs tglc-prose">
                    Seasonal wardrobe rotations, floral preferences, and cellar restocks execute automatically prior to each return to town.
                  </p>
                </div>
              </div>
            </div>

            {/* First 90 Days Household Calibration & Live Cross-Desk Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-6 p-7 bg-[#0D1017] border border-[#242630] space-y-4">
                <div className="border-b border-[#20232E] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">First 90 Days Calibration Schedule</h3>
                  <span className="font-mono text-[11px] text-[#E2BA6B]">Household Sync</span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      window: 'Days 01 – 14',
                      focus: 'Dossier Encoding & Security Aliasing',
                      detail: 'Passport/visa vault mapping, medical allergies, preferred FBO gates, and Signal comms channels encrypted.',
                    },
                    {
                      window: 'Days 15 – 45',
                      focus: 'Residence, Fleet & Cellar Audit',
                      detail: 'London & country estate keyholding inventory, preferred driver roster vetting, and cellar provenance cataloging.',
                    },
                    {
                      window: 'Days 46 – 90',
                      focus: 'Annual Season & Family Office Alignment',
                      detail: 'Twelve-month calendar locked across Wimbledon, Venice, Gstaad, and quarterly ledger reconciliation formats.',
                    },
                  ].map((phase) => (
                    <div key={phase.window} className="p-4 bg-[#12151E] border border-[#20232E] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#E2BA6B]">{phase.window}</span>
                        <span className="text-xs text-[#FAF7F0] font-medium">{phase.focus}</span>
                      </div>
                      <p className="text-xs text-[#D4D8E2] font-light leading-relaxed">{phase.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 p-7 bg-[#0D1017] border border-[#242630] space-y-4">
                <div className="border-b border-[#20232E] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">Cross-Desk Friday Choreography</h3>
                  <span className="font-mono text-[11px] text-[#E2BA6B]">Sample Live Mandate</span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      time: '14:10 GMT · Farnborough EGLF',
                      task: 'Wheels-down clearance; two armoured British SUVs meet aircraft steps; luggage dispatched straight to Belgrave Square.',
                    },
                    {
                      time: '16:30 GMT · Old Bond Street',
                      task: 'Shuttered private salon viewing of independent tourbillon allocation with master watchmaker and tea service.',
                    },
                    {
                      time: '20:45 GMT · Mount Street Cellar',
                      task: 'Acoustic corner supper booth under alias reservation; pre-decanted 1989 Left Bank pairing awaiting Principal.',
                    },
                    {
                      time: '23:55 GMT · Shoreditch Loft',
                      task: 'Rear service lift transition to sound-isolated rotary vinyl & hip-hop lounge session with close protection standby.',
                    },
                  ].map((log) => (
                    <div key={log.time} className="p-4 bg-[#12151E] border border-[#20232E] space-y-1">
                      <span className="font-mono text-xs text-[#E2BA6B] block">{log.time}</span>
                      <p className="text-xs text-[#D4D8E2] font-light leading-relaxed">{log.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confidential Dossier Card (Clean Photo instead of Standalone Crest) */}
            <motion.div
              {...REVEAL_SECTION}
              className="bg-[#0D1017] border border-[#2A2D38] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
            >
              <div className="lg:col-span-4 min-h-[220px] bg-black overflow-hidden group">
                <img
                  src="/assets/aistudio/tglc_st_james_salon.jpg"
                  alt="TGLC House Consultation Room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-8 p-7 sm:p-9 space-y-3 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-[#E2BA6B]">Confidential Architecture</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                  The Confidential Member Dossier
                </h3>
                <p className="text-xs sm:text-sm tglc-prose text-[#D4D8E2]">
                  Following induction, your dedicated Lifestyle Manager curates an encrypted household dossier. Everything—from preferred aircraft cabin tail numbers and floral sensitivities to trusted private tutors and security protocols—lives quietly behind our third-floor Albemarle Street doors so you never repeat an instruction twice.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openIntroductionModal('Membership Onboarding Inquiry')}
                    className="btn-gold px-7 py-3 text-xs"
                  >
                    Begin Your Onboarding Journey
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. The TGLC Network Subpage */}
      {/* ========================================================= */}
      {subPage === 'network' && (
        <div className="space-y-10 sm:space-y-12">
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[390px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png"
                alt="Global private flight and continental partner network"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Curated Global Ecosystem
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  The TGLC Network
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  A private fellowship of custodians, pilots, scholars, and masters built purely on mutual standards.
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  Rather than subscribing to generic vendor software, TGLC works directly with named principals—aviation owners, Harley Street consultants, museum keepers, and aristocratic estates across Europe, North America, and Japan.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Two Large Pictorial Highlights */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg"
                  alt="Mediterranean superyacht berths and maritime captains at twilight"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Fleet & Maritime Principals</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Direct-to-Owner Operations</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  Instead of routing through retail charter brokers, we liaise straight with AOC flight owners, Thames river captains, and Mediterranean superyacht masters with zero hidden margin stacking.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/royal_opera_gallery.jpg"
                  alt="Covent Garden Royal Opera private cultural custodians"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Cultural Patronage</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Behind the Velvet Rope</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Our ties with Covent Garden conductors, museum keepers in London and Paris, and independent gallery directors unlock closed collections for serene private family viewings.
                </p>
              </div>
            </motion.div>
          </section>

          {/* 6 Network Pillars */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tag: 'Aviation & Maritime',
                title: 'Vetted Operators',
                desc: 'Direct agreements with Part 135 and EASA licensed fleet owners and private yacht captains—zero opaque brokerage layering.',
              },
              {
                tag: 'Arts & Antiquities',
                title: 'Curators & Dealers',
                desc: 'Independent keepers across Cork Street, St James’s, and the Marais offering provenance authentication and quiet acquisitions.',
              },
              {
                tag: 'Private Estates',
                title: 'Aristocratic Custodians',
                desc: 'Historic country houses, Highland sporting lodges, and Mediterranean clifftop villas never offered on public platforms.',
              },
              {
                tag: 'Health & Longevity',
                title: 'Harley Street Alliance',
                desc: 'Swift confidential introductions to leading London consultants, private diagnostic clinics, and Swiss alpine recovery houses.',
              },
              {
                tag: 'Security & Transit',
                title: 'SIA Close Protection',
                desc: 'Diplomatic-trained close protection teams selected for unassuming poise during family travel and ceremonial evenings.',
              },
              {
                tag: 'Fine Craft & Horology',
                title: 'Independent Masters',
                desc: 'Geneva movement artisans, Savile Row head cutters, and royal warrant silversmiths accepting private commissions.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0.9, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="p-7 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2.5"
              >
                <span className="text-[11px] uppercase tracking-widest text-[#CFA85E] block">
                  {item.tag}
                </span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Regional Chapters Triptych */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-5">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] block mb-1">Global Reach</span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">Continental Corridors</h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                Every European and intercontinental movement links directly back to your Mayfair team for uninterrupted continuity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  img: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
                  region: 'United Kingdom',
                  title: 'London, Oxford & The Highlands',
                  text: 'Townhouses in Belgravia, shooting estates across Gloucestershire, and direct helipad corridors from Battersea.',
                },
                {
                  img: '/assets/aistudio/florence_palazzo_courtyard.jpg',
                  region: 'Continental Europe',
                  title: 'Geneva, Paris, Milan & Tuscany',
                  text: 'After-hours Renaissance palazzos, Alpine chalets above Gstaad and St Moritz, and private yacht berths in Monaco.',
                },
                {
                  img: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
                  region: 'Transatlantic & Pacific',
                  title: 'New York, Miami & Tokyo',
                  text: 'Unlisted Manhattan dining salons, FBO customs fast-track across Teterboro, and omakase custodians in Ginza and Kyoto.',
                },
              ].map((cor) => (
                <div key={cor.title} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={cor.img}
                      alt={cor.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-1.5">
                    <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">{cor.region}</span>
                    <h4 className="font-serif text-xl text-[#FAF7F0]">{cor.title}</h4>
                    <p className="text-xs text-[#D4D8E2] tglc-prose">{cor.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Seven Global Regional Desks Directory */}
            <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5 mt-6">
              <div className="border-b border-[#20232E] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="tglc-kicker text-[11px] block mb-1">Regional Resident Desks</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                    Seven Active Chapters Connected Directly to Albemarle Street
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#E2BA6B]">Direct Resident Stewards</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    city: 'London · Mayfair HQ',
                    address: '3rd Floor, 45 Albemarle Street, W1S 4JL',
                    remit: 'Command Hub, Farnborough & Northolt FBO Dispatch, Royal Patronage & Sub-Rosa Nocturnal Program.',
                  },
                  {
                    city: 'Geneva · Rue du Rhône',
                    address: 'Private Banking & Horology Quarter',
                    remit: 'Independent manufactory allocations, Alpine helicopter transfers to Gstaad & Verbier, and fiduciary custodian sync.',
                  },
                  {
                    city: 'Paris · Place Vendôme',
                    address: '1st Arrondissement Haute Couture Desk',
                    remit: 'Closed haute couture fittings, private museum conservator tours, and Le Bourget tarmac clearance.',
                  },
                  {
                    city: 'Milan & Florence',
                    address: 'Via Montenapoleone & Borgo Pinti',
                    remit: 'Private palazzo keys, Lake Como Riva transfers, artisanal atelier commissions, and private harvest cellars.',
                  },
                  {
                    city: 'New York · Upper East Side',
                    address: 'East 68th Street & Teterboro FBO',
                    remit: 'Manhattan private clubs, discreet studio recording sessions, gallery acquisitions, and East Hampton aviation.',
                  },
                  {
                    city: 'Dubai · DIFC & Jumeirah',
                    address: 'Al Maktoum Jet Terminal Corridor',
                    remit: 'Winter yacht charter berths, family office regional summit logistics, and off-market luxury asset custody.',
                  },
                  {
                    city: 'Tokyo · Ginza Chūō-ku',
                    address: 'Haneda VIP & Kyoto Ryokan Network',
                    remit: 'Six-seat omakase introductions, independent denim & knife ateliers, and imperial garden keyholders.',
                  },
                ].map((desk) => (
                  <div key={desk.city} className="p-5 bg-[#12151E] border border-[#222633] space-y-2">
                    <span className="font-serif text-lg text-[#FAF7F0] block">{desk.city}</span>
                    <span className="font-mono text-[11px] text-[#E2BA6B] block">{desk.address}</span>
                    <p className="text-xs text-[#D4D8E2] font-light leading-relaxed">{desk.remit}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. Our London Enclaves & Interactive Map Subpage */}
      {/* ========================================================= */}
      {subPage === 'our-london' && (
        <div className="space-y-10 sm:space-y-12">
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[390px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/mayfair_fine_dining.jpg"
                alt="Mayfair and St James's evening private dining sanctuary"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Cartography of Access & Private Sanctuary
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our London: The Private Map
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “London, understood street by street, livery by livery.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  London reveals its deepest character in quiet garden squares, mews courtyards, and upstairs drawing rooms off Mount Street and Pall Mall. Inspect our working geography below.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Interactive High-Fidelity Consortium Locations Map Section */}
          <ConsortiumLocationsMap />

          {/* Two Visible Editorial London Vignettes */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/liberty-department-store-640x360_44860915.jpg"
                  alt="Liberty Regent Street heritage flagship and private dressing salons"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Regent Street & Soho</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">After-Hours Heritage Salons</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  Private doors opened once public crowds depart, letting our members browse archival textiles, bespoke trunks, and rare gifts in peaceful privacy.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg"
                  alt="Regent's Park Nash terrace residences in Marylebone"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#CFA85E]">Marylebone & Regent’s Park</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Regency Nash Terraces & Village Calm</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Stucco-fronted serenity minutes from Harley Street medical chambers, specialist antiquarian bookshops, and private garden enclosures.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Deep Enclave Profiles & Cultural Dossiers */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="border-b border-[#222530] pb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#CFA85E] font-medium block mb-1.5">
                Detailed Neighbourhood Dossiers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                Six Villages Within One Capital
              </h2>
              <p className="text-xs sm:text-sm text-[#9C968A] mt-2 max-w-2xl font-light leading-relaxed">
                From the historic clubland of St James’s to white-stucco squares in Belgravia and rooftop sanctums above Bankside, select an enclave below to review our local privileges.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {LONDON_NEIGHBOURHOODS.map((area, idx) => (
                  <button
                    key={area.name}
                    onClick={() => setSelectedLondonArea(idx)}
                    className={`w-full text-left p-5 border transition-all ${
                      selectedLondonArea === idx
                        ? 'bg-[#181A22] border-[#CFA85E] text-[#F4F1EA] shadow-lg'
                        : 'bg-[#12141A] border-[#242630] text-[#9C968A] hover:border-[#8B672B] hover:text-[#F4F1EA]'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wider text-[#CFA85E] block mb-1">
                      {area.vibe}
                    </span>
                    <h3 className="font-serif text-xl text-[#F4F1EA]">{area.name}</h3>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-[#12141A] border border-[#242630] p-6 sm:p-8">
                {(() => {
                  const active = LONDON_NEIGHBOURHOODS[selectedLondonArea];
                  return (
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0.85, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-6"
                    >
                      <div className="aspect-[16/9] w-full overflow-hidden bg-[#181A22] border border-[#242630]">
                        <img
                          src={active.image}
                          alt={active.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-105 contrast-105"
                        />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#E2BA6B]">{active.vibe}</span>
                        <h2 className="font-serif text-3xl text-[#FAF7F0] mt-1 mb-2.5">{active.name}</h2>
                        <p className="tglc-prose text-sm">{active.summary}</p>
                      </div>

                      <div className="border-t border-[#222530] pt-5 space-y-3">
                        <h4 className="text-xs uppercase tracking-widest text-[#E2BA6B]">
                          TGLC Access Highlights & Secret Addresses
                        </h4>
                        <ul className="space-y-2.5">
                          {active.highlights.map((h, i) => (
                            <li key={i} className="text-xs sm:text-sm text-[#D4D8E2] flex items-start gap-2.5 font-light">
                              <span className="w-1.5 h-1.5 bg-[#E2BA6B] rotate-45 mt-2 shrink-0" />
                              <span className="leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-[#0D1017] border border-[#20232E] space-y-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
                          After-Hours Mews & Sub-Rosa Access Note
                        </span>
                        <p className="text-xs text-[#D4D8E2] font-light leading-relaxed">
                          Chauffeur arrivals route via service lanes behind {active.name} with house-registered security liaison pre-notified, enabling late-evening salon exits or direct transition toward East London rotary-vinyl lofts without paparazzi exposure.
                        </p>
                      </div>

                      <div className="pt-5 border-t border-[#222530] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <button
                          onClick={() => openIntroductionModal(`Inquiry regarding bespoke arrangements in ${active.name}`)}
                          className="btn-gold px-7 py-3 text-xs inline-flex items-center gap-1.5"
                        >
                          <span>Arrange an Itinerary in {active.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="#consortium-locations"
                          className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] flex items-center gap-1.5 transition-colors"
                        >
                          <span>View on Interactive Map</span>
                          <Compass className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. Privacy & Discretion Subpage */}
      {/* ========================================================= */}
      {subPage === 'privacy' && (
        <div className="space-y-10 sm:space-y-12">
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative min-h-[390px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
              <motion.img
                {...HERO_KEN_BURNS}
                src="/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg"
                alt="Subterranean London vault and confidentiality sanctuary"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Confidentiality Protocol
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Privacy & Discretion
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “The finest service leaves no footprint.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  In an age of unsolicited digital profiling and public photography, we maintain technical, legal, and physical air-gaps around your household’s movements, relationships, and acquisitions.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Editorial Explanation + Two Large Pictorial Plates */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="max-w-3xl space-y-3">
              <span className="tglc-kicker text-xs block">
                Technical, Legal & Physical Air-Gaps
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                Structured Around Need-to-Know Authority
              </h2>
              <p className="tglc-prose text-sm">
                Ordinary concierges forward member emails indiscriminately to dozens of restaurants, brokers, and tour operators. At TGLC, outside suppliers never receive your direct surname or family office structure unless strictly required by border controls or legal title deeds—instead interacting through house alias accounts settled centrally from Albemarle Street.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg"
                    alt="Private residence arrival and discretion protocol"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Anonymous Arrivals</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">Pseudonymised Coordination</h3>
                  <p className="text-xs sm:text-sm tglc-prose">
                    Masked aviation tail records, discreet service entrances, and alias hotel check-ins keep family holidays and sensitive business trips out of public sight.
                  </p>
                </div>
              </motion.div>

              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/aistudio/tglc_st_james_salon.jpg"
                    alt="Third-floor consultation room at 45 Albemarle Street"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Albemarle Street Protocol</span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA]">Off-the-Record Briefings</h3>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                    Sensitive acquisitions, family office relocations, and personal medical logistics are reviewed in sound-insulated rooms in Mayfair—never scattered across open emails.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Four Confidentiality Safeguards */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Lock,
                tag: 'Strict Need-to-Know Handling',
                title: 'Need-to-Know Information Flow',
                desc: 'Service partners receive only the operational minimums required to execute an arrival, almost always under TGLC house references and member aliases.',
              },
              {
                icon: Shield,
                tag: 'Ironclad Non-Disclosure',
                title: 'Staff Non-Disclosure Deeds',
                desc: 'Every principal, desk coordinator, and driver is bound under English Law non-disclosure covenants carrying perpetual survival clauses.',
              },
              {
                icon: Check,
                tag: 'Secure Communications',
                title: 'Encrypted Communication Lines',
                desc: 'Brief us through hardened Signal groups, PGP encrypted mail, or dedicated Mayfair fixed lines monitored round-the-clock.',
              },
              {
                icon: Award,
                tag: 'Zero Public Endorsements',
                title: 'No Client Roster Publicity',
                desc: 'We never photograph gatherings, publish member lists, accept affiliate kickbacks, or trade upon private names for promotion.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="p-7 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2.5"
                >
                  <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#E2BA6B]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.tag}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              );
            })}
          </section>

          {/* Privacy & Technical Air-Gap Architecture Matrix */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-5">
            <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5">
              <div className="border-b border-[#20232E] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="tglc-kicker text-[11px] block mb-1">Technical & Legal Shielding</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                    Five-Layer Air-Gap Architecture Matrix
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#E2BA6B]">Zero-Exposure Covenant</span>
              </div>

              <div className="divide-y divide-[#1E212B]">
                {[
                  {
                    layer: '01 · Pseudonym Registration',
                    mechanism: 'House-Issued Operational Aliases',
                    detail: 'Hotel check-ins, dining tables, and art fair viewings register under verified TGLC reference codes, never exposing principal surnames to junior desk staff.',
                  },
                  {
                    layer: '02 · LADD & PIA Tail Suppression',
                    mechanism: 'FAA & Eurocontrol Call-Sign Masking',
                    detail: 'All flight legs strip public ADS-B tail tracking identifiers and block commercial flight-tracker indexing prior to engine start.',
                  },
                  {
                    layer: '03 · Hardened Signal Lines',
                    mechanism: 'Ephemeral Keys & Air-Gapped Devices',
                    detail: 'Travel manifests and family medical details transmit exclusively via vanishing Signal groups, PGP mail, or the member portal vault.',
                  },
                  {
                    layer: '04 · Acoustic Faraday Salons',
                    mechanism: 'Bug-Swept Albemarle Briefing Chambers',
                    detail: 'Sensitive estate negotiations and diplomatic introductions convene in RF-shielded drawing rooms swept regularly by independent counter-surveillance specialists.',
                  },
                  {
                    layer: '05 · Separated Fiduciary Billing',
                    mechanism: 'Ring-Fenced Escrow Settlement',
                    detail: 'External vendors bill TGLC directly; consolidated statements issue quarterly or monthly strictly to your appointed Family Office controller.',
                  },
                ].map((row) => (
                  <div key={row.layer} className="py-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                    <span className="lg:col-span-3 font-mono text-xs text-[#E2BA6B]">{row.layer}</span>
                    <span className="lg:col-span-4 font-serif text-lg text-[#FAF7F0]">{row.mechanism}</span>
                    <p className="lg:col-span-5 text-xs text-[#D4D8E2] font-light leading-relaxed">{row.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Direct Fiduciary Inquiry Plate (Replaced extra crest with clean icon frame) */}
          <section className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              {...REVEAL_SECTION}
              className="p-8 sm:p-10 bg-[#12141A] border border-[#2A2D38] flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 bg-[#08090C] border border-[#8B672B] flex items-center justify-center shrink-0 text-[#CFA85E]">
                <Shield className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-[#E2BA6B]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Direct Fiduciary Inquiry</span>
                </div>
                <p className="text-sm text-[#D4D8E2] font-light leading-relaxed">
                  For family offices requiring custom mutual NDAs prior to initial scoping, our Principals execute agreements ahead of your first telephone or Mayfair salon meeting.
                </p>
              </div>
              <button
                onClick={() => openIntroductionModal('Mutual NDA & Confidential Discussion')}
                className="btn-outline-gold px-6 py-3 text-xs whitespace-nowrap shrink-0"
              >
                Speak in Confidence
              </button>
            </motion.div>
          </section>
        </div>
      )}
    </div>
  );
};
