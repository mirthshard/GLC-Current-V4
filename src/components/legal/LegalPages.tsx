import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, JOURNAL_ARTICLES, TGLC_CONTACT } from '../../data/tglcData';
import { ArrowLeft } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

interface LegalPagesProps {
  page:
    | 'privacy-policy'
    | 'terms'
    | 'cookie-policy'
    | 'accessibility'
    | 'image-credits'
    | 'sitemap'
    | 'not-found';
}

const LEGAL_HERO_META: Record<
  LegalPagesProps['page'],
  { kicker: string; title: string; subtitle: string }
> = {
  'privacy-policy': {
    kicker: 'Statutory Governance & UK GDPR',
    title: 'Privacy Policy',
    subtitle: 'How TGLC House safeguards personal household records and family office data.',
  },
  terms: {
    kicker: 'Statutory Charter & English Law',
    title: 'Terms & Conditions',
    subtitle: 'Overarching framework governing private representation and introductions.',
  },
  'cookie-policy': {
    kicker: 'Session Integrity',
    title: 'Cookie Policy',
    subtitle: 'Minimal essential session safeguards without intrusive behavioral tracking.',
  },
  accessibility: {
    kicker: 'Digital Inclusion',
    title: 'Accessibility Statement',
    subtitle: 'Engineered to meet WCAG 2.1 AA contrast, focus, and navigation standards.',
  },
  'image-credits': {
    kicker: 'Intellectual Property & Visual Archive',
    title: 'Image Credits & Disclaimers',
    subtitle: 'Attribution and non-endorsement disclosures across the TGLC photographic archive.',
  },
  sitemap: {
    kicker: 'Directory Index',
    title: 'Consortium Sitemap',
    subtitle: 'Complete index of practices, London enclaves, calendar seasons, and essays.',
  },
  'not-found': {
    kicker: 'Error 404',
    title: 'Page Not Found',
    subtitle: 'The address requested may have moved within our Mayfair directory.',
  },
};

