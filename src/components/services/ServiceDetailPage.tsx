import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Crosshair,
  Compass,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId?: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId = 'travel-aviation' }) => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [expandAllFaqs, setExpandAllFaqs] = useState(false);

  const service = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
  const relatedServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3);

  // Dynamic slides composed of hero, gallery, and sub-service imagery
  const heroSlides = Array.from(
    new Set([
      service.heroImage,
      ...(service.galleryImages || []),
      ...service.subServices.map((sub) => sub.image),
    ])
  ).filter(Boolean);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
    setActiveFaq(0);
    setExpandAllFaqs(false);
  }, [service.id]);

  useEffect(() => {
    if (isPaused || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA] overflow-hidden pb-14">
      {/* 1. Cinematic Full-Width Moving Hero Carousel */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[55vh] sm:min-h-[64vh] flex items-center justify-center border-b border-[#20222B] pt-16 sm:pt-20 pb-14 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlides[currentSlide] || service.heroImage}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={heroSlides[currentSlide] || service.heroImage}
              alt={service.title}
              referrerPolicy="no-referrer"
              animate={{ scale: [1.03, 1, 1.02] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/40 to-[#07080B]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/35 to-[#07080B]/75 hidden sm:block" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-3 bg-[#08090C]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-[3px] transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-[#CFA85E]' : 'w-2 bg-[#444] hover:bg-[#888]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#DDB872] tabular-nums pl-1">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="p-1 text-[#9C968A] hover:text-[#CFA85E] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="p-1 text-[#9C968A] hover:text-[#CFA85E] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2.5 text-xs font-mono uppercase tracking-[0.24em] text-[#E2BA6B]"
          >
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span>{service.kicker}</span>
            <span className="text-[#8F98AA]" aria-hidden="true">·</span>
            <span>Private Advisory</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-[#FAF7F0] text-balance"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            “{service.tagline}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#D4D8E2] max-w-3xl mx-auto leading-relaxed font-normal"
          >
            {service.overview}
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal(`Inquiry regarding ${service.title}`)}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2"
            >
              <span>Consult Practice Director</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('subpractices-breakdown');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline-gold px-6 py-3.5 text-xs backdrop-blur-md"
            >
              Explore {service.subServices.length} Sub-Practices ↓
            </button>
          </div>
        </div>
      </section>

      {service.regulatoryNote && (
        <div className="bg-[#0D1017] border-b border-[#222530] py-3.5 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-[#D4D8E2]">
            <AlertCircle className="w-4 h-4 text-[#E2BA6B] shrink-0" />
            <p>{service.regulatoryNote}</p>
          </div>
        </div>
      )}

      {service.deliveryMetrics && service.deliveryMetrics.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.deliveryMetrics.map((m) => (
              <div key={m.label} className="p-5 bg-[#0D1017] border border-[#242630] flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] block mb-1">
                    {m.label}
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] tabular-nums">
                    {m.metric}
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#E2BA6B] shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <GoldDivider />
      </div>

      {/* Practice in View Gallery & Mayfair Execution Note */}
      <section className="py-10 sm:py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0C0D12] border border-[#20232E] p-6 sm:p-8">
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium block">
              Mayfair Desk Execution Protocol
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
              Personal Stewardship Above Algorithm
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-[#B5AFA3] leading-relaxed font-light">
            <p>
              Within {service.title}, nothing is passed down a call-centre queue. Requests arrive directly with a named senior principal at 45 Albemarle Street who already knows your travel preferences, dietary habits, security posture, and household calendar.
            </p>
            <p>
              Whether coordinating an unannounced arrival in West London or aligning three overlapping European schedules, every counterparty is held personally accountable before a single engine turns or invitation is accepted.
            </p>
          </div>
        </div>

        {service.galleryImages && service.galleryImages.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#20232E] pb-2">
              <span className="tglc-kicker text-[11px]">
                Selected Practice Environments
              </span>
              <span className="font-mono text-xs text-[#8F98AA]">{service.kicker}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.galleryImages.slice(0, 4).map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-[#0D1017] border border-[#242630] overflow-hidden group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={imgUrl}
                      alt={service.galleryCaptions?.[idx] || `${service.title} scene ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 border-t border-[#1E2332] flex-1">
                    <p className="text-xs text-[#D4D8E2] leading-relaxed">
                      {service.galleryCaptions?.[idx] ||
                        'Coordinated privately through our Albemarle Street team with accredited local partners.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Sub-Practices Showcase */}
      <section
        id="subpractices-breakdown"
        className="py-8 sm:py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-10"
      >
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#20232E]"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#CFA85E] font-medium block tabular-nums">
              Operational Sub-Practices ({service.subServices.length})
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
              Specialised Capabilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
            Every sub-practice is guided personally by senior specialists under confidential Mayfair protocol.
          </p>
        </motion.div>

        <div className="space-y-10">
          {service.subServices.map((sub, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0.9, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-all duration-300 shadow-2xl overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div
                    className={`lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[400px] overflow-hidden bg-[#08090C] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={sub.image}
                      alt={sub.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141A]/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#12141A]/80" />
                  </div>

                  <div
                    className={`lg:col-span-6 p-6 sm:p-9 lg:p-10 flex flex-col justify-between space-y-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#E2BA6B] mb-2 tabular-nums">
                        <Crosshair className="w-3.5 h-3.5 text-[#E2BA6B]" />
                        <span>Sub-Practice 0{idx + 1}</span>
                        <span className="text-[#8F98AA]" aria-hidden="true">·</span>
                        <span className="text-[#D4D8E2]">{service.kicker}</span>
                        <span className="text-[#8F98AA]" aria-hidden="true">·</span>
                        <span className="text-[#8F98AA]">Direct Access</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF7F0] mb-3 leading-snug group-hover:text-[#E2BA6B] transition-colors">
                        {sub.title}
                      </h3>

                      <p className="text-sm text-[#D4D8E2] leading-relaxed font-normal mb-5">
                        {sub.leadParagraph}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-[#1E2332]">
                        <span className="tglc-kicker block mb-2">
                          Operational Standards & Protocol:
                        </span>
                        {sub.detailedPoints.slice(0, 3).map((point, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D4D8E2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                            <span className="font-normal">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-[#20232E] flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => navigateTo('subservice-detail', { serviceId: service.id, subServiceId: sub.id })}
                        className="btn-gold px-6 py-3 text-xs inline-flex items-center gap-2"
                      >
                        <span>Full Sub-Practice Scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openIntroductionModal(`Inquiry regarding ${sub.title}`)}
                        className="btn-outline-gold px-4 py-3 text-xs"
                      >
                        Request Practice Briefing →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <GoldDivider />

      {/* 3. Member Scenario Case Study */}
      <section className="py-10 sm:py-14 px-5 sm:px-8 bg-gradient-to-b from-[#08090C] via-[#101218] to-[#08090C] border-t border-b border-[#20222B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="p-7 sm:p-11 bg-[#12141A] border border-[#242630] shadow-2xl space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#20232E]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 border border-[#8B672B] bg-[#181A22] flex items-center justify-center text-[#CFA85E]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block">
                    Confidential Member Case Study
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                    {service.memberScenario.client}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B]">
                Proven Execution
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              <div className="space-y-3 p-6 bg-[#0D0F14] border border-[#20232E]">
                <span className="text-[11px] uppercase tracking-wider text-[#9C968A] block">
                  The Client Mandate
                </span>
                <p className="text-xs sm:text-sm text-[#D9D4CA] leading-relaxed font-light">
                  {service.memberScenario.brief}
                </p>
              </div>

              <div className="space-y-3 p-6 bg-[#0D0F14] border border-[#8B672B]/40">
                <span className="text-[11px] uppercase tracking-wider text-[#CFA85E] block">
                  The TGLC Execution Protocol
                </span>
                <p className="text-xs sm:text-sm text-[#D9D4CA] leading-relaxed font-light">
                  {service.memberScenario.solution}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#08090C] border border-[#242630] text-xs text-[#CFA85E]">
              <span className="uppercase tracking-wider font-medium mr-2">Verified Outcome:</span>
              <span className="text-[#E5DFD3] font-light">{service.memberScenario.details}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Execution Standards */}
      <section className="py-10 sm:py-14 px-5 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block">
            Practice Benchmark
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
            Operational Standards & Invariants
          </h2>
          <p className="text-xs sm:text-sm text-[#9C968A] font-light leading-relaxed">
            Every arrangement adheres to our strict bench of personal discretion, vetted supplier credentials, and single-point oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="p-6 bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] transition-colors flex items-start gap-4"
            >
              <div className="w-7 h-7 bg-[#181A22] border border-[#8B672B] flex items-center justify-center shrink-0 mt-0.5 text-[#E2BA6B]">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">{feat}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-6 sm:p-8 bg-[#0D1017] border border-[#242630] grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: 'Audit Gate 01 · Neutral Sourcing',
              title: 'Zero Supplier Commission Spreads',
              text: 'All operator bills, gallery invoices, and estate statements settle transparently at direct cost with zero broker rebates.',
            },
            {
              tag: 'Audit Gate 02 · Credential Audit',
              title: 'Licensing, Insurance & Staff Clearance',
              text: 'Partners furnish verified AOC airworthiness logs, SIA credentials, and DBS vetting records prior to assignment.',
            },
            {
              tag: 'Audit Gate 03 · Privacy Covenant',
              title: 'Pseudonym Manifest Handling',
              text: 'Household surnames never populate external booking engines or hotel registers without express principal instruction.',
            },
          ].map((gate) => (
            <div key={gate.tag} className="space-y-2 border-t border-[#1E2332] pt-4 md:border-t-0 md:pt-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">{gate.tag}</span>
              <h4 className="font-serif text-xl text-[#FAF7F0]">{gate.title}</h4>
              <p className="text-xs text-[#D4D8E2] leading-relaxed">{gate.text}</p>
            </div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* 5. Expanded FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-10 sm:py-14 px-5 sm:px-8 border-t border-[#20222B] bg-[#0B0C10]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#20232E] pb-4">
              <div className="space-y-1.5">
                <span className="tglc-kicker text-[11px] block">
                  Clarifications & Operational Protocol
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                  {service.title} Questions & Clarifications
                </h2>
              </div>
              <button
                onClick={() => setExpandAllFaqs((prev) => !prev)}
                className="btn-outline-gold px-4 py-2 text-xs whitespace-nowrap shrink-0"
              >
                {expandAllFaqs ? 'Collapse All' : `Expand All ${service.faqs.length} Answers`}
              </button>
            </div>

            <div className="space-y-3">
              {service.faqs.map((f, i) => {
                const isOpen = expandAllFaqs || activeFaq === i;
                return (
                  <div
                    key={i}
                    className={`border transition-colors bg-[#0D1017] ${
                      isOpen ? 'border-[#E2BA6B]' : 'border-[#242630]'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setExpandAllFaqs(false);
                        setActiveFaq(activeFaq === i ? null : i);
                      }}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-serif text-lg sm:text-xl text-[#FAF7F0] flex items-start sm:items-center gap-3">
                        <span className="text-[#E2BA6B] text-xs font-mono tabular-nums mt-1 sm:mt-0">Q0{i + 1}.</span>
                        <span>{f.question}</span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#E2BA6B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#D4D8E2] leading-relaxed border-t border-[#20232E]">
                            {f.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <GoldDivider />

      {/* 6. Adjacent Practices */}
      <section className="py-10 sm:py-14 px-5 sm:px-8 border-t border-[#20222B]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
              Explore Adjacent Practice Pillars
            </h3>
            <button
              onClick={() => navigateTo('services')}
              className="text-xs uppercase tracking-widest text-[#CFA85E] hover:text-[#DDB872] transition-colors"
            >
              All Seven Pillars →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <motion.div
                key={rel.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigateTo('service-detail', { serviceId: rel.id })}
                className="group cursor-pointer p-5 bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-all duration-300 space-y-4"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#181A22]">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#CFA85E] block mb-1">
                    {rel.kicker}
                  </span>
                  <h4 className="font-serif text-xl text-[#F4F1EA] group-hover:text-[#DDB872] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed mt-1 font-light">
                    {rel.shortDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
