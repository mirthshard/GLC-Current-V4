import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import {
  ArrowUpRight,
  Compass,
  CheckCircle2,
  Crosshair,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  ChevronDown,
} from 'lucide-react';

export const ServicesHub: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(SERVICES_DATA[0]?.id || null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activePillar = SERVICES_DATA[currentSlide];

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] selection:bg-[#B98633]/30 selection:text-[#FAF7F0] overflow-hidden">
      {/* 1. Cinematic Full-Width Moving Hero Carousel */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[52vh] sm:min-h-[60vh] flex items-center justify-center border-b border-[#20222B] pt-14 sm:pt-18 pb-12 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={activePillar.heroImage}
              alt={activePillar.title}
              referrerPolicy="no-referrer"
              animate={{ scale: [1.03, 1, 1.02] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/35 to-[#07080B]/75 hidden sm:block" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-3 bg-[#07080B]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {SERVICES_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-[3px] transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-[#E2BA6B]' : 'w-2 bg-[#444] hover:bg-[#888]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-1">
            0{currentSlide + 1} / 0{SERVICES_DATA.length}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length)}
              className="p-1 text-[#9C968A] hover:text-[#E2BA6B] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SERVICES_DATA.length)}
              className="p-1 text-[#9C968A] hover:text-[#E2BA6B] transition-colors"
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
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-[#E2BA6B]"
          >
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span>Consortium Practice Framework</span>
            <span className="text-[#8F98AA]" aria-hidden="true">·</span>
            <span>Seven Pillars</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] text-[#FAF7F0] text-balance"
          >
            Seven Pillars of Private Lifestyle Management.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            “From the quiet essentials to the unrepeatable, arranged without friction.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#D4D8E2] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            TGLC unites seven dedicated departments behind a single Albemarle Street door. Rather than juggling unconnected brokers and hotel desks, your household works with one personal Senior Principal who carries full operational authority across thirty-nine sub-practices worldwide.
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal('Consortium Practice Consultation')}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Consult Practice Director</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('pillar-01');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline-gold px-6 py-3.5 text-xs backdrop-blur-md whitespace-nowrap shrink-0"
            >
              Explore Seven Pillars
            </button>
          </div>
        </div>
      </section>

      {/* Response SLA & Cross-Practice Continuity Strip */}
      <section className="py-10 sm:py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Urgent Flight Options', val: '15 Mins', sub: 'RAF Northolt & Farnborough audited fleet availability' },
            { label: 'Same-Day Mayfair Dining', val: '30 Mins', sub: 'Direct confirmation with general managers and cellar masters' },
            { label: 'Multi-Practice Turnarounds', val: '2–4 Hours', sub: 'Unified aviation, security, and estate dossier mobilization' },
            { label: 'Dedicated Ratio Cap', val: '12 : 1 Max', sub: 'Hard household cap per Albemarle Street Senior Principal' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="p-6 bg-[#0D1017] border border-[#242630] space-y-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                {stat.label}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] tabular-nums">{stat.val}</div>
              <p className="text-xs text-[#D4D8E2] leading-relaxed">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Single-Principal Continuity Visual Diptych */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4 border-b border-[#20232E]">
          <div className="lg:col-span-6 space-y-1.5">
            <span className="tglc-kicker text-[11px] block">
              Cross-Practice Coordination Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0] text-balance">
              How Seven Desks Act As One Household Team
            </h2>
          </div>
          <p className="lg:col-span-6 text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
            In traditional lifestyle agencies, flight desks never speak to security detail, and art advisers know nothing of your supper schedule. Within TGLC House, every practice shares one encrypted household dossier so a late Heathrow slot automatically holds dinner in Mayfair, adjusts close protection, and warms the countryside gates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0D1017] border border-[#242630] overflow-hidden group"
          >
            <div className="aspect-[16/9] overflow-hidden bg-black">
              <img
                src="/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png"
                alt="Direct tarmac-to-townhouse coordination"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex items-center justify-between gap-4 border-t border-[#1E2332]">
              <p className="text-xs text-[#D4D8E2]">
                Direct cabin steps meeting awaiting Range Rovers inside Farnborough and Northolt aprons
              </p>
              <span className="font-mono text-[10px] text-[#E2BA6B] uppercase tracking-widest whitespace-nowrap shrink-0">
                Flight & Fleet
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="bg-[#0D1017] border border-[#242630] overflow-hidden group"
          >
            <div className="aspect-[16/9] overflow-hidden bg-black">
              <img
                src="/assets/aistudio/mayfair_fine_dining.jpg"
                alt="Mayfair Evening Table & Club Hosting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex items-center justify-between gap-4 border-t border-[#1E2332]">
              <p className="text-xs text-[#D4D8E2]">
                Private corner tables and acoustic salons prepared seamlessly with zero bills shown at dinner
              </p>
              <span className="font-mono text-[10px] text-[#E2BA6B] uppercase tracking-widest whitespace-nowrap shrink-0">
                Dining & Clubs
              </span>
            </div>
          </motion.div>
        </div>

        {/* Partner Vetting & Conflict-Free Charter */}
        <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E2332]">
            <div>
              <span className="tglc-kicker text-[10px] block mb-1">
                Partner Vetting & Fiduciary Neutrality
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                Four Governance Gates Before Any Supplier Enters Your Orbit
              </h3>
            </div>
            <span className="font-mono text-[11px] text-[#E2BA6B]">Conflict-Free Procurement Charter</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: '01. Zero Secret Rebates',
                body: 'TGLC rejects kickbacks from charter brokers, watch dealers, or restaurants. Verbatim supplier pricing is passed transparently to your household ledger.',
              },
              {
                icon: Crosshair,
                title: '02. Direct AOC & Principle Contracts',
                body: 'Every aviation operator, security detail, and art shipper is contracted at source rather than layered through public aggregator chains.',
              },
              {
                icon: Clock,
                title: '03. English Law NDAs Signed First',
                body: 'Contractors, temporary staff, and private kitchen crews sign strict non-disclosure and camera-free undertakings before principal names leave our office.',
              },
              {
                icon: Compass,
                title: '04. Quarterly Physical Re-Audits',
                body: 'Inspection teams verify fleet maintenance logs, DBS renewals, and insurance limits quarterly across all thirty-nine operational sub-practices.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-5 bg-[#07080B] border border-[#1E2332] space-y-2.5">
                  <Icon className="w-4 h-4 text-[#E2BA6B]" />
                  <h4 className="font-serif text-lg text-[#FAF7F0]">{item.title}</h4>
                  <p className="text-xs text-[#D4D8E2] leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 2. Alternating Showcase Panels for All Seven Services */}
      <div className="divide-y divide-[#20222B]">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 0;
          const isPreviewExpanded = expandedPillarId === service.id;

          return (
            <motion.section
              key={service.id}
              id={`pillar-0${index + 1}`}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.55 }}
              className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B]"
            >
              <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
                {/* Section Top Marker */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#20232E]">
                  <div className="flex items-center gap-3 text-xs text-[#E2BA6B] font-mono tabular-nums">
                    <span>Practice 0{index + 1}</span>
                    <span className="text-[#8F98AA]" aria-hidden="true">·</span>
                    <span>{service.kicker}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#8F98AA] uppercase tracking-wider">
                    <span>Principal Oversight</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E2BA6B] tabular-nums">{service.subServices.length} Sub-Practices</span>
                  </div>
                </div>

                {/* Alternating Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  {/* Large Image */}
                  <motion.div
                    initial={{ opacity: 0.92, x: isEven ? -14 : 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.55 }}
                    className={`lg:col-span-7 flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div
                      onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                      className="group cursor-pointer relative aspect-[16/10] lg:flex-1 w-full overflow-hidden border border-[#242630] shadow-2xl bg-[#12141A]"
                    >
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/85 via-transparent to-transparent group-hover:from-[#07080B]/60 transition-colors" />

                      <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/90 backdrop-blur-md p-4 border border-[#2A2D38] flex items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
                            Verified Practice Lead
                          </span>
                          <span className="font-serif text-base text-[#FAF7F0] block">
                            {service.memberScenario.client}
                          </span>
                        </div>
                        <div className="w-8 h-8 border border-[#8B672B] bg-[#141620] flex items-center justify-center text-[#E2BA6B] group-hover:translate-x-1 transition-transform shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Editorial Narrative */}
                  <motion.div
                    initial={{ opacity: 0.92, x: isEven ? 14 : -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.55 }}
                    className={`lg:col-span-5 space-y-5 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="tglc-kicker text-[11px] block mb-2">
                          {service.kicker}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF7F0] leading-tight text-balance">
                          {service.title}
                        </h2>
                        <p className="font-serif italic text-lg sm:text-xl text-[#E2BA6B] mt-2">
                          “{service.tagline}”
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                        {service.overview}
                      </p>

                      {service.deliveryMetrics && service.deliveryMetrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E2332]">
                          {service.deliveryMetrics.map((m) => (
                            <div key={m.label} className="p-2.5 bg-[#0D1017] border border-[#20232E]">
                              <div className="font-serif text-base text-[#FAF7F0] tabular-nums">{m.metric}</div>
                              <div className="font-mono text-[9px] uppercase tracking-wider text-[#8F98AA]">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block mb-2.5">
                          Specialised Sub-Practice Scope ({service.subServices.length}):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => navigateTo('subservice-detail', { serviceId: service.id, subServiceId: sub.id })}
                              className="text-xs text-[#D4D8E2] hover:text-[#07080B] bg-[#12141A] hover:bg-[#E2BA6B] border border-[#242630] hover:border-[#E2BA6B] px-3 py-1.5 transition-all duration-200 text-left whitespace-nowrap shrink-0"
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#20232E]">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D4D8E2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#20232E] flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                        className="btn-gold px-6 py-3 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>Full Category Briefing</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setExpandedPillarId(isPreviewExpanded ? null : service.id)}
                        className="btn-outline-gold px-4 py-3 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <span>{isPreviewExpanded ? 'Hide Sub-Practice Matrix' : 'Preview Sub-Practices'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPreviewExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Inline Expandable Sub-Practice Quick-Scope Drawer */}
                <AnimatePresence>
                  {isPreviewExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2332] pb-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
                              Quick-Scope Practice Matrix
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl text-[#FAF7F0]">
                              All {service.subServices.length} Sub-Practices Under {service.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => openIntroductionModal(`Mandate Inquiry — ${service.title}`)}
                            className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:underline whitespace-nowrap shrink-0"
                          >
                            Brief Practice Head →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.subServices.map((sub, sIdx) => (
                            <div
                              key={sub.id}
                              onClick={() => navigateTo('subservice-detail', { serviceId: service.id, subServiceId: sub.id })}
                              className="cursor-pointer p-4 bg-[#07080B] border border-[#1E2332] hover:border-[#8B672B] transition-colors flex flex-col justify-between space-y-3 group"
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-mono text-[#E2BA6B] tabular-nums">
                                  <span>Scope 0{sIdx + 1}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                                </div>
                                <h5 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                                  {sub.title}
                                </h5>
                                <p className="text-xs text-[#D4D8E2] leading-relaxed line-clamp-2">
                                  {sub.shortDesc}
                                </p>
                              </div>
                              <div className="text-[11px] text-[#8F98AA] pt-2 border-t border-[#181B24]">
                                {sub.detailedPoints[0]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          );
        })}
      </div>

      <GoldDivider />

      {/* 3. Integrated Charter Banner */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-t border-[#20222B] text-center">
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto space-y-5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#E2BA6B] block">
            Integrated Private Office Charters · Mayfair HQ
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight text-balance">
            Requiring an integrated mandate spanning multiple practices?
          </h2>

          <p className="text-xs sm:text-base text-[#D4D8E2] max-w-xl mx-auto leading-relaxed">
            Our principals regularly co-ordinate comprehensive cross-practice arrangements—combining private flight charter, guarded Mayfair vehicles, off-market property searches, and closed museum viewings under one calm relationship.
          </p>

          <p className="text-xs text-[#E2BA6B] tabular-nums tracking-wide font-mono">
            Direct Telephone: {TGLC_CONTACT.phone} · TGLC House, {TGLC_CONTACT.address.toString()}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal('Bespoke Multi-Category Lifestyle Charter')}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Commission Bespoke Charter</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('commission-studio')}
              className="btn-outline-gold px-6 py-3.5 text-xs whitespace-nowrap shrink-0"
            >
              Open Commission Studio
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

