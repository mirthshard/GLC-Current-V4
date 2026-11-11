/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { GoldDivider } from '../common/GoldDivider';
import { TGLC_CONTACT } from '../../data/tglcData';
import { simulatedSupabase } from '../../services/supabaseClient';
import {
  Shield,
  ArrowRight,
  ArrowUpRight,
  Check,
  Calendar,
  MapPin,
  Users,
  Copy,
  Printer,
  Lock,
  Send,
  CheckCircle2,
  Clock,
  Sliders,
  Compass,
  Disc3,
  Layers,
  Info,
  Download,
  CheckSquare,
  Square,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ScenarioCategory =
  | 'All'
  | 'Urban Clubs & Nightlife'
  | 'Sub-Rosa & Vaults'
  | 'Combat & Motorsport'
  | 'Aviation & Yachts'
  | 'Estates & Gastronomy'
  | 'Arts, Couture & Longevity';

interface CommissionScenario {
  id: string;
  category: Exclude<ScenarioCategory, 'All'>;
  title: string;
  kicker: string;
  tagline: string;
  image: string;
  location: string;
  duration: string;
  baseHours: number;
  baseDisbursement: number;
  guidanceNote: string;
  deliverables: string[];
}

interface PrebuiltBlueprint {
  id: string;
  title: string;
  badge: string;
  summary: string;
  rationale: string;
  image: string;
  scenarioId: string;
  fleetId: string;
  protocolId: string;
  armourId: string;
  apronId: string;
  cellarId: string;
  staffingId: string;
  hours: number;
  codename: string;
  departurePoint: string;
  guestCount: string;
  targetDate: string;
  cellarDietary: string;
}

const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  'All',
  'Urban Clubs & Nightlife',
  'Sub-Rosa & Vaults',
  'Combat & Motorsport',
  'Aviation & Yachts',
  'Estates & Gastronomy',
  'Arts, Couture & Longevity',
];

