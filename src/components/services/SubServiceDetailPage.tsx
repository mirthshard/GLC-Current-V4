import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA } from '../../data/tglcData';
import { SUB_SERVICE_ENRICHMENTS } from '../../data/subPracticeEnrichments';
import {
  ArrowUpRight,
  ArrowLeft,
  CheckCircle,
  Crosshair,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

interface SubServiceDetailPageProps {
  serviceId?: string;
  subServiceId?: string;
}

export const SubServiceDetailPage: React.FC<SubServiceDetailPageProps> = ({ serviceId, subServiceId }) => {
  const { navigateTo, openIntroductionModal } = useNavigation();

  const parentService = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
  const subService = parentService.subServices.find((sub) => sub.id === subServiceId) || parentService.subServices[0];
  const siblingSubServices = parentService.subServices.filter((sub) => sub.id !== subService.id);
  const enrichment = SUB_SERVICE_ENRICHMENTS[subService.id];

  const mergedPoints = [...subService.detailedPoints, ...(enrichment?.extraPoints || [])];
  const mergedScenarios = [...(subService.keyScenarios || []), ...(enrichment?.extraScenarios || [])];
  const galleryItems =
    enrichment?.galleryImages && enrichment.galleryImages.length > 0
      ? enrichment.galleryImages
      : [
          {
            image: subService.image,
            caption: `Dedicated specialist arrangements delivered privately under ${parentService.title}`,
          },
          {
            image: parentService.galleryImages?.[0] || parentService.heroImage,
            caption: `Seamless household coordination extending straight from Albemarle Street`,
          },
          {
            image: parentService.galleryImages?.[1] || siblingSubServices[0]?.image || '/assets/aistudio/tglc_st_james_salon.jpg',
            caption: `Pre-inspected environments prepared ahead of principal arrival`,
          },
          {
            image: siblingSubServices[1]?.image || '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
            caption: `Quiet mews departure logistics ensuring uninterrupted personal privacy`,
          },
        ];

  const subServiceSlides = Array.from(
    new Set([
      subService.image,
      ...galleryItems.map((g) => g.image),
      parentService.heroImage,
      ...(parentService.galleryImages || []),
    ])
  ).filter(Boolean);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [expandAllFaqs, setExpandAllFaqs] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
    setOpenFaqIdx(0);
    setExpandAllFaqs(false);
  }, [subService.id]);

  useEffect(() => {
    if (isPaused || subServiceSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % subServiceSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, subServiceSlides.length]);

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA] overflow-hidden pb-14">
      {/* 1. Cinematic Full-Width Moving Hero Carousel */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center border-b border-[#20222B] pt-14 sm:pt-18 pb-12 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={subServiceSlides[currentSlide] || subService.image}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={subServiceSlides[currentSlide] || subService.image}
              alt={subService.title}
              referrerPolicy="no-referrer"
              animate={{ scale: [1.03, 1, 1.02] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-[#08090C]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/85 via-[#08090C]/35 to-[#08090C]/75 hidden sm:block" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-3 bg-[#08090C]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {subServiceSlides.map((_, idx) => (
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
            0{currentSlide + 1} / 0{subServiceSlides.length}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + subServiceSlides.length) % subServiceSlides.length)}
              className="p-1 text-[#9C968A] hover:text-[#CFA85E] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % subServiceSlides.length)}
              className="p-1 text-[#9C968A] hover:text-[#CFA85E] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
          {/* Back Bar */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('service-detail', { serviceId: parentService.id })}
              className="inline-flex items-center gap-2 text-xs tracking-wide text-[#DDB872] hover:text-[#F4F1EA] transition-colors bg-[#0B0C10]/85 border border-[#2A2D38] hover:border-[#8B672B] px-4 py-1.5 backdrop-blur-md"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#CFA85E]" />
              <span>Back to {parentService.title}</span>
            </button>
            <span className="text-[11px] tracking-widest text-[#9C968A] hidden sm:inline">
              · Sub-Practice Specification
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#8B672B] bg-[#0B0C10]/85 backdrop-blur-md"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#CFA85E]" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#DDB872] tabular-nums">
              {parentService.title} · Practice 0{parentService.subServices.indexOf(subService) + 1}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-[#F4F1EA]"
          >
            {subService.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#CFA85E] max-w-3xl mx-auto"
          >
            “{subService.shortDesc}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xs sm:text-base text-[#E5DFD3] max-w-3xl mx-auto leading-relaxed font-light"
          >
            {subService.leadParagraph}
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal(`Inquiry regarding ${subService.title}`)}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2"
            >
              <span>Request {subService.title} Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('deliverables-matrix');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline-gold px-6 py-3.5 text-xs backdrop-blur-md"
            >
              Review Scope of Service ↓
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <GoldDivider />
      </div>

      {/* 2. SLA Benchmarks Strip */}
      {enrichment?.slaBenchmarks && enrichment.slaBenchmarks.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {enrichment.slaBenchmarks.map((sla) => (
              <div
                key={sla.label}
                className="p-6 bg-[#0D1017] border border-[#242630] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                    {sla.label}
                  </span>
                  <div className="font-serif text-3xl text-[#FAF7F0] tabular-nums">{sla.value}</div>
                  <p className="text-xs text-[#D4D8E2]">{sla.note}</p>
                </div>
                <Clock className="w-5 h-5 text-[#E2BA6B] shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Extended Executive Narrative & Operational Deliverables */}
      <section
        id="deliverables-matrix"
        className="py-8 sm:py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-10"
      >
        <div className="bg-[#0D1017] border border-[#20232E] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-2.5">
            <span className="tglc-kicker text-[11px] block">
              Albemarle Street Practice Briefing
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0] leading-tight text-balance">
              Coordination Without Public Exposure
            </h2>
            <p className="text-xs text-[#E2BA6B] italic font-serif pt-1">
              “Every arrangement stays insulated inside a single encrypted household dossier.”
            </p>
          </div>
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
            {enrichment?.extendedOverview && enrichment.extendedOverview.length > 0 ? (
              enrichment.extendedOverview.map((para, pIdx) => <p key={pIdx}>{para}</p>)
            ) : (
              <>
                <p>
                  Every engagement under {subService.title} begins with an oral conversation rather than a digital intake ticket. Your supervising principal clears counterparties directly against long-standing house vetting, confirms non-disclosure terms before names are exchanged, and provides a single telephone point of accountability until final doorstep handover.
                </p>
                <p>
                  Where an arrangement intersects with residence staffing, protective driving, or European customs clearance, adjacent {parentService.title} specialists join inside the same closed dossier so your household never repeats a preference twice.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Operational Phases Grid */}
        {enrichment?.operationalPhases && enrichment.operationalPhases.length > 0 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#20232E] pb-3">
              <div>
                <span className="tglc-kicker text-[10px] block mb-1">Execution Workflow</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                  Four-Stage Principal Delivery Sequence
                </h3>
              </div>
              <span className="font-mono text-xs text-[#8F98AA]">Single-Point Accountability</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {enrichment.operationalPhases.map((step) => (
                <div
                  key={step.phase}
                  className="p-6 bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block tabular-nums">
                    {step.phase}
                  </span>
                  <h4 className="font-serif text-xl text-[#FAF7F0]">{step.title}</h4>
                  <p className="text-xs text-[#D4D8E2] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scope of Service Checklist */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#20232E]">
            <div className="space-y-1.5">
              <span className="tglc-kicker text-[11px] block">
                Operational Mandate ({mergedPoints.length} Commitments)
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                Scope of Service & Protocol
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#D4D8E2] max-w-md leading-relaxed">
              Coordinated personally with direct principal oversight, vetted discretion deeds, and round-the-clock continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mergedPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="p-6 bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] transition-colors flex items-start gap-4"
              >
                <div className="w-7 h-7 bg-[#181A22] border border-[#8B672B] flex items-center justify-center shrink-0 mt-0.5 text-[#E2BA6B]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#E2BA6B] tracking-wider uppercase block mb-1 tabular-nums">
                    Standard 0{i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4-Plate Curated Visual Gallery */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#20232E] pb-3">
            <span className="tglc-kicker text-[11px]">Practice Perspectives</span>
            <span className="font-mono text-xs text-[#8F98AA]">{parentService.kicker}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryItems.slice(0, 4).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#0D1017] border border-[#242630] overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 border-t border-[#20232E] flex-1">
                  <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Audited Counterparties Roster */}
        {enrichment?.vettedPartners && enrichment.vettedPartners.length > 0 && (
          <div className="p-6 sm:p-8 bg-[#0D1017] border border-[#242630] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2332] pb-3">
              <div>
                <span className="tglc-kicker text-[10px] block mb-1">Conflict-Free Bench</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">
                  Audited Counterparties & Partner Houses
                </h3>
              </div>
              <ShieldCheck className="w-5 h-5 text-[#E2BA6B]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrichment.vettedPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#07080B] border border-[#1E2332] flex items-center gap-3 text-xs sm:text-sm text-[#FAF7F0]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E2BA6B] shrink-0" />
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. Exemplar Case Demonstrations */}
      {mergedScenarios.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <GoldDivider />
          </div>
          <section className="py-10 sm:py-14 px-5 sm:px-8 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-t border-b border-[#20222B]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2.5">
                <span className="tglc-kicker text-[11px] block">
                  Field Intelligence · {mergedScenarios.length} Verified Assignments
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
                  Exemplar Case Demonstrations
                </h2>
                <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                  Representative client briefs resolved by our house principals with quiet precision.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mergedScenarios.map((scen, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0.9, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.5 }}
                    className={`p-7 sm:p-9 bg-[#0D1017] border border-[#242630] shadow-2xl space-y-5 flex flex-col justify-between ${
                      mergedScenarios.length % 2 !== 0 && idx === 0 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#20232E]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] tabular-nums">
                          Assignment 0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-[#D4D8E2]">
                          Verified Outcome
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">{scen.title}</h3>

                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                        {scen.description}
                      </p>
                    </div>

                    <div className="p-4 bg-[#07080B] border border-[#8B672B]/40 text-xs sm:text-sm text-[#FAF7F0] flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#E2BA6B] uppercase mr-1.5 font-mono text-[11px]">Delivered:</strong>
                        {scen.outcome}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* 5. Sub-Practice Interactive FAQ Accordion */}
      {enrichment?.faqs && enrichment.faqs.length > 0 && (
        <section className="py-10 sm:py-14 px-5 sm:px-8 max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#20232E] pb-4">
            <div className="space-y-1.5">
              <span className="tglc-kicker text-[11px] block">
                {subService.title} Clarifications
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                Practice Questions & Protocol
              </h2>
            </div>
            <button
              onClick={() => setExpandAllFaqs((prev) => !prev)}
              className="btn-outline-gold px-4 py-2 text-xs whitespace-nowrap shrink-0"
            >
              {expandAllFaqs ? 'Collapse Answers' : `Expand All ${enrichment.faqs.length} Answers`}
            </button>
          </div>

          <div className="space-y-3">
            {enrichment.faqs.map((faq, idx) => {
              const isOpen = expandAllFaqs || openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border transition-colors bg-[#0D1017] ${
                    isOpen ? 'border-[#E2BA6B]' : 'border-[#242630]'
                  }`}
                >
                  <button
                    onClick={() => {
                      setExpandAllFaqs(false);
                      setOpenFaqIdx(openFaqIdx === idx ? null : idx);
                    }}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#FAF7F0] flex items-start sm:items-center gap-3">
                      <span className="font-mono text-xs text-[#E2BA6B] tabular-nums mt-1 sm:mt-0">Q0{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E2BA6B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
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
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#20232E] text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Sibling Sub-Practices */}
      {siblingSubServices.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <GoldDivider />
          </div>
          <section className="py-10 sm:py-12 px-5 sm:px-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                Other Sub-Practices in {parentService.title}
              </h3>
              <button
                onClick={() => navigateTo('service-detail', { serviceId: parentService.id })}
                className="text-xs uppercase tracking-widest text-[#CFA85E] hover:text-[#DDB872] transition-colors"
              >
                Full Practice Overview →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siblingSubServices.map((sib) => (
                <motion.div
                  key={sib.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => navigateTo('subservice-detail', { serviceId: parentService.id, subServiceId: sib.id })}
                  className="group cursor-pointer p-5 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-all duration-300 space-y-3"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#181A22]">
                    <img
                      src={sib.image}
                      alt={sib.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#F4F1EA] group-hover:text-[#DDB872] transition-colors">
                      {sib.title}
                    </h4>
                    <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed mt-1 font-light">
                      {sib.shortDesc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
