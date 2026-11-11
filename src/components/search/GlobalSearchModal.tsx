import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { searchTGLC } from '../../utils/searchEngine';
import { SearchCategoryType, GlobalSearchResult } from '../../types';
import { TGLC_CONTACT } from '../../data/tglcData';
import { Search, X, ArrowUpRight, Compass, Calendar, BookOpen, Building2, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateTo, openIntroductionModal } = useNavigation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategoryType>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setCategory('all');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    return searchTGLC(query, category);
  }, [query, category]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, category]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        navigateTo(selected.targetRoute, selected.routeParams);
      }
    }
  };

  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleSelectResult = (result: GlobalSearchResult) => {
    navigateTo(result.targetRoute, result.routeParams);
  };

  const getCategoryIcon = (cat: GlobalSearchResult['category']) => {
    switch (cat) {
      case 'services':
        return <Compass className="w-3.5 h-3.5 text-[#C4933F]" />;
      case 'journal':
        return <BookOpen className="w-3.5 h-3.5 text-[#C4933F]" />;
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-[#C4933F]" />;
      case 'consortium':
      default:
        return <Building2 className="w-3.5 h-3.5 text-[#C4933F]" />;
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Global Search and Directory"
          className="fixed inset-0 z-50 bg-[#08090C]/85 backdrop-blur-md flex items-start justify-center pt-10 sm:pt-16 px-4 sm:px-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-[#0F1117] border border-[#272A36] shadow-2xl text-[#F4F1EA] flex flex-col max-h-[85vh] relative"
          >
            {/* Top Search Bar with TGLC Crest Emblem */}
            <div className="flex items-center gap-3.5 px-6 py-4 border-b border-[#222530] bg-[#13151D]">
              <img
                src="/assets/aistudio/tglc_crest_transparent.png"
                alt="TGLC Crest"
                className="w-6 h-8 object-contain brightness-105 shrink-0 hidden sm:block"
              />
              <Search className="w-5 h-5 text-[#C4933F] shrink-0" aria-hidden="true" />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search practices, London enclaves, articles, or seasonal calendar..."
                aria-label="Search consortium records"
                className="w-full bg-transparent font-serif text-lg sm:text-xl text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none"
              />

              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-[#8E8A83] hover:text-white transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#272A36] shrink-0">
                <kbd className="text-[10px] tracking-widest uppercase text-[#8E8A83] border border-[#2E313D] px-2 py-0.5 font-sans bg-[#0B0C10]">
                  ESC
                </kbd>
              </div>

              <button
                onClick={closeSearch}
                className="sm:hidden p-1 text-[#8E8A83] hover:text-white"
                aria-label="Close search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Tabs — Title Case editorial controls */}
            <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#1E202A] bg-[#0B0C10] overflow-x-auto text-xs font-medium scrollbar-none">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'services', label: 'Services & Practices' },
                { id: 'journal', label: 'Journal' },
                { id: 'calendar', label: 'London Calendar' },
                { id: 'consortium', label: 'Consortium & Enclaves' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategory(tab.id as SearchCategoryType)}
                  className={`px-3 py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                    category === tab.id
                      ? 'text-[#CFA85E] border-[#C4933F]'
                      : 'text-[#8E8A83] border-transparent hover:text-[#D9D4CA]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results Body */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto divide-y divide-[#1A1C24] max-h-[55vh] scrollbar-thin"
            >
              {results.length > 0 ? (
                <div>
                  {!query.trim() && (
                    <div className="px-6 py-2.5 bg-[#13151D]/70 text-[11px] tracking-widest uppercase text-[#CFA85E] font-medium flex items-center justify-between border-b border-[#1D1F28]">
                      <span>Curated Directory Index</span>
                      <span className="text-[#8E8A83] normal-case tracking-normal text-xs">Use ↑↓ keys to navigate</span>
                    </div>
                  )}

                  {results.map((result, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={result.id}
                        data-index={idx}
                        onClick={() => handleSelectResult(result)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group px-6 py-3.5 cursor-pointer transition-colors duration-150 flex items-start justify-between gap-4 ${
                          isSelected ? 'bg-[#171923] text-white' : 'hover:bg-[#14161F]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] tracking-wider text-[#CFA85E] mb-1">
                            <span className="flex items-center gap-1.5">
                              {getCategoryIcon(result.category)}
                              <span>{result.categoryLabel}</span>
                            </span>
                            <span aria-hidden="true" className="text-[#4A453F]">·</span>
                            <span className="text-[#8E8A83] truncate">{result.meta}</span>
                          </div>

                          <h4 className="font-serif text-base sm:text-lg text-[#F4F1EA] group-hover:text-white transition-colors truncate">
                            {result.title}
                          </h4>

                          <p className="text-xs text-[#9C968A] line-clamp-1 mt-0.5 leading-relaxed">
                            {result.snippet}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pt-2 text-[#8E8A83] group-hover:text-[#F4F1EA]">
                          {isSelected && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-[#CFA85E]">
                              <span>Open</span>
                              <CornerDownLeft className="w-3 h-3" />
                            </span>
                          )}
                          <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <Compass className="w-8 h-8 text-[#8B672B] mx-auto mb-3" />
                  <h4 className="font-serif text-xl text-[#F4F1EA] mb-2">No Listed Records Match</h4>
                  <p className="text-xs text-[#9C968A] max-w-md mx-auto leading-relaxed mb-6">
                    No published entries match “{query}”. TGLC conducts the greater share of its work off-market and by direct instruction—our desk can advise in confidence.
                  </p>
                  <button
                    onClick={() => {
                      closeSearch();
                      openIntroductionModal(`Inquiry regarding bespoke search: "${query}"`);
                    }}
                    className="btn-gold px-6 py-2.5 text-xs"
                  >
                    Request Confidential Consultation
                  </button>
                </div>
              )}
            </div>

            {/* Footer Ribbon */}
            <div className="px-6 py-3 border-t border-[#1E202A] bg-[#0B0C10] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#8E8A83]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#151720] border border-[#2C2E3A] text-[10px] font-sans">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#151720] border border-[#2C2E3A] text-[10px] font-sans">↓</kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#151720] border border-[#2C2E3A] text-[10px] font-sans">↵</kbd>
                  <span className="ml-1">Open</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#151720] border border-[#2C2E3A] text-[10px] font-sans">ESC</kbd>
                  <span className="ml-1">Close</span>
                </span>
              </div>

              <div className="text-left sm:text-right tabular-nums min-w-0 break-words">
                <span>Private Line: </span>
                <span className="text-[#D9D4CA] font-medium">{TGLC_CONTACT.internationalPhone}</span>
                <span className="mx-2 text-[#4A453F]">·</span>
                <span className="text-[#CFA85E]">{TGLC_CONTACT.email}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
