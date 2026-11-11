/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { audioSynthesizer, AmbienceMode } from '../utils/audioSynthesizer';

export type LuxuryThemeMode = 'mayfair-heritage' | 'nocturne-stealth' | 'white-tie';

interface AmbienceContextType {
  isPlaying: boolean;
  mode: AmbienceMode;
  volume: number;
  theme: LuxuryThemeMode;
  togglePlay: () => void;
  setAmbienceMode: (mode: AmbienceMode) => void;
  setVolume: (vol: number) => void;
  setTheme: (theme: LuxuryThemeMode) => void;
}

const AmbienceContext = createContext<AmbienceContextType | undefined>(undefined);

export const AmbienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<AmbienceMode>('hearth');
  const [volume, setVolumeState] = useState(0.45);
  const [theme, setThemeState] = useState<LuxuryThemeMode>(() => {
    try {
      const stored = localStorage.getItem('tglc_theme_remix');
      if (stored === 'nocturne-stealth' || stored === 'white-tie' || stored === 'mayfair-heritage') {
        return stored;
      }
    } catch (_) {}
    return 'mayfair-heritage';
  });

  const setTheme = (newTheme: LuxuryThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('tglc_theme_remix', newTheme);
    } catch (_) {}
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-mayfair-heritage', 'theme-nocturne-stealth', 'theme-white-tie');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const togglePlay = () => {
    if (isPlaying) {
      audioSynthesizer.stop();
      setIsPlaying(false);
    } else {
      audioSynthesizer.start(mode, volume);
      setIsPlaying(true);
    }
  };

  const setAmbienceMode = (newMode: AmbienceMode) => {
    setMode(newMode);
    if (isPlaying) {
      audioSynthesizer.start(newMode, volume);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    audioSynthesizer.setVolume(val);
  };

  return (
    <AmbienceContext.Provider
      value={{
        isPlaying,
        mode,
        volume,
        theme,
        togglePlay,
        setAmbienceMode,
        setVolume,
        setTheme,
      }}
    >
      {children}
    </AmbienceContext.Provider>
  );
};

export const useAmbience = () => {
  const context = useContext(AmbienceContext);
  if (!context) {
    throw new Error('useAmbience must be used within an AmbienceProvider');
  }
  return context;
};
