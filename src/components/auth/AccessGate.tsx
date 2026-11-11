import React, { useState, useEffect } from 'react';
import { Lock, Key, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccessGateProps {
  children: React.ReactNode;
}

const PASSWORD_KEY = 'tglc_auth_pass';
const VALID_PASSWORD = 'glcglc';

export const AccessGate: React.FC<AccessGateProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem(PASSWORD_KEY) === 'granted' ||
        localStorage.getItem(PASSWORD_KEY) === 'granted'
      );
    } catch {
      return false;
    }
  });

  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsSubmitting(true);

    setTimeout(() => {
      if (inputVal.trim().toLowerCase() === VALID_PASSWORD) {
        setSuccess(true);
        try {
          sessionStorage.setItem(PASSWORD_KEY, 'granted');
          localStorage.setItem(PASSWORD_KEY, 'granted');
        } catch (err) {
          console.error(err);
        }
        setTimeout(() => {
          setIsUnlocked(true);
          setIsSubmitting(false);
        }, 600);
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    }, 350);
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem(PASSWORD_KEY);
      localStorage.removeItem(PASSWORD_KEY);
    } catch (err) {
      console.error(err);
    }
    setIsUnlocked(false);
    setInputVal('');
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    (window as any).tglcLockConsole = handleLock;
    return () => {
      delete (window as any).tglcLockConsole;
    };
  }, []);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-[#08090C] text-[#F4F1EA] flex flex-col items-center justify-center p-6 select-none overflow-hidden font-sans">
      {/* Ambient bronze vignette & quiet architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(185,134,51,0.09)_0%,_rgba(8,9,12,0.96)_72%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 text-center"
      >
        {/* Official Antique Bronze Monogram Crest */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <img
              src="/assets/aistudio/tglc_crest_transparent.png"
              alt="The Global Luxury Consortium Crest"
              className="w-20 h-24 sm:w-24 sm:h-28 object-contain filter brightness-105 drop-shadow-[0_4px_24px_rgba(185,134,51,0.38)] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C4933F] font-medium block mb-2">
          Mayfair Private Office · London W1S 4JL
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase text-[#F4F1EA] mb-3">
          The Global Luxury Consortium
        </h1>
        <p className="font-serif italic text-base text-[#CFA85E] mb-8">
          “Discretion by default. Access by accreditation.”
        </p>

        <div className="bg-[#0E1015]/95 border border-[#262832] p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="w-9 h-9 rounded-full border border-[#B98633]/45 bg-[#15171F] flex items-center justify-center mx-auto mb-4 text-[#CFA85E]">
            {success ? (
              <CheckCircle2 className="w-4 h-4 text-[#CFA85E]" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D9D4CA] font-medium block mb-1">
            Private Verification
          </span>
          <p className="text-xs text-[#9C968A] mb-6 leading-relaxed">
            Please enter your private key to open the consortium portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (error) setError(false);
                }}
                autoFocus
                placeholder="Enter access key..."
                className={`w-full bg-[#08090C] border px-4 py-3 text-center text-sm font-mono tracking-widest text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-all duration-300 ${
                  error
                    ? 'border-red-500/80 ring-1 ring-red-500/50'
                    : 'border-[#2E313D] focus:border-[#C4933F] focus:ring-1 focus:ring-[#B98633]/45'
                }`}
              />
              <Key className="w-3.5 h-3.5 text-[#8B672B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-center gap-1.5 text-[11px] text-red-400 font-light"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Access key unverified. Discretion maintained.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="btn-gold w-full py-3.5 px-4 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{success ? 'Accreditation Confirmed' : isSubmitting ? 'Verifying Cipher...' : 'Authorize Access'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#08090C]" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1C1E26] flex items-center justify-between text-[10px] text-[#7A756C]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#C4933F]" />
              <span>Private Session Cipher</span>
            </span>
            <span className="font-mono text-[#9C968A]">TGLC · MAYFAIR W1S</span>
          </div>
        </div>

        <p className="text-[11px] text-[#6E6A63] mt-6 tracking-wider">
          Preview cipher: <span className="font-mono text-[#CFA85E]">glcglc</span>
        </p>
      </motion.div>
    </div>
  );
};
