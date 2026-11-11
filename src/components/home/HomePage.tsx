import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, ETHOS_PRINCIPLES, LONDON_NEIGHBOURHOODS, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowUpRight, Flame, Lock, Shield, Compass, Calendar, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

const LIFESTYLE_PILLARS = [
  {
    id: 'chauffeur-fleet',
    label: 'Chauffeur & Fleet',
    kicker: 'The London Arrival',
    title: 'The Modern English Gentleman & Lady: Motion with Poise',
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    secondaryImage: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    tagline: 'A Rolls-Royce waiting in the evening twilight, doors opened with quiet military precision.',
    narrative: [
      'In a capital of relentless pace, true luxury is unhurried serenity. Our chauffeurs hold advanced defensive driving credentials, arrive impeccably attired, and anticipate the rhythm of your evening without a single unnecessary word.',
      'From private galas in Mayfair to thirty-second tarmac handovers at Battersea Heliport, each vehicle operates as a private mobile sanctuary stocked precisely to your dossier.',
    ],
    features: [
      'Rolls-Royce Phantom & Cullinan, Bentley Flying Spur, Mercedes-Maybach',
      'Door-to-door umbrella protocol, discreet luggage staging, and route scouting',
      'Direct apron coordination at RAF Northolt, Farnborough, and Biggin Hill',
    ],
    ctaText: 'Explore Chauffeur & Fleet Practice',
    targetService: 'transport-security',
  },
  {
    id: 'savile-row-horology',
    label: 'Savile Row & Haute Horlogerie',
    kicker: 'Rare Commissions',
    title: 'Bespoke Sartorial Distinction & Master Timepieces',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    secondaryImage: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    tagline: 'When off-the-shelf luxury is inadequate, we introduce you directly to the master.',
    narrative: [
      'An enduring British wardrobe is defined by quiet proportion rather than logos. We arrange private consultations with senior Savile Row cutters who attend your London residence for basted fittings across evening dinner jackets, cashmere coats, and field tailoring.',
      'For collectors of fine mechanics, our horology desk sources archival Patek Philippe, Rolex, and independent Geneva references directly from trusted private custodians.',
    ],
    features: [
      'In-residence fittings with head cutters along Savile Row and Sackville Street',
      'Provenance-verified sourcing of archival chronographs and tourbillons',
      'High jewellery design with untreated natural gemstones and Bond Street specialists',
    ],
    ctaText: 'Explore Sourcing & Watches',
    targetService: 'luxury-sourcing',
  },
  {
    id: 'sub-rosa-london',
    label: 'Sub-Rosa Access & Urban Vaults',
    kicker: 'The Unlisted Network',
    title: 'UFC Cageside, Hip-Hop Sound Vaults & Shoreditch Lofts',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    secondaryImage: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    tagline: 'Where public ticketing stops, the private security corridor and sound lock open.',
    narrative: [
      'Beyond St James’s drawing rooms lies London’s raw cultural pulse. Through direct relationships with championship fight promoters, acoustic arch custodians, and independent vinyl selectors, our principals sit ringside at The O2 or hold midnight buyouts inside sound-isolated Vauxhall railway vaults.',
      'After hours, satin-black Maybachs slip quietly down rear service lanes into Soho street-couture archives, Shoreditch DJ lofts, and 300-year-old Square Mile bullion vaults.',
    ],
    features: [
      'Vauxhall brick sound vaults & Shoreditch rooftop rotary-mixer hip-hop sessions',
      'UFC London Octagon cageside seats with accredited athlete warmup room access',
      'Locked-door Soho street-couture showrooms and Maybach alley departures',
    ],
    ctaText: 'Explore Sub-Rosa Access',
    targetPage: 'hidden-london',
  },
  {
    id: 'harrods-liberty',
    label: 'Bond Street & Heritage Salons',
    kicker: 'Private Salons',
    title: 'Closed-Door Shopping & Landmark London Suites',
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    secondaryImage: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
    tagline: 'Private lift access to the penthouse dressing suites of Mayfair and Knightsbridge.',
    narrative: [
      'Bypass retail crowds entirely. Through longstanding relationships with heritage houses along Old Bond Street, Mount Street, and Knightsbridge, we unlock private upstairs salons after closing hours.',
      'High jewellery parures and seasonal runway capsules from Paris and Milan are brought to your residence or hotel suite for unhurried inspection ahead of public release.',
    ],
    features: [
      'Private Knightsbridge penthouse styling suites arranged out of hours',
      'Closed vault viewings along Old Bond Street, Mount Street, and Burlington Arcade',
      'White-glove diplomatic export, insurance scheduling, and doorstep courier delivery',
    ],
    ctaText: 'Explore Culture & Private Salons',
    targetService: 'experiences-culture',
  },
  {
    id: 'aviation-estates',
    label: 'Aviation & Stately Manors',
    kicker: 'Sovereign Freedom',
    title: 'Intercontinental Wings & English Country Estates',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    secondaryImage: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    tagline: 'From private FBO tarmac to a lit Cotswolds hearth in under an hour.',
    narrative: [
      'True freedom is the elimination of travel friction. Our aviation practice matches Part 135 ultra-long-range Bombardier and Gulfstream hulls with direct apron car transfers so departure feels like stepping from one drawing room to another.',
      'Across Oxfordshire, Hampshire, and the Cotswolds, we provision unlisted historic estates before you land—woodfires lit, wine cellars opened, and country field sports briefed down to the cartridge.',
    ],
    features: [
      'Private terminal transfers at RAF Northolt, London Farnborough, and Biggin Hill',
      'Full manor house provisioning with live-in butlers, country chefs, and gamekeepers',
      'Twin-engine AgustaWestland helicopter transfers between Battersea and private lawns',
    ],
    ctaText: 'Explore Aviation & Estates',
    targetService: 'travel-aviation',
  },
];

