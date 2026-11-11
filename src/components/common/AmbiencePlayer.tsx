/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAmbience, LuxuryThemeMode } from '../../context/AmbienceContext';
import { AmbienceMode } from '../../utils/audioSynthesizer';
import { Volume2, VolumeX, ChevronDown, ChevronUp, Flame, Moon, Compass, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AMBIENCE_OPTIONS: { id: AmbienceMode; label: string; sub: string; icon: any }[] = [
  {
    id: 'hearth',
    label: 'Mayfair Hearth & Rain',
    sub: 'Albemarle Georgian salon fireplace & light rain',
    icon: Flame,
  },
  {
    id: 'nocturne',
    label: 'Sub-Rosa Nocturne',
    sub: 'Square Mile 55Hz deep vault drone & vinyl surface',
    icon: Moon,
  },
  {
    id: 'cabin',
    label: 'Private Cabin Aviation',
    sub: 'Bombardier airflow & Farnborough runway whisper',
    icon: Compass,
  },
];

const THEME_OPTIONS: { id: LuxuryThemeMode; label: string; desc: string; previewColor: string }[] = [
  {
    id: 'mayfair-heritage',
    label: 'Mayfair Heritage',
    desc: 'Deep obsidian & antique brushed bronze-gold',
    previewColor: '#B98633',
  },
  {
    id: 'nocturne-stealth',
    label: 'Nocturne Stealth',
    desc: 'Matte carbon with cold titanium accents',
    previewColor: '#7E8B85',
  },
  {
    id: 'white-tie',
    label: 'White Tie Gala',
    desc: 'Midnight sapphire with polished mirror gold',
    previewColor: '#DDB872',
  },
];

export const AmbiencePlayer: React.FC = () => {
  const { isPlaying, mode, volume, theme, togglePlay, setAmbienceMode, setVolume, setTheme } = useAmbience();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentOption = AMBIENCE_OPTIONS.find((o) => o.id === mode) || AMBIENCE_OPTIONS[0];

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none font-sans">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 w-80 sm:w-96 bg-[#0E1016]/98 border border-[#2B2D3A] shadow-2xl backdrop-blur-2xl p-5 text-[#F4F1EA]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1E202B]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#E2BA6B]" />
                <span className="tglc-kicker">
                  Salon Ambience & Atmosphere
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#8E8A83] hover:text-white p-1"
                aria-label="Collapse panel"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Presets */}
            <div className="py-4 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#9C968A] block mb-1">
                Acoustic Soundscapes (Procedural)
              </span>
              <div className="space-y-1.5">
                {AMBIENCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = mode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setAmbienceMode(opt.id);
                        if (!isPlaying) togglePlay();
                      }}
                      className={`w-full text-left p-2.5 transition-colors flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#181A24] border-[#B98633]/60 text-[#F4F1EA]'
                          : 'bg-[#11131A] border-[#1E202B] text-[#9C968A] hover:text-[#F4F1EA] hover:border-[#2C2E3C]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CFA85E]' : 'text-[#6E6A63]'}`} />
                        <div>
                          <span className="text-xs font-serif block text-[#F4F1EA]">{opt.label}</span>
                          <span className="text-[10px] text-[#8E8A83] font-light">{opt.sub}</span>
                        </div>
                      </div>
                      {isSelected && isPlaying && (
                        <div className="flex items-end gap-0.5 h-3 shrink-0">
                          {[0, 1, 2].map((bar) => (
                            <motion.span
                              key={bar}
                              animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.4] }}
                              transition={{
                                duration: 0.9 + bar * 0.18,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="w-0.5 h-3 origin-bottom bg-[#E2BA6B] block"
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Control */}
            <div className="py-2 border-t border-[#1E202B] flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-[#CFA85E] hover:text-white transition-colors"
                aria-label={isPlaying ? 'Mute' : 'Play'}
              >
                {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#8E8A83]" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#B98633] h-1 bg-[#1E202B] rounded-lg cursor-pointer"
                aria-label="Volume"
              />
              <span className="text-[10px] font-mono text-[#8E8A83] tabular-nums w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Theme Remix Switcher */}
            <div className="pt-3 border-t border-[#1E202B]">
              <span className="text-[10px] uppercase tracking-wider text-[#9C968A] block mb-2">
                Aesthetic Lighting & Tincture
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-2 text-left border transition-colors ${
                      theme === t.id
                        ? 'border-[#B98633] bg-[#161822]'
                        : 'border-[#1E202B] bg-[#101218] hover:border-[#2C2E3C]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: t.previewColor }}
                      />
                      {theme === t.id && <Check className="w-3 h-3 text-[#CFA85E]" />}
                    </div>
                    <span className="text-[11px] block font-medium text-[#F4F1EA] truncate">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Compact Toggle Bar */}
      <div className="flex items-center gap-2 bg-[#0C0D12]/90 backdrop-blur-xl border border-[#2B2D3A] px-3.5 py-2 shadow-2xl hover:border-[#8B672B] transition-colors">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs text-[#F4F1EA] hover:text-[#CFA85E] transition-colors focus:outline-none"
          title={isPlaying ? 'Pause ambience' : 'Play ambience'}
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3 w-3 justify-center">
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  animate={{ scaleY: [0.4, 1, 0.5, 0.85, 0.45] }}
                  transition={{
                    duration: 0.85 + bar * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 h-3 origin-bottom bg-[#E2BA6B] block"
                />
              ))}
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#8E8A83]" />
          )}
          <span className="text-[11px] font-serif text-[#D9D4CA] max-w-[120px] sm:max-w-[140px] truncate">
            {isPlaying ? currentOption.label : 'Salon Ambience'}
          </span>
        </button>

        <span className="w-[1px] h-3 bg-[#242632]" />

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#8E8A83] hover:text-[#CFA85E] p-1 focus:outline-none transition-colors"
          aria-label={isExpanded ? 'Close ambience settings' : 'Open ambience settings'}
          title="Atmosphere & Tincture Settings"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
