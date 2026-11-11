import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { CALENDAR_EVENTS, JOURNAL_ARTICLES, TEAM_MEMBERS } from '../../data/tglcData';
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { GoldDivider } from '../common/GoldDivider';

const JOURNAL_FORMATS = [
  'All Formats',
  'News Dispatch',
  'Event Briefing',
  'Feature Essay',
  'Field Report',
] as const;

const JOURNAL_CATEGORIES = [
  'All Articles',
  'London Intelligence',
  'Travel Notes',
  'The Cultural Edit',
  'Dining & Entertaining',
  'Private Residences',
  'Objects of Desire',
  'Member Stories',
] as const;

const JOURNAL_HERO_SLIDES = [
  {
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    caption: 'Sector 09 · Vauxhall Concrete Bass Vault & Satin-Black Maybach Arrivals',
    slug: 'london-urban-hiphop-sound-vaults-shoreditch-mayfair',
  },
  {
    image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    caption: 'Autumn Cultural Briefing · After-Closing Frieze Regent’s Park Previews',
    slug: 'autumn-winter-2026-private-calendar-frieze-opera-salons',
  },
  {
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    caption: 'Covent Garden Repertory · Grand Tier Box 12 & Private Interval Service',
    slug: 'autumn-winter-2026-private-calendar-frieze-opera-salons',
  },
  {
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    caption: 'Field Report · Churchill’s Down Street Piccadilly Bunker Inspection',
    slug: 'field-report-down-street-bunker-tower-bascule-acoustics',
  },
  {
    image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    caption: 'Culinary Dispatches · Eight-Seat Counter Allocation & Rare Cellar Pairings',
    slug: 'six-seats-no-menu-london-micro-omakase-private-dining',
  },
  {
    image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
    caption: 'Winter Aviation Dispatch · RAF Northolt Gate 4 vs. Farnborough TAG Apron',
    slug: 'northolt-gate-4-vs-farnborough-winter-aviation-briefing',
  },
];

