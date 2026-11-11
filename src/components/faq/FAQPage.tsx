import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { FAQS_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';

const FAQ_CATEGORIES = [
  'All Inquiries',
  'Membership',
  'Services & Scope',
  'Discretion & Privacy',
  'International',
  'Family & Private Office',
  'Admissions',
];

export const FAQPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [selectedCat, setSelectedCat] = useState('All Inquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>(['faq-01']);

  const categoryCounts = FAQ_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] =
      cat === 'All Inquiries'
        ? FAQS_DATA.length
        : FAQS_DATA.filter((item) => item.category === cat).length;
    return acc;
  }, {});

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchCat = selectedCat === 'All Inquiries' || item.category === selectedCat;
    const matchSearch =
      !searchQuery.trim() ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pt-6 sm:pt-8 pb-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Cinematic Photographic Header */}
        <section className="relative min-h-[330px] sm:min-h-[400px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
          <motion.img
            initial={{ scale: 1.05, opacity: 0.92 }}
            animate={{ scale: [1.05, 1, 1.04], opacity: 1 }}
            transition={{
              scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.9 },
            }}
            src="/assets/aistudio/savile_row_bespoke.jpg"
            alt="TGLC Advisory Craft and Standards"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3"
          >
            <span className="tglc-kicker text-[11px] block">
              Admissions & Operations Guidance
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
              Frequently Addressed Inquiries
            </h1>
            <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
              “Clear expectations protect every trusted relationship.”
            </p>
            <p className="tglc-prose text-xs sm:text-base max-w-2xl">
              Straightforward answers regarding membership admissions, commission-free sourcing, international travel support, family office integration, and confidentiality rules.
            </p>
          </motion.div>
        </section>

        {/* Albemarle Street Advisory Desk Briefing */}
        <section className="p-6 sm:p-8 bg-[#0D1017] border border-[#242630] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 space-y-1.5">
            <span className="tglc-kicker text-[10px] block">
              House Standards in Plain English
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              No Hidden Mark-Ups. No External Call Centres.
            </h2>
          </div>
          <p className="lg:col-span-8 text-xs sm:text-sm tglc-prose">
            Prospective members and family office directors frequently ask how a boutique Mayfair house differs from high-volume concierge cards. Every question below reflects the exact operating rules practised daily from the third floor of 45 Albemarle Street—from how direct supplier billing works to how our principals safeguard travel manifests and private introductions.
          </p>
        </section>

        {/* Search, Category Filter & Expand All Toolbar */}
        <div className="space-y-4 border-y border-[#20232E] py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E2BA6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inquiries (e.g. aviation, fees, confidentiality, urban clubs, dining)..."
                className="w-full h-11 bg-[#0D1017] border border-[#242630] focus:border-[#E2BA6B] pl-11 pr-4 text-xs sm:text-sm text-[#FAF7F0] placeholder-[#8E95A5] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                const allVisibleIds = filteredFaqs.map((f) => f.id);
                const allExpanded =
                  allVisibleIds.length > 0 &&
                  allVisibleIds.every((id) => expandedIds.includes(id));
                setExpandedIds(allExpanded ? [] : allVisibleIds);
              }}
              className="h-11 px-5 text-xs tracking-wide border border-[#2A2D38] hover:border-[#E2BA6B] bg-[#0D1017] text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0"
            >
              {filteredFaqs.length > 0 &&
              filteredFaqs.every((f) => expandedIds.includes(f.id))
                ? 'Collapse All Answers'
                : 'Expand All Answers'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`h-9 px-4 text-xs tracking-wide transition-colors border whitespace-nowrap shrink-0 ${
                  selectedCat === cat
                    ? 'bg-[#181B24] text-[#FAF7F0] border-[#E2BA6B] font-medium'
                    : 'text-[#B5BCCB] hover:text-[#FAF7F0] bg-[#0D1017] border-[#242630] hover:border-[#8B672B]'
                }`}
              >
                <span className="tabular-nums">
                  {cat} · {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Animated Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#D4D8E2] bg-[#0D1017] border border-[#242630]">
              No questions matched your filter. Contact our admissions team at {TGLC_CONTACT.email}.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedIds.includes(faq.id);
              const qNum = String(FAQS_DATA.findIndex((item) => item.id === faq.id) + 1).padStart(2, '0');
              return (
                <div
                  key={faq.id}
                  className={`bg-[#0D1017] border transition-colors ${
                    isOpen ? 'border-[#E2BA6B]' : 'border-[#242630]'
                  }`}
                >
                  <button
                    onClick={() =>
                      setExpandedIds((prev) =>
                        prev.includes(faq.id)
                          ? prev.filter((id) => id !== faq.id)
                          : [...prev, faq.id]
                      )
                    }
                    className="w-full text-left p-6 flex items-start justify-between gap-4 text-[#FAF7F0]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider text-[#E2BA6B]">
                        <span className="font-mono tabular-nums font-medium">Q{qNum}.</span>
                        <span className="text-[#8B672B]">·</span>
                        <span>{faq.category}</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] leading-snug text-balance">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E2BA6B] shrink-0 mt-1 transition-transform duration-200 ${
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
                        <div className="px-6 pb-6 pt-3 border-t border-[#20232E] text-xs sm:text-sm tglc-prose text-[#D4D8E2] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        <GoldDivider />

        {/* Four Advisory Photography Panels in Two Balanced Diptychs */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-1.5">
            <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] block">
              Operations in Practice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              Four Pillars Illustrated
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                img: '/assets/aistudio/cotswolds_manor_estate.jpg',
                alt: 'English Country Estate Retreats',
                tag: 'Estates & Relocation',
                title: 'Country Manor & Townhouse Stewardship',
                desc: 'From staffed weekend stays in the Cotswolds to quiet off-market acquisitions around Belgrave Square, one team manages every detail.',
              },
              {
                img: '/assets/aistudio/bond_street_jewellery.jpg',
                alt: 'High Jewellery & Horology Sourcing',
                tag: 'Sourcing & Vaults',
                title: 'Zero-Commission Collector Representation',
                desc: 'We represent your household’s interest alone—arranging closed Bond Street vault viewings with transparent direct invoicing.',
              },
              {
                img: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png',
                alt: 'Global Aviation Tarmac Handoffs',
                tag: 'Aviation & Airfields',
                title: 'Direct FBO Tarmac Dispatch',
                desc: 'Ramp clearance at Farnborough, Northolt, and Biggin Hill places your chauffeur directly at the cabin steps without terminal waiting.',
              },
              {
                img: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
                alt: 'Independent Horology & Archive Provenance',
                tag: 'Horology & Provenance',
                title: 'Independent Horology & Collector Due Diligence',
                desc: 'Private bench viewings with independent master watchmakers and discreet collector acquisitions backed by full archival verification.',
              },
            ].map((panel, idx) => (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={panel.img}
                    alt={panel.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">{panel.tag}</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">{panel.title}</h3>
                  <p className="text-xs sm:text-sm tglc-prose">{panel.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Response Service Benchmarks */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
              Member Advisory & Response Benchmarks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              How TGLC Member Support Operates
            </h2>
            <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
              Defined benchmarks and emergency responsiveness designed for families, principals, and Chiefs of Staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                tag: 'SLA 01 · Urgent Aviation',
                val: '15 Mins',
                desc: 'Initial vetted aircraft options delivered for unscheduled departures out of Farnborough, Northolt, or Biggin Hill.',
              },
              {
                tag: 'SLA 02 · Table Adjustments',
                val: '30 Mins',
                desc: 'Same-day guest count updates, cellar pre-pulls, and private room placement in St James’s and Mayfair.',
              },
              {
                tag: 'SLA 03 · Complex Charters',
                val: '2–4 Hours',
                desc: 'Multi-leg maritime, villa, or alpine itineraries presented with operator credentials and flight routing.',
              },
              {
                tag: 'SLA 04 · Coverage',
                val: '24/7/365',
                desc: 'Direct contact with senior duty lifestyle managers—never rerouted to external scripted desks.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="p-6 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#CFA85E] block">{item.tag}</span>
                <div className="font-serif text-3xl text-[#F4F1EA] tabular-nums">{item.val}</div>
                <p className="text-xs text-[#9C968A] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                code: 'Protocol Alpha',
                title: 'Private Aviation Tarmac Dispatch',
                body: 'Drivers proceed straight to the FBO gate while customs paperwork settles via your dossier, moving guests seamlessly from car door to cabin steps.',
                meta: 'Primary Airfields: RAF Northolt (EGWU), Farnborough (EGLF), Biggin Hill (EGKB).',
              },
              {
                code: 'Protocol Beta',
                title: 'Horology & High Jewellery Viewings',
                body: 'Private salon appointments arranged at Selfridges, Harrods, or New Bond Street with full independent provenance checks and secure courier accompaniment.',
                meta: 'Direct Access: Burlington Arcade, Bond Street Townhouses, Duke St Penthouse.',
              },
              {
                code: 'Protocol Gamma',
                title: 'Family Office & EA Co-ordination',
                body: 'Direct coordination with your Chief of Staff or family office controllers—clearing approvals and itemised statements quietly without burdening the principal.',
                meta: 'Channels: Hardened Signal groups, PGP encrypted mail, Private Member Portal.',
              },
              {
                code: 'Protocol Delta',
                title: 'Transparent Direct Disbursements',
                body: 'Hotels, aircraft flights, and acquisitions settle transparently at direct cost with clear monthly schedules suitable for trust accounting.',
                meta: 'Methods: Client trust escrow, wire settlement, private corporate card.',
              },
            ].map((proto) => (
              <div key={proto.code} className="p-6 bg-[#12141A] border border-[#242630] space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#CFA85E] block">{proto.code}</span>
                <h4 className="font-serif text-xl text-[#F4F1EA]">{proto.title}</h4>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{proto.body}</p>
                <div className="text-[11px] text-[#D9D4CA] pt-2 border-t border-[#20232E] font-light">
                  {proto.meta}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Charter & Admission Commitments */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="tglc-kicker text-xs block">
              Operational Charter & Admission Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
              Written Undertakings Governing Every Household Mandate
            </h2>
            <p className="text-xs sm:text-sm tglc-prose text-[#D4D8E2]">
              Before a retainer commences, TGLC House binds itself to four enforceable operating commitments reviewed annually with your family office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                index: 'Commitment I',
                title: '12:1 Capped Director Ratio',
                detail:
                  'Each Senior Lifestyle Director carries an absolute ceiling of twelve active households, ensuring first-name recall across every residence and assistant.',
              },
              {
                index: 'Commitment II',
                title: 'Verified Net-Zero Rebates',
                detail:
                  'Any airline, hotel, auction house, or craftsperson commission credit received is refunded 100% directly to the member’s escrow ledger.',
              },
              {
                index: 'Commitment III',
                title: 'English Law Perpetual NDAs',
                detail:
                  'Every staff member, driver, and specialist contractor signs binding non-disclosure deeds surviving termination under English jurisprudence.',
              },
              {
                index: 'Commitment IV',
                title: '15-Minute Aviation Escalation',
                detail:
                  'Day or night, urgent unscheduled flight and close-protection mobilization begins within fifteen minutes via direct senior director duty lines.',
              },
            ].map((item) => (
              <div
                key={item.index}
                className="p-6 bg-[#0D1017] border border-[#242630] space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#E2BA6B] block">
                    {item.index}
                  </span>
                  <h3 className="font-serif text-xl text-[#FAF7F0] leading-snug">{item.title}</h3>
                </div>
                <p className="text-xs text-[#D4D8E2] leading-relaxed font-light">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* Still Have Questions Banner */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55 }}
          className="p-8 sm:p-10 bg-[#0D1017] border border-[#242630] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              Have a specific question for our Principals?
            </h3>
            <p className="text-xs sm:text-sm text-[#D4D8E2] mt-1.5 max-w-xl font-light tabular-nums">
              {TGLC_CONTACT.address.toString()}. Telephone: {TGLC_CONTACT.telephone} · Email: {TGLC_CONTACT.email} · Company No. {TGLC_CONTACT.companyNumber}.
            </p>
          </div>
          <button
            onClick={() => openIntroductionModal('Unlisted Question Consultation')}
            className="btn-gold px-7 py-3.5 text-xs whitespace-nowrap shrink-0 inline-flex items-center gap-2"
          >
            <span>Request a Conversation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
