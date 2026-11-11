import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { APPROACH_STEPS, FAQS_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  Clock,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MEMBERSHIP_HERO_SLIDES = [
  '/assets/aistudio/tglc_st_james_salon.jpg',
  '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
  '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
  '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
  '/assets/aistudio/bond_street_jewellery.jpg',
];

interface CharterTierConfig {
  id: 'london' | 'global' | 'office';
  code: string;
  ribbon: string;
  title: string;
  featured?: boolean;
  summary: string;
  coreFeatures: string[];
  expandedFeatures: string[];
  termsNote: string;
  ctaLabel: string;
  modalTopic: string;
}

const CHARTER_TIERS: CharterTierConfig[] = [
  {
    id: 'london',
    code: 'Charter 01',
    ribbon: 'London Resident & Townhouse Focus',
    title: 'The London Membership',
    summary:
      'Crafted for London residents, seasonal pied-à-terre owners, and frequent visitors seeking calm, connected stewardship across the capital.',
    coreFeatures: [
      'Dedicated London Lifestyle Manager stationed at 45 Albemarle Street',
      'Preferred table custody across Mayfair, St James’s, Soho & Chelsea',
      'Private gallery previews, Royal Box debentures & Covent Garden access',
      'Vetted chauffeur dispatch, household staffing & daily errands',
      'Full invitations to The London Calendar seasonal salons',
    ],
    expandedFeatures: [
      'Pre-arrival townhouse checks, floral dressing & pantry preparation across W1 & SW1',
      'Priority table adjustments within 30 minutes across partner dining rooms',
      'Private after-hours Savile Row cutter & Bond Street salon appointments',
      'Access to Sub-Rosa Sector dining vaults & Shoreditch listening salons',
      'Direct consolidated monthly ledger without agency commission markups',
    ],
    termsNote: 'Membership terms provided following a private introduction',
    ctaLabel: 'Request London Introduction',
    modalTopic: 'The London Membership',
  },
  {
    id: 'global',
    code: 'Charter 02',
    ribbon: 'Flagship · Global Household Scope',
    title: 'The Global Membership',
    featured: true,
    summary:
      'Built for internationally mobile principals and families balancing London residences, Alpine winters, Mediterranean yachts, and private flight dispatch.',
    coreFeatures: [
      'All privileges included within The London Membership',
      '24/7/365 Global Duty Desk directly reachable across time zones',
      'Private jet chartering & tarmac FBO access at Farnborough and Northolt',
      'Off-market chalet, superyacht & Mediterranean villa sourcing',
      'Full household coverage for spouse, children & travelling staff',
    ],
    expandedFeatures: [
      '15-minute urgent aviation sourcing SLA with audited Part 135 / AOC fleet owners',
      'Diplomatic fast-track customs & disguised tail registration manifests',
      'Continental city attachment in Geneva, Paris, Milan, New York, Dubai & Tokyo',
      'Harley Street preventative diagnostics & global air-evacuation readiness',
      '90-day personal calibration reviews led directly by Camilla Vance-Moreau',
    ],
    termsNote: 'Membership terms provided following a private introduction',
    ctaLabel: 'Request Global Introduction',
    modalTopic: 'The Global Membership',
  },
  {
    id: 'office',
    code: 'Charter 03',
    ribbon: 'Multi-Family Office Retained',
    title: 'The Private Office',
    summary:
      'A bespoke family-office partnership providing retained executive lifestyle oversight aligned seamlessly with Chiefs of Staff, legal teams, and CFOs.',
    coreFeatures: [
      'Senior Executive Lifestyle Director + dedicated four-specialist pod',
      'Direct coordination with family office CFOs, EAs & private bankers',
      'Off-market London townhouse & stately estate search stewardship',
      'Retained SIA close protection & digital privacy architecture',
      'Bespoke multi-entity trust accounting & custom response SLAs',
    ],
    expandedFeatures: [
      'Dedicated encrypted portal workspace tailored for multi-generational family branches',
      'Annual private family assembly staging across London, Geneva, or country estates',
      'Specialist Oxbridge / Ivy League educational mentorship & guardianship liaison',
      'Bespoke horology, fine art & sovereign wine cellar provenance due diligence',
      'Mutual Non-Disclosure Covenant under English Law with dedicated compliance contact',
    ],
    termsNote: 'Structured by bespoke partner consultation',
    ctaLabel: 'Request Private Office Advisory',
    modalTopic: 'The Private Office',
  },
];

const CHARTER_COMPARISON_ROWS = [
  {
    dimension: 'Primary Jurisdiction',
    london: 'London W1–SW1 & Home Counties',
    global: 'London + Europe, North America, UAE & Asia',
    office: 'Global Unlimited + Retained Local Attachés',
  },
  {
    dimension: 'Advisory Team Structure',
    london: '1 Named Lifestyle Manager',
    global: '1 Senior Director + 24/7 Duty Desk',
    office: '4-Role Dedicated Pod (Lifestyle, Aviation, Art, Security)',
  },
  {
    dimension: 'Urgent Response SLA',
    london: 'Under 30 mins (Dining & Fleet)',
    global: 'Under 15 mins (Aviation & Crisis)',
    office: 'Immediate Priority Line (< 10 mins) 24/7/365',
  },
  {
    dimension: 'Household Coverage',
    london: 'Principal + Partner',
    global: 'Principal, Spouse, Children & Travelling Staff',
    office: 'Multi-Generational Family Branches + Family Office EAs',
  },
  {
    dimension: 'Aviation & Maritime',
    london: 'Preferential UK FBO Introductions',
    global: 'Full Part 135 Aircraft & Superyacht Desk',
    office: 'Retained Tail Allocations + Crew & Captain Vetting',
  },
  {
    dimension: 'Sub-Rosa & Urban Culture',
    london: 'Full Member Sector Clearance',
    global: 'Priority Private Buyouts & Artist Booths',
    office: 'Bespoke Closed-House & Vault Buyout Mandates',
  },
  {
    dimension: 'Financial Reconciliation',
    london: 'Monthly Pass-Through Invoice',
    global: 'Multi-Currency Pass-Through Ledger',
    office: 'Split Trust / Corporate Entity CFO Reporting',
  },
  {
    dimension: 'Annual Calibration',
    london: '90-Day + Annual Review',
    global: 'Seasonal Itinerary Planning Reviews',
    office: 'Quarterly In-Person Principal & Chief of Staff Audit',
  },
];

const POD_ROLES = [
  {
    icon: Users,
    role: 'Role 01 · Senior Lifestyle Director',
    title: 'Your Primary Confidant at Albemarle Street',
    detail:
      'Remembers every dietary nuance, preferred room exposure, family anniversary, and communication habit—remaining reachable personally rather than rotating tickets across shift clerks.',
  },
  {
    icon: Globe,
    role: 'Role 02 · Aviation & Mobility Desk',
    title: 'Julian Sterling’s Airfield & Fleet Team',
    detail:
      'Coordinates directly with RAF Northolt Gate 4, Farnborough aprons, twin-engine helicopter pads, and armoured/unmarked Mayfair saloons under real-time telemetry.',
  },
  {
    icon: Shield,
    role: 'Role 03 · Discretion & Sub-Rosa Access',
    title: 'Pseudonym Registry & Close Protection',
    detail:
      'Protects household anonymity via corporate alias bookings, SIA-licensed polite protection, encrypted portal dossiers, and verified backstage venue exits.',
  },
  {
    icon: Clock,
    role: 'Role 04 · Cultural, Property & Estate Steward',
    title: 'Residences, Sourcing & Private Curators',
    detail:
      'Pre-warms Cotswolds and Belgravia houses before you leave the tarmac, sources unpolished collector watches, and arranges after-hours museum walks with senior scholars.',
  },
];

export const MembershipPage: React.FC = () => {
  const { openIntroductionModal, navigateTo } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedCharters, setExpandedCharters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MEMBERSHIP_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleCharterExpand = (id: string) => {
    setExpandedCharters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllCharters = () => {
    const allOpen = CHARTER_TIERS.every((t) => expandedCharters[t.id]);
    const nextState: Record<string, boolean> = {};
    CHARTER_TIERS.forEach((t) => {
      nextState[t.id] = !allOpen;
    });
    setExpandedCharters(nextState);
  };

  const membershipFaqs = FAQS_DATA.filter(
    (f) => f.category === 'Membership' || f.category === 'Admissions' || f.category === 'Family & Private Office'
  );

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pb-16 overflow-x-clip">
      {/* 1. Full-Width Cinematic Moving Membership Hero */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center border-b border-[#1D1F28] pt-14 sm:pt-18 pb-12 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={MEMBERSHIP_HERO_SLIDES[currentSlide]}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              src={MEMBERSHIP_HERO_SLIDES[currentSlide]}
              alt="TGLC Private Membership Sanctums"
              referrerPolicy="no-referrer"
              animate={{ scale: [1.03, 1, 1.02] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-transparent to-[#07080B]/65" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-3 bg-[#08090C]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {MEMBERSHIP_HERO_SLIDES.map((_, idx) => (
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
          <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-1">
            {String(currentSlide + 1).padStart(2, '0')} / {String(MEMBERSHIP_HERO_SLIDES.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + MEMBERSHIP_HERO_SLIDES.length) % MEMBERSHIP_HERO_SLIDES.length)}
              className="p-1 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % MEMBERSHIP_HERO_SLIDES.length)}
              className="p-1 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-5">
          <motion.span
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tglc-kicker text-xs block"
          >
            Admissions & Private Charters
          </motion.span>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F0] leading-tight text-balance"
          >
            Private Membership
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            “The right introduction, at the right moment.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="tglc-prose text-xs sm:text-base max-w-2xl mx-auto"
          >
            We keep our roll intentionally small so that every lifestyle director at 3rd Floor, 45 Albemarle Street knows our patrons by voice, temperament, and preference. Membership opens strictly by private introduction, referral, or committee review.
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal('General Membership Proposal')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Request an Introduction</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="btn-outline-gold px-6 py-3.5 text-xs bg-[#0B0C10]/80 whitespace-nowrap shrink-0"
            >
              Arrange Mayfair Consultation
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 pt-8 sm:pt-10">
        {/* 2. Life Within the Consortium — Levelled Pictorial Diptych & Human Essay */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0.9, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="tglc-kicker text-xs block">
              A House Built Around Quiet Continuity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight text-balance">
              Never explain your preferences twice.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm tglc-prose">
              <p>
                Most concierge cards still treat families as helpdesk ticket numbers rotating between junior operators. At The Global Luxury Consortium, your relationship rests with one dedicated London lifestyle director supported by trusted specialists across aviation, estates, culture, and security.
              </p>
              <p>
                We notice the quiet details that shift a busy week from exhausting to restorative: knowing which corner room at Claridge’s catches soft morning light, ensuring your Range Rover SV holds still glass-bottled spring water at Heathrow, or having your country home in Oxfordshire warmly lit hours before you turn into the drive.
              </p>
              <p>
                Membership terms and retainers are shared candidly following an unhurried initial conversation with Camilla Vance-Moreau in person at our Mayfair house or over private call. Every flight invoice, cellar allocation, and hotel folio passes through at transparent supplier cost without hidden markups.
              </p>
            </div>
          </motion.div>

          {/* Strictly Levelled Two-Photo Grid — Zero Vertical Stagger */}
          <motion.div
            initial={{ opacity: 0.9, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch"
          >
            <figure className="flex flex-col bg-[#0D1017] border border-[#242632] overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/cotswolds_manor_estate.jpg"
                  alt="Country Manor Provisioning"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
              </div>
              <figcaption className="p-4 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                Your country manor in the Cotswolds, warmed, lit, and stocked with preferred pantry provisions days before you arrive.
              </figcaption>
            </figure>

            <figure className="flex flex-col bg-[#0D1017] border border-[#242632] overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden bg-black">
                <img
                  src="/assets/aistudio/mayfair_fine_dining.jpg"
                  alt="Mayfair Candlelit Dining Room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
              </div>
              <figcaption className="p-4 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                A quiet corner table held across Mayfair and St James’s where the head sommelier already knows your favourite vintage.
              </figcaption>
            </figure>
          </motion.div>
        </section>

        {/* Inside a Member's Year 3-Photo Strip */}
        <section className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4 border-b border-[#1D1F28]">
            <div className="lg:col-span-6 space-y-1.5">
              <span className="tglc-kicker text-xs block">
                Seasonal Cadence & Fee Candour
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0]">
                Inside a Member’s Year
              </h2>
            </div>
            <p className="lg:col-span-6 text-xs sm:text-sm tglc-prose">
              Rather than confusing points ledgers or opaque markups, one clear annual subscription covers spouse, children under twenty-five, and travelling household staff across London, Alpine snowfields, and the Mediterranean coast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                img: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
                season: 'Spring & Maritime Season',
                caption: 'Private Thames launches, Chelsea Flower Show mornings, and Mediterranean yacht moorings ready before your tender arrives.',
              },
              {
                img: '/assets/aistudio/royal_opera_gallery.jpg',
                season: 'Summer & Cultural Patronage',
                caption: 'Centre Court debenture seats at SW19, Royal Opera interval salons, and private garden dinners across Oxfordshire estates.',
              },
              {
                img: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
                season: 'Autumn & Alpine Return',
                caption: 'Step directly from your Mayfair car onto the Farnborough apron with luggage cleared for Verbier and St Moritz ski weeks.',
              },
            ].map((card, i) => (
              <motion.figure
                key={card.season}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-[#0D1017] border border-[#20222E] overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={card.img}
                    alt={card.season}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-5 space-y-1.5 flex-1 border-t border-[#1D1F28]">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B] block">{card.season}</span>
                  <p className="text-xs tglc-prose">{card.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 3. The 3 Charters — Symmetrical Alignment + Expandable Features */}
        <section className="space-y-8">
          <div className="border-b border-[#1D1F28] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-2">
                Three Charters
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                Tailored Pathways to Match Your Rhythm
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                Annual commitments structured cleanly around London residents, multi-continent families, and established single-family offices.
              </p>
              <button
                type="button"
                onClick={toggleAllCharters}
                className="btn-outline-gold px-4 py-2 text-[11px] whitespace-nowrap shrink-0"
              >
                {CHARTER_TIERS.every((t) => expandedCharters[t.id]) ? 'Collapse All Details' : 'Expand All Entitlements'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {CHARTER_TIERS.map((tier, idx) => {
              const isExpanded = Boolean(expandedCharters[tier.id]);
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`p-8 sm:p-9 flex flex-col justify-between transition-all ${
                    tier.featured
                      ? 'bg-[#12141D] border border-[#B98633]/75 shadow-2xl hover:border-[#CFA85E]'
                      : 'bg-[#0F1117] border border-[#20222E] hover:border-[#8B672B]'
                  }`}
                >
                  <div className="flex flex-col flex-1">
                    {/* Identical Height Top Header Rail Across All Three Boxes */}
                    <div className="min-h-[26px] mb-3 flex items-center justify-between gap-2 border-b border-[#1D1F28] pb-2">
                      <span className="text-xs uppercase tracking-widest text-[#C4933F] font-mono tabular-nums">
                        {tier.code}
                      </span>
                      <span
                        className={`text-[10px] tracking-widest uppercase font-medium truncate ${
                          tier.featured ? 'text-[#E2BA6B]' : 'text-[#8F98AA]'
                        }`}
                      >
                        {tier.ribbon}
                      </span>
                    </div>

                    {/* Fixed Title & Summary Footprint for Symmetrical Divider Line */}
                    <h3 className="font-serif text-3xl text-[#F4F1EA] mb-3 min-h-[40px] flex items-center">
                      {tier.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 font-light lg:min-h-[72px] ${
                        tier.featured ? 'text-[#D9D4CA]' : 'text-[#9C968A]'
                      }`}
                    >
                      {tier.summary}
                    </p>

                    <div className="space-y-3 text-xs text-[#D9D4CA] border-t border-[#242632] pt-6 mb-5 flex-1">
                      {tier.coreFeatures.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                          <span className="font-light leading-relaxed">{item}</span>
                        </div>
                      ))}

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pt-3 mt-3 border-t border-[#1D1F28] space-y-2.5"
                          >
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E2BA6B] block pb-1">
                              Extended Charter Entitlements
                            </span>
                            {tier.expandedFeatures.map((extra, exIdx) => (
                              <div key={exIdx} className="flex items-start gap-2.5">
                                <Check className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                                <span className="text-[#B5AFA3] font-light leading-relaxed">{extra}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCharterExpand(tier.id)}
                      className="w-full py-2.5 px-3 mb-5 border border-[#242632] hover:border-[#8B672B] bg-[#0B0C10]/70 text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center justify-between transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Detailed Entitlements' : 'View Full Charter Entitlements'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <div className="pt-2">
                    <p className="text-[11px] text-[#CFA85E] italic mb-4 font-serif min-h-[18px]">
                      {tier.termsNote}
                    </p>
                    <button
                      onClick={() => openIntroductionModal(tier.modalTopic)}
                      className={`${tier.featured ? 'btn-gold py-3.5' : 'btn-outline-gold py-3.5'} w-full text-xs whitespace-nowrap`}
                    >
                      {tier.ctaLabel}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Side-by-Side Membership Charter Comparison Matrix */}
          <div className="bg-[#0D1017] border border-[#242630] overflow-hidden mt-8">
            <div className="px-6 py-5 border-b border-[#20232E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="tglc-kicker text-[10px] block">Side-by-Side Charter Matrix</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-0.5">
                  Compare Membership Charters
                </h3>
              </div>
              <span className="text-xs text-[#8F98AA] font-light">
                All three charters carry zero undisclosed supplier markups.
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[740px]">
                <thead>
                  <tr className="bg-[#11131B] border-b border-[#242630] text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B]">
                    <th className="py-4 px-5 w-1/4">Operational Dimension</th>
                    <th className="py-4 px-5 w-1/4">Charter 01 · London</th>
                    <th className="py-4 px-5 w-1/4 text-[#FAF7F0] bg-[#161925]">Charter 02 · Global</th>
                    <th className="py-4 px-5 w-1/4">Charter 03 · Private Office</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1F28] text-xs">
                  {CHARTER_COMPARISON_ROWS.map((row) => (
                    <tr key={row.dimension} className="hover:bg-[#10131C] transition-colors">
                      <td className="py-4 px-5 font-medium text-[#FAF7F0]">{row.dimension}</td>
                      <td className="py-4 px-5 text-[#B5AFA3] font-light">{row.london}</td>
                      <td className="py-4 px-5 text-[#FAF7F0] bg-[#121521]/75 font-normal">{row.global}</td>
                      <td className="py-4 px-5 text-[#D9D4CA] font-light">{row.office}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* 4. What Membership at TGLC Actually Delivers — Specialist Pod + Concrete SLAs */}
        <section className="space-y-8 bg-[#0D0F15] border border-[#20222E] p-7 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1D1F28] pb-8">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                What Membership Actually Delivers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] leading-tight">
                Four Senior Minds Backing One Quiet Number.
              </h2>
              <p className="text-xs sm:text-sm text-[#B5AFA3] leading-relaxed font-light">
                Every family joining TGLC gains an integrated four-role Mayfair pod backed by verifiable response guarantees, zero supplier commission bias, and full multi-residence memory.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: '15 Mins', label: 'Urgent Jet Sourcing' },
                { val: '4 Hours', label: 'Typical Wheels-Up' },
                { val: '0%', label: 'Supplier Mark-Ups' },
                { val: '24/7/365', label: 'Senior Duty Line' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 bg-[#07080B] border border-[#242630] space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl text-[#E2BA6B] tabular-nums block">
                    {stat.val}
                  </span>
                  <span className="text-[11px] text-[#9C968A] leading-snug block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POD_ROLES.map((pod) => {
              const Icon = pod.icon;
              return (
                <div key={pod.role} className="p-6 bg-[#11131A] border border-[#242632] space-y-2.5">
                  <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B]">
                    <Icon className="w-4 h-4 text-[#CFA85E] shrink-0" />
                    <span>{pod.role}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0]">{pod.title}</h3>
                  <p className="text-xs sm:text-sm text-[#B5AFA3] leading-relaxed font-light">{pod.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Paired Human-Captioned Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
              <figure className="flex flex-col bg-[#08090C] border border-[#242632] overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src="/assets/aistudio/savile_row_bespoke.jpg"
                    alt="Bespoke Consultation at Savile Row"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-3.5 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                  Master cutters from Savile Row attend you privately in Mayfair or at home—saving hours across fitting seasons.
                </figcaption>
              </figure>

              <figure className="flex flex-col bg-[#08090C] border border-[#242632] overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src="/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg"
                    alt="Private Belgravia Townhouse Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-3.5 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                  Your Belgravia or Mayfair townhouse inspected weekly, keeping silver, cellars, and guest suites ready year-round.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'Proactive Seasonal Holds',
                  body: 'Months before Wimbledon, Frieze, St Moritz, or Monaco GP, your director sets curated tables, helicopter slots, and yacht berths ahead of public release.',
                },
                {
                  title: 'True Invoice Transparency',
                  body: 'Every vendor bill is forwarded verbatim at net negotiated cost. Our sole revenue is your annual charter—never kickbacks from brokers or boutiques.',
                },
                {
                  title: 'Encrypted Alias Logistics',
                  body: 'Travel manifests, boutique deliveries, and private dining tables register neatly under TGLC house aliases to keep your surname off external systems.',
                },
                {
                  title: 'Seamless Family Office Reporting',
                  body: 'Clean monthly pass-through schedules integrate with family office controllers, distinguishing personal expenses, aircraft hours, and residence retainers.',
                },
              ].map((item) => (
                <div key={item.title} className="space-y-1.5 border-t border-[#1D1F28] pt-4">
                  <h4 className="font-serif text-xl text-[#F4F1EA]">{item.title}</h4>
                  <p className="text-xs text-[#9C968A] leading-relaxed font-light">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* 5. The 5-Step Induction Journey */}
        <section>
          <div className="border-b border-[#1D1F28] pb-4 mb-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1.5">
              Admissions Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              How Membership Begins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">
            {APPROACH_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="p-6 bg-[#0F1117] border border-[#20222E] hover:border-[#8B672B]/70 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-2xl text-[#CFA85E] block mb-3 tabular-nums">{step.step}</span>
                  <h3 className="font-serif text-lg text-[#F4F1EA] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9C968A] leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 6. Comprehensive Membership & Family Office FAQs */}
        <section className="space-y-6">
          <div className="border-b border-[#1D1F28] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1">
                Admissions & Household Inquiries
              </span>
              <h2 className="font-serif text-3xl text-[#F4F1EA]">
                Membership Questions & Answers
              </h2>
            </div>
            <button
              onClick={() => navigateTo('faq')}
              className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <span>View Full FAQ Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {membershipFaqs.map((faq, idx) => (
              <div key={faq.id} className="bg-[#0F1117] border border-[#20222E]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-[#F4F1EA] hover:text-[#CFA85E] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] block">
                      {faq.category}
                    </span>
                    <span className="font-serif text-lg sm:text-xl block">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B98633] shrink-0 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-[#B5AFA3] leading-relaxed border-t border-[#1D1F28] pt-3.5 font-light overflow-hidden"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 7. Bottom Personal Invitation */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          className="p-8 sm:p-11 bg-[#101219] border border-[#242632] text-center space-y-5 max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.24em] text-[#C4933F] block">Confidential Inquiries</span>
          <h3 className="font-serif text-3xl text-[#F4F1EA]">
            Begin with a Private Conversation
          </h3>
          <p className="text-xs sm:text-sm text-[#9C968A] max-w-lg mx-auto leading-relaxed font-light">
            We invite prospective members to arrange an unhurried consultation with Camilla Vance-Moreau at 3rd Floor, 45 Albemarle Street, London W1S 4JL, or via telephone on <span className="text-[#CFA85E] tabular-nums">{TGLC_CONTACT.telephone}</span>.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openIntroductionModal('Membership Inquiry')}
              className="btn-gold px-8 py-3.5 text-xs"
            >
              Submit an Introduction
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