export const JournalPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedFormat, setSelectedFormat] = useState<string>('All Formats');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % JOURNAL_HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const orderedArticles = useMemo(() => {
    const prioritySlugs = [
      'london-urban-hiphop-sound-vaults-shoreditch-mayfair',
      'subrosa-catacomb-candlelit-banquet-protocol',
      'shoreditch-street-couture-drop-rotary-vinyl-sessions',
      'urban-combat-and-vip-convoy-protection-london',
      'autumn-winter-2026-private-calendar-frieze-opera-salons',
      'field-report-down-street-bunker-tower-bascule-acoustics',
      'northolt-gate-4-vs-farnborough-winter-aviation-briefing',
      'alpine-chalet-to-monaco-superyacht-transition-brief',
    ];
    const priorityItems = prioritySlugs
      .map((s) => JOURNAL_ARTICLES.find((a) => a.slug === s))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));
    const remainingItems = JOURNAL_ARTICLES.filter((a) => !prioritySlugs.includes(a.slug));
    return [...priorityItems, ...remainingItems];
  }, []);

  const wireDispatches = useMemo(
    () =>
      orderedArticles
        .filter((a) => a.articleType === 'News Dispatch' || a.articleType === 'Field Report')
        .slice(0, 3),
    [orderedArticles]
  );

  const upcomingFixtures = useMemo(() => {
    const pickedIds = ['cal-25', 'cal-26', 'cal-21'];
    const selected = pickedIds
      .map((id) => CALENDAR_EVENTS.find((ev) => ev.id === id))
      .filter((ev): ev is NonNullable<typeof ev> => Boolean(ev));
    return selected.length > 0 ? selected : CALENDAR_EVENTS.slice(0, 3);
  }, []);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orderedArticles.filter((art) => {
      const formatMatch =
        selectedFormat === 'All Formats' || (art.articleType || 'Feature Essay') === selectedFormat;
      const categoryMatch =
        selectedCategory === 'All Articles' || art.category === selectedCategory;
      const searchMatch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.subtitle.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        (art.venueNote || '').toLowerCase().includes(query) ||
        (art.articleType || '').toLowerCase().includes(query);
      return formatMatch && categoryMatch && searchMatch;
    });
  }, [orderedArticles, selectedFormat, selectedCategory, searchQuery]);

  const showLeadStory = filteredArticles.length > 0;
  const featuredArticle = showLeadStory ? filteredArticles[0] : null;
  const gridArticles = showLeadStory ? filteredArticles.slice(1) : [];

  const resetFilters = () => {
    setSelectedFormat('All Formats');
    setSelectedCategory('All Articles');
    setSearchQuery('');
  };

  const activeSlide = JOURNAL_HERO_SLIDES[heroIdx];

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] pt-6 sm:pt-8 pb-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Multi-Slide Ken-Burns Hero Header */}
        <section className="relative min-h-[380px] sm:min-h-[450px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.image}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <motion.img
                initial={{ scale: 1.06 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                src={activeSlide.image}
                alt={activeSlide.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-105 contrast-105"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/55 to-[#07080B]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/92 via-[#07080B]/55 to-transparent hidden sm:block pointer-events-none" />

          <div className="relative z-10 w-full p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0.85, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl space-y-3"
            >
              <span className="tglc-kicker block">
                The Journal of The Global Luxury Consortium
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#FAF7F0] leading-[1.06]">
                News Dispatches, Field Reports & Cultural Briefings
              </h1>
              <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                “Details noticed by those who take their time.”
              </p>
              <p className="tglc-prose text-sm sm:text-base max-w-2xl">
                Timely city intelligence spanning Vauxhall and Shoreditch sound vaults, seasonal Regent’s Park previews, private aviation briefings, and architectural dinners across Europe.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('journal-article', { articleSlug: activeSlide.slug })}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#FAF7F0] hover:text-[#E2BA6B] transition-colors pt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2BA6B]"
              >
                <span className="text-[#E2BA6B]">Featured Frame:</span>
                <span>{activeSlide.caption}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BA6B]" />
              </button>
            </motion.div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0 self-start lg:self-end">
              <span className="font-mono tabular-nums text-xs text-[#8F98AA] mr-1">
                {String(heroIdx + 1).padStart(2, '0')} / {String(JOURNAL_HERO_SLIDES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() =>
                  setHeroIdx((prev) => (prev - 1 + JOURNAL_HERO_SLIDES.length) % JOURNAL_HERO_SLIDES.length)
                }
                aria-label="Previous hero dispatch frame"
                className="w-10 h-10 flex items-center justify-center bg-[#0D1017]/90 border border-[#2C3140] hover:border-[#E2BA6B] text-[#FAF7F0] transition-colors focus-visible:outline-2 focus-visible:outline-[#E2BA6B]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setHeroIdx((prev) => (prev + 1) % JOURNAL_HERO_SLIDES.length)}
                aria-label="Next hero dispatch frame"
                className="w-10 h-10 flex items-center justify-center bg-[#0D1017]/90 border border-[#2C3140] hover:border-[#E2BA6B] text-[#FAF7F0] transition-colors focus-visible:outline-2 focus-visible:outline-[#E2BA6B]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* News Wire & Upcoming Events Briefing Strip */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0D1017] border border-[#242630] p-6 sm:p-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-[#20232E] pb-3">
              <div>
                <span className="tglc-kicker block">Latest Wire</span>
                <h2 className="font-serif text-2xl text-[#FAF7F0] mt-0.5">
                  Recent News & Field Dispatches
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFormat('News Dispatch')}
                className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0"
              >
                Filter Dispatches
              </button>
            </div>

            <div className="divide-y divide-[#1E2230]">
              {wireDispatches.map((item) => (
                <button
                  type="button"
                  key={item.slug}
                  onClick={() => navigateTo('journal-article', { articleSlug: item.slug })}
                  className="w-full text-left py-3.5 first:pt-1 last:pb-1 group flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="tglc-meta flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-[#E2BA6B]">{item.articleType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.publishDate}</span>
                      {item.venueNote && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[260px] sm:max-w-xs">{item.venueNote}</span>
                        </>
                      )}
                    </div>
                    <p className="font-serif text-lg sm:text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      {item.title}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8F98AA] group-hover:text-[#E2BA6B] shrink-0 mt-1 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-[#20232E] lg:pl-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-[#20232E] pb-3">
              <div>
                <span className="tglc-kicker block">Private Calendar</span>
                <h2 className="font-serif text-2xl text-[#FAF7F0] mt-0.5">
                  Upcoming Member Fixtures
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('calendar')}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Full Calendar</span>
              </button>
            </div>

            <div className="divide-y divide-[#1E2230]">
              {upcomingFixtures.map((ev) => (
                <button
                  type="button"
                  key={ev.id}
                  onClick={() => navigateTo('calendar')}
                  className="w-full text-left py-3 first:pt-1 last:pb-1 group space-y-1 transition-colors"
                >
                  <div className="tglc-meta flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-[#E2BA6B] tabular-nums">{ev.dates}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ev.neighbourhood}</span>
                  </div>
                  <p className="font-serif text-base sm:text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                    {ev.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Format Segmented Tabs + Search + Category Filters */}
        <section className="space-y-4 border-y border-[#20232E] py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Animated Segmented Control for Formats */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0D1017] border border-[#242630]">
              {JOURNAL_FORMATS.map((fmt) => {
                const active = selectedFormat === fmt;
                return (
                  <button
                    type="button"
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`relative px-4 py-2 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors min-h-[40px] ${
                      active ? 'text-[#07080B]' : 'text-[#8F98AA] hover:text-[#FAF7F0]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="journalFormatPill"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute inset-0 bg-[#E2BA6B]"
                      />
                    )}
                    <span className="relative z-10">{fmt}</span>
                  </button>
                );
              })}
            </div>

            {/* Real Keyword Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-[#8F98AA] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dispatches, venues, authors..."
                aria-label="Search journal dispatches and briefings"
                className="w-full h-11 pl-10 pr-9 bg-[#131722] border border-[#2C3140] focus:border-[#E2BA6B] text-xs sm:text-sm text-[#FAF7F0] placeholder:text-[#8F98AA] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8F98AA] hover:text-[#FAF7F0]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Discipline Filters + Other Side Quick Jumps */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {JOURNAL_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs tracking-wide transition-colors border whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#131722] text-[#FAF7F0] border-[#E2BA6B] font-medium'
                      : 'text-[#8F98AA] hover:text-[#FAF7F0] bg-[#0D1017] border-[#242630] hover:border-[#8B672B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Articles');
                  setSelectedFormat('All Formats');
                  setSearchQuery('Vauxhall');
                }}
                className="min-h-[38px] px-3.5 py-1.5 text-xs tracking-wide transition-colors border border-[#8B672B]/70 bg-[#14110B] text-[#E2BA6B] hover:bg-[#E2BA6B] hover:text-[#07080B] whitespace-nowrap shrink-0"
              >
                Other Side & Urban Nights
              </button>
            </div>
            <span className="tglc-meta tabular-nums">
              Showing {filteredArticles.length} of {JOURNAL_ARTICLES.length} publications
            </span>
          </div>
        </section>

        {/* Empty State or Lead + Grid */}
        {!featuredArticle ? (
          <div className="bg-[#0D1017] border border-[#242630] p-10 text-center space-y-4">
            <span className="tglc-kicker block">No Matching Entries</span>
            <h2 className="font-serif text-3xl text-[#FAF7F0]">
              No dispatches matched your current filters.
            </h2>
            <p className="tglc-prose text-sm max-w-xl mx-auto">
              Adjust your publication format tab, discipline filter, or keyword search to restore the full TGLC editorial archive.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-outline-gold px-6 py-2.5 text-xs inline-flex items-center gap-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Lead Story */}
            <motion.article
              key={featuredArticle.slug}
              initial={{ opacity: 0.85, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigateTo('journal-article', { articleSlug: featuredArticle.slug })}
              className="group cursor-pointer p-6 sm:p-9 bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/80 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
                <div className="tglc-meta flex flex-wrap items-center gap-2.5">
                  <span className="text-[#E2BA6B] uppercase tracking-[0.18em]">
                    {featuredArticle.articleType || 'Feature Essay'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{featuredArticle.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{featuredArticle.readTime}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-[1.1]">
                  {featuredArticle.title}
                </h2>

                <p className="font-serif italic text-lg sm:text-xl text-[#E2BA6B]/95">
                  {featuredArticle.subtitle}
                </p>

                {featuredArticle.venueNote && (
                  <p className="tglc-meta text-[#D4D8E2]">
                    {featuredArticle.venueNote}
                  </p>
                )}

                <p className="tglc-prose text-sm sm:text-base max-w-2xl">
                  {featuredArticle.excerpt}
                </p>

                {featuredArticle.keyTakeaways && featuredArticle.keyTakeaways.length > 0 && (
                  <ul className="space-y-1.5 pt-1 border-t border-[#1D2130]">
                    {featuredArticle.keyTakeaways.slice(0, 2).map((point, kIdx) => (
                      <li key={kIdx} className="text-xs text-[#8F98AA] flex items-start gap-2 pt-1.5">
                        <span className="text-[#E2BA6B] font-mono shrink-0">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8F98AA] border-t border-[#20232E]">
                  <span>
                    By <strong className="font-medium text-[#FAF7F0]">{featuredArticle.author}</strong> · {featuredArticle.authorRole}
                  </span>
                  <span className="text-[#E2BA6B] group-hover:text-[#FAF7F0] transition-colors flex items-center gap-1.5 font-mono uppercase tracking-wider">
                    <span>Read {featuredArticle.articleType || 'Essay'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#131722] border border-[#242630]">
                  <img
                    src={featuredArticle.heroImage}
                    alt={featuredArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.article>

            {gridArticles.length > 0 && (
              <>
                <GoldDivider />
                {/* Publications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {gridArticles.map((art, idx) => (
                    <motion.article
                      key={art.slug}
                      initial={{ opacity: 0.9, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.01 }}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.2) }}
                      onClick={() => navigateTo('journal-article', { articleSlug: art.slug })}
                      className="group cursor-pointer bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/70 p-6 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/10] w-full overflow-hidden mb-5 bg-[#131722] border border-[#20232E]">
                          <img
                            src={art.heroImage}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <div className="tglc-meta flex flex-wrap items-center gap-2 text-[11px] mb-2.5">
                          <span className="text-[#E2BA6B] uppercase tracking-wider">
                            {art.articleType || 'Feature Essay'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{art.readTime}</span>
                          {art.editorialImages && art.editorialImages.length > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums text-[#E2BA6B]">{art.editorialImages.length + 1} Photos</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors mb-2 leading-snug">
                          {art.title}
                        </h3>

                        {art.eventDates && (
                          <p className="font-mono text-[11px] text-[#8F98AA] mb-2 truncate">
                            {art.eventDates}
                          </p>
                        )}

                        <p className="tglc-prose text-xs sm:text-sm line-clamp-3 mb-6">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#20232E] flex items-center justify-between gap-2 text-xs text-[#8F98AA]">
                        <span className="truncate">{art.author}</span>
                        <span className="text-[#E2BA6B] group-hover:text-[#FAF7F0] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 font-mono uppercase text-[11px] tracking-wider">
                          <span>Open</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <GoldDivider />

        {/* Senior Contributors Strip */}
        <section className="space-y-5">
          <div className="bg-[#0D1017] border border-[#20222E] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-1.5">
              <span className="tglc-kicker block">Uncommissioned Publishing</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                Written Without Advertising or Sponsored Placement
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-2.5 text-sm tglc-prose">
              <p>
                Every dispatch in The TGLC Journal is authored directly by our house directors in Mayfair—never syndicated from publicists, paid for by hotel chains, or written to flatter commercial sponsors. We review only the sound vaults, private dining counters, workshops, and aviation corridors our principals use themselves.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="tglc-kicker block">Senior Contributors · TGLC House</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM_MEMBERS.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => navigateTo('about')}
                  className="bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/70 overflow-hidden group cursor-pointer transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#131722]">
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-mono text-[#E2BA6B]">{member.role}</p>
                    <p className="text-xs text-[#8F98AA] line-clamp-2 pt-1">{member.specialism}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
