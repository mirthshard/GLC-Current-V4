import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { ArrowUpRight, Check, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#08090C] border-t border-[#1D1F28] text-[#9C968A] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">

        {/* Top Architectural Grid: Framed Official Logo Emblem, Brand Statement & Dispatch Subscription */}
        <motion.div
          initial={{ opacity: 0.92, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#1D1F28] items-center"
        >
          {/* Left: Official Crested Emblem & House Overview */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-36 sm:w-40 shrink-0 bg-black border border-[#8B672B]/40 p-3 shadow-xl">
                <img
                  src="/assets/aistudio/tglc_lockup_transparent.png"
                  alt="The Global Luxury Consortium Official Crest Lockup"
                  className="w-full h-auto object-contain block"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.26em] text-[#C4933F] font-medium block">
                  Mayfair, London · Global Private Office
                </span>
                <p className="font-serif text-xl sm:text-2xl italic text-[#F4F1EA] leading-relaxed">
                  “London, understood from every angle. A life arranged with clinical precision and quiet grace.”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9C968A] max-w-xl leading-relaxed font-light">
              A private lifestyle-management house serving ultra-high-net-worth individuals, families, and family offices between London, Geneva, Monaco, and New York. Discretion by default, human intelligence, and sovereign access without commercial fanfare.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D9D4CA]">
              <span className="text-[#CFA85E] font-medium">Mayfair, London</span>
              <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
              <span>3rd Floor, 45 Albemarle Street</span>
              <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
              <span className="text-[#DDB872] tabular-nums">W1S 4JL</span>
            </div>
          </div>

          {/* Right: Private Dispatch Form */}
          <div className="lg:col-span-6 bg-[#101219] border border-[#222430] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#C4933F] font-medium block">
                Private Dispatch
              </span>
              <h4 className="font-serif text-2xl text-[#F4F1EA]">
                Receive The TGLC Journal & Seasonal Invitations
              </h4>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                A quiet, bi-monthly dispatch examining private aviation routes, London cultural openings, fine horology, and acquisitions. Zero mass marketing.
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="p-4 bg-[#161822] border border-[#8B672B] text-xs text-[#F4F1EA] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#CFA85E] shrink-0" />
                <span>Thank you. Your address has been registered on our confidential dispatch roll.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter confidential email address..."
                  required
                  className="flex-1 bg-[#0B0C10] border border-[#282B36] focus:border-[#B98633] px-4 py-3 text-xs text-[#F4F1EA] placeholder-[#6E6A63] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-gold px-6 py-3 text-xs whitespace-nowrap shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#1D1F2A] flex flex-wrap items-center justify-between gap-4 text-xs text-[#9C968A]">
              <span>Instagram: <span className="text-[#D9D4CA]">{TGLC_CONTACT.instagram}</span></span>
              <span>LinkedIn: <span className="text-[#D9D4CA]">{TGLC_CONTACT.linkedIn}</span></span>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Minmax-Protected Grid so Long Email & Details Never Overflow Adjacent Columns */}
        <motion.div
          initial={{ opacity: 0.92, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.55fr)] gap-x-6 lg:gap-x-6 xl:gap-x-8 gap-y-10 py-2 border-b border-[#1D1F28] pb-10 text-xs"
        >
          {/* Column 1: The Consortium */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">The Consortium</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('about')} className="hover:text-[#CFA85E] transition-colors text-left">About TGLC & Leadership</button></li>
              <li><button onClick={() => navigateTo('ethos')} className="hover:text-[#CFA85E] transition-colors text-left">Our Ethos & Principles</button></li>
              <li><button onClick={() => navigateTo('approach')} className="hover:text-[#CFA85E] transition-colors text-left">Our Approach</button></li>
              <li><button onClick={() => navigateTo('network')} className="hover:text-[#CFA85E] transition-colors text-left">The TGLC Network</button></li>
              <li><button onClick={() => navigateTo('our-london')} className="hover:text-[#CFA85E] transition-colors text-left">Our London & Map</button></li>
              <li><button onClick={() => navigateTo('privacy-discretion')} className="hover:text-[#CFA85E] transition-colors text-left">Privacy & Discretion</button></li>
            </ul>
          </div>

          {/* Column 2: Key Services */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Core Practices</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'travel-aviation' })} className="hover:text-[#CFA85E] transition-colors text-left">Travel & Aviation</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'dining-nightlife' })} className="hover:text-[#CFA85E] transition-colors text-left">Dining & Social Access</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'experiences-culture' })} className="hover:text-[#CFA85E] transition-colors text-left">Experiences & Culture</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'residences-relocation' })} className="hover:text-[#CFA85E] transition-colors text-left">Residences & Relocation</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'transport-security' })} className="hover:text-[#CFA85E] transition-colors text-left">Transport & Security</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'personal-private-office' })} className="hover:text-[#CFA85E] transition-colors text-left">Personal & Private Office</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'luxury-sourcing' })} className="hover:text-[#CFA85E] transition-colors text-left">Luxury Sourcing</button></li>
              <li>
                <button onClick={() => navigateTo('hidden-london')} className="text-[#CFA85E] hover:text-white transition-colors font-medium text-left">
                  The Other Side of London
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Engagement */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Engagement</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('commission-studio')} className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">Commission Studio</button></li>
              <li><button onClick={() => navigateTo('case-studies')} className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">Case Studies & Itineraries</button></li>
              <li><button onClick={() => navigateTo('membership')} className="hover:text-[#CFA85E] transition-colors text-left">Membership Charters</button></li>
              <li><button onClick={() => navigateTo('calendar')} className="hover:text-[#CFA85E] transition-colors text-left">The London Calendar</button></li>
              <li><button onClick={() => navigateTo('journal')} className="hover:text-[#CFA85E] transition-colors text-left">The TGLC Journal</button></li>
              <li><button onClick={() => navigateTo('faq')} className="hover:text-[#CFA85E] transition-colors text-left">Frequently Asked Questions</button></li>
              <li>
                <button onClick={() => openIntroductionModal('Membership Inquiry')} className="text-[#CFA85E] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left">
                  <span>Request Introduction</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Member Access */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Member Portal</h5>
            <ul className="space-y-3.5 min-w-0">
              <li>
                <button onClick={() => navigateTo('member-portal')} className="hover:text-[#CFA85E] transition-colors flex items-center gap-1.5 text-[#F4F1EA]">
                  <Lock className="w-3.5 h-3.5 text-[#C4933F] shrink-0" />
                  <span>Member Sign In</span>
                </button>
              </li>
              <li>
                <span className="text-[#7E7A72] block">Dedicated Member Line</span>
                <span className="block text-[#D9D4CA] font-medium pt-0.5 tabular-nums">{TGLC_CONTACT.privateMemberLine}</span>
              </li>
              <li className="min-w-0">
                <span className="text-[#7E7A72] block">Member Support Desk</span>
                <a
                  href={`mailto:${TGLC_CONTACT.memberSupport}`}
                  className="block max-w-full text-[#CFA85E] hover:text-[#DDB872] transition-colors pt-0.5 text-[11px] xl:text-xs break-words"
                >
                  {TGLC_CONTACT.memberSupport.split('@')[0]}@<wbr />{TGLC_CONTACT.memberSupport.split('@')[1]}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Headquarters Address */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">TGLC House</h5>
            <address className="not-italic space-y-2.5 leading-relaxed text-[#D9D4CA] min-w-0">
              <p className="text-xs font-light">{TGLC_CONTACT.address.toString()}</p>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">Company Telephone</span>
                <p className="text-[#CFA85E] font-medium text-sm tabular-nums">{TGLC_CONTACT.telephone}</p>
              </div>
              <div className="min-w-0">
                <span className="text-[#7E7A72] block">Admissions & Desk</span>
                <a
                  href={`mailto:${TGLC_CONTACT.email}`}
                  className="block max-w-full text-[#D9D4CA] hover:text-[#CFA85E] transition-colors pt-0.5 text-[11px] xl:text-xs break-words"
                >
                  {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">Company Number</span>
                <p className="text-[#D9D4CA] tabular-nums">{TGLC_CONTACT.companyNumber}</p>
              </div>
            </address>
          </div>
        </motion.div>

        {/* Bottom Wordmark & Legal Row */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#7E7A72]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="/assets/aistudio/tglc_crest_transparent.png"
              alt="TGLC Seal"
              className="w-6 h-7 object-contain opacity-80 hidden sm:block"
            />
            <div className="space-y-1">
              <p className="text-[#9C968A]">© {new Date().getFullYear()} The Global Luxury Consortium Ltd. All rights reserved.</p>
              <p className="text-[#6E6A63] tabular-nums">
                Registered in England & Wales · Company Number {TGLC_CONTACT.companyNumber} · {TGLC_CONTACT.address.toString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#8E8A83]">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-[#CFA85E] transition-colors">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-[#CFA85E] transition-colors">Terms & Conditions</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('cookie-policy')} className="hover:text-[#CFA85E] transition-colors">Cookie Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('accessibility')} className="hover:text-[#CFA85E] transition-colors">Accessibility</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('image-credits')} className="hover:text-[#CFA85E] transition-colors">Image Credits</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('sitemap')} className="hover:text-[#CFA85E] transition-colors">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