const DIFFERENCE_IMAGERY = [
  '/assets/aistudio/tglc_st_james_salon.jpg',
  '/assets/aistudio/mayfair_fine_dining.jpg',
  '/assets/aistudio/savile_row_bespoke.jpg',
  '/assets/aistudio/florence_palazzo_courtyard.jpg',
  '/assets/aistudio/bond_street_jewellery.jpg',
];

export const HomePage: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const currentPillar = LIFESTYLE_PILLARS[activeTab];

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA]">
      {/* 1. Full-Screen Cinematic Hero Carousel */}
      <HeroCarousel />

      <GoldDivider />

      {/* 2. Authoritative Introduction with Unified Crest Emblem on Seamless Pure Black */}
      <section className="relative overflow-hidden border-b border-[#1A1C24] bg-[#08090C]">
        <div className="bg-black pt-10 sm:pt-14 pb-6 px-6 sm:px-12 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5">
            <motion.div
              initial={{ opacity: 0.92, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <img
                src="/assets/aistudio/tglc_lockup_transparent.png"
                alt="The Global Luxury Consortium Crest & Wordmark"
                className="w-44 sm:w-52 h-auto object-contain block"
              />
            </motion.div>

            <span className="text-[11px] uppercase tracking-[0.28em] text-[#C4933F] font-medium block tabular-nums pt-1">
              Mayfair Private Office · 3rd Floor, 45 Albemarle Street, London W1S 4JL
            </span>

            <motion.h2
              initial={{ opacity: 0.92, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#F4F1EA] max-w-5xl mx-auto text-balance"
            >
              Discretion by default. London intelligence. A life orchestrated with quiet poise.
            </motion.h2>

            <p className="text-xs sm:text-sm text-[#B5AFA3] max-w-2xl mx-auto leading-relaxed font-light">
              From our private salon above Albemarle Street, TGLC acts as a calm, unhurried extension of your family office—handling rare access, protective travel, and London daily life without fanfare.
            </p>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto my-1" />
          </div>
        </div>

        <div className="h-6 bg-gradient-to-b from-black to-[#08090C]" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-10 sm:pb-14 relative z-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-[#1D1F28] pt-8">
            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5 }}
              className="space-y-3 p-5 bg-[#0C0D12] border border-[#1E202B] hover:border-[#8B672B]/60 transition-colors"
            >
              <span className="font-serif text-2xl text-[#CFA85E] block font-light">I.</span>
              <span className="text-xs tracking-wide text-[#C4933F] font-medium block">The British Standard</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">The English Gentleman & Lady Standard</h3>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                Authentic luxury carries itself softly. It lives in the punctual black Rolls-Royce waiting in evening drizzle, the quiet counsel of a trusted steward, and an unhurried rhythm across continents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="space-y-3 p-5 bg-[#0C0D12] border border-[#1E202B] hover:border-[#8B672B]/60 transition-colors"
            >
              <span className="font-serif text-2xl text-[#CFA85E] block font-light">II.</span>
              <span className="text-xs tracking-wide text-[#C4933F] font-medium block">Human Network</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Doors Opened by Trust, Not Algorithms</h3>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                We reject automated portals and volume queues. Private corner tables, off-market Belgravia residences, and after-hours museum viewings are granted by human custodians who know our house personally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="space-y-3 p-5 bg-[#0C0D12] border border-[#1E202B] hover:border-[#8B672B]/60 transition-colors"
            >
              <span className="font-serif text-2xl text-[#CFA85E] block font-light">III.</span>
              <span className="text-xs tracking-wide text-[#C4933F] font-medium block">Confidential Protocol</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Absolute Discretion & Privacy</h3>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                Our member roll is never published, our principals are never photographed, and every arrangement is booked on strict need-to-know authority from our Mayfair drawing room.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2">
            <button
              onClick={() => openIntroductionModal('Introductory Consultation')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2"
            >
              <span>Begin a Private Conversation</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <button
              onClick={() => navigateTo('commission-studio')}
              className="btn-outline-gold px-7 py-3.5 text-xs flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span>Private Commission Studio</span>
            </button>
            <button
              onClick={() => navigateTo('hidden-london')}
              className="px-6 py-3.5 text-xs text-[#D4D8E2] hover:text-[#E2BA6B] transition-colors flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#8B672B]" />
              <span>Explore Sub-Rosa London</span>
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 3. Sub-Rosa London Spotlight */}
      <section className="py-10 sm:py-14 border-b border-[#1A1C24] bg-[#07080B] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0.9, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1017] border border-[#242632] shadow-2xl group">
                <motion.img
                  src="/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg"
                  alt="The Other Side of London: Stealth Nocturne and Subterranean Sanctums"
                  referrerPolicy="no-referrer"
                  animate={{ scale: [1.03, 1, 1.02] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/92 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/88 backdrop-blur-md p-4 border border-[#242632]">
                  <span className="tglc-kicker block mb-1">
                    Arena Combat, Hip-Hop Sound Vaults & River Stealth
                  </span>
                  <p className="font-serif italic text-sm text-[#FAF7F0]">
                    “Churchill’s sealed citadels, Vauxhall railway bass vaults, Shoreditch vinyl lofts, and midnight Thames sprints.”
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-5"
            >
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                The Unlisted Network
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] leading-tight">
                The other side of London.
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-[#CFA85E]">
                “Beyond Mayfair tea rooms lies the capital’s covert pulse.”
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                <p>
                  Through personal alliances with championship fight promoters, historic estate custodians, and underground gallerists, TGLC unlocks rooms invisible to the public calendar.
                </p>
                <p>
                  Step inside front-row Octagon cageside seats at UFC London with fighter tunnel credentials, command private 20-seat arena hospitality boxes, or gather in 300-year-old Square Mile bullion vaults after midnight.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('hidden-london')}
                  className="btn-gold px-7 py-3.5 text-xs flex items-center gap-2"
                >
                  <span>Explore Sub-Rosa Access</span>
                  <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                </button>
                <button
                  onClick={() => openIntroductionModal('Priority Arena & UFC Access Inquiry')}
                  className="px-4 py-3 text-xs text-[#D9D4CA] hover:text-[#CFA85E] transition-colors font-medium"
                >
                  Inquire Privately →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 3.5 The Commission Studio Spotlight (Interactive Itinerary Configurator) */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 bg-[#0C0D13] border-b border-[#1A1C24] relative overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(185,134,51,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div>
              <div className="flex items-center gap-2 tglc-kicker mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>The Commission Studio · 18 Bespoke Scenarios</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
                Build Your Confidential London & Global Itinerary
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md">
              From our Albemarle Street salon, select prebuilt blueprints or combine 18 scenarios across urban sound vaults, aviation air corridors, and heritage salons.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Preview Grid */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/savile_row_bespoke.jpg"
                        alt="Savile Row"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Sartorial & Horology</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      Savile Row Cut & Vault
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#8F98AA] mt-3">Mayfair in-suite cutter</span>
                </div>

                <div
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/urban_hiphop_club_1794391691841.jpg"
                        alt="Vauxhall Sound Vault & Nocturne"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Urban Sound & Stealth</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      Vauxhall Vault & Maybach
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#8F98AA] mt-3">Alley staging & rotary rig</span>
                </div>

                <div
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png"
                        alt="Challenger 350"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Aviation & Mobility</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      RAF Northolt Charter
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#8F98AA] mt-3">30-sec tarmac handover</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#8F98AA]">
                  6 prebuilt blueprint packages or 18 bespoke modular destinations.
                </span>
                <button
                  onClick={() => navigateTo('commission-studio')}
                  className="btn-gold px-7 py-3 text-xs flex items-center gap-2"
                >
                  <span>Launch Private Commission Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#07080B]" />
                </button>
              </div>
            </div>

            {/* Right Live Dossier Teaser Card */}
            <div className="lg:col-span-5 bg-[#07080B] border border-[#262835] p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E202B]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E2BA6B]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>TGLC-MSN-2026</span>
                </div>
                <span className="tglc-meta uppercase">
                  Mayfair Dispatch Desk
                </span>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Operational Posture:</span>
                  <span className="text-[#E2BA6B] font-medium">Albemarle Street Ready</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Available Fleet:</span>
                  <span className="text-[#FAF7F0]">8 Sovereign & Stealth Vehicles</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Protection Protocols:</span>
                  <span className="text-[#FAF7F0]">Tier 1 Covert to Tier 3 Faraday</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Duty Dispatch:</span>
                  <span className="text-[#FAF7F0] tabular-nums">{TGLC_CONTACT.telephone}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('commission-studio')}
                className="btn-outline-gold w-full py-3 text-xs flex items-center justify-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>Configure Your Commission Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 4. Interactive Sovereign Lifestyle Showcase */}
      <section className="py-10 sm:py-14 px-6 sm:px-12 bg-[#08090C] border-b border-[#1A1C24] relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block mb-2">
                The Sovereign Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                British Elegance & Mayfair Architecture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Inspect how our Mayfair directors orchestrate every movement—from twilight Rolls-Royce dispatches to Savile Row commissions and closed-door club sanctums.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#181A22]">
            {LIFESTYLE_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-300 border-b-2 flex items-center gap-2.5 cursor-pointer ${
                  activeTab === idx
                    ? 'border-[#B98633] text-[#CFA85E] bg-[#12141C]'
                    : 'border-transparent text-[#8E8A83] hover:text-[#D9D4CA] hover:bg-[#0D0F15]'
                }`}
              >
                <span className="text-[11px] tabular-nums text-[#8B672B]">{`0${idx + 1}`}</span>
                <span>{pillar.label}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0.88, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0C0D12] border border-[#20222E] p-6 sm:p-10 shadow-2xl"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-black border border-[#242632] group">
                <motion.img
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  animate={{ scale: [1.02, 1, 1.03] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#DDB872] bg-[#08090C]/85 backdrop-blur-md px-4 py-2.5 border border-[#8B672B]/40">
                  <span className="uppercase tracking-widest text-[10px] font-medium shrink-0">{currentPillar.kicker}</span>
                  <span className="italic font-serif text-sm text-[#F4F1EA]">“{currentPillar.tagline}”</span>
                </div>
              </div>

              {currentPillar.secondaryImage && (
                <div className="flex items-center gap-4 pt-1">
                  <div className="w-28 h-16 overflow-hidden border border-[#8B672B]/50 shrink-0 bg-black">
                    <img
                      src={currentPillar.secondaryImage}
                      alt="Companion view"
                      className="w-full h-full object-cover filter brightness-105 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs text-[#9C968A] italic font-serif">
                    Privately coordinated on direct authority through TGLC House, Mayfair.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C4933F] font-medium block mb-2">
                  {currentPillar.kicker}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] leading-snug">
                  {currentPillar.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#D9D4CA] font-light leading-relaxed">
                {currentPillar.narrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#1D1F28]">
                {currentPillar.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#D9D4CA]">
                    <span className="w-1.5 h-1.5 bg-[#B98633] mt-1.5 shrink-0" />
                    <span className="font-light">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (currentPillar.targetPage === 'hidden-london') {
                      navigateTo('hidden-london');
                    } else {
                      navigateTo('service-detail', { serviceId: currentPillar.targetService });
                    }
                  }}
                  className="btn-gold px-6 py-3 text-xs flex items-center gap-2"
                >
                  <span>{currentPillar.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                </button>
                <button
                  onClick={() => openIntroductionModal(currentPillar.title)}
                  className="px-4 py-3 text-xs text-[#D9D4CA] hover:text-[#CFA85E] transition-colors font-medium"
                >
                  Inquire Privately →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GoldDivider />

      {/* 5. Redesigned Services & Practices Gallery (Classy, Larger Imagery & Motion — NOT a blog list) */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 bg-[#090A0E] border-b border-[#1A1C24]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#CFA85E] font-medium block mb-2">
                Services & Practices
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                From the expected to the exceptional.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Seven integrated private-office practices orchestrated by specialists who act under a single roof at 3rd Floor, 45 Albemarle Street, Mayfair.
            </p>
          </div>

          <div className="space-y-8">
            {SERVICES_DATA.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                  className="group cursor-pointer bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/70 transition-all duration-300 shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Large Cinematic Photography Panel */}
                    <div
                      className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-[#131722] ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/75 via-transparent to-transparent" />
                    </div>

                    {/* Editorial Content Column */}
                    <div
                      className={`lg:col-span-6 p-6 sm:p-9 lg:p-11 flex flex-col justify-between space-y-5 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="tglc-meta flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="text-[#E2BA6B] uppercase tracking-[0.18em]">{service.kicker}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">Practice 0{index + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{service.subServices.length} Sub-Practices</span>
                        </div>
                        <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors flex items-center justify-between gap-4">
                          <span>{service.title}</span>
                          <ArrowUpRight className="w-5 h-5 shrink-0 text-[#E2BA6B] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h3>
                        <p className="font-serif italic text-base sm:text-lg text-[#E2BA6B]">
                          “{service.tagline}”
                        </p>
                        <p className="tglc-prose text-xs sm:text-sm pt-1">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1D1F28] space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.slice(0, 4).map((sub) => (
                            <button
                              key={sub.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('subservice-detail', { serviceId: service.id, subServiceId: sub.id });
                              }}
                              className="text-xs text-[#D4D8E2] hover:text-[#07080B] bg-[#131722] hover:bg-[#E2BA6B] border border-[#262835] hover:border-[#E2BA6B] px-3 py-1.5 transition-colors"
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                        <div className="text-xs text-[#E2BA6B] font-medium flex items-center justify-between pt-2">
                          <span>Inspect Full Practice & {service.subServices.length} Disciplines</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('services')}
              className="btn-outline-gold px-8 py-4 text-xs cursor-pointer"
            >
              View Complete Practice Directory & Disciplines →
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 5.5 Case Studies & 24 Signature Itineraries Showcase */}
      <section className="py-14 sm:py-20 px-6 sm:px-12 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-b border-[#1A1C24] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div>
              <div className="flex items-center gap-2 tglc-kicker mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>The Case Studies Portfolio · 24 Executed Mandates</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
                Real Journeys. Flawless Orchestration.
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md">
              Explore 24 comprehensive case studies spanning state visits, supersonic transfers, closed-door heritage vaults, and edgy sub-rosa nocturnal adventures under tactical protection.
            </p>
          </div>

          {/* 4 Featured Itinerary Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Thames Stealth & Bullion Catacombs',
                tag: 'Sub-Rosa Nocturne',
                kicker: 'Square Mile & River',
                image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
                desc: '02:00 AM 40-knot river sprint beneath Tower Bridge followed by private Armagnac banquet behind 20-ton bank doors.',
                meta: 'Evening · 5 Hours · Tier 2 Security',
              },
              {
                title: 'RAF Northolt to Florence Renaissance Villa',
                tag: 'Aviation & Palazzos',
                kicker: 'London to Tuscany',
                image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
                desc: '30-second apron tarmac handover from Cullinan to Challenger 350; staffed Chianti palazzo with fires lit before arrival.',
                meta: '3 Days · 72 Hours · Diplomatic Gate',
              },
              {
                title: 'Vauxhall Concrete Bass Vault & Maybach Buyout',
                tag: 'Urban Sound & Vaults',
                kicker: 'SE1 Railway Arches',
                image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
                desc: 'Ringside brick arches & sound-isolated vinyl bass chambers with satin-black Maybach rear lane arrivals and Faraday pouches.',
                meta: 'Full Evening · Tier 2 Tactical Escort',
              },
              {
                title: '3,000-Acre Cotswolds Manor & Michelin Hearth',
                tag: 'Estates & Field Sports',
                kicker: 'Oxfordshire Countryside',
                image: '/assets/aistudio/cotswolds_manor_estate.jpg',
                desc: 'Agusta 109 helicopter transfer from Battersea in 24 minutes; clays, bespoke Purdeys, and 8-course woodfire feast.',
                meta: 'Weekend · 48 Hours · Full Buyout',
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                onClick={() => navigateTo('case-studies')}
                className="bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all cursor-pointer overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#131722] relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="tglc-meta text-[10px] flex flex-wrap items-center gap-1.5">
                      <span className="text-[#E2BA6B] uppercase tracking-wider">{card.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{card.kicker}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="tglc-prose text-xs line-clamp-3">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#1E202B] flex items-center justify-between text-[11px] font-mono text-[#E2BA6B]">
                    <span className="tabular-nums">{card.meta}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('case-studies')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All 24 Signature Itineraries & Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-[#07080B]" />
            </button>
            <button
              onClick={() => navigateTo('commission-studio')}
              className="btn-outline-gold px-6 py-3.5 text-xs cursor-pointer"
            >
              Build Your Own Commission →
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 6. Reimagined "The TGLC Difference" — Pictorial Bento Editorial Grid */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#08090C]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#1D1F28] pb-6">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block">
                The Consortium Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                The TGLC Difference
              </h2>
            </div>
            <p className="lg:col-span-5 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
              We deliberately cap our active membership roster to preserve depth of counsel, human memory, and unhurried operational care across generations.
            </p>
          </div>

          {/* Illustrated 5-Pillar Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ETHOS_PRINCIPLES.map((principle, idx) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0.9, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => navigateTo('ethos')}
                className={`group cursor-pointer bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/65 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`w-full overflow-hidden bg-black relative ${idx === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <img
                    src={DIFFERENCE_IMAGERY[idx % DIFFERENCE_IMAGERY.length]}
                    alt={principle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-[#0E1016]/25 to-transparent" />
                  <span className="absolute bottom-3 left-5 font-serif text-2xl sm:text-3xl text-[#CFA85E]">
                    {principle.number}
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D9D4CA] leading-relaxed font-light">
                      {principle.summary}
                    </p>
                    <p className="text-xs text-[#9C968A] leading-relaxed font-light line-clamp-3">
                      {principle.body}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1D1F28] text-xs text-[#CFA85E] font-medium flex items-center justify-between">
                    <span>Read Founding Principles</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 7. London’s Sovereign Enclaves */}
      <section className="py-10 sm:py-14 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#0A0B0F]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block mb-2">
                Capital Intelligence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                London’s Sovereign Enclaves
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Our house stands at 3rd Floor, 45 Albemarle Street in Mayfair, with localized intelligence across St James’s, Knightsbridge, Belgravia, and Chelsea.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LONDON_NEIGHBOURHOODS.slice(0, 4).map((enclave, idx) => (
              <motion.div
                key={enclave.name}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => navigateTo('our-london')}
                className="group cursor-pointer relative aspect-[3/4] overflow-hidden bg-black border border-[#20222E] hover:border-[#B98633]/65 transition-all"
              >
                <img
                  src={enclave.image}
                  alt={enclave.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/35 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                  <span className="text-xs tracking-widest uppercase text-[#CFA85E] font-medium block">
                    {enclave.name}
                  </span>
                  <p className="text-xs text-[#D9D4CA] font-light line-clamp-2">{enclave.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 8. Confidential Introduction Finale */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 bg-black text-center">
        <motion.div
          initial={{ opacity: 0.92, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto" />

          <span className="text-[11px] uppercase tracking-[0.28em] text-[#C4933F] font-medium block">
            Admissions by Recommendation
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4F1EA] leading-tight">
            Begin with an unhurried conversation.
          </h2>

          <p className="text-xs sm:text-sm text-[#9C968A] font-light max-w-xl mx-auto leading-relaxed">
            Whether arranging family office support, bespoke chauffeur fleets, or private salon introductions across London, our directors at TGLC House respond personally and in confidence.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => openIntroductionModal('Private Principal Inquiry')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2"
            >
              <span>Request Confidential Introduction</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="btn-outline-gold px-7 py-3.5 text-xs"
            >
              Contact TGLC House
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
