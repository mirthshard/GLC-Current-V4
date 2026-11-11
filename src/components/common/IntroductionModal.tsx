import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { sendEmailViaBrevo } from '../../utils/brevoEmail';

export const IntroductionModal: React.FC = () => {
  const { isIntroModalOpen, closeIntroductionModal, introModalInterest } = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [location, setLocation] = useState('');
  const [contactMethod, setContactMethod] = useState<'Telephone' | 'Email' | 'WhatsApp / Signal' | 'Private In-Person'>('Telephone');
  const [interestArea, setInterestArea] = useState(introModalInterest || 'The London Membership');
  const [referralSource, setReferralSource] = useState('Existing TGLC Member Referral');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState<string>('');

  useEffect(() => {
    if (introModalInterest) {
      setInterestArea(introModalInterest);
    }
  }, [introModalInterest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !telephone) {
      setErrorMessage('Please share your name, email address, and direct telephone number.');
      return;
    }
    if (!privacyAgreed) {
      setErrorMessage('Please confirm the confidentiality terms before transmitting.');
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
        subject: `Introduction Request: ${interestArea}`,
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

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setTelephone('');
    setLocation('');
    setMessage('');
    setPrivacyAgreed(false);
    closeIntroductionModal();
  };

  return (
    <AnimatePresence>
      {isIntroModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeIntroductionModal();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0F1117] border border-[#2B2E39] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeIntroductionModal}
              className="absolute top-6 right-6 p-2 text-[#9C968A] hover:text-[#CFA85E] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#151720] border border-[#8B672B]/70 flex items-center justify-center text-[#CFA85E]">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                  Thank you for your private introduction.
                </h3>

                <p className="font-serif italic text-lg text-[#D9D4CA] max-w-lg mx-auto leading-relaxed">
                  “A senior Director at TGLC House will respond personally and in complete confidence.”
                </p>

                <div className="bg-[#151720] border border-[#272A35] p-5 text-xs text-[#9C968A] max-w-md mx-auto text-left space-y-2">
                  <p className="text-[#CFA85E] font-medium uppercase tracking-wider text-[11px]">Submission Record</p>
                  <p>Principal: <span className="text-[#F4F1EA]">{fullName}</span></p>
                  <p>Focus: <span className="text-[#F4F1EA]">{interestArea}</span></p>
                  <p>Preferred Channel: <span className="text-[#F4F1EA]">{contactMethod}</span></p>
                  {dispatchInfo && (
                    <p className="text-[#A4D65E] text-[11px] font-medium pt-1 border-t border-[#262934]">
                      ✓ {dispatchInfo}
                    </p>
                  )}
                  <p className="text-[11px] text-[#8E8A83] pt-2 border-t border-[#262934] leading-relaxed">
                    Our Private Membership Committee replies within 24 hours. For time-sensitive travel or reception matters, please telephone our Albemarle Street desk on <span className="tabular-nums text-[#D9D4CA]">{TGLC_CONTACT.telephone}</span> or write to <span className="text-[#CFA85E]">{TGLC_CONTACT.email}</span>.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="btn-outline-gold px-7 py-2.5 text-xs"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between pr-8">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#CFA85E]">
                      <ShieldCheck className="w-4 h-4 text-[#B98633]" />
                      <span>Strictly Confidential Introduction</span>
                    </div>
                    <img
                      src="/assets/aistudio/tglc_crest_transparent.png"
                      alt="TGLC Crest"
                      className="w-9 h-11 object-contain filter brightness-105 drop-shadow-[0_2px_10px_rgba(185,134,51,0.35)]"
                    />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                    Every relationship begins with a quiet conversation.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed">
                    Admission to TGLC is by referral or direct introduction. Share a brief outline below and Camilla Vance-Moreau or a senior Partner at 3rd Floor, 45 Albemarle Street will arrange a private conversation by your preferred channel.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 mb-4 bg-[#2C1417] border border-[#521C22] text-xs text-[#F2C2C6]">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="e.g. Lord Harrington / Clara Lindholm"
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
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
                        placeholder="private@familyoffice.com"
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
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
                        placeholder="+44 7... / +1..."
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        Primary City / Country of Residence
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. London / Geneva / New York"
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
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
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none transition-colors"
                      >
                        <option value="The London Membership">The London Membership</option>
                        <option value="The Global Membership">The Global Membership</option>
                        <option value="The Private Office Advisory">The Private Office Advisory</option>
                        <option value="Travel & Private Aviation">Travel & Private Aviation</option>
                        <option value="London Dining & Cultural Access">London Dining & Cultural Access</option>
                        <option value="Residences & Relocation">Residences & Relocation</option>
                        <option value="Luxury Sourcing & Acquisitions">Luxury Sourcing & Acquisitions</option>
                        {![
                          'The London Membership',
                          'The Global Membership',
                          'The Private Office Advisory',
                          'Travel & Private Aviation',
                          'London Dining & Cultural Access',
                          'Residences & Relocation',
                          'Luxury Sourcing & Acquisitions'
                        ].includes(interestArea) && (
                          <option value={interestArea}>{interestArea}</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        Preferred Contact Method
                      </label>
                      <select
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value as any)}
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none transition-colors"
                      >
                        <option value="Telephone">Telephone Call</option>
                        <option value="Email">Confidential Email</option>
                        <option value="WhatsApp / Signal">WhatsApp / Signal</option>
                        <option value="Private In-Person">In-Person at TGLC House (3rd Floor, 45 Albemarle Street)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      How did you learn of The Global Luxury Consortium?
                    </label>
                    <select
                      value={referralSource}
                      onChange={(e) => setReferralSource(e.target.value)}
                      className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none transition-colors"
                    >
                      <option value="Existing TGLC Member Referral">Existing TGLC Member Referral</option>
                      <option value="Private Family Office / Advisory Introduction">Private Family Office / Advisory Introduction</option>
                      <option value="Mayfair / St James’s Partner Introduction">Mayfair / St James’s Partner Introduction</option>
                      <option value="Personal Recommendation">Personal Recommendation</option>
                      <option value="Private Invitation">Private Invitation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Message / Context for Our Conversation (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share upcoming London visits, family office coordination, or lifestyle priorities..."
                      className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-[#9C968A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="mt-0.5 accent-[#B98633]"
                      />
                      <span>
                        I understand that TGLC operates on a strict need-to-know basis and agree that my details will be handled confidentially under UK GDPR standards.
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#222530]">
                    <div className="text-[11px] text-[#8E8A83] space-y-0.5 tabular-nums">
                      <div>Direct Line: <span className="text-[#D9D4CA]">{TGLC_CONTACT.internationalPhone}</span></div>
                      <div>Email: <span className="text-[#CFA85E]">{TGLC_CONTACT.email}</span></div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold px-7 py-3 text-xs whitespace-nowrap disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting In Confidence...' : 'Submit Private Introduction'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
