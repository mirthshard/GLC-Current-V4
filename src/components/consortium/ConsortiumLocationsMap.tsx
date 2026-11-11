import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { LONDON_LOCATIONS, LONDON_DISTRICTS } from '../../data/londonLocationsData';
import {
  LondonVenue,
  filterLondonLocations,
  getDistrictFocusViewBox,
} from '../../utils/londonLocations';
import {
  MapPin,
  Search,
  Compass,
  ArrowUpRight,
  X,
} from 'lucide-react';

interface ConsortiumLocationsMapProps {
  initialDistrict?: string;
}

export const ConsortiumLocationsMap: React.FC<ConsortiumLocationsMapProps> = ({ initialDistrict = 'all' }) => {
  const { openIntroductionModal } = useNavigation();
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVenue, setActiveVenue] = useState<LondonVenue | null>(LONDON_LOCATIONS[0]);
  const [hoveredVenue, setHoveredVenue] = useState<LondonVenue | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'directory' | 'split'>('split');

  const filteredVenues = useMemo(() => {
    return filterLondonLocations(LONDON_LOCATIONS, {
      districtKey: selectedDistrict,
      category: selectedCategory,
      query: searchQuery,
    });
  }, [selectedDistrict, selectedCategory, searchQuery]);

  const viewBox = useMemo(() => {
    const box = getDistrictFocusViewBox(selectedDistrict);
    return `${box.x} ${box.y} ${box.width} ${box.height}`;
  }, [selectedDistrict]);

  const categories = [
    'all',
    'Horology & Jewellery',
    'Department Stores & Penthouse Salons',
    'Dining & Private Clubs',
    'Arts & Antiquities',
    'Sporting Heritage',
  ];

  const currentDisplayVenue = hoveredVenue || activeVenue || filteredVenues[0] || LONDON_LOCATIONS[0];

  return (
    <section
      className="bg-[#07080B] border-t border-b border-[#20232E] text-[#FAF7F0] py-10 sm:py-14"
      id="consortium-locations"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#222530] pb-6"
        >
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E2BA6B]">
              <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span>Cartography of Access & Favoured Venues</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight text-balance">
              Consortium Locations
            </h2>
            <p className="tglc-prose text-sm">
              Explore London’s quietest enclaves and TGLC-trusted sanctums—from Bond Street horology vaults and department store penthouses to championship grass courts. Select or hover over a pin to review privileges.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#12141A] border border-[#242630] p-1 self-start lg:self-end shrink-0">
            <button
              onClick={() => setViewMode('split')}
              className={`h-9 px-3.5 text-xs tracking-wide transition-colors ${
                viewMode === 'split'
                  ? 'bg-[#20232E] text-[#F4F1EA] font-medium border border-[#8B672B]'
                  : 'text-[#9C968A] hover:text-[#F4F1EA]'
              }`}
            >
              Interactive & Details
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`h-9 px-3.5 text-xs tracking-wide transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#20232E] text-[#F4F1EA] font-medium border border-[#8B672B]'
                  : 'text-[#9C968A] hover:text-[#F4F1EA]'
              }`}
            >
              Full Cartography
            </button>
            <button
              onClick={() => setViewMode('directory')}
              className={`h-9 px-3.5 text-xs tracking-wide transition-colors ${
                viewMode === 'directory'
                  ? 'bg-[#20232E] text-[#F4F1EA] font-medium border border-[#8B672B]'
                  : 'text-[#9C968A] hover:text-[#F4F1EA]'
              }`}
            >
              Index List
            </button>
          </div>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          {/* District Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1D1F28] scrollbar-none">
            {LONDON_DISTRICTS.map((district) => (
              <button
                key={district.key}
                onClick={() => {
                  setSelectedDistrict(district.key);
                  const inDistrict = LONDON_LOCATIONS.filter(
                    (v) => district.key === 'all' || v.districtKey === district.key
                  );
                  if (inDistrict.length > 0) {
                    setActiveVenue(inDistrict[0]);
                  }
                }}
                className={`whitespace-nowrap h-9 px-4 text-xs tracking-wide transition-all border ${
                  selectedDistrict === district.key
                    ? 'border-[#CFA85E] bg-[#181A22] text-[#F4F1EA] font-medium'
                    : 'border-[#242630] bg-[#12141A] text-[#9C968A] hover:text-[#F4F1EA] hover:border-[#8B672B]'
                }`}
              >
                {district.shortName}
              </button>
            ))}
          </div>

          {/* Category Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
              <span className="text-[11px] uppercase tracking-wider text-[#CFA85E] mr-1 shrink-0">
                Discipline:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-3 whitespace-nowrap tracking-wide text-xs transition-colors border ${
                    selectedCategory === cat
                      ? 'text-[#F4F1EA] border-[#CFA85E] bg-[#181A22] font-medium'
                      : 'text-[#9C968A] border-transparent hover:text-[#F4F1EA]'
                  }`}
                >
                  {cat === 'all' ? 'All Interests' : cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9C968A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Selfridges, Harrods, watches..."
                className="w-full h-9 bg-[#12141A] border border-[#242630] pl-9 pr-8 text-xs text-[#F4F1EA] placeholder-[#7B766C] focus:outline-none focus:border-[#CFA85E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9C968A] hover:text-[#F4F1EA]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Map View */}
        {viewMode !== 'directory' ? (
          <div
            className={`grid grid-cols-1 ${
              viewMode === 'split' ? 'lg:grid-cols-12' : 'lg:grid-cols-1'
            } gap-8 items-start`}
          >
            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.55 }}
              className={`${
                viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'
              } bg-[#12141A] border border-[#242630] p-4 sm:p-6 relative overflow-hidden`}
            >
              {/* Map Header Coordinates */}
              <div className="flex items-center justify-between text-xs text-[#B8BECC] mb-3 pb-2.5 border-b border-[#20232E]">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span className="uppercase tracking-widest text-[10px] text-[#E2BA6B] tabular-nums">
                    Interactive London Grid · 51.5074° N, 0.1278° W
                  </span>
                </div>
                <span className="text-[11px] text-[#B8BECC] tabular-nums">
                  {filteredVenues.length} {filteredVenues.length === 1 ? 'Enclave' : 'Enclaves'} Mapped
                </span>
              </div>

              {/* Responsive SVG Map */}
              <div className="relative w-full aspect-[16/10] bg-[#0B0C10] border border-[#20232E] overflow-hidden select-none">
                <svg
                  viewBox={viewBox}
                  className="w-full h-full transition-all duration-700 ease-out"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="Interactive Cartography of London Luxury Enclaves"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161820" strokeWidth="0.6" />
                    </pattern>

                    <linearGradient id="thamesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1B2434" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#B98633" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#1B2434" stopOpacity="0.5" />
                    </linearGradient>

                    <linearGradient id="parkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#122618" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0C1910" stopOpacity="0.3" />
                    </linearGradient>

                    <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#CFA85E" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#CFA85E" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect x="0" y="0" width="1000" height="600" fill="#0B0C10" />
                  <rect x="0" y="0" width="1000" height="600" fill="url(#grid)" />

                  {/* Royal Parks */}
                  <path
                    d="M 60,420 C 90,390 190,400 230,450 C 260,490 240,560 170,580 C 100,590 50,540 60,420 Z"
                    fill="url(#parkGradient)"
                    stroke="#24422B"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <text x="130" y="520" fill="#3D6946" fontSize="10" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                    Richmond Park & Wimbledon Common
                  </text>

                  <path
                    d="M 310,230 C 370,225 430,240 425,290 C 410,320 330,330 290,300 C 275,270 285,240 310,230 Z"
                    fill="url(#parkGradient)"
                    stroke="#24422B"
                    strokeWidth="1"
                  />
                  <text x="350" y="275" fill="#3D6946" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                    Hyde Park & Kensington Gardens
                  </text>

                  <circle cx="430" cy="110" r="50" fill="url(#parkGradient)" stroke="#24422B" strokeWidth="1" />
                  <text x="430" y="112" fill="#3D6946" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                    Regent’s Park
                  </text>

                  <path
                    d="M 470,305 C 510,295 540,320 535,350 C 510,360 460,345 470,305 Z"
                    fill="url(#parkGradient)"
                    stroke="#24422B"
                    strokeWidth="0.8"
                  />
                  <text x="500" y="335" fill="#3D6946" fontSize="8" fontFamily="serif" fontStyle="italic" textAnchor="middle">
                    Green Park & St James’s
                  </text>

                  <path
                    d="M 330,440 C 380,430 420,440 410,480 C 370,490 320,480 330,440 Z"
                    fill="url(#parkGradient)"
                    stroke="#24422B"
                    strokeWidth="0.8"
                  />

                  {/* River Thames */}
                  <path
                    d="M 40,560 Q 150,480 280,440 T 430,420 T 570,370 T 680,310 T 820,330 T 960,310"
                    fill="none"
                    stroke="url(#thamesGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 40,560 Q 150,480 280,440 T 430,420 T 570,370 T 680,310 T 820,330 T 960,310"
                    fill="none"
                    stroke="#B98633"
                    strokeWidth="1"
                    strokeOpacity="0.45"
                  />
                  <text x="760" y="345" fill="#CFA85E" fontSize="9" fontFamily="serif" fontStyle="italic" opacity="0.65">
                    River Thames
                  </text>

                  {/* District Markers */}
                  <text x="470" y="275" fill="#686660" fontSize="11" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    MAYFAIR
                  </text>
                  <text x="525" y="315" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    ST JAMES’S
                  </text>
                  <text x="380" y="375" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    BELGRAVIA
                  </text>
                  <text x="340" y="415" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    CHELSEA
                  </text>
                  <text x="460" y="175" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    MARYLEBONE
                  </text>
                  <text x="560" y="225" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    SOHO
                  </text>
                  <text x="720" y="245" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    THE CITY
                  </text>
                  <text x="210" y="495" fill="#686660" fontSize="10" fontFamily="serif" letterSpacing="2" textAnchor="middle">
                    WIMBLEDON
                  </text>

                  {/* Venue Pins */}
                  {filteredVenues.map((venue) => {
                    const isSelected = activeVenue?.id === venue.id;
                    const isHovered = hoveredVenue?.id === venue.id;
                    const isFocus = isSelected || isHovered;

                    return (
                      <g
                        key={venue.id}
                        transform={`translate(${venue.coordinates.x}, ${venue.coordinates.y})`}
                        className="cursor-pointer group/pin"
                        onMouseEnter={() => setHoveredVenue(venue)}
                        onMouseLeave={() => setHoveredVenue(null)}
                        onClick={() => setActiveVenue(venue)}
                        tabIndex={0}
                        role="button"
                        aria-label={`${venue.name} in ${venue.neighborhood}`}
                      >
                        {isFocus && (
                          <motion.circle
                            cx="0"
                            cy="0"
                            initial={{ r: 16, opacity: 0.9 }}
                            animate={{ r: 24, opacity: 0.4 }}
                            transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse' }}
                            fill="url(#pinGlow)"
                          />
                        )}

                        <circle
                          cx="0"
                          cy="0"
                          r={isFocus ? 11 : 7}
                          fill={isFocus ? '#CFA85E' : '#12141A'}
                          stroke={isFocus ? '#DDB872' : '#8B672B'}
                          strokeWidth={isFocus ? 2 : 1.2}
                          className="transition-all duration-300"
                        />

                        <circle
                          cx="0"
                          cy="0"
                          r={isFocus ? 4.5 : 2.5}
                          fill={isFocus ? '#08090C' : '#CFA85E'}
                        />

                        {(isFocus || selectedDistrict !== 'all') && (
                          <g transform="translate(0, -18)" className="pointer-events-none">
                            <rect
                              x={-Math.min(venue.name.length * 3.5, 90)}
                              y="-16"
                              width={Math.min(venue.name.length * 7, 180)}
                              height="18"
                              fill="#08090C"
                              stroke="#CFA85E"
                              strokeWidth="0.8"
                              opacity="0.96"
                            />
                            <text
                              x="0"
                              y="-4"
                              fill="#F4F1EA"
                              fontSize="8"
                              fontWeight="500"
                              textAnchor="middle"
                              letterSpacing="0.5"
                            >
                              {venue.name.length > 28 ? `${venue.name.substring(0, 26)}...` : venue.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Legend & Controls */}
                <div className="absolute bottom-3 left-3 bg-[#08090C]/90 border border-[#242630] px-3 py-1.5 text-[10px] text-[#B5AFA3] flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8B672B]" /> TGLC Enclave
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#CFA85E]" /> Active Selection
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedDistrict('all')}
                    className="bg-[#12141A]/95 hover:bg-[#1A1D26] border border-[#2A2D38] hover:border-[#8B672B] px-3 py-1 text-[10px] uppercase tracking-wider text-[#F4F1EA] transition-colors"
                  >
                    Reset Zoom
                  </button>
                </div>
              </div>

              {/* Venue Quick Chip Bar */}
              <div className="mt-4 pt-3 border-t border-[#20232E]">
                <div className="text-[10px] uppercase tracking-widest text-[#CFA85E] mb-2 tabular-nums">
                  Mapped in this view ({filteredVenues.length}):
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {filteredVenues.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVenue(v)}
                      onMouseEnter={() => setHoveredVenue(v)}
                      onMouseLeave={() => setHoveredVenue(null)}
                      className={`px-3 py-1.5 text-[11px] whitespace-nowrap border text-left transition-all ${
                        activeVenue?.id === v.id
                          ? 'border-[#CFA85E] bg-[#181A22] text-[#F4F1EA] font-medium'
                          : 'border-[#242630] bg-[#0B0C10] text-[#9C968A] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Animated Active Venue Spotlight Card */}
            {viewMode === 'split' && currentDisplayVenue && (
              <div className="lg:col-span-5 bg-[#12141A] border border-[#242630] p-6 sm:p-8 relative">
                <motion.div
                  key={currentDisplayVenue.id}
                  initial={{ opacity: 0.85, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                    {/* Image */}
                    <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#181A22] border border-[#242630]">
                      <img
                        src={currentDisplayVenue.image}
                        alt={currentDisplayVenue.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3 right-3 text-xs text-[#FAF7F0] flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[#E2BA6B]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{currentDisplayVenue.neighborhood}</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#D4D8E2] tabular-nums">{currentDisplayVenue.postcode}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] font-medium">
                        <span>{currentDisplayVenue.districtName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#D4D8E2]">{currentDisplayVenue.category}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#FAF7F0] leading-tight">
                        {currentDisplayVenue.name}
                      </h3>
                      <p className="text-xs text-[#E2BA6B] italic">
                        “{currentDisplayVenue.tagline}”
                      </p>
                    </div>

                    <p className="tglc-prose text-xs sm:text-sm">
                      {currentDisplayVenue.summary}
                    </p>

                    <div className="p-4 bg-[#0B0D13] border border-[#222530] space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#E2BA6B]">
                        <Compass className="w-3 h-3" />
                        <span>Curator’s Operational Insight</span>
                      </div>
                      <p className="text-xs text-[#D4D8E2] leading-relaxed font-light">
                        {currentDisplayVenue.curatorNotes}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-[11px] uppercase tracking-widest text-[#CFA85E] font-medium">
                        TGLC Access Privileges
                      </h4>
                      <ul className="space-y-2">
                        {currentDisplayVenue.tglcPrivileges.map((privilege, pIdx) => (
                          <li key={pIdx} className="text-xs text-[#C8C2B7] flex items-start gap-2.5 font-light">
                            <span className="w-1.5 h-1.5 bg-[#CFA85E] rounded-full mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{privilege}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#222530] grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8B672B] block">Prime Season</span>
                        <span className="text-[#D9D4CA] text-xs font-light">{currentDisplayVenue.recommendedSeason}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8B672B] block">Adjacent Haven</span>
                        <span className="text-[#D9D4CA] text-xs font-light">{currentDisplayVenue.closestSanctuary}</span>
                      </div>
                    </div>

                    {/* Clean hairline box replacing left thick accent bar */}
                    <div className="text-xs text-[#B5AFA3] bg-[#0D0F14] p-3.5 border border-[#8B672B]/50 leading-relaxed font-light">
                      <span className="text-[#CFA85E] font-medium mr-1.5">Insider Note:</span>
                      {currentDisplayVenue.insiderTip}
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => openIntroductionModal(`Inquiry regarding access to ${currentDisplayVenue.name}`)}
                        className="btn-gold w-full py-3.5 text-xs flex items-center justify-center gap-2"
                      >
                        <span>Request Private Arrangements Here</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                      </motion.div>
              </div>
            )}
          </div>
        ) : null}

        {/* Directory View */}
        {viewMode === 'directory' || viewMode === 'map' ? (
          <div className="space-y-6 pt-4">
            <div className="border-b border-[#222530] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-serif text-2xl text-[#F4F1EA] tabular-nums">
                Complete Enclave Directory ({filteredVenues.length})
              </h3>
              <span className="text-xs text-[#CFA85E]">
                St James’s · Mayfair · Knightsbridge · Marylebone · Wimbledon
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue, idx) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.25) }}
                  className="bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#181A22] relative">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#E2BA6B] tabular-nums">
                        <span>{venue.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{venue.neighborhood}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#8F98AA]">{venue.postcode}</span>
                      </div>
                      <h4 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                        {venue.name}
                      </h4>
                      <p className="text-xs tglc-prose line-clamp-3">
                        {venue.summary}
                      </p>

                      <div className="pt-3 border-t border-[#20232E] space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B672B] block">
                          Access Highlights:
                        </span>
                        <p className="text-xs text-[#C8C2B7] line-clamp-2 font-light">
                          {venue.tglcPrivileges.join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => openIntroductionModal(`Inquiry regarding ${venue.name}`)}
                      className="btn-outline-gold w-full py-2.5 text-[11px] flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire Regarding Access</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