const SCENARIOS: CommissionScenario[] = [
  // 1. Urban Clubs & Nightlife
  {
    id: 'urban-hiphop-concrete-vault',
    category: 'Urban Clubs & Nightlife',
    title: 'Vauxhall Concrete Bass Vault & Touring DJ Booth Buyout',
    kicker: 'Sector 09 · Urban Sound & Street Luxury',
    tagline: 'Poured-concrete late-night hip-hop & vinyl sound system buyout with satin-black Maybach alley ingress.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    location: 'Vauxhall & Nine Elms Railway Viaduct',
    duration: 'Late Night (23:00 – 05:00)',
    baseHours: 8,
    baseDisbursement: 16500,
    guidanceNote: 'Directors recommend Tier 2 Close Protection plus Faraday pouches for artist & principal privacy inside high-energy bass rooms.',
    deliverables: [
      'Elevated steel & smoked-glass DJ booth gallery overlooking the custom horn stacks',
      'Back-alley unmarked roller-shutter vehicle arrival with Julian Sterling advance sweep',
      'Rare Japanese whisky, tequila extra anejo & magnum champagne table ledger without bottle parades',
      'Staggered satin-black Maybach departure sequence directly from loading court',
    ],
  },
  {
    id: 'shoreditch-vinyl-rooftop',
    category: 'Urban Clubs & Nightlife',
    title: 'Shoreditch Brutalist DJ Loft & Rare Acetate Vinyl Session',
    kicker: 'Redchurch Street · E2 Sound Sanctum',
    tagline: 'Floor-to-ceiling loft windows, rotary Bozak mixers, and headline hip-hop & electronic selectors after 01:00.',
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    location: 'Redchurch Street & Bethnal Roofs, E2',
    duration: 'Nocturne (22:00 – 04:00)',
    baseHours: 8,
    baseDisbursement: 14000,
    guidanceNote: 'Pair with the VIP Sprinter JetVan for multi-guest mobile pre-drinking and acoustic isolation across East London transit.',
    deliverables: [
      'Private loft keycard directly from service cargo lift bypassing street queue completely',
      'Custom analog walnut speaker array tuned by East London mastering engineer',
      'Late-night yakitori & truffle wagyu hand-rolls served tableside inside booth',
    ],
  },
  {
    id: 'soho-stealth-couture-drop',
    category: 'Urban Clubs & Nightlife',
    title: 'Soho Stealth Streetwear Vault & Mayfair Alley Listening Club',
    kicker: 'Brewer Street · Street Meets Ultra-Wealth',
    tagline: 'After-hours sample archive inspection followed by private hip-hop listening lounge in Mayfair mews.',
    image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg',
    location: 'Soho Sample Vaults to Mayfair Mews',
    duration: 'Evening & Night (19:30 – 02:30)',
    baseHours: 8,
    baseDisbursement: 11500,
    guidanceNote: 'Ideal for visiting recording artists, NBA/Premier League athletes, and creative founders seeking culture without paparazzi.',
    deliverables: [
      '00:00 closed-door access to rare archival sneaker, leather jacket & numbered runway pieces',
      'Satin-black Maybach S680 courier staging between Soho alleyways and Mayfair listening room',
      'Strict no-lens policy enforced with magnetic Faraday pouches on arrival',
    ],
  },

  // 2. Sub-Rosa & Vaults
  {
    id: 'sub-rosa-thames-vault',
    category: 'Sub-Rosa & Vaults',
    title: 'Thames Stealth Speed Run & 300-Yr Bullion Vault Dinner',
    kicker: 'Square Mile & River Thames',
    tagline: 'Midnight Thames sprint on a 45ft matte-black interceptor followed by private catacomb dining.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    location: 'Wapping Pier to Bank Catacombs',
    duration: 'Evening (5 Hours)',
    baseHours: 8,
    baseDisbursement: 15500,
    guidanceNote: 'Combine the 45ft Nocturne Interceptor with Private Pier Key access to bypass central London traffic completely after dark.',
    deliverables: [
      'High-speed twin-engine Thames night run under Tower Bridge at 38 knots',
      'Unmarked vault descent through 20-ton steel circular bank bulkheads',
      'Private chef 6-course tasting menu paired with rare 19th-century Armagnacs',
      'Julian Sterling tactical plainclothes security team accompanying throughout',
    ],
  },
  {
    id: 'down-street-bunker-briefing',
    category: 'Sub-Rosa & Vaults',
    title: 'Down Street Ghost Station & Sovereign Map-Room Briefing',
    kicker: 'Piccadilly Underground Deep Level',
    tagline: '1907 disused Tube platforms and Churchill’s wartime cabinet chambers unlocked for 10 principals.',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    location: 'Down Street Secret Portal, Mayfair W1J',
    duration: 'Evening (4.5 Hours)',
    baseHours: 6,
    baseDisbursement: 19500,
    guidanceNote: 'Natural 72ft London clay overburden provides innate RF shielding—recommended for sensitive M&A or family office councils.',
    deliverables: [
      'Unmarked brick entrance key unlocking directly into disused 1907 station spiral shaft',
      'Candles and low-kelvin brass uplighting staged across historic tile platforms',
      'Curated St James’s wine library decanted underground with senior butler attendance',
    ],
  },
  {
    id: 'tower-bascule-recital',
    category: 'Sub-Rosa & Vaults',
    title: 'Tower Bridge Bascule Chamber & Thames Rooftop Sky-Gantry',
    kicker: 'SE1 Hydraulic Abyss & East Sky',
    tagline: 'Private acoustic performance beside 1,200-ton bridge counterweights below the Thames riverbed.',
    image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    location: 'Tower Bridge South Pier Sub-Level',
    duration: 'Evening (5 Hours)',
    baseHours: 8,
    baseDisbursement: 21000,
    guidanceNote: 'Works effortlessly with a midnight river transfer straight to Canary Wharf heliport or Wapping slipway.',
    deliverables: [
      'Bridge Master escort onto cast-iron walkways overlooking Victorian hydraulic machinery',
      'Custom 10-second reverb brass or solo cello recital orchestrated for 14 guests',
      'Private river pier embarkation immediately below southern abutment',
    ],
  },

  // 3. Combat & Motorsport
  {
    id: 'underground-combat-bermondsey',
    category: 'Combat & Motorsport',
    title: 'Bermondsey Arch Unsanctioned Exhibition & Ringside Salon',
    kicker: 'Southwark & East End Archways',
    tagline: 'Fifty invited patrons, an elevated ring under Victorian soot bricks, and raw pugilism.',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    location: 'Bermondsey Railway Arches, SE16',
    duration: 'Full Evening (6 Hours)',
    baseHours: 10,
    baseDisbursement: 18500,
    guidanceNote: 'We strictly assign two SIA close-protection officers ringside to manage egress through industrial Southwark lanes.',
    deliverables: [
      'Front-row ringside table directly adjacent to the red corner with personal security cordon',
      'Tactical advance sweep and plainclothes security escort from departure to return',
      'Caviar and vintage single malt service served ringside during the 6-fight exhibition card',
      'Private post-match introduction with corner trainers and fighters',
    ],
  },
  {
    id: 'o2-cageside-tunnel',
    category: 'Combat & Motorsport',
    title: 'Championship Octagon Cageside & Athlete Warmup Tunnel',
    kicker: 'Greenwich Arena VIP Corridor',
    tagline: 'Drive directly down the underground arena loading bay into official athlete warm-up rooms.',
    image: '/assets/aistudio/ufc_arena_ringside.jpg',
    location: 'The O2 Underground Logistics Bay, SE10',
    duration: 'Evening (6 Hours)',
    baseHours: 8,
    baseDisbursement: 22000,
    guidanceNote: 'Pair with Armoured B6 Range Rover or Mercedes Sprinter JetVan for seamless subterranean ramp admission.',
    deliverables: [
      'Official athletic promotion tunnel accreditation for warmup pad-work observation',
      'Octagon Row 1 cageside allocation with dedicated private runner',
      'Early tunnel extraction 12 minutes prior to general arena egress',
    ],
  },
  {
    id: 'continental-hypercar-convoy',
    category: 'Combat & Motorsport',
    title: 'Bugatti & Koenigsegg Closed Track & Alpine Rally Support',
    kicker: 'Goodwood, Silverstone & European Passes',
    tagline: 'Private circuit days and Swiss-to-Tuscany hypercar grand touring with chase van technicians.',
    image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
    location: 'Silverstone / Goodwood / St Moritz to Como',
    duration: 'Weekend / 48 Hours',
    baseHours: 16,
    baseDisbursement: 34000,
    guidanceNote: 'Route reconnaissance includes road camber clearance checks and low-incline trailer staging throughout.',
    deliverables: [
      'Exclusive private circuit hire or Drivers’ Club Paddock accreditation',
      'Mercedes Sprinter support chase vehicle carrying luggage & factory mechanics',
      'Secured climate-controlled garage lockups at every overnight palazzo or hotel',
    ],
  },

  // 4. Aviation & Yachts
  {
    id: 'aviation-florence-transfer',
    category: 'Aviation & Yachts',
    title: 'RAF Northolt Challenger 350 Charter to Florence Villa',
    kicker: 'London to Tuscany',
    tagline: '30-second apron handover from Rolls-Royce directly to Bombardier cabin stairs.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    location: 'RAF Northolt (EGWU) to Florence (LIRQ)',
    duration: '3 Days / 72 Hours',
    baseHours: 24,
    baseDisbursement: 42000,
    guidanceNote: 'Specify RAF Northolt Gate 4 under Apron Handling for minimum road transit time from Mayfair or Belgravia.',
    deliverables: [
      'Bombardier Challenger 350 private charter with dedicated captain and flight steward',
      'Pre-cleared diplomatic passport handling and customs clearance on tarmac',
      'Florence private Renaissance palazzo villa staffed and fires lit before arrival',
      'Helicopter transfer ready at Florence tarmac for Chianti vineyard landings',
    ],
  },
  {
    id: 'monaco-port-hercule-berth',
    category: 'Aviation & Yachts',
    title: 'Port Hercule Trackside Superyacht & Nice Helipad Hop',
    kicker: 'French Riviera & Principality',
    tagline: 'Zone 1 Quay des États-Unis yacht mooring with 7-minute helicopter shuttles from Nice FBO.',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    location: 'Nice (LFMN) ➔ Port Hercule, Monaco',
    duration: '4 Days / 96 Hours',
    baseHours: 32,
    baseDisbursement: 68000,
    guidanceNote: 'Select DRC & Château Pétrus Library Vintages to ensure onboard sommelier cellar staging is verified prior to sailing.',
    deliverables: [
      '52m–60m Benetti or Lürssen trackside or outer harbor charter allocation',
      'Guaranteed Monacair tarmac helicopter pad slot direct from private jet stairs',
      'Private tender transfers and closed-door Monte Carlo beach club cabanas',
    ],
  },
  {
    id: 'farnborough-static-jet-dispatch',
    category: 'Aviation & Yachts',
    title: 'TAG Farnborough Long-Range Dispatch & In-Flight Concierge',
    kicker: 'Hampshire VIP Aviation Hangar',
    tagline: 'Private hangar boarding on Global 7500 with custom Mayfair hot kitchen flight catering.',
    image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
    location: 'Farnborough Airport (EGLF) Hangar',
    duration: '24-Hour Global Dispatch',
    baseHours: 12,
    baseDisbursement: 29000,
    guidanceNote: 'High-altitude catering is specially reduced for clean flavor at 43,000ft cabin altitude.',
    deliverables: [
      'Direct private car entry onto hangar apron directly beneath aircraft wing',
      'Private customs & DEFRA pet cabin clearance inside isolated hangar lounge',
      'Altitude-calibrated Mayfair private chef menu loaded 90 minutes pre-wheels-up',
    ],
  },

  // 5. Estates & Gastronomy
  {
    id: 'cotswolds-manor-estate',
    category: 'Estates & Gastronomy',
    title: 'Cotswolds Historic Manor Shoot & Michelin Hearth Feast',
    kicker: 'Oxfordshire & Cotswolds',
    tagline: '3,000-acre private estate with dedicated gamekeepers and in-residence woodfire tasting menu.',
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    location: 'Private Cotswolds Valley Estate',
    duration: 'Weekend / 48 Hours',
    baseHours: 16,
    baseDisbursement: 28500,
    guidanceNote: 'Pair with AgustaWestland AW109 helicopter transit to cut a 2.5-hour M40 drive down to 24 minutes from Battersea.',
    deliverables: [
      'Full manor house buyout with live-in butler, sommelier, and estate staff',
      'Clays and game field sports with certified master instructors and bespoke Purdey guns',
      'Twin-engine Agusta 109 helicopter transfer from Battersea Heliport in 24 minutes',
      'Evening hearth tasting menu prepared over applewood coals by Michelin guest chef',
    ],
  },
  {
    id: 'highland-stalking-lodge',
    category: 'Estates & Gastronomy',
    title: 'Perthshire Stone Estate, Salmon Beat & Single-Cask Tasting',
    kicker: 'Scottish Highlands Sanctuary',
    tagline: 'Private 14,000-acre stone lodge with ghillies, Speyside cask tastings, and helicopter pad.',
    image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    location: 'Perthshire & Tay Valley, Scotland',
    duration: '4 Days / 96 Hours',
    baseHours: 24,
    baseDisbursement: 38000,
    guidanceNote: 'Combine Challenger 350 charter to Dundee or Inverness with lawn helicopter staging straight to the lochside lodge.',
    deliverables: [
      'Private Tay or Dee fishing beat with veteran estate ghillies and heated lunch bothy',
      'Private Speyside distillery warehouse cask sampling of 40-year single malts',
      'Live-in Highland kitchen brigade preparing estate venison, langoustines, and grouse',
    ],
  },
  {
    id: 'clandestine-hinoki-omakase',
    category: 'Estates & Gastronomy',
    title: 'Six-Seat Hinoki Counter Omakase & Smithfield Cellar Supper',
    kicker: 'Private Counter Gastronomy',
    tagline: 'Zero signage timber door leading to Tokyo-grade Edomae omakase or wood-fired Mayfair hearths.',
    image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    location: 'Marylebone / Clerkenwell Private Cellars',
    duration: 'Evening (4 Hours)',
    baseHours: 6,
    baseDisbursement: 9800,
    guidanceNote: 'All 6–10 counter seats are bought out exclusively for your party so conversation remains uninterrupted.',
    deliverables: [
      'Complete exclusive counter buyout with air-freighted Toyosu tuna & Hokkaido sea urchin',
      'Rare vintage Champagne, aged Junmai Daiginjo sake, and grand cru Burgundy flight',
      'Private acoustic sweep prior to arrival for sensitive board or family conversation',
    ],
  },

  // 6. Arts, Couture & Longevity
  {
    id: 'mayfair-sartorial-horology',
    category: 'Arts, Couture & Longevity',
    title: 'Savile Row In-Suite Cut & Archival Horology Vault',
    kicker: 'Mayfair & St James’s',
    tagline: 'Senior head cutter attendance in your residence paired with closed-door Patek & Rolex viewings.',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    location: '45 Albemarle Street & Eaton Square',
    duration: '4–6 Hours',
    baseHours: 6,
    baseDisbursement: 9500,
    guidanceNote: 'Our horological scholar attends with UV loupes and extract archives so provenance is verified on the drawing-room table.',
    deliverables: [
      'In-residence basted fitting with Huntsman or Anderson & Sheppard head cutter',
      'Private viewings of provenance-verified vintage chronographs from private vault',
      'Discreet white-glove packaging and home delivery with vault insurance',
    ],
  },
  {
    id: 'royal-opera-frieze-patronage',
    category: 'Arts, Couture & Longevity',
    title: 'Royal Opera Grand Tier Box & Frieze Masters Night Unlock',
    kicker: 'Covent Garden & Regent’s Park',
    tagline: 'Box 12 private velvet drawing room at Covent Garden plus closed-curtain Old Bond Street salons.',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    location: 'Bow Street & Old Bond Street',
    duration: 'Full Cultural Day & Evening',
    baseHours: 8,
    baseDisbursement: 15000,
    guidanceNote: 'Rolls-Royce Phantom VIII Extended awaits at the private Bow Street portico rather than public Piazza queues.',
    deliverables: [
      'Grand Tier private box with dedicated interval salon, chilled Krug, and programme concierge',
      'Closed-door afternoon viewing at Frieze pavilion or Old Bond Street jewellery vault',
      'Post-curtain introduction to orchestra conductor or senior gallery director',
    ],
  },
  {
    id: 'harley-longevity-diagnostics',
    category: 'Arts, Couture & Longevity',
    title: 'Harley Street Executive Diagnostics & Private Wellness Suite',
    kicker: 'Marylebone Clinical Privacy',
    tagline: 'Same-day private imaging, cellular longevity briefing, and in-residence restorative osteopathy.',
    image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
    location: 'Harley Street Private Wing, W1G',
    duration: 'Half Day (4 Hours)',
    baseHours: 6,
    baseDisbursement: 7800,
    guidanceNote: 'Side-door clinician admission guarantees zero waiting-room crossover with any other patient.',
    deliverables: [
      'Direct private courtyard access to senior diagnostic radiology & consultant suite',
      'Pseudonym chart administration settled cleanly through TGLC billing firewall',
      'Follow-up recovery protocol delivered in-residence by physiotherapy specialists',
    ],
  },
];

