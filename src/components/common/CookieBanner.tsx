import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner: React.FC = () => {
  const { cookieConsent, setCookieConsent, navigateTo } = useNavigation();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <AnimatePresence>
      {cookieConsent === null && (
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 36, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-[#0B0C10]/95 border-t border-[#252730] backdrop-blur-md text-[#D9D4CA] shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#CFA85E]">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-5 object-contain brightness-105"
                />
                <Shield className="w-3.5 h-3.5 text-[#B98633]" />
                <span>Confidentiality & Privacy Notice</span>
              </div>
              <p className="text-xs text-[#9C968A] leading-relaxed">
                The Global Luxury Consortium respects your discretion. We employ minimal, essential session technologies to secure your private member inquiries and preserve your preferences. We never sell data or deploy commercial tracking scripts. Read our{' '}
                <button
                  onClick={() => navigateTo('cookie-policy')}
                  className="text-[#CFA85E] hover:underline focus:outline-none"
                >
                  Cookie Notice
                </button>.
              </p>

              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-3 pb-1 flex flex-wrap gap-6 text-xs text-[#D9D4CA]"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked disabled className="accent-[#B98633]" />
                      <span className="text-[#8E8A83]">Strictly Necessary Session Store (Required)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsEnabled}
                        onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                        className="accent-[#B98633]"
                      />
                      <span>Ergonomic Preferences</span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#9C968A] hover:text-[#F4F1EA] transition-colors whitespace-nowrap"
              >
                {showPreferences ? 'Hide Options' : 'Preferences'}
              </button>

              <button
                onClick={() => setCookieConsent(false)}
                className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#D9D4CA] bg-[#161820] hover:bg-[#1E202A] border border-[#2D303D] hover:border-[#8B672B] transition-colors whitespace-nowrap"
              >
                Essential Only
              </button>

              <button
                onClick={() => setCookieConsent(true)}
                className="btn-gold px-5 py-2.5 text-xs whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
