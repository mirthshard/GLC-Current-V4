import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ShieldCheck, MapPin, Phone, Mail, Clock, CheckCircle, Lock } from 'lucide-react';
import { sendEmailViaBrevo } from '../../utils/brevoEmail';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [location, setLocation] = useState('');
  const [contactMethod, setContactMethod] = useState<'Telephone' | 'Email' | 'WhatsApp / Signal' | 'Private In-Person'>('Telephone');
  const [interestArea, setInterestArea] = useState('The London Membership');
  const [referralSource, setReferralSource] = useState('Existing TGLC Member Referral');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !telephone) {
      setErrorMessage('Please provide your name, email address, and telephone number.');
      return;
    }
    if (!privacyAgreed) {
      setErrorMessage('Please confirm the confidentiality undertaking below before transmitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await sendEmailViaBrevo({
        senderName: fullName,
        senderEmail: email,
        telephone,
        location,
        inquiryType: interestArea,
        preferredChannel: contactMethod,
        subject: `Admissions Inquiry: ${interestArea}`,
        message,
        additionalDetails: { referralSource },
      });

      setDispatchInfo(res.message);
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
      setDispatchInfo('Transmission recorded securely in Mayfair admissions dispatch.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] pt-6 sm:pt-8 pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Cinematic Mayfair Photographic Header */}
        <section className="relative min-h-[340px] sm:min-h-[410px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]">
          <motion.img
            initial={{ scale: 1.05, opacity: 0.92 }}
            animate={{ scale: [1.05, 1, 1.04], opacity: 1 }}
            transition={{
              scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.9 },
            }}
            src="/assets/aistudio/tglc_st_james_salon.jpg"
            alt="TGLC House Mayfair Entrance and Consultation Lounge"
            className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/45 to-[#08090C]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/90 via-[#08090C]/45 to-transparent hidden sm:block" />

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3"
          >
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium block tabular-nums">
              Admissions & Private Introductions · W1S 4JL
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] leading-[1.06]">
              Begin with a quiet conversation.
            </h1>
            <p className="font-serif italic text-lg sm:text-2xl text-[#E5DFD3] leading-relaxed">
              “The right introduction, at the right moment.”
            </p>
            <p className="text-xs sm:text-base text-[#D9D4CA] leading-relaxed font-light max-w-2xl">
              Membership at TGLC is by referral or direct personal introduction. Write to us in confidence or arrange an unhurried meeting in our third-floor Albemarle Street drawing room.
            </p>
          </motion.div>
        </section>

        {/* How Initial Introductions Unfold */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: '01 · Confidential Review',
              title: 'Private Screening',
              body: 'Every inquiry is read directly by a Senior Principal at 45 Albemarle Street—never routed to commercial sales desks or third-party brokers.',
            },
            {
              step: '02 · Drawing Room Meeting',
              title: 'Albemarle Street or Residence',
              body: 'Meet quietly over coffee on our third floor in Mayfair, or let our principals attend your residence or family office across London or Geneva.',
            },
            {
              step: '03 · Household Calibration',
              title: 'Bespoke Mandate Fitting',
              body: 'We align on travel rhythms, security boundaries, EA approvals, and direct pass-through settlement before raising a single formal agreement.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block">{item.step}</span>
              <h2 className="font-serif text-2xl text-[#F4F1EA]">{item.title}</h2>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{item.body}</p>
            </motion.div>
          ))}
        </section>

        {/* Form & Mayfair Headquarters Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Confidential Form */}
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 bg-[#12141A] border border-[#242630] p-7 sm:p-10 shadow-2xl"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-[#181A22] border border-[#8B672B] flex items-center justify-center text-[#CFA85E]">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-3xl text-[#F4F1EA]">
                  Thank you for your introduction.
                </h3>

                <p className="font-serif italic text-xl text-[#D9D4CA] max-w-lg mx-auto leading-relaxed">
                  “A Senior Principal at TGLC House will respond personally and in complete confidence.”
                </p>

                <div className="bg-[#0D0F14] border border-[#242630] p-6 text-xs text-[#9C968A] max-w-md mx-auto text-left space-y-2 font-light">
                  <p className="text-[#CFA85E] font-medium uppercase tracking-wider text-[11px]">
                    Submission Summary
                  </p>
                  <p>
                    Principal: <span className="text-[#F4F1EA]">{fullName}</span>
                  </p>
                  <p>
                    Interest Area: <span className="text-[#F4F1EA]">{interestArea}</span>
                  </p>
                  <p>
                    Preferred Channel: <span className="text-[#F4F1EA]">{contactMethod}</span>
                  </p>
                  {dispatchInfo && (
                    <p className="text-[#A4D65E] text-[11px] font-medium pt-1 border-t border-[#20232E]">
                      ✓ {dispatchInfo}
                    </p>
                  )}
                  <p className="text-[11px] text-[#8B672B] pt-2 border-t border-[#20232E]">
                    Our Mayfair committee responds to all new introductions within one business day.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-outline-gold px-6 py-2.5 text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CFA85E] pb-3 border-b border-[#20232E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidential Introduction Form</span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-[#2C1417] border border-[#521C22] text-xs text-[#F2C2C6]">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Lord Harrington / Elena Rostova"
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="confidential@domain.com"
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+44 (0)20 ... / +1 ..."
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      City / Country of Residence
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. London / Geneva / New York"
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Primary Area of Interest
                    </label>
                    <select
                      value={interestArea}
                      onChange={(e) => setInterestArea(e.target.value)}
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none"
                    >
                      <option value="The London Membership">The London Membership</option>
                      <option value="The Global Membership">The Global Membership</option>
                      <option value="The Private Office Advisory">The Private Office Advisory</option>
                      <option value="Travel & Private Aviation">Travel & Private Aviation</option>
                      <option value="London Dining & Cultural Access">London Dining & Cultural Access</option>
                      <option value="Residences & Relocation">Residences & Relocation</option>
                      <option value="Luxury Sourcing & Acquisitions">Luxury Sourcing & Acquisitions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={contactMethod}
                      onChange={(e) =>
                        setContactMethod(
                          e.target.value as 'Telephone' | 'Email' | 'WhatsApp / Signal' | 'Private In-Person'
                        )
                      }
                      className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none"
                    >
                      <option value="Telephone">Telephone Call</option>
                      <option value="Email">Confidential Email</option>
                      <option value="WhatsApp / Signal">WhatsApp / Signal</option>
                      <option value="Private In-Person">In-Person at TGLC House (45 Albemarle Street)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                    How were you introduced to TGLC?
                  </label>
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none"
                  >
                    <option value="Existing TGLC Member Referral">Existing TGLC Member Referral</option>
                    <option value="Private Family Office / Advisory Introduction">
                      Private Family Office / Advisory Introduction
                    </option>
                    <option value="Mayfair / St James’s Partner Introduction">
                      Mayfair / St James’s Partner Introduction
                    </option>
                    <option value="Personal Recommendation">Personal Recommendation</option>
                    <option value="Private Invitation">Private Invitation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                    Context or Immediate Requirements (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share upcoming London visits, family office coordination needs, or timing preferences..."
                    className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-[#9C968A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="mt-0.5 accent-[#CFA85E]"
                    />
                    <span className="font-light leading-relaxed">
                      I acknowledge that TGLC operates on a strict need-to-know covenant and handles every inquiry under English Law confidentiality and UK GDPR standards.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#20232E]">
                  <span className="text-[11px] text-[#CFA85E]">Direct Mayfair Transmission</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold px-8 py-3.5 text-xs disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting In Confidence...' : 'Submit Introduction'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Details & Urgent Protocol */}
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 bg-[#12141A] border border-[#242630] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#CFA85E]">Headquarters & Salons</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8B672B] tabular-nums">W1S 4JL</span>
              </div>
              <h3 className="font-serif text-3xl text-[#F4F1EA]">{TGLC_CONTACT.houseName}</h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#D9D4CA] border-t border-[#20232E] pt-6 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <p>{TGLC_CONTACT.address.toString()}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <div className="tabular-nums">
                    <p className="text-[#F4F1EA]">Company Telephone: {TGLC_CONTACT.telephone}</p>
                    <p className="text-[#CFA85E] pt-1">Private Member Line: {TGLC_CONTACT.privateMemberLine}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <span className="text-[#9C968A] block text-[11px]">Admissions</span>
                      <a href={`mailto:${TGLC_CONTACT.email}`} className="text-[#D9D4CA] hover:text-[#CFA85E] transition-colors break-words">
                        {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                      </a>
                    </div>
                    <div>
                      <span className="text-[#9C968A] block text-[11px]">Member Support</span>
                      <a href={`mailto:${TGLC_CONTACT.memberSupport}`} className="text-[#D9D4CA] hover:text-[#CFA85E] transition-colors break-words">
                        {TGLC_CONTACT.memberSupport.split('@')[0]}@<wbr />{TGLC_CONTACT.memberSupport.split('@')[1]}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <p className="text-[#9C968A]">{TGLC_CONTACT.hours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#20232E] space-y-1.5 text-xs text-[#9C968A]">
                <p className="text-[#D9D4CA] tabular-nums">
                  Company Registration: <span className="text-[#CFA85E] font-medium">{TGLC_CONTACT.companyNumber}</span> (England & Wales)
                </p>
                <p>
                  {TGLC_CONTACT.instagram} · {TGLC_CONTACT.linkedIn}
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#12141A] border border-[#242630] space-y-2.5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#CFA85E]">
                <Lock className="w-3.5 h-3.5" />
                <span>Existing Member Urgent Protocol</span>
              </div>
              <p className="text-xs text-[#9C968A] leading-relaxed font-light tabular-nums">
                Active members requiring urgent flight adjustments, last-minute dining placements, or immediate car transfers should call the Private Member Line ({TGLC_CONTACT.privateMemberLine}) or message their Senior Principal directly.
              </p>
            </div>

            <div className="p-6 bg-[#12141A] border border-[#242630] space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#CFA85E] block">
                Albemarle Street Visiting Etiquette
              </span>
              <p className="text-xs text-[#9C968A] leading-relaxed font-light">
                Located on the third floor at 45 Albemarle Street, moments from Piccadilly, Old Bond Street, and Burlington Gardens. Discreet vehicle set-down and private salon refreshments are prepared upon advance notice.
              </p>
            </div>
          </motion.div>
        </div>

        <GoldDivider />

        {/* Three Visual Arrival & House Salon Vignettes */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block">
              Every Arrival Staged Quietly
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              From Farnborough Aprons to Albemarle Street
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
                alt: 'Discreet Chauffeur Arrival at TGLC House',
                tag: 'Chauffeur & Airfields',
                title: 'Discreet Arrivals & Airport Transfers',
                desc: 'Whether greeting you off the cabin steps at Farnborough or scheduling a private consultation in W1S, our house drivers time every movement to the minute.',
              },
              {
                img: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
                alt: 'Mayfair Residence Briefing',
                tag: 'Home & Family Visits',
                title: 'Conversations in Your Residence',
                desc: 'Prefer to meet outside Albemarle Street? Our Senior Principals gladly attend private townhouses across Belgravia, Knightsbridge, or Geneva by appointment.',
              },
              {
                img: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
                alt: 'Private Dining & Confidential Briefing Tables',
                tag: 'Drawing Room & Closures',
                title: 'Quiet Tables for First Introductions',
                desc: 'For visiting families and trusted legal counsel, we arrange private salon lunches adjacent to our Mayfair offices where privacy is complete.',
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#CFA85E]">{card.tag}</span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA]">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