const PREBUILT_BLUEPRINTS: PrebuiltBlueprint[] = [
  {
    id: 'bp-urban-dj',
    title: 'Mayfair-to-Vauxhall Urban Sound Buyout',
    badge: 'Edgy Nocturne · DJ & Hip-Hop',
    summary: 'Satin-Black Maybach back-alley arrival to a concrete bass vault booth with touring DJs & Tier 2 protection.',
    rationale: 'Built for principals wanting raw, authentic hip-hop and underground vinyl culture at 02:00 without paparazzi or door queues. Satin-black Maybach + Tier 2 close protection keeps street transition silent and effortless.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    scenarioId: 'urban-hiphop-concrete-vault',
    fleetId: 'maybach-s680',
    protocolId: 'close-protection',
    armourId: 'b6',
    apronId: 'battersea',
    cellarId: 'drc-petrus',
    staffingId: 'concierge-lead',
    hours: 8,
    codename: 'NOCTURNE-BASS-09',
    departurePoint: 'Connaught Mews Private Courtyard, Mayfair W1K',
    guestCount: '4 Principals + Recording Artist Guest',
    targetDate: 'Saturday, 28 November 2026',
    cellarDietary: 'Krug Grande Cuvée magnums, Aged Yamazaki, Faraday phone pouches at booth entry.',
  },
  {
    id: 'bp-subrosa-007',
    title: '007 Thames Stealth & Bank Bullion Vault',
    badge: 'Clandestine · River & Vaults',
    summary: '45ft matte-black interceptor under Tower Bridge into a 300-year bullion chamber under Faraday shield.',
    rationale: 'Connects high-speed river adrenalin with total acoustic privacy 35ft underground—avoiding West End gridlock and insuring confidential principals remain completely off-grid.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    scenarioId: 'sub-rosa-thames-vault',
    fleetId: 'stealth-boat',
    protocolId: 'faraday-rf-shield',
    armourId: 'standard',
    apronId: 'thames-pier',
    cellarId: 'pre-embargo',
    staffingId: 'michelin-brigade',
    hours: 8,
    codename: 'THAMES-CIPHER-07',
    departurePoint: 'Private Chelsea Pier Key Gate, SW3',
    guestCount: '6 Principals (Private Council)',
    targetDate: 'Thursday, 3 December 2026',
    cellarDietary: '6-course wild game & truffle cellar menu, pre-1900 Bas Armagnac, full RF sweep.',
  },
  {
    id: 'bp-combat-soho',
    title: 'Bermondsey Arch Fight Night & Jazz Snug',
    badge: 'Raw Boxing · Close Protection',
    summary: 'Armoured B6 Range Rover to Victorian railway arch boxing followed by late-night Soho whisky.',
    rationale: 'Raw unsanctioned exhibition boxing demands disciplined perimeter control. Julian Sterling’s Tier 2 protection detail handles advance sweeps around industrial Bermondsey arches and clean vehicle extraction.',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    scenarioId: 'underground-combat-bermondsey',
    fleetId: 'range-rover-armoured',
    protocolId: 'close-protection',
    armourId: 'b6',
    apronId: 'thames-pier',
    cellarId: 'pre-embargo',
    staffingId: 'concierge-lead',
    hours: 10,
    codename: 'IRON-ARCH-SE16',
    departurePoint: 'Eaton Square Residence, Belgravia SW1W',
    guestCount: '3 Principals',
    targetDate: 'Friday, 4 December 2026',
    cellarDietary: 'Beluga caviar bumps & Karuizawa Japanese whisky ringside; unbranded egress.',
  },
  {
    id: 'bp-monaco-jet',
    title: 'RAF Northolt Jet to Monaco Port Hercule',
    badge: 'Aviation · Superyacht',
    summary: 'Challenger 350 direct off Gate 4 diplomatic apron to Port Hercule trackside berth & helipad hop.',
    rationale: 'Pairing RAF Northolt Gate 4 with Challenger 350 and DRC cellar provisioning compresses Mayfair-to-Monaco yacht embarkation to under three hours door-to-aft-deck.',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    scenarioId: 'monaco-port-hercule-berth',
    fleetId: 'challenger-350',
    protocolId: 'shielded-billing',
    armourId: 'standard',
    apronId: 'raf-northolt',
    cellarId: 'drc-petrus',
    staffingId: 'royal-butler',
    hours: 32,
    codename: 'HERCULE-GOLD-01',
    departurePoint: 'RAF Northolt Gate 4 Diplomatic Apron',
    guestCount: '8 Family Principals & Household Staff',
    targetDate: 'Thursday, 20 May 2027',
    cellarDietary: 'La Tâche 2012 decanted onboard; altitude-calibrated seafood menu.',
  },
  {
    id: 'bp-highland-heli',
    title: 'Twin-Turbine Helicopter to Perthshire Estate',
    badge: 'Estates · Aviation',
    summary: 'AgustaWestland AW109 turbine departure direct to a 14,000-acre Scottish stone estate and salmon beat.',
    rationale: 'Direct lawn touchdown removes all regional road transfers; live-in butler and estate brigade light hearths and prepare single-cask warehouse tastings 48 hours ahead.',
    image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    scenarioId: 'highland-stalking-lodge',
    fleetId: 'aw109-helicopter',
    protocolId: 'covert-diplomatic',
    armourId: 'standard',
    apronId: 'battersea',
    cellarId: 'curated-cellar',
    staffingId: 'royal-butler',
    hours: 24,
    codename: 'TAY-SANCTUARY',
    departurePoint: 'London Heliport, Bridges Court Battersea SW11',
    guestCount: '4 Principals + Estate Ghillie Party',
    targetDate: 'Friday, 15 January 2027',
    cellarDietary: 'Speyside 40yr single cask tasting, estate grouse & Tay salmon.',
  },
  {
    id: 'bp-opera-frieze',
    title: 'Royal Opera Box 12 & Old Bond St Unlock',
    badge: 'High Culture · Mayfair',
    summary: 'Phantom VIII Extended arrival at Frieze VIP preview followed by Grand Tier Box 12 at Covent Garden.',
    rationale: 'Combines quiet Bond Street gemmology or Regent’s Park art acquisition with Covent Garden acoustic perfection—handled via Bow Street stage portico rather than Piazza crowds.',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    scenarioId: 'royal-opera-frieze-patronage',
    fleetId: 'rolls-phantom',
    protocolId: 'covert-diplomatic',
    armourId: 'standard',
    apronId: 'farnborough',
    cellarId: 'curated-cellar',
    staffingId: 'concierge-lead',
    hours: 8,
    codename: 'COVENT-GRANDTIER',
    departurePoint: '45 Albemarle Street, Mayfair W1S 4JL',
    guestCount: '4 Principals',
    targetDate: 'Thursday, 10 December 2026',
    cellarDietary: 'Comtes de Champagne interval pour in Box 12 private drawing room.',
  },
];