export const LegalPages: React.FC<LegalPagesProps> = ({ page }) => {
  const { navigateTo } = useNavigation();
  const meta = LEGAL_HERO_META[page];

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] pt-6 sm:pt-8 pb-14 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs tracking-wide text-[#CFA85E] hover:text-[#DDB872] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </button>

        {/* Cinematic Photographic Header */}
        <section className="relative min-h-[260px] sm:min-h-[320px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]">
          <motion.img
            initial={{ scale: 1.05, opacity: 0.92 }}
            animate={{ scale: [1.05, 1, 1.04], opacity: 1 }}
            transition={{
              scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.9 },
            }}
            src="/assets/aistudio/tglc_st_james_salon.jpg"
            alt="TGLC House Governance & Archives"
            className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/50 to-[#08090C]/25" />

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 p-6 sm:p-10 space-y-2 max-w-3xl"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
              {meta.kicker}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] leading-tight">
              {meta.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#D9D4CA] font-light">{meta.subtitle}</p>
          </motion.div>
        </section>

        {/* Mayfair Governance & Statutory Oversight */}
        <section className="p-6 sm:p-8 bg-[#12141A] border border-[#242630] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#CFA85E] block">
              Mayfair Governance & Statutory Oversight
            </span>
            <p className="text-xs sm:text-sm text-[#B5AFA3] font-light leading-relaxed tabular-nums">
              The Global Luxury Consortium Ltd operates under English Law from {TGLC_CONTACT.houseName}, {TGLC_CONTACT.address.toString()} (Company Number {TGLC_CONTACT.companyNumber}). Questions regarding data guardianship or statutory terms may be directed to our Mayfair Compliance Desk on {TGLC_CONTACT.telephone}.
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-[#20232E] pt-3 sm:pt-0 sm:pl-6">
            <span className="text-[10px] uppercase tracking-widest text-[#8B672B] block">Jurisdiction</span>
            <span className="font-serif text-lg text-[#F4F1EA]">England & Wales</span>
          </div>
        </section>

        {/* Body Views */}
        {page === 'privacy-policy' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light bg-[#12141A] border border-[#242630] p-7 sm:p-10"
          >
            <p className="text-xs text-[#CFA85E] tabular-nums">Effective Date: 1 January 2026 · Last Reviewed: Autumn 2026</p>
            <p className="tabular-nums">
              The Global Luxury Consortium Ltd (“TGLC”, “we”, “our”, or “us”), registered in England & Wales under Company Number {TGLC_CONTACT.companyNumber} with registered offices at {TGLC_CONTACT.houseName}, {TGLC_CONTACT.address.toString()}, is committed to safeguarding personal household data and private introductions.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">1. Data Controller & Principles</h3>
            <p>
              Under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018, TGLC acts as data controller strictly following data minimisation, necessity, and encrypted retention.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">2. Categories of Data Collected</h3>
            <p>
              We hold identifiers (name, telephone, preferred correspondence addresses), aviation passenger details for FBO clearance, hospitality notes, and settlement details supplied voluntarily by members or authorised Chiefs of Staff.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">3. Need-to-Know Vendor Disclosure</h3>
            <p>
              Partner operators receive strictly the bare minimum required to perform bookings—frequently under TGLC house aliases. Client records are never sold or exchanged with outside brokers.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">4. Statutory Rights</h3>
            <p>
              You retain full legal rights under UK GDPR to access, correct, restrict, or request complete deletion of discretionary files via our Data Protection Officer at {TGLC_CONTACT.email}.
            </p>
          </motion.div>
        )}

        {page === 'terms' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light bg-[#12141A] border border-[#242630] p-7 sm:p-10"
          >
            <p className="text-xs text-[#CFA85E] tabular-nums">
              Governing Law: England and Wales · Company Number {TGLC_CONTACT.companyNumber}
            </p>
            <p>
              These Terms and Conditions govern digital access and establish overarching contractual clarity alongside individual Member Charters executed by The Global Luxury Consortium Ltd ({TGLC_CONTACT.houseName}, {TGLC_CONTACT.address.toString()}, Company Number {TGLC_CONTACT.companyNumber}).
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">1. Nature of Representation</h3>
            <p>
              TGLC acts as an appointed introductory advisor and lifestyle house on behalf of its members. Commercial flight, maritime, and hospitality contracts execute directly between members and licensed Tier-1 operators.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">2. Independent Regulated Counsel</h3>
            <p>
              TGLC does not render regulated legal, tax, conveyancing, financial, or medical advice. Where regulated expertise is sought, TGLC facilitates personal introductions to independently regulated specialist practitioners.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">3. Mutual Confidentiality</h3>
            <p>
              Both TGLC and members uphold perpetual mutual confidence covering fee structures, member dossiers, and arrangements beyond conclusion of tenure.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">4. Jurisdiction</h3>
            <p>
              Subject exclusively to the laws and courts of England and Wales.
            </p>
          </motion.div>
        )}

        {page === 'cookie-policy' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light bg-[#12141A] border border-[#242630] p-7 sm:p-10"
          >
            <p>
              Our website relies solely on minimal session storage needed for secure navigation, member portal states, and consent preferences.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">1. Strictly Necessary Identifiers</h3>
            <p>
              Maintain preview gate state, active inquiry forms, and essential routing stability without gathering cross-site user advertising identifiers.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">2. Managing Preferences</h3>
            <p>
              Consent preferences can be updated anytime from browser storage controls or our site footer notice.
            </p>
          </motion.div>
        )}

        {page === 'accessibility' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light bg-[#12141A] border border-[#242630] p-7 sm:p-10"
          >
            <p>
              TGLC is dedicated to welcoming every member and guest equitably in accordance with Web Content Accessibility Guidelines (WCAG 2.1 Level AA).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#D9D4CA]">
              <li>High contrast ratio calibration between warm obsidian backdrops and calibrated bronze typography.</li>
              <li>Keyboard focus indicators across interactive menus, accords, and modal dialogs.</li>
              <li>Structured semantic landmark architecture and generous mobile touch targets.</li>
            </ul>
            <p>
              Should any page element present a barrier, write directly to {TGLC_CONTACT.email} or telephone {TGLC_CONTACT.telephone}.
            </p>
          </motion.div>
        )}

        {page === 'image-credits' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light bg-[#12141A] border border-[#242630] p-7 sm:p-10"
          >
            <p>
              Visual material across this presentation draws strictly from bespoke architectural studies, house heraldry, and commissioned editorial photography held within The Global Luxury Consortium archive.
            </p>
            <h3 className="font-serif text-xl text-[#F4F1EA] pt-2">1. Non-Endorsement & Privacy Guarantee</h3>
            <p>
              Photographs depict public architecture, historic cultural landmarks, hospitality scenes, and bespoke craftsmanship solely to convey lifestyle themes. No private member residences, client portraits, or confidential gatherings appear anywhere on this platform.
            </p>
          </motion.div>
        )}

        {page === 'sitemap' && (
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#12141A] border border-[#242630] p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs"
          >
            <div className="space-y-3">
              <h4 className="font-serif text-lg text-[#F4F1EA] border-b border-[#20232E] pb-2">
                Core Navigation
              </h4>
              <ul className="space-y-2 text-[#9C968A]">
                {[
                  ['home', 'Home Page'],
                  ['consortium', 'The Consortium Overview'],
                  ['about', 'About & Leadership'],
                  ['ethos', 'Our Ethos & Principles'],
                  ['approach', 'Our Approach'],
                  ['network', 'The TGLC Network'],
                  ['our-london', 'Our London & Map'],
                  ['privacy-discretion', 'Privacy & Discretion'],
                  ['membership', 'Membership Charters'],
                  ['calendar', 'The London Calendar'],
                  ['journal', 'The TGLC Journal'],
                  ['member-portal', 'Member Access'],
                  ['contact', 'Contact & Mayfair Office'],
                  ['faq', 'Frequently Asked Questions'],
                ].map(([route, label]) => (
                  <li key={route}>
                    <button
                      onClick={() => navigateTo(route as LegalPagesProps['page'])}
                      className="hover:text-[#DDB872] transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg text-[#F4F1EA] border-b border-[#20232E] pb-2">
                Services & Practices
              </h4>
              <ul className="space-y-2 text-[#9C968A]">
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-[#DDB872]">
                    All Seven Services
                  </button>
                </li>
                {SERVICES_DATA.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => navigateTo('service-detail', { serviceId: s.id })}
                      className="hover:text-[#DDB872] text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg text-[#F4F1EA] border-b border-[#20232E] pb-2">
                Journal Dispatches
              </h4>
              <ul className="space-y-2 text-[#9C968A]">
                {JOURNAL_ARTICLES.slice(0, 8).map((a) => (
                  <li key={a.slug}>
                    <button
                      onClick={() => navigateTo('journal-article', { articleSlug: a.slug })}
                      className="hover:text-[#DDB872] line-clamp-1 text-left"
                    >
                      {a.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {page === 'not-found' && (
          <div className="py-16 text-center space-y-6 bg-[#12141A] border border-[#242630] p-8">
            <p className="font-serif italic text-xl text-[#D9D4CA] max-w-md mx-auto">
              “The door you are seeking is presently closed.”
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button onClick={() => navigateTo('home')} className="btn-gold px-6 py-3 text-xs">
                Return to Homepage
              </button>
              <button onClick={() => navigateTo('services')} className="btn-outline-gold px-6 py-3 text-xs">
                View Practices
              </button>
            </div>
          </div>
        )}

        <GoldDivider />

        {/* Two Large Archive Photographs Present on Every Statutory Page */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5 }}
            className="bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg"
                alt="Mayfair Private Townhouse Architecture"
                className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="px-5 py-3.5 border-t border-[#20232E] flex items-center justify-between text-xs text-[#9C968A]">
              <span>Mayfair Jurisdiction · W1S 4JL</span>
              <span className="text-[#CFA85E] tabular-nums">Co. No. {TGLC_CONTACT.companyNumber}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="/assets/aistudio/florence_palazzo_courtyard.jpg"
                alt="European Cross-Border Private Hospitality"
                className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="px-5 py-3.5 border-t border-[#20232E] flex items-center justify-between text-xs text-[#9C968A]">
              <span>International Fiduciary Protocol</span>
              <span className="text-[#CFA85E]">Geneva · Paris · Milan</span>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
