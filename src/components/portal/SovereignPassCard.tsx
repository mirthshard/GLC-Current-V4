import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  QrCode,
  Smartphone,
  CheckCircle2,
  Lock,
  Wifi,
  Copy,
  Check,
} from 'lucide-react';
import { PortalUser } from '../../services/supabaseClient';

interface SovereignPassCardProps {
  user: PortalUser;
}

export const SovereignPassCard: React.FC<SovereignPassCardProps> = ({ user }) => {
  const [walletAddedToast, setWalletAddedToast] = useState(false);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [nfcSuccess, setNfcSuccess] = useState(false);
  const [showBackFace, setShowBackFace] = useState(false);

  const handleAddToWallet = () => {
    const content = [
      'THE GLOBAL LUXURY CONSORTIUM — SOVEREIGN PASS PACKET',
      `Holder: ${user.name}`,
      `Tier: ${user.tier}`,
      `Account Reference: ${user.id.toUpperCase()}`,
      `Assigned Private Director: ${user.assignedManager}`,
      'Primary Airfields: RAF Northolt (EGWU) · Farnborough (EGLF) · Biggin Hill (EGKB)',
      '24/7 Duty Line: +44 20 7183 8451',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tglc-sovereign-pass-${user.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setWalletAddedToast(true);
    setTimeout(() => setWalletAddedToast(false), 3500);
  };

  const handleSimulateNfc = () => {
    setIsNfcActive(true);
    setTimeout(() => {
      setIsNfcActive(false);
      setNfcSuccess(true);
      setTimeout(() => setNfcSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E222D]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E2BA6B]">
            Biometric Credential Token
          </span>
          <h2 className="font-serif text-2xl text-[#FAF7F0] font-light">Sovereign Member Pass</h2>
          <p className="text-xs text-[#D4D8E2] font-light mt-0.5">
            Encrypted cryptographic keycard for private airport aprons, members' salons, and secure residence perimeters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowBackFace(!showBackFace)}
            className="px-4 py-2.5 bg-[#12161F] hover:bg-[#1B2230] text-[#D4D8E2] border border-[#2B3547] text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
          >
            {showBackFace ? 'View Front Face' : 'Inspect Security Back'}
          </button>
          <button
            type="button"
            onClick={handleAddToWallet}
            className="px-4 py-2.5 bg-[#171C26] hover:bg-[#202735] text-[#E2BA6B] border border-[#2B3547] text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5" /> Export Wallet Pass
          </button>
          <button
            type="button"
            onClick={handleSimulateNfc}
            disabled={isNfcActive}
            className="px-4 py-2.5 bg-[#E2BA6B] hover:bg-[#EBCC8B] text-[#07080B] font-serif text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Wifi className="w-3.5 h-3.5" />
            {isNfcActive ? 'Broadcasting NFC...' : 'Test NFC Clearance'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {walletAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 bg-[#14231E] border border-[#2B6049] text-emerald-300 text-xs font-mono flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Pass credential file generated and bound to principal enclave.</span>
          </motion.div>
        )}
        {nfcSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 bg-[#15231C] border border-[#285736] text-emerald-300 text-xs font-mono flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>NFC Handshake Confirmed: Access Granted at RAF Northolt Gate 4 VIP Apron.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Black-Gold Digital Keycard (Interactive Front / Security Back) */}
      <div className="flex justify-center py-4">
        <AnimatePresence mode="wait">
          {!showBackFace ? (
            <motion.div
              key="front-face"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowBackFace(true)}
              className="cursor-pointer relative w-full max-w-md aspect-[1.586/1] bg-gradient-to-br from-[#12151D] via-[#0B0D13] to-[#171B26] border border-[#B98633]/60 p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Ambient Gold Shimmer Beam */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E2BA6B]/10 blur-2xl pointer-events-none" />

              {/* Top Bar */}
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <span className="font-serif text-sm tracking-[0.18em] uppercase text-[#FAF7F0] block">
                    The Global Luxury Consortium
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#E2BA6B] block mt-0.5">
                    {user.tier}
                  </span>
                </div>
                <div className="w-8 h-8 border border-[#E2BA6B]/50 flex items-center justify-center text-[#E2BA6B]">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              {/* Middle Chip & NFC Icon */}
              <div className="flex items-center justify-between relative z-10 my-auto">
                <div className="w-11 h-8 rounded-xs bg-gradient-to-r from-[#D4AF37] to-[#AA8222] border border-[#E8C86A] opacity-90 shadow-inner flex items-center justify-center">
                  <div className="w-8 h-5 border border-[#684C0F] opacity-60 rounded-xs" />
                </div>
                <motion.div
                  animate={isNfcActive ? { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 1 }}
                  transition={isNfcActive ? { duration: 0.75, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                  className="flex items-center"
                >
                  <Wifi className={`w-5 h-5 ${isNfcActive ? 'text-emerald-400' : 'text-[#8C7642]'}`} />
                </motion.div>
              </div>

              {/* Bottom Info */}
              <div className="flex items-end justify-between relative z-10 pt-2 border-t border-[#232938]">
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#8E98AB] block">
                    Principal Sovereign
                  </span>
                  <span className="font-serif text-base text-[#FAF7F0] font-medium tracking-wide block">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#B5BCCB] mt-0.5 block">
                    ID: {user.id.toUpperCase()} · Member Since {user.memberSince}
                  </span>
                </div>

                <div className="text-right">
                  <QrCode className="w-10 h-10 text-[#E2BA6B] inline-block opacity-90" />
                  <span className="text-[8px] font-mono text-[#8E98AB] block mt-0.5">TLS-256</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back-face"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowBackFace(false)}
              className="cursor-pointer relative w-full max-w-md aspect-[1.586/1] bg-[#0B0D13] border border-[#E2BA6B]/60 p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="w-full h-7 bg-[#1C222E] -mx-7 px-7 flex items-center justify-between text-[9px] font-mono text-[#E2BA6B]">
                <span>DIPLOMATIC & FBO MAGNETIC / NFC ENCLAVE</span>
                <span>AUTH: TGLC-UK-W1S</span>
              </div>

              <div className="space-y-2 text-[11px] font-mono text-[#D4D8E2]">
                <div className="flex justify-between">
                  <span className="text-[#8E98AB]">Biometric Key Hash:</span>
                  <span className="text-[#FAF7F0]">ED25519 · 89F2-A40C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E98AB]">Mayfair 24/7 Desk:</span>
                  <span className="text-[#E2BA6B] tabular-nums">+44 20 7183 8451</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E98AB]">Luggage & Escort Alias:</span>
                  <span className="text-[#FAF7F0]">ASHFORD-HOUSE-01</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#232938] flex items-center justify-between text-[9px] font-mono text-[#8E98AB]">
                <span>45 Albemarle Street, Mayfair W1S 4JL</span>
                <span className="text-[#E2BA6B]">Tap Card to Flip</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accredited Venue & Airfield Clearances Roster */}
      <div className="pt-2 border-t border-[#1E222D] space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
          Accredited Venue & Airfield Clearances Bound to This Pass
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { zone: 'RAF Northolt · EGWU', gate: 'West Apron Gate 4 Direct Tarmac' },
            { zone: 'Farnborough · EGLF', gate: 'TAG Aviation VIP Terminal Wing' },
            { zone: 'St James’s & Mayfair', gate: 'Albemarle House & Unlisted Tables' },
            { zone: 'East London Sub-Rosa', gate: 'Shoreditch Loft & Studio Keyholder' },
          ].map((clr) => (
            <div key={clr.zone} className="p-3.5 bg-[#12161F] border border-[#1E2534] space-y-1">
              <span className="font-serif text-sm text-[#FAF7F0] block">{clr.zone}</span>
              <span className="font-mono text-[10px] text-[#D4D8E2] block">{clr.gate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