const FLEET_OPTIONS = [
  {
    id: 'maybach-s680',
    name: 'Mercedes-Maybach S680 Satin Stealth',
    type: 'Nocturne Alley & Club Extraction',
    category: 'Tactical / Urban',
    hourlyCost: 340,
    desc: 'Matte obsidian finish, electro-chromatic rear privacy glass, acoustic lounge seats for late-night club & Soho mews arrivals.',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
  },
  {
    id: 'rolls-cullinan',
    name: 'Rolls-Royce Cullinan Series II',
    type: 'High-Ground Luxury Sanctuary',
    category: 'Chauffeur',
    hourlyCost: 280,
    desc: 'Bespoke shooting kit, dual champagne cooler, deep lambswool carpets, discrete privacy glass.',
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  },
  {
    id: 'rolls-phantom',
    name: 'Rolls-Royce Phantom VIII Extended',
    type: 'The Sovereign Flagship',
    category: 'Chauffeur',
    hourlyCost: 320,
    desc: 'Acoustic privacy partition, starlight headliner, electro-tint rear glass, unhurried Mayfair transit.',
    image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
  },
  {
    id: 'range-rover-armoured',
    name: 'Range Rover SV Intrepid (Armoured B6)',
    type: 'Ballistic Tactical Discretion',
    category: 'Tactical',
    hourlyCost: 450,
    desc: 'Certified ballistic glass, run-flat tyres, floor blast protection, covert tactical communications.',
    image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
  },
  {
    id: 'luxury-sprinter-jetvan',
    name: 'Mercedes-Benz VIP Sprinter JetVan',
    type: 'Executive Mobile Command Suite',
    category: 'Tactical',
    hourlyCost: 380,
    desc: 'Four reclining first-class sleeper seats, encrypted satellite Wi-Fi, wardrobe, and onboard refreshment galley.',
    image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
  },
  {
    id: 'stealth-boat',
    name: '45ft Nocturne Matte-Black Thames Interceptor',
    type: 'River Stealth Interceptor',
    category: 'Maritime',
    hourlyCost: 850,
    desc: 'Twin Mercury Racing outboards, FLIR thermal night optics, PLA cleared 40kt transit, heated teak deck.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
  },
  {
    id: 'aw109-helicopter',
    name: 'AgustaWestland AW109 GrandNew',
    type: 'Twin-Turbine Rotorcraft',
    category: 'Aviation',
    hourlyCost: 2800,
    desc: '24-minute Mayfair/Battersea to Oxfordshire estates, VIP leather club cabin, instrument night-flight certified.',
    image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
  },
  {
    id: 'challenger-350',
    name: 'Bombardier Challenger 350',
    type: 'Super-Midsize Private Jet',
    category: 'Aviation',
    hourlyCost: 4200,
    desc: 'Ten-passenger stand-up cabin, flat-floor design, KA-band high-speed connectivity, London City cleared.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
  },
];

const SECURITY_PROTOCOLS = [
  {
    id: 'covert-diplomatic',
    name: 'Covert Diplomatic Discretion',
    desc: 'Need-to-know operational authority, unmarked vehicles, zero digital telemetry, plainclothes advance.',
    level: 'Tier 1 Standard',
    costPerHour: 95,
  },
  {
    id: 'close-protection',
    name: 'Dedicated Close Protection Detail (Julian Sterling Team)',
    desc: 'Two SIA-licensed protection officers with British Special Forces background, counter-surveillance.',
    level: 'Tier 2 Tactical',
    costPerHour: 220,
  },
  {
    id: 'faraday-rf-shield',
    name: 'RF Faraday Enclosure & Anti-Surveillance',
    desc: 'Full electronic sweep of private meeting enclaves, sealed device lockboxes, RF jamming in transit.',
    level: 'Tier 3 Classified',
    costPerHour: 340,
  },
  {
    id: 'shielded-billing',
    name: 'Shielded Family Office Billing & Escort',
    desc: 'Confidential ledger invoicing via anonymised trust accounts without merchant logs, armed lead scout.',
    level: 'Fiscal & Tactical',
    costPerHour: 480,
  },
];

const SPEC_OPTIONS = {
  armourLevels: [
    { id: 'standard', name: 'Standard Discreet Tint', adder: 0 },
    { id: 'b6', name: 'VPAM B6 Ballistic & Blast Floor', adder: 850 },
    { id: 'vr10', name: 'VR10 Heavy Military Ballistic & Run-Flat', adder: 1600 },
  ],
  apronHandling: [
    { id: 'raf-northolt', name: 'RAF Northolt Gate 4 Diplomatic Apron', adder: 1200 },
    { id: 'farnborough', name: 'TAG Farnborough VIP Lounge & Apron Transfer', adder: 950 },
    { id: 'battersea', name: 'Battersea London Heliport VIP Gate', adder: 650 },
    { id: 'thames-pier', name: 'Private Pier Key (Chelsea / Tower Pier)', adder: 500 },
  ],
  sommelierAllocations: [
    { id: 'curated-cellar', name: 'Curated Grand Cru Burgundy & Champagne', adder: 1500 },
    { id: 'drc-petrus', name: 'DRC & Château Pétrus Library Vintages', adder: 6500 },
    { id: 'pre-embargo', name: 'Pre-1900 Cognac & Pre-Embargo Havanas', adder: 4200 },
    { id: 'none', name: 'Principal’s Own Cellar Transported', adder: 250 },
  ],
  householdStaffing: [
    { id: 'concierge-lead', name: 'Dedicated Senior Lifestyle Manager (Camilla Vance-Moreau)', adder: 0 },
    { id: 'michelin-brigade', name: 'Michelin-Trained Private Chef & Sommelier Brigade', adder: 2400 },
    { id: 'royal-butler', name: 'English Live-in Butler & Valet Service', adder: 1200 },
  ],
};

const TACTICAL_ADDONS = [
  {
    id: 'faraday-kit',
    title: 'Faraday RF Device Isolation Pouches & Sweep',
    detail: 'Signal-shielded leather pouches for all party phones plus sweeps across dining salons and sound booths.',
    cost: 650,
  },
  {
    id: 'scout-convoy',
    title: 'Dual-Lane Advance Route Scout Car',
    detail: 'Plainclothes reconnaissance vehicle clears alleyway access and alternate exfiltration routes 10 minutes ahead.',
    cost: 1200,
  },
  {
    id: 'alias-settlement',
    title: 'Diplomatic Alias & Escrow Settlement Shield',
    detail: 'All third-party venue holds and FBO passenger manifests issued strictly under institutional corporate trust.',
    cost: 850,
  },
  {
    id: 'pre-decant-cellar',
    title: '48-Hour Vintage Decanting & Glassware Staging',
    detail: 'Master Sommelier stands library bottles upright 48 hours ahead and supplies hand-blown Zalto stemware.',
    cost: 450,
  },
];

const OPERATIONAL_ROADMAP = [
  { phase: 'T-72h', title: 'Advance Reconnaissance', desc: 'Julian Sterling team conducts route drive, venue keyholder check, and acoustic sweep.' },
  { phase: 'T-24h', title: 'Logistics & Apron Lock', desc: 'Flight plans filed, apron security passes pre-cleared, rare vintages decanted to cellar vault.' },
  { phase: 'T-2h', title: 'Lead Scout Staging', desc: 'Chase car checks route traffic; vehicle air filters engaged; primary vehicle staged at residence.' },
  { phase: 'T-0h', title: 'Flawless Execution', desc: 'Direct encrypted radio link between lead driver, principal security escort, and Mayfair duty desk.' },
  { phase: 'T+2h', title: 'Post-Mission Protocol', desc: 'Confidential ledger reconciliation, vault storage of acquisitions, and encrypted mission report.' },
];

export const CommissionStudio: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();

  const [currentStep, setCurrentStep] = useState(0);
  const [scenarioFilter, setScenarioFilter] = useState<ScenarioCategory>('All');
  const [activeBlueprintId, setActiveBlueprintId] = useState<string | null>(null);

  const [selectedScenario, setSelectedScenario] = useState<CommissionScenario>(SCENARIOS[0]);
  const [selectedFleet, setSelectedFleet] = useState(FLEET_OPTIONS[0]);
  const [selectedProtocol, setSelectedProtocol] = useState(SECURITY_PROTOCOLS[1]);

  // Tactical specifications
  const [armourLevel, setArmourLevel] = useState(SPEC_OPTIONS.armourLevels[1]);
  const [apronHandling, setApronHandling] = useState(SPEC_OPTIONS.apronHandling[0]);
  const [cellarAlloc, setCellarAlloc] = useState(SPEC_OPTIONS.sommelierAllocations[0]);
  const [staffing, setStaffing] = useState(SPEC_OPTIONS.householdStaffing[0]);

  // Interactive Tactical Add-Ons & Bottom Execution Checklist
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['faraday-kit', 'alias-settlement']);
  const [checkedPhases, setCheckedPhases] = useState<string[]>(['T-72h', 'T-24h']);

  // Schedule & details
  const [departurePoint, setDeparturePoint] = useState('Eaton Square Residence, Belgravia, London SW1W');
  const [guestCount, setGuestCount] = useState('2 Principals + 2 Guests');
  const [targetDate, setTargetDate] = useState('Saturday, 28 November 2026');
  const [cellarDietary, setCellarDietary] = useState('Krug Grande Cuvée magnums, Faraday phone pouches at booth entry, clean loading court egress.');
  const [codename, setCodename] = useState('NOCTURNE-RESOLUTE');

  const [retainedHours, setRetainedHours] = useState(selectedScenario.baseHours);
  const [dossierSerial] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [generatedMandateId, setGeneratedMandateId] = useState('');

  const activeBlueprint = PREBUILT_BLUEPRINTS.find((b) => b.id === activeBlueprintId) || null;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePhaseCheck = (phase: string) => {
    setCheckedPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const filteredScenarios =
    scenarioFilter === 'All'
      ? SCENARIOS
      : SCENARIOS.filter((s) => s.category === scenarioFilter);

  const applyBlueprint = (bp: PrebuiltBlueprint) => {
    const sc = SCENARIOS.find((s) => s.id === bp.scenarioId) || SCENARIOS[0];
    const fl = FLEET_OPTIONS.find((f) => f.id === bp.fleetId) || FLEET_OPTIONS[0];
    const pr = SECURITY_PROTOCOLS.find((p) => p.id === bp.protocolId) || SECURITY_PROTOCOLS[1];
    const ar = SPEC_OPTIONS.armourLevels.find((a) => a.id === bp.armourId) || SPEC_OPTIONS.armourLevels[0];
    const ap = SPEC_OPTIONS.apronHandling.find((g) => g.id === bp.apronId) || SPEC_OPTIONS.apronHandling[0];
    const ce = SPEC_OPTIONS.sommelierAllocations.find((c) => c.id === bp.cellarId) || SPEC_OPTIONS.sommelierAllocations[0];
    const st = SPEC_OPTIONS.householdStaffing.find((h) => h.id === bp.staffingId) || SPEC_OPTIONS.householdStaffing[0];

    setSelectedScenario(sc);
    setSelectedFleet(fl);
    setSelectedProtocol(pr);
    setArmourLevel(ar);
    setApronHandling(ap);
    setCellarAlloc(ce);
    setStaffing(st);
    setRetainedHours(bp.hours);
    setCodename(bp.codename);
    setDeparturePoint(bp.departurePoint);
    setGuestCount(bp.guestCount);
    setTargetDate(bp.targetDate);
    setCellarDietary(bp.cellarDietary);
    setActiveBlueprintId(bp.id);
    setScenarioFilter('All');
  };

  const activeAddonItems = TACTICAL_ADDONS.filter((a) => selectedAddons.includes(a.id));
  const addonsCost = activeAddonItems.reduce((sum, a) => sum + a.cost, 0);

  // Cost calculation
  const totalEstimatedCost =
    selectedScenario.baseDisbursement +
    selectedFleet.hourlyCost * (retainedHours || 8) +
    selectedProtocol.costPerHour * (retainedHours || 8) +
    armourLevel.adder +
    apronHandling.adder +
    cellarAlloc.adder +
    staffing.adder +
    addonsCost;

  const dossierRef = `CMD-TGLC-${selectedScenario.id.substring(0, 3).toUpperCase()}-${dossierSerial}`;

  const buildManifestText = () => {
    const addonLines =
      activeAddonItems.length > 0
        ? activeAddonItems.map((a) => `  - ${a.title} (+£${a.cost.toLocaleString('en-GB')})`).join('\n')
        : '  - Standard Protocol Only';
    return `=== THE GLOBAL LUXURY CONSORTIUM · CONFIDENTIAL COMMISSION DOSSIER ===
Mandate Reference: ${dossierRef}
Codename: ${codename}
Objective: ${selectedScenario.title}
Enclave: ${selectedScenario.location}
Duration: ${selectedScenario.duration}
Retained Director Hours: ${retainedHours}h
Assigned Fleet: ${selectedFleet.name} (${selectedFleet.type})
Security Protocol: ${selectedProtocol.name} (${selectedProtocol.level})
Ballistic Spec: ${armourLevel.name}
Air/Maritime Gate: ${apronHandling.name}
Cellar Allocation: ${cellarAlloc.name}
Staffing Detail: ${staffing.name}
Tactical Add-Ons:
${addonLines}
Advance Readiness Verified: ${checkedPhases.length}/${OPERATIONAL_ROADMAP.length} Phases (${checkedPhases.join(', ') || 'Pending'})
Departure Staging: ${departurePoint}
Party: ${guestCount}
Target Window: ${targetDate}
Standing Briefing: ${cellarDietary}
Estimated Pass-Through Disbursement: £${totalEstimatedCost.toLocaleString('en-GB')} (0% markup)
Duty Desk: TGLC House, 3rd Floor, 45 Albemarle Street, Mayfair London W1S 4JL
Direct Phone: ${TGLC_CONTACT.telephone}
======================================================================`;
  };

  const handleCopyManifest = () => {
    navigator.clipboard?.writeText(buildManifestText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadBrief = () => {
    try {
      const blob = new Blob([buildManifestText()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TGLC-Mission-Brief-${codename || dossierRef}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2500);
    } catch {
      handleCopyManifest();
    }
  };

  const handleTransmit = async () => {
    setIsTransmitting(true);
    try {
      const mandateId = `CMD-${Date.now().toString().slice(-4)}`;
      setGeneratedMandateId(mandateId);

      await simulatedSupabase.from('concierge_requests').insert({
        id: mandateId,
        userId: 'usr-client-01',
        title: `[Mandate] ${selectedScenario.title}`,
        category: selectedScenario.category,
        priority: 'Urgent',
        status: 'Received',
        submittedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        assignedTo: 'Camilla Vance-Moreau & Julian Sterling',
        notes: `Codename: ${codename}. Fleet: ${selectedFleet.name}. Protocol: ${selectedProtocol.name}. Staging: ${departurePoint}. Specs: ${armourLevel.name}, ${apronHandling.name}. Add-ons: ${activeAddonItems.map((a) => a.title).join(', ') || 'None'}. Cellar: ${cellarAlloc.name}.`,
        estimatedCost: `£${totalEstimatedCost.toLocaleString('en-GB')}`,
      });

      await simulatedSupabase.from('direct_messages').insert({
        id: `msg-${Date.now()}`,
        userId: 'usr-client-01',
        senderName: 'Mayfair Triage Desk',
        senderRole: 'Automated Ingestion',
        timestamp: 'Just now',
        text: `Encrypted mandate [${mandateId}] "${selectedScenario.title}" received via Commission Studio. Assigned to Camilla Vance-Moreau and Julian Sterling for immediate reconnaissance.`,
        isStaff: true,
      });

      setIsTransmitting(false);
      setIsTransmitted(true);
    } catch {
      setIsTransmitting(false);
      setIsTransmitted(true);
    }
  };

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3 border-b border-[#232736] pb-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span className="text-[#E2BA6B]">The Private Commission Studio</span>
            <span className="text-[#8B672B]">/</span>
            <span className="text-[#8F98AA]">18 London & Global Scenarios · 6 Worked Blueprints</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] text-balance">
                Orchestrate a Bespoke Commission
              </h1>
              <p className="text-xs sm:text-sm text-[#D4D8E2] max-w-2xl mt-2 leading-[1.7]">
                Configure an itinerary from scratch across eighteen sovereign scenarios—from Vauxhall late-night DJ sound vaults and Bermondsey fight cards to Port Hercule superyachts—or apply a one-click Director’s Blueprint below for immediate operational guidance.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3.5 bg-[#0D1017] border border-[#232736] text-right">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">
                  Pass-Through Estimate (0% Markup)
                </span>
                <span className="font-serif text-2xl text-[#E2BA6B] font-semibold tabular-nums">
                  £{totalEstimatedCost.toLocaleString('en-GB')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 1-Click Prebuilt Worked Blueprints Inspiration Strip */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E2BA6B] block mb-1">
                Prebuilt Worked Examples & Inspiration
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                One-Click Director Blueprints
              </h2>
            </div>
            <p className="text-xs text-[#8F98AA] max-w-md font-mono">
              Select any worked blueprint to pre-load vehicle, discretion protocol, cellar & staging notes, then customize any step below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREBUILT_BLUEPRINTS.map((bp) => {
              const isApplied = activeBlueprintId === bp.id;
              return (
                <motion.button
                  key={bp.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => applyBlueprint(bp)}
                  className={`text-left border transition-colors overflow-hidden flex flex-col justify-between cursor-pointer group ${
                    isApplied
                      ? 'bg-[#131722] border-[#E2BA6B]'
                      : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                  }`}
                >
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-black relative">
                      <img
                        src={bp.image}
                        alt={bp.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                      {isApplied && (
                        <div className="absolute top-2.5 right-2.5 bg-[#E2BA6B] text-[#07080B] px-2.5 py-0.5 font-mono text-[10px] font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Loaded</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                        {bp.badge} · {bp.hours}h
                      </span>
                      <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#F0CC83] transition-colors leading-snug">
                        {bp.title}
                      </h3>
                      <p className="text-xs text-[#D4D8E2] line-clamp-2 leading-relaxed">
                        {bp.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-[#1D212F] flex items-center justify-between font-mono text-[11px] text-[#E2BA6B]">
                    <span>{isApplied ? 'Active in Studio Editor' : 'Load Worked Blueprint'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Active Director Rationale Callout */}
        <div className="p-4 sm:p-5 bg-[#0D1017] border border-[#232736] flex items-start gap-3.5">
          <Info className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
              {activeBlueprint ? `Director’s Rationale · ${activeBlueprint.title}` : `Director’s Field Guidance · ${selectedScenario.title}`}
            </span>
            <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
              {activeBlueprint ? activeBlueprint.rationale : selectedScenario.guidanceNote}
            </p>
          </div>
        </div>

        {/* 5-Step Progress Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { num: '01', label: '1. Objective & Scenario' },
            { num: '02', label: '2. Fleet & Mobility' },
            { num: '03', label: '3. Security Protocol' },
            { num: '04', label: '4. Tactical Specifications' },
            { num: '05', label: '5. Logistics & Dispatch' },
          ].map((step, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = currentStep > idx;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(idx)}
                className={`p-3 text-left border transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] border-[#E2BA6B] text-[#E2BA6B]'
                    : isCompleted
                    ? 'bg-[#0D1017] border-[#2C3144] text-[#FAF7F0]'
                    : 'bg-[#090B10] border-[#1B1E2A] text-[#8F98AA] hover:text-[#FAF7F0]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono tabular-nums">
                  <span>{step.num}</span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-[#E2BA6B]" />}
                </div>
                <span className="text-xs font-serif block truncate">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Split Layout: Left Visual Editor / Right Live Dossier Manifest */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Visual Scenario Selection with Category Filter */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 1 · Select Sovereign Scenario ({filteredScenarios.length})
                  </span>
                  <span className="font-mono text-[11px] text-[#8F98AA] tabular-nums">
                    {SCENARIOS.length} curated domains
                  </span>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {SCENARIO_CATEGORIES.map((cat) => {
                    const isActive = scenarioFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setScenarioFilter(cat)}
                        className={`h-8 px-3 text-[11px] font-mono whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                            : 'bg-[#0D1017] text-[#D4D8E2] border-[#232736] hover:border-[#8B672B] hover:text-[#FAF7F0]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredScenarios.map((scenario) => {
                    const isSelected = selectedScenario.id === scenario.id;
                    return (
                      <div
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenario(scenario);
                          setRetainedHours(scenario.baseHours);
                          setActiveBlueprintId(null);
                        }}
                        className={`p-4 border transition-colors cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-black relative">
                            <img
                              src={scenario.image}
                              alt={scenario.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#E2BA6B] text-[#07080B] p-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E2BA6B] block">
                            {scenario.category}
                          </span>
                          <h3 className="font-serif text-lg text-[#FAF7F0] mt-1 mb-1 leading-snug">
                            {scenario.title}
                          </h3>
                          <p className="text-xs text-[#D4D8E2] line-clamp-2 leading-relaxed">
                            {scenario.tagline}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-[#1D212F] flex items-center justify-between text-[11px]">
                          <span className="text-[#8F98AA] truncate mr-2">{scenario.location}</span>
                          <span className="tabular-nums font-mono text-[#E2BA6B] shrink-0">
                            From £{scenario.baseDisbursement.toLocaleString('en-GB')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Fleet & Mobility</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Fleet & Mobility */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 2 · Select Fleet & Mobility Sanctuary ({FLEET_OPTIONS.length} Assets)
                  </span>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Scenario
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FLEET_OPTIONS.map((fleet) => {
                    const isSelected = selectedFleet.id === fleet.id;
                    return (
                      <div
                        key={fleet.id}
                        onClick={() => {
                          setSelectedFleet(fleet);
                          setActiveBlueprintId(null);
                        }}
                        className={`p-4 border transition-colors cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-black relative">
                            <img
                              src={fleet.image}
                              alt={fleet.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#E2BA6B] text-[#07080B] p-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] tracking-wider uppercase text-[#E2BA6B] truncate">
                              {fleet.category} · {fleet.type}
                            </span>
                            <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums shrink-0">
                              £{fleet.hourlyCost}/hr
                            </span>
                          </div>
                          <h3 className="font-serif text-lg text-[#FAF7F0] mt-1 mb-1">
                            {fleet.name}
                          </h3>
                          <p className="text-xs text-[#D4D8E2] leading-relaxed">
                            {fleet.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Security Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Security Protocol */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 3 · Discretion & Tactical Protection Protocol
                  </span>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Fleet
                  </button>
                </div>

                <div className="space-y-3">
                  {SECURITY_PROTOCOLS.map((protocol) => {
                    const isSelected = selectedProtocol.id === protocol.id;
                    return (
                      <div
                        key={protocol.id}
                        onClick={() => setSelectedProtocol(protocol)}
                        className={`p-4 border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Shield className={`w-4 h-4 ${isSelected ? 'text-[#E2BA6B]' : 'text-[#8F98AA]'}`} />
                            <h3 className="font-serif text-lg text-[#FAF7F0]">{protocol.name}</h3>
                            <span className="text-[#8B672B]">·</span>
                            <span className="text-[11px] uppercase font-mono text-[#E2BA6B]">
                              {protocol.level}
                            </span>
                          </div>
                          <p className="text-xs text-[#D4D8E2] pl-6 leading-relaxed">{protocol.desc}</p>
                          <span className="text-[11px] text-[#E2BA6B] font-mono pl-6 block tabular-nums">
                            +£{protocol.costPerHour}/hour security officer allocation
                          </span>
                        </div>

                        {isSelected && (
                          <div className="bg-[#E2BA6B] text-[#07080B] p-1 shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Tactical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Tactical Specifications Picker */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 4 · Tactical Specifications & Curated Allocations
                  </span>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Protocol
                  </button>
                </div>

                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-5 text-xs">
                  {/* Armour Level */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 flex items-center justify-between font-mono">
                      <span>Ballistic Armour Spec</span>
                      <span className="text-[#E2BA6B] tabular-nums">+£{armourLevel.adder}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SPEC_OPTIONS.armourLevels.map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setArmourLevel(lvl)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            armourLevel.id === lvl.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium truncate">{lvl.name}</span>
                          <span className="text-[10px] text-[#E2BA6B] font-mono tabular-nums">
                            {lvl.adder === 0 ? 'Included' : `+£${lvl.adder}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apron Handling Gate */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 flex items-center justify-between font-mono">
                      <span>Apron / Maritime VIP Gate Handling</span>
                      <span className="text-[#E2BA6B] tabular-nums">+£{apronHandling.adder}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SPEC_OPTIONS.apronHandling.map((gate) => (
                        <button
                          key={gate.id}
                          type="button"
                          onClick={() => setApronHandling(gate)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            apronHandling.id === gate.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium truncate">{gate.name}</span>
                          <span className="text-[10px] text-[#E2BA6B] font-mono tabular-nums">+£{gate.adder}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sommelier Allocation */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 flex items-center justify-between font-mono">
                      <span>Sommelier & Cellar Allocation</span>
                      <span className="text-[#E2BA6B] tabular-nums">+£{cellarAlloc.adder}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SPEC_OPTIONS.sommelierAllocations.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCellarAlloc(c)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            cellarAlloc.id === c.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium truncate">{c.name}</span>
                          <span className="text-[10px] text-[#E2BA6B] font-mono tabular-nums">+£{c.adder}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Household & Concierge Staffing */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 flex items-center justify-between font-mono">
                      <span>Household & Dedicated Staffing Brigade</span>
                      <span className="text-[#E2BA6B] tabular-nums">+£{staffing.adder}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SPEC_OPTIONS.householdStaffing.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStaffing(s)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            staffing.id === s.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium truncate">{s.name}</span>
                          <span className="text-[10px] text-[#E2BA6B] font-mono tabular-nums">
                            {s.adder === 0 ? 'Included' : `+£${s.adder}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Logistics & Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Schedule, Criteria & Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 5 · Schedule, Logistics & Direct Dispatch
                  </span>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Specifications
                  </button>
                </div>

                {/* Retained Hours Slider */}
                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-[#FAF7F0] flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                      <span>Retained Director Hours</span>
                    </span>
                    <span className="font-mono text-sm text-[#E2BA6B] font-bold tabular-nums">{retainedHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={48}
                    step={2}
                    value={retainedHours}
                    onChange={(e) => setRetainedHours(Number(e.target.value))}
                    className="w-full accent-[#E2BA6B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8F98AA] font-mono tabular-nums">
                    <span>4 Hours (Briefing)</span>
                    <span>16 Hours (Full Day)</span>
                    <span>48 Hours (Multi-Day Operation)</span>
                  </div>
                </div>

                <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Departure Point & Staging Mews
                    </label>
                    <input
                      type="text"
                      value={departurePoint}
                      onChange={(e) => setDeparturePoint(e.target.value)}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                        Principal & Guest Count
                      </label>
                      <input
                        type="text"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                        Target Date / Operation Window
                      </label>
                      <input
                        type="text"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Cellar, Culinary & Acoustic Criteria
                    </label>
                    <textarea
                      rows={3}
                      value={cellarDietary}
                      onChange={(e) => setCellarDietary(e.target.value)}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Mission Codename (Discretion Alias)
                    </label>
                    <input
                      type="text"
                      value={codename}
                      onChange={(e) => setCodename(e.target.value.toUpperCase())}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 font-mono text-[#E2BA6B] tracking-wider focus:outline-none focus:border-[#E2BA6B]"
                    />
                  </div>
                </div>

                {/* Operational Roadmap Preview */}
                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] font-medium block">
                    Operational Execution Roadmap
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    {OPERATIONAL_ROADMAP.map((step) => (
                      <div key={step.phase} className="p-2.5 bg-[#131722] border border-[#232736] space-y-1">
                        <span className="text-[10px] font-mono text-[#E2BA6B] block">{step.phase}</span>
                        <strong className="text-[11px] text-[#FAF7F0] block">{step.title}</strong>
                        <p className="text-[10px] text-[#D4D8E2] leading-snug">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back to Specs
                  </button>

                  <button
                    onClick={handleTransmit}
                    disabled={isTransmitting}
                    className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#07080B]" />
                    <span>{isTransmitting ? 'Transmitting Mandate...' : 'Transmit Instruction to Mayfair Desk'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Visual Mission Preview & Confidential Live Dossier Manifest */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0D1017] border border-[#232736] p-6 shadow-2xl relative overflow-hidden">
              {/* Gold watermark crest */}
              <div className="absolute top-0 right-0 w-36 h-36 opacity-5 pointer-events-none">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="Crest watermark"
                  className="w-full h-full object-contain filter invert"
                />
              </div>

              {/* Dossier Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#232736]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span className="text-[11px] font-mono tracking-wider text-[#E2BA6B] tabular-nums">
                    {dossierRef}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8F98AA]">
                  CONFIDENTIAL MANDATE
                </span>
              </div>

              {/* Visual Dyad Strip (Selected Scenario + Selected Fleet) */}
              <div className="grid grid-cols-2 gap-2.5 pt-4">
                <div className="space-y-1">
                  <div className="aspect-[16/10] overflow-hidden border border-[#232736] bg-black">
                    <img
                      src={selectedScenario.image}
                      alt={selectedScenario.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase text-[#8F98AA] block truncate">
                    Domain · {selectedScenario.category}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="aspect-[16/10] overflow-hidden border border-[#232736] bg-black">
                    <img
                      src={selectedFleet.image}
                      alt={selectedFleet.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase text-[#8F98AA] block truncate">
                    Asset · {selectedFleet.category}
                  </span>
                </div>
              </div>

              {/* Summary Body */}
              <div className="py-4 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">
                    Commission Codename
                  </span>
                  <span className="font-mono text-sm text-[#FAF7F0] font-semibold tracking-wider">
                    {codename || 'NOCTURNE-RESOLUTE'}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">
                    Sovereign Objective
                  </span>
                  <h4 className="font-serif text-lg text-[#FAF7F0] mt-0.5 leading-snug">
                    {selectedScenario.title}
                  </h4>
                  <p className="text-[11px] text-[#E2BA6B] mt-0.5">
                    {selectedScenario.location} · {selectedScenario.duration}
                  </p>
                </div>

                {/* Live Sequence Timeline */}
                <div className="p-3 bg-[#090B10] border border-[#1D212F] space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                    Live Mission Sequence
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">01 · Staging</span>
                      <span className="text-[#FAF7F0] truncate text-right">{departurePoint.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">02 · Mobility</span>
                      <span className="text-[#FAF7F0] truncate text-right">{selectedFleet.name}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">03 · Escort</span>
                      <span className="text-[#FAF7F0] truncate text-right">{selectedProtocol.level}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">04 · Sanctum</span>
                      <span className="text-[#E2BA6B] truncate text-right">{selectedScenario.location}</span>
                    </div>
                  </div>
                </div>

                {/* Tactical Specs Summary */}
                <div className="p-3 bg-[#131722] border border-[#232736] space-y-1.5 text-[11px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                    Configured Specifications
                  </span>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Ballistic Protection:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{armourLevel.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Apron / Marine Gate:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{apronHandling.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Cellar Allocation:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{cellarAlloc.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Staffing Brigade:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{staffing.name}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232736] space-y-2 text-[11px]">
                  <div className="flex items-start gap-2 text-[#D4D8E2]">
                    <MapPin className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                    <span>
                      Staging: <strong className="text-[#FAF7F0] font-normal">{departurePoint}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4D8E2]">
                    <Calendar className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
                    <span>
                      Target: <strong className="text-[#FAF7F0] font-normal">{targetDate}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4D8E2]">
                    <Users className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
                    <span>
                      Party: <strong className="text-[#FAF7F0] font-normal">{guestCount}</strong>
                    </span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-4 bg-[#131722] border border-[#8B672B] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#D4D8E2]">
                    <span>Base Scenario Disbursement</span>
                    <span className="font-mono text-[#FAF7F0] tabular-nums">
                      £{selectedScenario.baseDisbursement.toLocaleString('en-GB')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#D4D8E2]">
                    <span>Fleet & Security ({retainedHours}h)</span>
                    <span className="font-mono text-[#FAF7F0] tabular-nums">
                      £{((selectedFleet.hourlyCost + selectedProtocol.costPerHour) * retainedHours).toLocaleString('en-GB')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#D4D8E2]">
                    <span>Tactical Specifications & Cellar</span>
                    <span className="font-mono text-[#FAF7F0] tabular-nums">
                      £{(armourLevel.adder + apronHandling.adder + cellarAlloc.adder + staffing.adder).toLocaleString('en-GB')}
                    </span>
                  </div>
                  {addonsCost > 0 && (
                    <div className="flex items-center justify-between text-[11px] text-[#D4D8E2]">
                      <span>Operational Protocols ({activeAddonItems.length})</span>
                      <span className="font-mono text-[#FAF7F0] tabular-nums">
                        £{addonsCost.toLocaleString('en-GB')}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#232736] flex items-center justify-between font-serif text-sm">
                    <span className="text-[#FAF7F0]">Estimated Pass-Through Total</span>
                    <span className="text-[#E2BA6B] font-bold text-base font-mono tabular-nums">
                      £{totalEstimatedCost.toLocaleString('en-GB')}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8F98AA] block italic">
                    0% Consortium Markup · Pass-through direct ledger debit
                  </span>
                </div>
              </div>

              {/* Dossier Actions */}
              <div className="pt-3 border-t border-[#232736] flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={handleCopyManifest}
                  className="flex-1 py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Copy className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>{isCopied ? 'Copied' : 'Copy Brief'}</span>
                </button>

                <button
                  onClick={handleDownloadBrief}
                  className="py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Download Mission Brief (.txt)"
                >
                  <Download className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>{isDownloaded ? 'Saved' : 'Download .TXT'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Print Manifest"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1D212F] font-mono text-[10px] text-[#8F98AA] flex items-center justify-between tabular-nums">
                <span>Direct Telephone: {TGLC_CONTACT.telephone}</span>
                <span>London W1S 4JL</span>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-5 bg-[#0D1017] border border-[#232736] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-serif text-[#FAF7F0] block">Need direct human consultation?</span>
                <span className="text-[11px] text-[#8F98AA]">Our Mayfair salon receives principals by confidential appointment.</span>
              </div>
              <button
                onClick={() => openIntroductionModal('Bespoke Commission Inquiry')}
                className="btn-outline-gold px-4 py-2 text-xs shrink-0 whitespace-nowrap cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>

        <GoldDivider />

        {/* Interactive Bottom Execution Desk — Tactical Protocols, T-72h Checklist & Direct Ledger Dispatch */}
        <section className="space-y-6 pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232736] pb-5">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2BA6B] block">
                Mission Execution & Advance Readiness Console
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0]">
                Tactical Protocol Add-Ons, Timeline Sign-Off & Direct Dispatch
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#E2BA6B] tabular-nums shrink-0">
              <span>Readiness Cleared: {checkedPhases.length} / {OPERATIONAL_ROADMAP.length} Phases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Toggleable Tactical Protocols + Interactive T-72h Checklist */}
            <div className="lg:col-span-7 space-y-6">
              {/* Toggleable Tactical Protocols */}
              <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#FAF7F0] font-medium">
                    Optional Tactical & Cellar Enhancements
                  </span>
                  <span className="font-mono text-[11px] text-[#E2BA6B] tabular-nums">
                    {activeAddonItems.length} Active (+£{addonsCost.toLocaleString('en-GB')})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TACTICAL_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 text-left border transition-colors cursor-pointer space-y-1.5 ${
                          isChecked
                            ? 'bg-[#131722] border-[#E2BA6B]'
                            : 'bg-[#090B10] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#E2BA6B] shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-[#8F98AA] shrink-0" />
                            )}
                            <span className="text-xs font-serif text-[#FAF7F0] font-medium leading-snug">
                              {addon.title}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-[#E2BA6B] tabular-nums shrink-0">
                            +£{addon.cost}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#D4D8E2] leading-relaxed pl-6">
                          {addon.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive T-72h to T+2h Readiness Checklist */}
              <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#FAF7F0] font-medium block">
                      Interactive Pre-Mission Readiness Sequence
                    </span>
                    <span className="text-[11px] text-[#8F98AA]">
                      Mark stages as confirmed with your Lifestyle Manager ahead of wheels-up or departure.
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#E2BA6B] tabular-nums">
                    {Math.round((checkedPhases.length / OPERATIONAL_ROADMAP.length) * 100)}% Verified
                  </span>
                </div>

                <div className="space-y-2.5">
                  {OPERATIONAL_ROADMAP.map((step) => {
                    const isDone = checkedPhases.includes(step.phase);
                    return (
                      <button
                        key={step.phase}
                        type="button"
                        onClick={() => togglePhaseCheck(step.phase)}
                        className={`w-full p-3.5 text-left border transition-colors flex items-start gap-3 cursor-pointer ${
                          isDone
                            ? 'bg-[#131722] border-[#8B672B]/80'
                            : 'bg-[#090B10] border-[#232736] hover:border-[#2C3144]'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#E2BA6B]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#8F98AA]" />
                          )}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-sm text-[#FAF7F0]">{step.title}</span>
                            <span className="font-mono text-[11px] text-[#E2BA6B] tabular-nums shrink-0">{step.phase}</span>
                          </div>
                          <p className="text-xs text-[#D4D8E2] leading-relaxed">{step.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Full Itemized Disbursement Ledger & Direct Execution Controls */}
            <div className="lg:col-span-5 bg-[#0D1017] border border-[#232736] p-6 space-y-5">
              <div className="pb-3 border-b border-[#232736] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                  Pass-Through Disbursement Schedule
                </span>
                <span className="font-mono text-[11px] text-[#8F98AA] tabular-nums">{dossierRef}</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">Base Domain & Buyout Access</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{selectedScenario.baseDisbursement.toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">{selectedFleet.name} ({retainedHours}h)</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{(selectedFleet.hourlyCost * retainedHours).toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">{selectedProtocol.level} Escort ({retainedHours}h)</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{(selectedProtocol.costPerHour * retainedHours).toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">Specs ({armourLevel.name} · {apronHandling.name.split(' ')[0]})</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{(armourLevel.adder + apronHandling.adder).toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">Cellar & Household Brigade</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{(cellarAlloc.adder + staffing.adder).toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#D4D8E2]">Tactical Add-Ons ({activeAddonItems.length} Selected)</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">£{addonsCost.toLocaleString('en-GB')}</span>
                </div>
                <div className="pt-3 flex items-baseline justify-between">
                  <span className="font-serif text-base text-[#FAF7F0]">Estimated Ledger Total (0% Markup)</span>
                  <span className="font-mono text-xl text-[#E2BA6B] font-bold tabular-nums">
                    £{totalEstimatedCost.toLocaleString('en-GB')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#090B10] border border-[#232736] space-y-1 text-[11px] text-[#D4D8E2] leading-relaxed">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                  Key Staging Deliverables Included
                </strong>
                {selectedScenario.deliverables.slice(0, 3).map((d, idx) => (
                  <p key={idx}>· {d}</p>
                ))}
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleTransmit}
                  disabled={isTransmitting}
                  className="btn-gold w-full py-3.5 px-6 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#07080B]" />
                  <span>{isTransmitting ? 'Transmitting Mandate...' : 'Transmit Mandate to Live Member Portal'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadBrief}
                    className="btn-outline-gold py-2.5 px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloaded ? 'Brief Saved' : 'Download Brief'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyManifest}
                    className="py-2.5 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#E2BA6B]" />
                    <span>{isCopied ? 'Copied' : 'Copy Cipher'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal when transmitted */}
      <AnimatePresence>
        {isTransmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-[#0D1017] border border-[#8B672B] p-8 shadow-2xl relative text-center space-y-5"
            >
              <div className="w-12 h-12 border border-[#E2BA6B] bg-[#131722] flex items-center justify-center mx-auto text-[#E2BA6B]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E2BA6B] font-medium block tabular-nums">
                Instruction Logged · Mandate Reference {generatedMandateId || dossierRef}
              </span>

              <h3 className="font-serif text-3xl text-[#FAF7F0]">
                Commission Transmitted to Mayfair Duty Desk
              </h3>

              <p className="text-xs text-[#D4D8E2] leading-relaxed max-w-md mx-auto">
                Your bespoke instructions for <strong className="text-[#FAF7F0] font-normal">{selectedScenario.title}</strong> with <strong className="text-[#FAF7F0] font-normal">{selectedFleet.name}</strong> under <strong className="text-[#FAF7F0] font-normal">{selectedProtocol.name}</strong> have been securely staged into the live Member Portal triage queue.
              </p>

              <div className="p-4 bg-[#131722] border border-[#232736] text-left text-xs space-y-1.5">
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Mandate Reference:</span>
                  <span className="font-mono text-[#E2BA6B] tabular-nums">{generatedMandateId || dossierRef}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Operational Codename:</span>
                  <span className="font-mono text-[#FAF7F0]">{codename}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Estimated Total (0% Markup):</span>
                  <span className="font-mono text-[#E2BA6B] font-bold tabular-nums">£{totalEstimatedCost.toLocaleString('en-GB')}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Assigned Duty Directors:</span>
                  <span className="text-[#FAF7F0]">Camilla Vance-Moreau & Julian Sterling</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setIsTransmitted(false)}
                  className="btn-gold px-7 py-3 text-xs cursor-pointer"
                >
                  Return to Studio
                </button>
                <button
                  onClick={() => {
                    setIsTransmitted(false);
                    navigateTo('member-portal');
                  }}
                  className="btn-outline-gold px-6 py-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>View in Member Portal</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
