/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import {
  ArrowUpRight,
  Zap,
  Key,
  Compass,
  Flame,
  Lock,
  CheckCircle2,
  Clock,
  Radio,
  Crosshair,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  Dice5,
  Anchor,
  AlertTriangle,
  Music2,
  Disc3,
} from 'lucide-react';

export type SubRosaCategory =
  | 'all'
  | 'subterranean'
  | 'industrial'
  | 'underground-combat'
  | 'clandestine-gaming'
  | 'maritime-nocturne'
  | 'counter-culture'
  | 'urban-exploration'
  | 'after-hours'
  | 'urban-clubs'
  | 'itinerary';

export interface ClandestineDossier {
  id: string;
  category:
    | 'subterranean'
    | 'industrial'
    | 'underground-combat'
    | 'clandestine-gaming'
    | 'maritime-nocturne'
    | 'counter-culture'
    | 'urban-exploration'
    | 'after-hours'
    | 'urban-clubs';
  categoryLabel: string;
  title: string;
  kicker: string;
  tagline: string;
  image: string;
  gridCoordinates: string;
  clearanceLevel: string;
  dressCode: string;
  securityProtocol: string;
  intelBrief: string;
  deepNarrative: string[];
  deliverables: string[];
  insiderWhisper: string;
  riskMitigation: string;
}

export const CLANDESTINE_DOSSIERS: ClandestineDossier[] = [
  // 1. SUBTERRANEAN SANCTUMS & BUNKERS
  {
    id: 'paddock-bunker',
    category: 'subterranean',
    categoryLabel: 'Subterranean Sanctums & Bunkers',
    title: 'Paddock Citadel: Churchill’s Sub-Level War Rooms',
    kicker: 'Citadel 01 · North London Sub-Terrain',
    tagline: 'Forty feet beneath London clay lies the alternate war fortress history forgot.',
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    gridCoordinates: '51.5542° N, 0.2520° W · Neasden Sub-Terrain',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Dark Tailoring / Tactical Formal',
    securityProtocol: 'RF Shielded Faraday Enclosure · Zero Telemetry · Escorted Descent',
    riskMitigation: 'Full blast bulkhead seal, redundant atmospheric filtration, discrete unmarked entrance with plainclothes close-protection perimeter.',
    intelBrief: 'Constructed in 1939 as the classified alternate cabinet war bunker for Winston Churchill, fortified behind 5-foot blast walls and gas filtration locks.',
    deepNarrative: [
      'While millions tour Westminster, Paddock stands closed to the general public beneath unmarked grounds in North-West London. The historic map room, cipher rooms, and original ventilation plant remain preserved in total subterranean silence.',
      'Through custodial stewardship, TGLC coordinates private evening briefings, intimate dining beside original oak map tables, and confidential board sessions where complete acoustic and electronic isolation is non-negotiable.'
    ],
    deliverables: [
      'Private custodial unlock and escorted descent past blast bulkheads',
      '12-guest candlelit banquet prepared privately inside the map room',
      'Full RF check, counter-surveillance sweep, and secure device lockbox storage upon arrival',
      'Curated architectural briefing with specialist archival historian'
    ],
    insiderWhisper: 'Enter beside the unmarked brick substation; the main blast door unlocks via a three-stage mechanical key sequence.'
  },
  {
    id: 'kingsway-tunnels',
    category: 'subterranean',
    categoryLabel: 'Subterranean Sanctums & Bunkers',
    title: 'Kingsway Deep Intelligence Tunnels & Cold War Vaults',
    kicker: 'Citadel 02 · Holborn Deep Sub-Level',
    tagline: 'The mile-long subterranean corridor where Britain kept its Cold War hotlines.',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    gridCoordinates: '51.5173° N, 0.1189° W · High Holborn 100ft Below',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Structured Monochrome / Discreet Outerwear',
    securityProtocol: 'Pre-vetted Security Escort & Air-Quality Monitoring Clear',
    riskMitigation: 'Direct goods-lift transit past public sightlines, air-scrubbed chamber verification, and SAS-trained security lead accompaniment.',
    intelBrief: 'One hundred feet below Chancery Lane lies an 8,000-square-metre labyrinth that once housed wartime intelligence communications and the original Transatlantic hotline terminus.',
    deepNarrative: [
      'Untouched by the frantic pace of High Holborn overhead, Kingsway retains its own artesian well, timber generator galleries, and historic cable vaults.',
      'Principals gather here for private acoustic performances, closed contemporary art previews, and completely confidential conversations away from electronic intrusion.'
    ],
    deliverables: [
      'Discrete arrival through an unmarked street shaft and private goods lift',
      'Guided architectural tour led by veteran specialist engineers',
      'Private vintage single-malt tasting inside the former switchroom',
      'Chauffeured pickup coordinated in the alleyways off Furnival Street'
    ],
    insiderWhisper: 'The ambient temperature remains steady year-round; once the upper hatch seals, all street frequencies vanish entirely.'
  },
  {
    id: 'city-bullion-vaults',
    category: 'subterranean',
    categoryLabel: 'Subterranean Sanctums & Bunkers',
    title: 'The 300-Year-Old Bullion Vaults & Sub-Thames Catacombs',
    kicker: 'Citadel 03 · Square Mile Catacombs',
    tagline: 'Heavy circular steel vault doors guarding quiet cigar rooms and 18th-century cellars.',
    image: '/assets/aistudio/rare_cellar_vault.jpg',
    gridCoordinates: '51.5134° N, 0.0889° W · City of London Sub-Vault',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Black Tie Optional / Savile Row Tailoring',
    securityProtocol: 'Biometric Palm Verification & Keyholder Escort',
    riskMitigation: 'High-security biometric access vestibule, unlogged arrival protocol, and concealed subterranean exfiltration route to private mews.',
    intelBrief: 'Deep beneath Lombard Street sit brick catacombs built three centuries ago to store bullion and East India trade reserves.',
    deepNarrative: [
      'Hidden behind twenty-ton circular bank doors lie private vintage spirit lockers and unadvertised drawing rooms furnished for serene conversation.',
      'Pour pre-phylloxera Cognac under arched brickwork while bespoke ventilation keeps cigar smoke crisp and unintrusive.'
    ],
    deliverables: [
      'Private vault buyout secured behind locked 20-ton circular doors',
      'Curated tasting of pre-1900 Armagnac and pre-embargo vintages',
      'Resident master sommelier and cigar steward in attendance',
      'Subterranean private exit directly to waiting Mayfair transport'
    ],
    insiderWhisper: 'Ask for Vault 04—an original 1888 brass locker still houses private consortium reserves.'
  },
  {
    id: 'brunel-thames-shaft',
    category: 'subterranean',
    categoryLabel: 'Subterranean Sanctums & Bunkers',
    title: 'Brunel Thames Tunnel Grand Entrance Shaft Crypt',
    kicker: 'Citadel 04 · Rotherhithe Shaft Sub-River',
    tagline: 'The world’s first sub-aqueous engineering miracle unlocked after dark for candlelit chamber acoustics.',
    image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg',
    gridCoordinates: '51.5011° N, 0.0528° W · Rotherhithe Shaft',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Evening Cashmere & Structured Leather',
    securityProtocol: 'Private Gated Compound & Structural Safety Escort',
    riskMitigation: 'Certified structural dampening, dedicated safety officer, gated courtyard staging with close-protection watch.',
    intelBrief: 'Completed in 1843 by Marc and Isambard Kingdom Brunel, this 65-foot subterranean brick chamber was once hailed as the Eighth Wonder of the World.',
    deepNarrative: [
      'Descend the cantilevered spiral staircase into a soot-blackened brick amphitheatre where London’s industrial revolution began beneath the riverbed.',
      'TGLC coordinates closed-door acoustic recitals, rare spirit presentations, and immersive midnight dinners echoing off circular brick walls that have stood 180 years.'
    ],
    deliverables: [
      'Exclusive buyout of the Brunel Grand Entrance Shaft after dark',
      'Solo cellist or string quartet performing in 65-foot natural reverb',
      'Bespoke culinary service staged around central iron braziers',
      'Riverboat arrival at Rotherhithe Pier with security escort'
    ],
    insiderWhisper: 'Look closely at the lower brick ring: soot from early steam engines still coats the lime mortar in iridescent black.'
  },

  // 2. INDUSTRIAL & BRUTALIST ENCLAVES
  {
    id: 'barbican-skystudio',
    category: 'industrial',
    categoryLabel: 'Industrial & Brutalist Enclaves',
    title: 'The Barbican Brutalist Sky-Sanctum & Concrete Terraces',
    kicker: 'Enclave 01 · City High-Elevation',
    tagline: 'High above London rooftops, textured granite meets mid-century radical design.',
    image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    gridCoordinates: '51.5204° N, 0.0928° W · Barbican Tower Top Tier',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Architectural Minimalist / Monochrome Tailoring',
    securityProtocol: 'Resident Key Fob & Private Express Lift with Concierge Escort',
    riskMitigation: 'Direct basement parking bay arrival, private lift override, restricted residential fob security.',
    intelBrief: 'Perched at the crown of the Barbican Estate, this private duplex blends bush-hammered concrete, warm Brazilian rosewood, and sweeping panoramas over St Paul’s.',
    deepNarrative: [
      'Away from the classical townhouses of W1, London’s creative patrons retreat here for post-war art viewings, unhurried dinners, and open-air winter nightcaps.',
      'Every terrace angle shelters you from London breezes while framing the lit spires of Wren churches across the Square Mile.'
    ],
    deliverables: [
      'Full evening use of a landmark high-floor Barbican duplex penthouse',
      'Private salon walkthrough of post-war British modernism and sculpture',
      'Dedicated house bartender serving seasonal botanical infusions',
      'Discreet basement garage arrival with direct private lift ascent'
    ],
    insiderWhisper: 'Vinyl played through the studio valve amplifiers fills the concrete gallery with concert-hall warmth.'
  },
  {
    id: 'bermondsey-armory',
    category: 'industrial',
    categoryLabel: 'Industrial & Brutalist Enclaves',
    title: 'Bermondsey Tanneries & Bespoke Leather Armory',
    kicker: 'Enclave 02 · Southwark Industrial Arches',
    tagline: 'Heritage English leathercraft and custom automotive luggage built behind unmarked arches.',
    image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
    gridCoordinates: '51.4988° N, 0.0772° W · Bermondsey Victorian Arches',
    clearanceLevel: 'Level 1 Discretion',
    dressCode: 'Smart Casual / Heritage Wool',
    securityProtocol: 'Appointment Only · Private Bench Briefing & Courtyard Guard',
    riskMitigation: 'Gated mews cordon, shuttered perimeter, discrete VIP vehicle bay inside archway.',
    intelBrief: 'Beneath Southwark’s Victorian brick railway arches, third-generation saddlers hand-stitch custom luggage sets contoured exactly to collectors’ aircraft and coachbuilt boot spaces.',
    deepNarrative: [
      'Here you step straight from Southwark into the honest fragrance of vegetable-tanned bridle hide, beeswax thread, and brass hardware.',
      'Select single hides from Tuscan and Devon tanneries to commission custom flight duffles, watch rolls, and shooting cases.'
    ],
    deliverables: [
      'Closed-workshop consultation with Britain’s master saddlers',
      'Bespoke hide grading and hand-burnished edge specifications',
      'Custom luggage tailored to specific aircraft cabins and supercar boots',
      'Private small-batch tasting in the mezzanine pattern library'
    ],
    insiderWhisper: 'The head cutter honed his craft fitting ceremonial saddles in Knightsbridge before establishing this private studio.'
  },
  {
    id: 'hackney-horology',
    category: 'industrial',
    categoryLabel: 'Industrial & Brutalist Enclaves',
    title: 'Hackney Canal Secret Precision Horology Laboratory',
    kicker: 'Enclave 03 · East Canal Basin',
    tagline: 'Cleanroom micro-mechanics inside an unmarked Regent’s Canal warehouse.',
    image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    gridCoordinates: '51.5372° N, 0.0558° W · Regent’s Canal Basin',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Discreet Smart · Anti-Static Lab Coats Provided',
    securityProtocol: 'Cleanroom Airlock Access & Waterway Extraction Dock',
    riskMitigation: 'Airlock biometric security, zero public street frontage, private electric launch mooring.',
    intelBrief: 'Behind a weathered red-brick canal facade lies an ISO Class 5 watchmaking cleanroom devoted to independent tourbillons and museum movement restoration.',
    deepNarrative: [
      'Sit at high-magnification benches alongside master watchmakers to see hand-bevelled bridges shaped with gentian wood and rare complications regulated in real time.',
      'Arrive by narrow-beam electric launch along the canal right up to the private waterside loading bay.'
    ],
    deliverables: [
      'Private laboratory session with independent British watchmakers',
      'Microscope inspection of rare minute repeaters and prototype movements',
      'Custom enamel dial and hand-engraved rotor commissions',
      'Quiet canal boat transfer to the warehouse dock'
    ],
    insiderWhisper: 'Look past the industrial brick exterior—the filtration system inside equals Swiss valley ateliers.'
  },
  {
    id: 'silvertown-monolith',
    category: 'industrial',
    categoryLabel: 'Industrial & Brutalist Enclaves',
    title: 'Millennium Mills Monumental Concrete Silo Studio',
    kicker: 'Enclave 04 · Royal Docks Post-Industrial Domain',
    tagline: 'Seven stories of raw monolithic concrete overlooking the Thames barrier and London City runway lights.',
    image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg',
    gridCoordinates: '51.5034° N, 0.0195° E · Royal Victoria Dock',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Industrial Avant-Garde / High Tactical Outerwear',
    securityProtocol: 'Heavy Industrial Access Permit & 24/7 Monitored Compound',
    riskMitigation: 'Enclosed private compound, 24/7 security cordon, direct helicopter landing zone access by prior arrangement.',
    intelBrief: 'A twentieth-century flour mill turned private contemporary art creation vault. Towering steel hoppers and cathedral-scale concrete bays host monumental sculpture and ultra-private fashion previews.',
    deepNarrative: [
      'This raw industrial colossus offers an experience nowhere else in Western Europe can match: unvarnished scale, raw acoustic power, and sweeping vistas over London City Airport.',
      'Principals host underground electronic symphonies, collector sculpture viewings, and midnight architectural banquets in complete privacy from commercial London.'
    ],
    deliverables: [
      'Private clearance into the restricted Millennium Mills central silo',
      'Monumental sculpture preview arranged with international gallery curators',
      'Industrial candlelit dinner styled with raw steel tables and warm hearths',
      'Direct river interceptor arrival at the Royal Docks pontoon'
    ],
    insiderWhisper: 'The top silo terrace offers the most dramatic nighttime view of jetliners climbing directly over the Thames.'
  },

  // 3. UNDERGROUND COMBAT & RAW EAST END RINGS
  {
    id: 'bethnal-boxing',
    category: 'underground-combat',
    categoryLabel: 'Underground Combat & Raw East End Rings',
    title: 'Bethnal Green Unlisted Underground Sparring Sanctum',
    kicker: 'Combat 01 · East End Boxing Heritage',
    tagline: 'Authentic British pugilism beneath 1890s brick arches behind locked shutters.',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    gridCoordinates: '51.5290° N, 0.0560° W · Bethnal Green Arch Vaults',
    clearanceLevel: 'Level 1 Discretion',
    dressCode: 'Technical Training Kit / Ringside Casual',
    securityProtocol: 'Private Ring Closure · Zero Spectators · Armed Tactical CP Outer Watch',
    riskMitigation: 'Julian Sterling close-protection officers guard the exterior shutter; perimeter counter-surveillance active throughout.',
    intelBrief: 'Tucked under Bethnal Green railway arches, this storied East End gym locks its steel shutters privately for morning or midnight one-on-one sessions with former world champions.',
    deepNarrative: [
      'No posing, no cameras, no commercial group classes—just honest leather bags, seasoned ring coaches, and demanding round work tailored to your conditioning.',
      'Clients who normally negotiate nine-figure buyouts step through these heavy iron doors to test their raw stamina, accompanied by personal protection who ensure absolute discretion and immediate emergency extraction.'
    ],
    deliverables: [
      'Private closure of the historic brick boxing arch for solo training',
      'One-on-one padwork with decorated British and Olympic trainers',
      'Sports physiotherapy and cold plunge recovery corner on site',
      'Door-to-door discreet return transfer in armoured Range Rover back to Mayfair'
    ],
    insiderWhisper: 'The seasoned oak ring perimeter was rebuilt from the original 1920s York Hall floorboards.'
  },
  {
    id: 'bermondsey-white-collar',
    category: 'underground-combat',
    categoryLabel: 'Underground Combat & Raw East End Rings',
    title: 'The Bermondsey Vaults: Unsanctioned Exhibition Bouts',
    kicker: 'Combat 02 · Railway Vault Ringside',
    tagline: 'Fifty invited patrons, an elevated ring under Victorian soot bricks, and world-class raw boxing.',
    image: '/assets/aistudio/close_protection_security.jpg',
    gridCoordinates: '51.4965° N, 0.0682° W · Spa Terminus Rail Vaults',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Dark Sharp Tailoring / No Ties',
    securityProtocol: 'Julian Sterling Plainclothes Detail & Identity Screening at Archway',
    riskMitigation: 'Three-point credential check at exterior alley; two SAS-trained security operatives escort principals inside and out.',
    intelBrief: 'A quarterly, invitation-only fight night held in deep secrecy under the South London viaduct. Unsanctioned by public ticket outlets, this is where London’s true fight aficionados gather.',
    deepNarrative: [
      'Principals often crave the raw, visceral drama of real East End boxing culture—the sweat, the crack of leather on chin, the tension of the crowd—but are rightfully hesitant to navigate backstreet warehouse alleys without elite protection.',
      'TGLC embeds you ringside with Julian Sterling’s team at your shoulder, premium single malts poured into crystal, and zero risk of unwanted exposure or security compromise.'
    ],
    deliverables: [
      'Guaranteed ringside corner table directly adjacent to the red corner',
      'Tactical advance sweep and plainclothes security escort from departure to return',
      'Private meeting with boxers and corner staff in the backstage locker vault',
      'Caviar and vintage scotch service served ringside during the 6-fight card'
    ],
    insiderWhisper: 'Arrive strictly at 21:15 via the unmarked service door next to the brewery gate; password changes at sundown.'
  },
  {
    id: 'ufc-cageside',
    category: 'underground-combat',
    categoryLabel: 'Underground Combat & Raw East End Rings',
    title: 'UFC London Cageside & Athlete Locker-Room Sanctum',
    kicker: 'Combat 03 · Arena Cageside Supremacy',
    tagline: 'Front-row Octagon access where every corner instruction and strike impact is heard clearly.',
    image: '/assets/aistudio/ufc_arena_ringside.jpg',
    gridCoordinates: '51.5030° N, 0.0032° E · The O2 Arena Cordon',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Sharp Evening Tailoring / Cashmere Turtleneck',
    securityProtocol: 'Promotion Accreditation & Personal Security Escort to Cageside',
    riskMitigation: 'Dedicated arena tunnel escort, blue-light fast-track ingress through VIP backstage cordon.',
    intelBrief: 'Beyond hospitality suites, TGLC arranges true floor-level Row 1 Octagon placements alongside championship teams, promotion owners, and legendary combat sports figures.',
    deepNarrative: [
      'Step behind arena curtains into the athlete warmup chambers to observe hands being taped, feel the electric surge of the walkout tunnel, and stand inches from the canvas as championship rounds commence.',
      'Following the final bell, join private post-fight gatherings in Mayfair drawing rooms hosted with combat sports luminaries.'
    ],
    deliverables: [
      'Row 1 floor-level cageside seats beside commentary tables',
      'Back-of-house promotion credential pass with dedicated host accompaniment',
      'Private weigh-in suite viewing prior to fight night',
      'Post-event chauffeur return and private Mayfair dining table reservations'
    ],
    insiderWhisper: 'Broadcast-side placements let you hear every tactical corner instruction and corner towel flap.'
  },

  // 4. SECRET HIGH-STAKES GAMING & CLANDESTINE SALONS
  {
    id: 'soho-card-vault',
    category: 'clandestine-gaming',
    categoryLabel: 'Secret High-Stakes Gaming & Clandestine Salons',
    title: 'The Meard Street Unlisted High-Roller Poker Sanctum',
    kicker: 'Gaming 01 · Soho Georgian Sub-Basement',
    tagline: 'Fifty-thousand-pound buy-ins behind an 18th-century antique bookshop door.',
    image: '/assets/aistudio/meard_poker_sanctum.jpg',
    gridCoordinates: '51.5134° N, 0.1332° W · Meard Street Sub-Vault',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Evening Discretion / Tailored Velvet',
    securityProtocol: 'Zero Digital Devices · Faraday Cellar · Cashier Settlement by Encrypted Wire',
    riskMitigation: 'Principals are escorted by Julian Sterling’s plainclothes detail; chip settlements handled via verified trust accounts with zero physical cash risk.',
    intelBrief: 'Deep beneath the cobbled alleys of Soho sits London’s most secretive private poker game, patronised by shipping magnates, hedge fund founders, and discrete collectors.',
    deepNarrative: [
      'High-net-worth individuals often want the electric thrill of underground high-stakes cards without the danger, extortion risk, or unvetted table dynamics of street games.',
      'Our gaming desk guarantees table vetting: professional European casino dealers, cryptographic device isolation, B6 armoured drop-off, and institutional settlement mechanisms.'
    ],
    deliverables: [
      'Secured seat at the unlisted No-Limit Texas Hold’em table (£25k / £50k buy-ins)',
      'World-class professional croupier and dedicated host handling personal vintage cellar requests',
      'Acoustic and electronic isolation ensuring zero audio leakage or device tracking',
      'Discreet chauffeured escort directly from private residences to the secret rear entrance'
    ],
    insiderWhisper: 'Knock twice on the oak panel behind the folio shelves; the host opens via magnetic release.'
  },
  {
    id: 'mayfair-chemin-de-fer',
    category: 'clandestine-gaming',
    categoryLabel: 'Secret High-Stakes Gaming & Clandestine Salons',
    title: 'Curzon Street Subterranean Chemin-de-Fer & Baccarat Salon',
    kicker: 'Gaming 02 · Mayfair Sub-Residences',
    tagline: 'The timeless aristocrat’s card game played behind mahogany panelling and velvet drapes.',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    gridCoordinates: '51.5068° N, 0.1472° W · Curzon Street Sanctum',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Black Tie Strictly Enforced',
    securityProtocol: 'Biometric Palm Key & Sentry Escort at Mews Arch',
    riskMitigation: 'Private residential license, armed security response on standby, discrete side-lane exfiltration point.',
    intelBrief: 'A private society dating back to the 1950s where traditional Chemin-de-Fer is contested between principals under original gilt chandeliers.',
    deepNarrative: [
      'Unlike the noisy commercial casino floors of Park Lane, this salon provides a hushed, cinematic atmosphere reminiscent of Ian Fleming’s Goldeneye era.',
      'Enjoy chilled Beluga caviar, vintage Dom Pérignon poured from magnums, and unhurried shoes where bank ownership rotates among guests in strict tradition.'
    ],
    deliverables: [
      'Private table reservation with personalized chip rack staged in advance',
      'Vintage champagne and caviar service during gameplay',
      'Complete confidentiality protocols protecting guest identities and stakes',
      'Chauffeured town-car return to SW1 or private London residence'
    ],
    insiderWhisper: 'The shoe used on the main table is an original solid-brass 1932 Monte Carlo original.'
  },
  {
    id: 'covent-garden-dice',
    category: 'clandestine-gaming',
    categoryLabel: 'Secret High-Stakes Gaming & Clandestine Salons',
    title: 'The Seven Dials Backgammon & High-Stakes Dice Club',
    kicker: 'Gaming 03 · Covent Garden Cellars',
    tagline: 'Where master tacticians contest hundred-thousand-pound doubles over rare rums.',
    image: '/assets/aistudio/subrosa_catacomb_dinner.jpg',
    gridCoordinates: '51.5140° N, 0.1275° W · Seven Dials Underground',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Smart Sartorial / Relaxed Luxury',
    securityProtocol: 'Named Member Introduction & Discreet Alley Surveillance',
    riskMitigation: 'Closed-circuit covert cameras monitored by TGLC security lead; emergency secondary exit to Neal’s Yard.',
    intelBrief: 'Tucked beneath a heritage apothecary near Seven Dials, this subterranean den is dedicated to competitive backgammon, precision craps, and strategic board gaming with elite stakes.',
    deepNarrative: [
      'Attracting world backgammon champions and international financiers alike, the tables feature hand-stitched Connolly leather boards and weighted precision bone dice.',
      'The atmosphere is intimate and razor-sharp, accompanied by single-cask Caribbean rums and Cuban cigars smoked under extraction canopies.'
    ],
    deliverables: [
      'Private gaming booth with custom bespoke leather backgammon board',
      'Introduction to vetted grandmaster players for high-stakes matches',
      'Curated rum flight featuring pre-embargo distilleries',
      'Private security escort to waiting vehicle'
    ],
    insiderWhisper: 'The corner booth retains the original brick flue from the 1780s tobacco merchants.'
  },

  // 5. THAMES NOCTURNE STEALTH INTERCEPTORS & DERELICT DOCKS
  {
    id: 'thames-stealth-launch',
    category: 'maritime-nocturne',
    categoryLabel: 'Thames Nocturne Stealth Interceptors & Derelict Docks',
    title: 'The 02:00 AM Thames Stealth Launch Sprints',
    kicker: 'Maritime 01 · River Thames Nocturne Corridor',
    tagline: 'When river traffic halts, matte-black hulls plane past illuminated bridges at 40 knots.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    gridCoordinates: '51.5055° N, 0.0754° W · Tower Pier to Greenwich',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Cashmere Outerwear / Night Casual',
    securityProtocol: 'PLA Cleared Passage & FLIR Thermal Night Navigation',
    riskMitigation: 'Port of London Authority cleared high-speed transit waiver, twin redundant Mercury outboards, marine rescue certified pilot.',
    intelBrief: 'After midnight, the Thames belongs to quiet waters and floodlit stone landmarks. Our 45-foot carbon tenders offer swift, exhilarating passage clear of road congestion.',
    deepNarrative: [
      'Step aboard directly at private pontoons in Chelsea or Greenwich after the opera or private dinner.',
      'Heated aft seating, heavy cashmere throws, and chilled vintage champagne accompany the glide beneath Tower Bridge as the city sleeps.',
      'For clients seeking raw adrenaline, the pilot opens the twin outboards once past Wapping, cutting across the black river surface under full thermal night vision.'
    ],
    deliverables: [
      'Private charter of our matte-black carbon stealth river launch',
      'Cleared high-speed transit passing Parliament and Tower Bridge',
      'Discreet embarks at private Chelsea, Wapping, and Docklands steps',
      'Heated decks with midnight caviar and champagne service'
    ],
    insiderWhisper: 'Passing directly beneath Tower Bridge at 2:30 AM without another craft on the river leaves every first-time guest breathless.'
  },
  {
    id: 'derelict-drydock-anchorage',
    category: 'maritime-nocturne',
    categoryLabel: 'Thames Nocturne Stealth Interceptors & Derelict Docks',
    title: 'Isle of Dogs Abandoned Drydock Midnight Supper',
    kicker: 'Maritime 02 · East End Maritime Ruins',
    tagline: 'Step from a speed interceptor into a lit Victorian granite graving dock for private culinary theatre.',
    image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg',
    gridCoordinates: '51.4925° N, 0.0075° W · Isle of Dogs Graving Dock',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Tactical Cashmere / Technical Trench',
    securityProtocol: 'Compound Perimeter Sentries & Marine Patrol Boat Standby',
    riskMitigation: 'Julian Sterling boat escort on water; fenced compound with canine security and tactical illumination.',
    intelBrief: 'A massive 19th-century granite drydock where historic tea clippers once refitted, now closed to the general public and opened solely for TGLC nocturne missions.',
    deepNarrative: [
      'Few experiences match the eerie, cinematic majesty of arriving by water into an empty Victorian drydock. As your boat gently docks at the stone slipway, lanterns light up towering granite walls.',
      'A private chef team prepares charcoal-roasted Langoustines and wild game over open flames while you sip vintage Burgundy under the shadow of the Docklands skyline.'
    ],
    deliverables: [
      'Marine speed transit directly into the private gated drydock',
      'Open-fire private feast prepared on stone platforms beside the slipway',
      'Thermal heating domes, wool blankets, and acoustic jazz accompaniment',
      'Rapid exfiltration option by road or return boat to central London'
    ],
    insiderWhisper: 'The low tide reveals the original hand-cut mason marks carved into the lower stone tiers in 1868.'
  },
  {
    id: 'canary-wharf-blackwater',
    category: 'maritime-nocturne',
    categoryLabel: 'Thames Nocturne Stealth Interceptors & Derelict Docks',
    title: 'Docklands Black-Water Insertion & Private Penthouse Ascent',
    kicker: 'Maritime 03 · High-Rise River Ingress',
    tagline: 'Direct marine transit from Westminster straight into a private dock and express penthouse lift.',
    image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg',
    gridCoordinates: '51.5050° N, 0.0200° W · Canary Wharf Basin',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Evening Tailoring / Sharp Discretion',
    securityProtocol: 'Private Pontoon Code & Escorted Residential Lift Override',
    riskMitigation: 'Zero street-level exposure; passengers transfer from water to private elevator in under 30 seconds.',
    intelBrief: 'Designed for high-profile principals who must travel across London without entering traffic or public terminals.',
    deepNarrative: [
      'Board at Westminster pier under cover of darkness; arrive at Canary Wharf in 18 minutes flat; step from vessel directly into private basement elevator lobby.',
      'Enjoy dinner or meetings on the 48th floor overlooking the lit river loop with absolute zero risk of paparazzi or unwanted attention.'
    ],
    deliverables: [
      'Direct riverboat transit bypassing all central London congestion',
      'Private dock gate code and direct-to-penthouse elevator key',
      'Security escort team carrying luggage and providing counter-surveillance',
      'Return cruise under floodlit bridges back to Chelsea or Battersea'
    ],
    insiderWhisper: 'The water reflection of Canary Wharf towers at 01:00 AM produces a mirror-glass surface found nowhere else in London.'
  },

  // 6. SUBVERSIVE COUNTER-CULTURE GASTRONOMY & SUPPER CLUBS
  {
    id: 'dalston-omakase',
    category: 'counter-culture',
    categoryLabel: 'Subversive Counter-Culture Gastronomy & Supper Clubs',
    title: 'The 8-Seat Subterranean Omakase Behind a Record Shop',
    kicker: 'Gastronomy 01 · Dalston Unmarked Basement',
    tagline: 'Eight hinoki seats, zero online listings, and day-boat catches from Cornwall and Toyosu.',
    image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    gridCoordinates: '51.5471° N, 0.0754° W · Dalston Underground',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Understated Evening Attire · No Strong Scents',
    securityProtocol: 'Host Greeting via Vinyl Counter & Discreet Back-Alley Drop-Off',
    riskMitigation: 'Plainclothes driver and escort wait outside; emergency vehicle staging in quiet side-mews.',
    intelBrief: 'Entered behind stacked wooden crates at an independent Japanese record shop, this acoustic basement counter is presided over by a third-generation Tokyo sushi shokunin.',
    deepNarrative: [
      'Far removed from flash bulbs and velvet ropes, dinner unfolds in hushed intimacy: aged red akasu rice, Hokkaido uni, and line-caught Channel turbot served slice by slice.',
      'TGLC reserves complete eight-seat buyouts paired with unlisted Niigata sakes, allowing you to dine in the gritty heart of East London in absolute security.'
    ],
    deliverables: [
      'Complete 8-seat private counter evening buyout',
      '22-course seasonal omakase curated directly by the head itamae',
      'Rare micro-brewery Daiginjo and artisanal tea flights',
      'Private post-dinner vinyl listening session in the front listening room'
    ],
    insiderWhisper: 'Mention the 1974 blue-sleeve jazz pressing at the counter and the shelving swings open quietly.'
  },
  {
    id: 'soho-freezer-vault',
    category: 'counter-culture',
    categoryLabel: 'Subversive Counter-Culture Gastronomy & Supper Clubs',
    title: 'The Soho Butcher Freezer Door Clandestine Cocktail Lab',
    kicker: 'Gastronomy 02 · Soho Cobbled Alleys',
    tagline: 'Step past stainless butcher hooks into an amber-lit drawing room from 1924.',
    image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    gridCoordinates: '51.5138° N, 0.1340° W · Soho Alleys Sub-Level',
    clearanceLevel: 'Level 1 Discretion',
    dressCode: 'Sartorial Evening / Dark Velvet',
    securityProtocol: 'Weekly Rotating Password · Strictly No Flash Photography',
    riskMitigation: 'Private secondary exit directly to waiting vehicle in Bateman Street alley; close-protection lead on door.',
    intelBrief: 'Concealed behind heavy stainless cold-room hinges at the rear of an operating Soho purveyor, this thirty-seat sanctuary protects privacy with quiet grace.',
    deepNarrative: [
      'Past the frost curtain, heavy green velvet booths and an open coal grate invite unhurried late conversations.',
      'House botanicalists clarify wild English hedgerow distillates into featherlight vintage pours for your booth alone.'
    ],
    deliverables: [
      'Direct passage past the shop counter via private cold door',
      'Reserved rear velvet corner banquette all evening',
      'Custom cocktails balanced by personal palate profile',
      'Private back-lane exit directly into waiting chauffeur transport'
    ],
    insiderWhisper: 'Ask your Lifestyle Manager for the Thursday phrase before setting off from Mayfair.'
  },
  {
    id: 'clerkenwell-meathook',
    category: 'counter-culture',
    categoryLabel: 'Subversive Counter-Culture Gastronomy & Supper Clubs',
    title: 'Clerkenwell 18th-Century Meat-Hook Open-Flame Supper Club',
    kicker: 'Gastronomy 03 · Smithfield Sub-Level',
    tagline: 'Dry-aged British beef cooked over oak embers in a subterranean brick smokehouse.',
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    gridCoordinates: '51.5190° N, 0.1015° W · Smithfield Sub-Arches',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Smart Casual / Tailored Dark Denim & Wool',
    securityProtocol: 'Gated Archway Entry & Keyholder Greeting',
    riskMitigation: 'Direct courtyard gate entry; close-protection driver on stand-by with secure parking.',
    intelBrief: 'Deep beneath Smithfield’s historic meat market, this former smoking cellar with blackened ceiling beams hosts twelve guests around a glowing hearth of Sussex charcoal.',
    deepNarrative: [
      'Principals experience the primeval thrill of whole-carcass butchery and hearth cooking with Michelin precision. Prime rib, bone marrow, and tallow-fried heritage potatoes paired with first-growth Bordeaux.',
      'Surrounded by original cast-iron meat hooks and tallow candle glow, it feels like a secret dining society untouched since 1840.'
    ],
    deliverables: [
      'Exclusive buyout of the 12-seat brick hearth chamber',
      'Whole-rib roast carved tableside by renowned guest chefs',
      'Sommelier pairing featuring library vintages of Saint-Émilion and Rioja',
      'Private security escort to discreet street exfiltration'
    ],
    insiderWhisper: 'The chimney draft draws the fire so cleanly that the dining table sits just six feet from the glowing embers without smoke.'
  },

  // 7. FORBIDDEN URBAN HEIGHTS & RESTRICTED RAILS
  {
    id: 'down-street-station',
    category: 'urban-exploration',
    categoryLabel: 'Forbidden Urban Heights & Restricted Rails',
    title: 'Down Street Ghost Station: Churchill’s Railway Sanctum',
    kicker: 'Restricted 01 · Mayfair Underground',
    tagline: 'The abandoned Piccadilly line station where the Prime Minister slept during the Blitz.',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    gridCoordinates: '51.5058° N, 0.1492° W · Down Street, Mayfair',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Discreet Tailoring / Sturdy Footwear Provided',
    securityProtocol: 'Transport for London Heritage Custodial Escort & SAS CP Lead',
    riskMitigation: 'Full subterranean safety equipment, air monitoring, certified underground track safety escort, locked surface hatch.',
    intelBrief: 'Closed in 1932 due to low passenger traffic, Down Street was converted in 1939 into the top-secret headquarters of the Railway Executive Committee, complete with executive bedrooms and executive bathrooms for Churchill.',
    deepNarrative: [
      'Step from the quiet elegance of Down Street in Mayfair down a red-brick facade into a subterranean ghost world. As tube trains rush past behind wire grilles, you walk tiled platforms frozen in 1941.',
      'Our team arranges private evening access where historians unpack declassified wartime cables before you enjoy a quiet vintage whisky in Churchill’s executive office bunk.'
    ],
    deliverables: [
      'Private custodial unlock of the red-tiled Down Street surface entrance',
      'Escorted platform and bunker walking tour with lead heritage historian',
      'Private single-malt dram poured inside the original wartime committee room',
      'Chauffeured pickup on Piccadilly directly outside the discreet exit'
    ],
    insiderWhisper: 'You can still see Churchill’s bathtub fixture in the small tiled washroom off the main rail gallery.'
  },
  {
    id: 'tower-bridge-bascule',
    category: 'urban-exploration',
    categoryLabel: 'Forbidden Urban Heights & Restricted Rails',
    title: 'Tower Bridge Bascule Chamber Sub-River Cathedral',
    kicker: 'Restricted 02 · Thames Sub-Aqueous Crypt',
    tagline: 'Massive brick chambers below the riverbed housing the 1,000-ton bridge counterweights.',
    image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    gridCoordinates: '51.5055° N, 0.0754° W · Tower Bridge South Bascule',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Dark Tailored Outerwear',
    securityProtocol: 'Bridge Custodian Keyholder & Engineering Safety Escort',
    riskMitigation: 'Strict engineering safety protocols, safety harnesses for elevated walkways, direct police marine coordination.',
    intelBrief: 'A colossal, cavernous brick space located beneath water level that receives the massive 1,000-ton counterweights whenever Tower Bridge opens to river traffic.',
    deepNarrative: [
      'This submerged architectural wonder boasts a staggering 14-second natural acoustic reverberation. Descend the steel companionway into absolute darkness as the bridge overhead hums with city traffic.',
      'TGLC coordinates closed-door acoustic recitals, binaural sound experiences, and private architectural walkthroughs when the bridge is locked.'
    ],
    deliverables: [
      'Private evening entry into the south bascule chamber beneath the river',
      'Exclusive acoustic performance by specialist choral or brass musicians',
      'Engineering briefing explaining the hydraulic accumulator systems',
      'Private tender pick-up from Tower Pier upon ascent'
    ],
    insiderWhisper: 'Stand at the bottom floor and whisper: your voice circles the 100-foot brick vault and returns behind you.'
  },
  {
    id: 'canary-wharf-rooftop-crane',
    category: 'urban-exploration',
    categoryLabel: 'Forbidden Urban Heights & Restricted Rails',
    title: 'Restricted Sky-Gantry & High-Tower Midnight Vista',
    kicker: 'Restricted 03 · Docklands Sky-Cordon',
    tagline: 'Stand 700 feet above the city on a private architectural gantry with zero glass barriers.',
    image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg',
    gridCoordinates: '51.5045° N, 0.0185° W · Canary Wharf High Tier',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'High Tactical Outerwear / Windproof Cashmere',
    securityProtocol: 'Structural Engineer Certification & Full Harness Safety Check',
    riskMitigation: 'Full certified fall arrest harnesses, structural safety guides, high-altitude wind monitoring, private express lift.',
    intelBrief: 'A private maintenance gantry high above London’s financial towers, accessed via confidential engineering permits and express service shafts.',
    deepNarrative: [
      'For clients who seek pure vertigo and raw exhilaration without public viewing decks or tourist crowds. Step onto the open-air steel grating as night winds whip past and the Thames curves below like a ribbon of molten glass.',
      'Julian Sterling’s team ensures total perimeter security and safe harness anchorings while our concierge serves hot artisanal teas and aged cognacs from thermal flasks.'
    ],
    deliverables: [
      'Private ascent via security-cleared high-speed industrial lift',
      'Secured walk on the open-air gantry 700 feet above London',
      'Professional high-altitude night photography capturing your visit',
      'Heated penthouse lounge waiting at lower level with private bar'
    ],
    insiderWhisper: 'On clear nights you can see the flashing runway lights of Heathrow 20 miles to the west.'
  },

  // 8. CLANDESTINE BOHEMIAN JAZZ & PRIVATE SOCIETY SALONS
  {
    id: 'meard-jazz-den',
    category: 'after-hours',
    categoryLabel: 'Clandestine Bohemian Jazz & Private Society Salons',
    title: 'Meard Street Subterranean Vinyl Jazz & Bourbon Crypt',
    kicker: 'After-Hours 01 · Soho Bohemian Underworld',
    tagline: 'The unadvertised 25-seat basement where legendary jazz players jam after their West End sets.',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    gridCoordinates: '51.5135° N, 0.1330° W · Meard Street',
    clearanceLevel: 'Level 1 Discretion',
    dressCode: 'Bohemian Sartorial / Velvet & Cashmere',
    securityProtocol: 'Discreet Doorman Verification & Strictly No Photography',
    riskMitigation: 'Plainclothes security officer posted at street level; private side exit through residential courtyard.',
    intelBrief: 'Beneath a nondescript townhouse in Soho lies an acoustic basement where world-touring musicians gather at 01:30 AM to play unamplified bebop and modal jazz.',
    deepNarrative: [
      'No stage, no microphones, no ticketing. Just a 1928 Steinway baby grand, upright bass, and horn players trading solos inches from your leather armchair.',
      'Sip 25-year-old Pappy Van Winkle or Japanese single malts in an amber glow while London’s finest jazz plays until the first morning light.'
    ],
    deliverables: [
      'Guaranteed corner booth reservation at the 25-seat unlisted lounge',
      'Table bottle service from rare bourbon and scotch library allocations',
      'Direct introduction to performing musicians during the intermission',
      'Doorstep chauffeur pickup arranged in Wardour Street'
    ],
    insiderWhisper: 'The piano tuner visits at midnight every Tuesday before the after-hours session begins.'
  },
  {
    id: 'fitzrovia-absinthe-salon',
    category: 'after-hours',
    categoryLabel: 'Clandestine Bohemian Jazz & Private Society Salons',
    title: 'The Fitzrovia Bohemian Absinthe & Literary Crypt',
    kicker: 'After-Hours 02 · Fitzrovia Heritage Cellars',
    tagline: 'Rare pre-ban absinthes dripped over sugar cubes in an unlisted poet’s sanctuary.',
    image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
    gridCoordinates: '51.5205° N, 0.1380° W · Fitzroy Square Sub-Level',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Dark Romantic / Classic Savile Row',
    securityProtocol: 'Private Bell Code & Society Host Introduction',
    riskMitigation: 'Private residential entrance with zero street markings; driver parked around corner in private mews.',
    intelBrief: 'A private salon operating in the tradition of Oscar Wilde and Dylan Thomas, dedicated to historic French and Swiss absinthes distilled before 1914.',
    deepNarrative: [
      'Behind an unlabelled panelled door near Fitzroy Square, water drips slowly from ornate French silver fountains over antique slotted spoons.',
      'Principals retreat here for unhurried conversations about art, philosophy, and history away from the frenetic commercialism of modern nightlife.'
    ],
    deliverables: [
      'Tasting of authentic vintage pre-ban absinthes poured from antique decanters',
      'Private library nook surrounded by first-edition British literature',
      'Artisanal charcuterie and French cheeses paired with historic spirits',
      'Discreet chauffeured return to Mayfair or Kensington'
    ],
    insiderWhisper: 'Look at the green glassware on the corner table—they are hand-blown 1890s Pontarlier glasses.'
  },
  {
    id: 'spitalfields-crypt-exchange',
    category: 'after-hours',
    categoryLabel: 'Clandestine Bohemian Jazz & Private Society Salons',
    title: 'Spitalfields Silk Weaver Crypt Cigar & Collector Exchange',
    kicker: 'After-Hours 03 · East London Heritage Crypt',
    tagline: 'Private midnight salon where rare timepieces and pre-embargo cigars exchange hands.',
    image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg',
    gridCoordinates: '51.5195° N, 0.0750° W · Spitalfields Georgian Quarter',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Evening Tailoring / Velvet Smoking Jackets',
    securityProtocol: 'Encrypted Guest List & Julian Sterling Close Protection Detail',
    riskMitigation: 'Armed response team on standby, encrypted identity verification at archway, secure underground vault storage.',
    intelBrief: 'Set inside the brick undercroft of an 18th-century Huguenot silk merchant’s house, this monthly midnight salon hosts private watch collectors and art connoisseurs.',
    deepNarrative: [
      'Away from public auction houses and trade fairs, collectors meet here by candlelight to inspect museum-grade vintage watches, rare coins, and pre-embargo Cuban cigars.',
      'Julian Sterling’s protection detail provides absolute security for physical assets in transit, while high-efficiency airflow keeps the atmosphere crisp and fragrant.'
    ],
    deliverables: [
      'Private access to the Huguenot crypt collector salon',
      'Humidor access to rare 1950s Havana cigars stored in cedar lockers',
      'On-site horological expert and appraiser with microscope equipment',
      'Armoured vehicle transport for valuable acquisitions back to vault storage'
    ],
    insiderWhisper: 'The brick hearth in the rear was originally built to heat dyeing vats for French silk brocades in 1740.'
  },

  // 9. URBAN SOUND, HIP-HOP VAULTS & STREET-LUXURY NIGHTLIFE
  {
    id: 'concrete-bass-vault',
    category: 'urban-clubs',
    categoryLabel: 'Urban Sound, DJ & Hip-Hop Nightlife',
    title: 'The Concrete Bass Vault: Sub-Level Hip-Hop & Custom Horn Club',
    kicker: 'Urban Club 01 · Undisclosed Mayfair Sub-Level',
    tagline: 'Raw poured concrete, custom vintage horn speakers, visiting headline selectors, and zero velvet-rope queuing.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    gridCoordinates: '51.5112° N, 0.1418° W · Hanover Mews Sub-Level',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Street Couture / Archival Denim & Heavy Outerwear',
    securityProtocol: 'Unmarked Steel Service Door · Faraday Phone Stickers · Plainclothes Detail',
    riskMitigation: 'Zero street queue exposure; matte-black Maybach stages inside adjacent freight archway while Julian Sterling officers secure VIP booth perimeter.',
    intelBrief: 'Engineered for ultra-wealthy principals who crave the pulse of contemporary Atlanta, Compton, and South London hip-hop culture without public nightclubs or intrusive phones.',
    deepNarrative: [
      'Behind an unsigned cargo shutter off Hanover Street sits a subterranean 140-person sound sanctuary anchored by bespoke walnut horn stacks tuned to warm sub-bass frequencies.',
      'Grammy-winning touring producers and underground grime/hip-hop selectors drop unannounced 01:30 AM sets while TGLC secures elevated cantilevered corner tables stocked with Dom Pérignon P2 magnums and Japanese single casks.'
    ],
    deliverables: [
      'Private steel freight-door bypass directly into elevated sound-booth banquettes',
      'Zero camera policy strictly enforced at doorway with magnetic pouches',
      'Private backstage booth access for visiting producers and recording artists',
      'Dedicated Maybach extraction staged inside locked loading bay until 05:00'
    ],
    insiderWhisper: 'The bespoke analog rotary mixer was wired in Kyoto specifically for the concrete room acoustics.'
  },
  {
    id: 'shoreditch-turntable-loft',
    category: 'urban-clubs',
    categoryLabel: 'Urban Sound, DJ & Hip-Hop Nightlife',
    title: 'Shoreditch Rooftop Turntable Loft & Private Selector Sessions',
    kicker: 'Urban Club 02 · Redchurch High-Rise Studio',
    tagline: 'Private steel-truss penthouse decks overlooking the illuminated City towers with custom Technics booth.',
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    gridCoordinates: '51.5248° N, 0.0749° W · Shoreditch High Timber Loft',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Elevated Streetwear / Tailored Leather',
    securityProtocol: 'Private Goods-Lift Code & Rooftop Security Detail',
    riskMitigation: 'Restricted residential freight elevator code changes nightly; plainclothes close-protection lead controls floor landing.',
    intelBrief: 'Available for closed twelve-to-forty guest takeovers where world-renowned hip-hop and house DJs spin directly from private vinyl libraries against night views of Bishopsgate.',
    deepNarrative: [
      'Bridging East London pirate radio heritage with billionaire sanctuary comfort, the loft pairs acoustic timber baffles with floor-to-ceiling steel Crittall windows overlooking the Square Mile.',
      'Step behind dual Technics SL-1200G decks yourself with resident sound engineers, or invite a surprise headliner to host an unrecorded three-hour set over woodfired late-night street haute cuisine.'
    ],
    deliverables: [
      'Complete overnight buyout of the Redchurch private penthouse sound loft',
      'Booking coordination for premier international hip-hop & electronic DJs',
      'Full analog Klipsch & McIntosh sound architecture engineered to concert clarity',
      '24-hour dedicated house mixologist and late-night wagyu sando kitchen'
    ],
    insiderWhisper: 'Ask the archivist to pull the first-press 1990s East Coast white labels stored in the cedar wall vault.'
  },
  {
    id: 'soho-street-couture-salon',
    category: 'urban-clubs',
    categoryLabel: 'Urban Sound, DJ & Hip-Hop Nightlife',
    title: 'Soho Stealth Trunk Salon & Collector Streetwear Vault',
    kicker: 'Urban Club 03 · Brewer Street After-Hours',
    tagline: 'Where archival runway collaborations, deadstock sneakers, and late-night beats converge behind blackout glass.',
    image: '/assets/aistudio/shoreditch_street_couture.jpg',
    gridCoordinates: '51.5119° N, 0.1355° W · Soho After-Hours Salon',
    clearanceLevel: 'Level 2 Biometric Access',
    dressCode: 'Collectible Streetwear / Designer Archive',
    securityProtocol: 'Keyholder Appointment Only · Window Privacy Tint',
    riskMitigation: 'Unmarked doorway with zero external branding; Julian Sterling escort handles high-value timepiece and trunk transfers.',
    intelBrief: 'Before heading to late-night sound clubs, principals convene at an invitation-only stylist lounge stocking museum-grade sample pieces, bespoke leather bombers, and limited global collaborations.',
    deepNarrative: [
      'Curated for music executives, athletes, and tech founders who operate equally smoothly between Savile Row and backstage festival compounds.',
      'Try one-of-one Japanese selvedge tailoring, custom diamond-set grillz consultations, or rare footwear archives while a resident selector spins low-volume Boom Bap over chilled Krug.'
    ],
    deliverables: [
      'Private midnight stylist unlock with access to archival runway vault samples',
      'Custom leatherwork and tour-grade hardware monogramming within 48 hours',
      'Champagne hospitality and curated hip-hop vinyl listening lounge on site',
      'Direct coordination with Shoreditch & Mayfair sound venues for onward night flow'
    ],
    insiderWhisper: 'Rack 03 contains unreleased collaborative sample trunks flown directly from Tokyo and Milan.'
  },
  {
    id: 'mayfair-mews-listening-room',
    category: 'urban-clubs',
    categoryLabel: 'Urban Sound, DJ & Hip-Hop Nightlife',
    title: 'Mayfair Mews Matte-Black Arrival & 03:00 Hi-Fi Cypher Booth',
    kicker: 'Urban Club 04 · Brutalist Mews Sanctuary',
    tagline: 'Slip from a satin-black Maybach in cobbled alleys straight into London’s most discreet late-night vinyl bar.',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    gridCoordinates: '51.5092° N, 0.1488° W · Bourdon Place Alleyway',
    clearanceLevel: 'Level 3 Sovereign Introduction',
    dressCode: 'Noir Tailoring / Luxury Street Outerwear',
    securityProtocol: 'Mews Traffic Barrier & Plainclothes Extraction Team',
    riskMitigation: 'Chauffeur enters gated cobblestone passage off paparazzi avenues; close-protection officer sweeps vestibule prior to alight.',
    intelBrief: 'True London nightlife luxury is measured by how quietly you disappear from public view between midnight sets and dawn flights.',
    deepNarrative: [
      'Located down a gaslit Mayfair mews steps from Berkeley Square, this soundproofed concrete-and-velvet room hosts only forty principals nightly behind heavy acoustic bronze doors.',
      'Whether unwinding after an arena concert, hosting post-Premiere afterparties with touring artists, or closing creative IP acquisitions at 03:00 AM, every beat stays sealed inside the walls.'
    ],
    deliverables: [
      'Gated mews vehicle drop-off with zero street-level camera exposure',
      'Private soundproofed listening booths with dedicated master vinyl host',
      'Custom bottle locker storage alongside rare Japanese & mezcal reserves',
      'Direct morning transit link to Battersea Heliport or RAF Northolt tarmac'
    ],
    insiderWhisper: 'The bronze intercom plate has no lettering—tap three slow intervals and step immediately inside.'
  }
];

interface RogueScheduleItem {
  time: string;
  codename: string;
  location: string;
  action: string;
  detail: string;
  asset: string;
  securityNote: string;
}

const ROGUE_ITINERARY: RogueScheduleItem[] = [
  {
    time: '21:00',
    codename: 'Phase 01 · Mayfair Departure & Tactical Brief',
    location: 'TGLC House, 3rd Floor, 45 Albemarle Street, Mayfair W1S 4JL',
    action: 'Discreet Departure in Satin-Black Maybach & Armoured Escort',
    detail: 'Evening brief handed over in wax-sealed folio with mission alias. Experienced driver and close-protection scout navigate cobbled mews passages behind Burlington Gardens and Soho.',
    asset: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    securityNote: 'Lead scout car verifies route clearance 5 minutes ahead.'
  },
  {
    time: '21:45',
    codename: 'Phase 02 · Freezer Door Ingress & Aperitifs',
    location: 'Unmarked Alleys, Soho',
    action: 'Clandestine Butcher Freezer Cocktail Lab Aperitifs',
    detail: 'Step past stainless butcher hooks into amber velvet candlelight. Clarified botanical infusions shaken to your exact spirit and aroma profile in private banquette.',
    asset: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    securityNote: 'Plainclothes operative holds rear service door for private egress.'
  },
  {
    time: '23:00',
    codename: 'Phase 03 · Underground Combat or High-Stakes Cards',
    location: 'Meard Street Vault or Bethnal Green Rail Arch',
    action: 'Unlisted Ringside Sparring or £50k Texas Hold’em Salon',
    detail: 'Experience the electric pulse of unlisted London: either ringside at a closed-door exhibition bout or seated at the 8-person Faraday poker table under professional dealing.',
    asset: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    securityNote: 'RF jammer enclosure active; zero digital devices allowed inside.'
  },
  {
    time: '00:45',
    codename: 'Phase 04 · Sub-Level Omakase & Rare Sakes',
    location: 'Dalston Underground Vault Behind Record Shop',
    action: 'Private 8-Seat Hinoki Counter Midnight Banquet',
    detail: 'Complete buyout behind the vinyl racks. 22 courses of aged Cornish turbot and Toyosu bluefin paired with unlisted micro-brewery Niigata Daiginjo.',
    asset: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    securityNote: 'Private courtyard vehicle staging with discrete driver communication.'
  },
  {
    time: '01:45',
    codename: 'Phase 05 · Concrete Bass Vault & Headline DJ Set',
    location: 'Undisclosed Shoreditch & Mayfair Sub-Level',
    action: 'Private Hip-Hop & Custom Horn Sound Sanctum Table',
    detail: 'Bypass freight doors into a raw poured-concrete club where visiting global hip-hop producers spin exclusive vinyl pressings with zero phones allowed.',
    asset: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    securityNote: 'Faraday optical pouches enforced; close protection holds booth perimeter.'
  },
  {
    time: '03:00',
    codename: 'Phase 06 · Thames Nocturne Stealth Interceptor Sprint',
    location: 'Wapping Private Pier to Greenwich & Tower Bridge',
    action: 'Matte-Black Carbon Tender River Run at 38 Knots',
    detail: 'Plane across black river water under floodlit Tower Bridge and Parliament while Beluga caviar and chilled Krug arrive on heated aft teak decks.',
    asset: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    securityNote: 'PLA high-speed transit clearance and FLIR thermal night navigation.'
  },
  {
    time: '04:30',
    codename: 'Phase 07 · Barbican Dawn Nightcap & City Sunrise',
    location: 'Barbican High-Elevation Duplex Penthouse Terraces',
    action: 'Single-Cask Whiskies Over First Light Across St Paul’s',
    detail: 'Express lift ascent to panoramic brutalist concrete terraces as morning sunlight illuminates Wren spires across the silent City skyline.',
    asset: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    securityNote: 'Private basement garage vehicle handover with 24/7 security concierge.'
  }
];

interface HeroSlideMeta {
  id: string;
  image: string;
  title: string;
  coordinates: string;
}

const SUBPAGE_META: Record<
  string,
  {
    title: string;
    kicker: string;
    tagline: string;
    heroImage: string;
    heroSlides: HeroSlideMeta[];
    coordinates: string;
    lead: string;
  }
> = {
  subterranean: {
    title: 'Subterranean Sanctums & Bunkers',
    kicker: 'Sub-Rosa Sector 01 · London Deep Sub-Terrain',
    tagline: 'Forty to one hundred feet beneath London clay lies a hidden kingdom of wartime citadels and bullion vaults.',
    heroImage: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    heroSlides: [
      { id: 'paddock', image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg', title: 'Churchill’s Paddock War Map Room', coordinates: '51.5542° N · 40ft Below' },
      { id: 'brunel', image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg', title: 'Brunel Thames Sub-Aqueous Shaft', coordinates: '51.5011° N · Rotherhithe' },
      { id: 'kingsway', image: '/assets/aistudio/down_street_station_1794391687146.jpg', title: 'Kingsway Deep Intelligence Galleries', coordinates: '51.5173° N · 100ft Deep' },
    ],
    coordinates: '51.5542° N, 0.2520° W · Deep Subterranean Grid',
    lead: 'Sealed behind five-foot blast bulkheads and unlisted street grates, these historic underground spaces welcome trusted TGLC gatherings, private candlelight dinners, and wholly unmonitored strategic councils with zero electronic leakage.'
  },
  industrial: {
    title: 'Brutalist Enclaves & Industrial Monoliths',
    kicker: 'Sub-Rosa Sector 02 · City Skyline & Docklands',
    tagline: 'Fluted concrete sky-studios, cleanroom horology labs, and raw grain silos far from commercial Mayfair.',
    heroImage: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    heroSlides: [
      { id: 'barbican', image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg', title: 'Barbican Concrete Sky-Terraces', coordinates: '51.5204° N · City Top Tier' },
      { id: 'bermondsey', image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', title: 'Bermondsey Bespoke Saddlery Vaults', coordinates: '51.4988° N · SE1 Arches' },
      { id: 'silvertown', image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg', title: 'Royal Docks Monolith Silo Studios', coordinates: '51.5034° N · E16 Silos' },
      { id: 'hackney', image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', title: 'Regent’s Canal Horology Cleanroom', coordinates: '51.5372° N · Basin 04' },
    ],
    coordinates: '51.5204° N, 0.0928° W · City Skyline & Docklands',
    lead: 'Whether admiring post-war art from a Barbican penthouse terrace, fitting bespoke aircraft luggage under Bermondsey railway arches, or inspecting tourbillons by the canal, we connect you directly with London’s raw creative masters.'
  },
  'underground-combat': {
    title: 'Underground Combat & Raw East End Rings',
    kicker: 'Sub-Rosa Sector 03 · Pugilism & Arenas',
    tagline: 'Authentic bare-knuckle archives, secret railway arch bouts, and cageside championship supremacy.',
    heroImage: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    heroSlides: [
      { id: 'bethnal', image: '/assets/aistudio/east_end_boxing_1794391694652.jpg', title: 'Bethnal Green Railway Arch Ring', coordinates: '51.5290° N · Arch 14' },
      { id: 'o2', image: '/assets/aistudio/ufc_arena_ringside.jpg', title: 'O2 Cageside Row 1 & Tunnel Access', coordinates: '51.5030° N · Greenwich' },
      { id: 'protection', image: '/assets/aistudio/close_protection_security.jpg', title: 'Julian Sterling Ringside Security Cordon', coordinates: 'Tier 2 · SIA Escort' },
    ],
    coordinates: '51.5290° N, 0.0560° W · Bethnal Green to Greenwich',
    lead: 'The visceral electricity of London pugilism, experienced with total security. Julian Sterling’s tactical close-protection team escorts principals directly ringside under Victorian brick viaducts for raw, uncommercialised fight nights.'
  },
  'clandestine-gaming': {
    title: 'Secret High-Stakes Gaming & Clandestine Salons',
    kicker: 'Sub-Rosa Sector 04 · High-Roller Sub-Levels',
    tagline: 'Fifty-thousand-pound buy-ins, private chemin-de-fer, and Faraday card rooms behind antique bookshops.',
    heroImage: '/assets/aistudio/meard_poker_sanctum.jpg',
    heroSlides: [
      { id: 'meard', image: '/assets/aistudio/meard_poker_sanctum.jpg', title: 'Meard Street £50k Faraday Cardroom', coordinates: '51.5134° N · Soho Vault' },
      { id: 'curzon', image: '/assets/aistudio/tglc_st_james_salon.jpg', title: 'Curzon Street Private Chemin-de-Fer', coordinates: '51.5068° N · Mayfair W1' },
      { id: 'sevendials', image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', title: 'Seven Dials Backgammon & Rare Rum Cellar', coordinates: '51.5140° N · WC2 Crypt' },
    ],
    coordinates: '51.5134° N, 0.1332° W · Soho & Mayfair Sub-Vaults',
    lead: 'Pure high-stakes drama with zero institutional risk. Professional European dealers, institutional trust settlements, and cryptographic privacy shielding allow principals to contest high-limit poker and baccarat in complete peace.'
  },
  'maritime-nocturne': {
    title: 'Thames Nocturne Stealth Interceptors & Derelict Docks',
    kicker: 'Sub-Rosa Sector 05 · River Corridor at 02:00',
    tagline: 'When river traffic halts, matte-black hulls plane past floodlit bridges at 40 knots to abandoned drydocks.',
    heroImage: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    heroSlides: [
      { id: 'stealth', image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', title: '45ft Matte-Black Carbon River Sprint', coordinates: '51.5055° N · 38 Knots' },
      { id: 'drydock', image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg', title: 'Isle of Dogs Graving Dock Supper', coordinates: '51.4925° N · E14 Dock' },
      { id: 'monaco', image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg', title: 'Continental Mediterranean Chase Boat Link', coordinates: 'LFMN ➔ Port Hercule' },
    ],
    coordinates: '51.5055° N, 0.0754° W · Tower Pier to Greenwich',
    lead: 'London from the black water is unlike anything on land. High-speed carbon interceptors cleared by the Port of London Authority glide beneath Tower Bridge, beaching at Victorian drydocks for candlelit open-fire feasts.'
  },
  'counter-culture': {
    title: 'Subversive Counter-Culture Gastronomy & Supper Clubs',
    kicker: 'Sub-Rosa Sector 06 · East & Soho Backstreets',
    tagline: 'Eight-seat cellar omakases, freezer-door speakeasies, and woodfired meat-hook feasts with zero signboards.',
    heroImage: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    heroSlides: [
      { id: 'dalston', image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg', title: '8-Seat Record-Shop Basement Omakase', coordinates: '51.5471° N · Dalston' },
      { id: 'freezer', image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg', title: 'Soho Stainless Cold-Room Cocktail Lab', coordinates: '51.5138° N · Soho W1' },
      { id: 'smithfield', image: '/assets/aistudio/mayfair_fine_dining.jpg', title: 'Smithfield Sub-Arch Hearth Society', coordinates: '51.5190° N · EC1 Vault' },
    ],
    coordinates: '51.5471° N, 0.0754° W · East & Soho Network',
    lead: 'True culinary theatre thrives away from paparazzi pavements. Step behind butcher cold doors and vinyl record racks for intimate counter meals, woodfired hearth feasts, and rare vintage sake flights.'
  },
  'urban-exploration': {
    title: 'Forbidden Urban Heights & Restricted Rails',
    kicker: 'Sub-Rosa Sector 07 · Sub-River Bascules & Ghost Stations',
    tagline: 'Churchill’s abandoned Down Street station, 700-foot midnight crane vistas, and Tower Bridge bascule chambers.',
    heroImage: '/assets/aistudio/down_street_station_1794391687146.jpg',
    heroSlides: [
      { id: 'downst', image: '/assets/aistudio/down_street_station_1794391687146.jpg', title: 'Down Street Ghost Platform & Blitz Bunkers', coordinates: '51.5058° N · Mayfair Deep' },
      { id: 'bascule', image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg', title: 'Tower Bridge Sub-River Bascule Cathedral', coordinates: '51.5055° N · -40ft River' },
      { id: 'gantry', image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg', title: '700ft Open Steel Gantry Night Vista', coordinates: '51.5045° N · Canary Wharf' },
      { id: 'shaft', image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg', title: 'Brunel Rotherhithe Sub-River Engineering Shaft', coordinates: '51.5011° N · SE16 Crypt' },
    ],
    coordinates: '51.5058° N, 0.1492° W · Mayfair & Thames Sub-Aqueous',
    lead: 'Strictly restricted architectural and engineering marvels opened exclusively for TGLC principals under engineering permits. Explore abandoned platforms, resonant bascule vaults, and open sky gantries in complete safety.'
  },
  'after-hours': {
    title: 'Clandestine Bohemian Jazz & Private Society Salons',
    kicker: 'Sub-Rosa Sector 08 · Late-Night Salons',
    tagline: 'Unadvertised 02:00 AM basement jazz jam sessions, pre-ban absinthe salons, and Georgian crypt exchanges.',
    heroImage: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    heroSlides: [
      { id: 'jazz', image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg', title: 'Meard Street 02:00 AM Unamplified Jazz Crypt', coordinates: '51.5135° N · Soho Cellar' },
      { id: 'absinthe', image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg', title: 'Fitzrovia Pre-Ban Absinthe Literary Salon', coordinates: '51.5205° N · Fitzroy Sq' },
      { id: 'spitalfields', image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg', title: 'Spitalfields Watch & Cigar Collector Crypt', coordinates: '51.5195° N · Huguenot E1' },
    ],
    coordinates: '51.5135° N, 0.1330° W · Soho & Fitzrovia Sub-Terrain',
    lead: 'When the West End clubs shut their doors, London’s true bohemians gather in subterranean drawing rooms. Unamplified horns, Steinway grands, rare single-casks, and private collector exchanges by candlelight.'
  },
  'urban-clubs': {
    title: 'Urban Sound, DJ & Hip-Hop Sanctums',
    kicker: 'Sub-Rosa Sector 09 · Concrete Sound & Street Couture',
    tagline: 'Where global street culture meets ultra-high-net-worth stealth: custom sound vaults, headline DJs, and locked mews entry.',
    heroImage: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    heroSlides: [
      { id: 'bassvault', image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', title: 'Concrete Bass Vault · Sub-Level Hip-Hop Sanctum', coordinates: '51.5112° N · Hanover Sub' },
      { id: 'djloft', image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg', title: 'Shoreditch Turntable Penthouse & Selector Loft', coordinates: '51.5248° N · Redchurch E2' },
      { id: 'streetcouture', image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg', title: 'Soho Stealth Streetwear Archive & Trunk Salon', coordinates: '51.5119° N · Brewer St W1' },
      { id: 'mews', image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', title: 'Satin Maybach Mews Arrival & Hi-Fi Cypher Booth', coordinates: '51.5092° N · Bourdon Pl' },
    ],
    coordinates: '51.5248° N, 0.0749° W · Mayfair to Shoreditch Circuit',
    lead: 'Engineered for founders, recording artists, and next-generation principals who reject stuffy chandeliers in favour of walnut horn speakers, touring hip-hop selectors, archival streetwear salons, and blacked-out alley arrivals under SAS close protection.'
  },
  itinerary: {
    title: '007 Rogue 24-Hour London Mission Plan',
    kicker: 'Operational Plan · Dusk-to-Dawn Choreography',
    tagline: 'A complete dusk-to-dawn movement from Mayfair through Soho cellars, concrete hip-hop vaults, river sprints, to Barbican heights.',
    heroImage: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    heroSlides: [
      { id: 'maybach', image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', title: '21:00 · Mayfair Mews Extraction', coordinates: '45 Albemarle ➔ Soho' },
      { id: 'combat', image: '/assets/aistudio/east_end_boxing_1794391694652.jpg', title: '23:00 · Bethnal Arch Ringside', coordinates: 'E2 Rail Viaduct' },
      { id: 'hiphop', image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', title: '01:45 · Concrete Sound Vault DJ Set', coordinates: 'Sub-Level Audio' },
      { id: 'thames', image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', title: '03:00 · 38-Knot Thames Sprint', coordinates: 'Wapping ➔ Tower Bridge' },
    ],
    coordinates: 'London Metropolitan Area · 21:00 to 05:00',
    lead: 'Every handover, cold-room password, armoured scout convoy, soundbooth bypass, high-speed boat captain, and dawn whisky pour synchronised to the minute by Julian Sterling and our Mayfair directors.'
  }
};

const CLANDESTINE_HERO_SLIDES = [
  {
    id: 'urban-club',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    title: 'Concrete Bass Vault · Urban DJ & Hip-Hop Clubs',
  },
  {
    id: 'stealth-boat',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    title: 'Nocturne Stealth Launch at 02:00',
  },
  {
    id: 'down-street',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    title: 'Down Street Ghost Station & Bascule Vaults',
  },
  {
    id: 'combat-ringside',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    title: 'Underground Combat & Raw Arch Rings',
  },
  {
    id: 'shoreditch-dj',
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    title: 'Shoreditch Turntable Penthouse & Vinyl Selectors',
  },
  {
    id: 'subterranean-vault',
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    title: 'Churchill Paddock & Bullion Vaults',
  },
  {
    id: 'brutalist-penthouse',
    image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    title: 'Barbican Concrete Sky-Sanctum',
  },
  {
    id: 'secret-gastronomy',
    image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    title: '8-Seat Dalston Sub-Level Omakase',
  },
];

interface DossierExtendedIntel {
  timingWindow: string;
  groupCapacity: string;
  ingressProtocol: string;
  culinaryNotes: string;
  architecturalNotes: string;
  extraNarrative: string;
  gallery: { image: string; caption: string }[];
}

const DEFAULT_EXTENDED_INTEL: Record<string, DossierExtendedIntel> = {
  'paddock-bunker': {
    timingWindow: '19:30 – 01:00 GMT · Custodial Unlock',
    groupCapacity: '4 to 12 Principals',
    ingressProtocol: 'Satin-black V-Class stages off Neasden Lane; close-protection escort clears the timber substation door before turning three separate Mortise keys down the blast stairway.',
    culinaryNotes: 'Seven-course historical supper prepared silently on induction field kitchens beside the map table, poured alongside mature 1989 Claret and Glenfarclas Family Cask drams.',
    architecturalNotes: 'Five-foot reinforced concrete overhead slab, original cork wall acoustic baffling, and preserved wartime ventilation turbines forty feet below clay level.',
    extraNarrative: 'Once the outer gas-lock bulkhead closes behind your party, external mobile networks drop completely to zero—offering rare unrecorded stillness for sovereign family councils or diplomatic reconciliation.',
    gallery: [
      { image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg', caption: 'Candlelit dining prepared beside Churchill’s preserved subterranean map room forty feet below North-West London.' },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Intimate subterranean stone vault staging with silver service and pre-phylloxera cellar pours.' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Dedicated close-protection scout cars hold outside unmarked perimeter lanes throughout the evening.' },
    ]
  },
  'kingsway-tunnels': {
    timingWindow: '20:00 – 01:30 GMT · Deep Level Access',
    groupCapacity: '6 to 16 Principals',
    ingressProtocol: 'Unmarked goods lift off Furnival Street descends directly through a brick-lined ventilation shaft past 100ft depth gates to the main cast-iron tunnel galleries.',
    culinaryNotes: 'Rare Campbeltown single malts and aged Comté pairings staged inside the original timber switchroom behind brass acoustic curtains.',
    architecturalNotes: 'Cast-iron segment tunnel rings spanning a full mile beneath High Holborn, preserving original Cold War communications cable racking and subterranean artesian pump room.',
    extraNarrative: 'Whether hosting an unamplified string quartet whose cello harmonics float endlessly along the cast-iron cylinder or convening an off-the-record venture syndicate briefing, no surface city hum ever reaches this depth.',
    gallery: [
      { image: '/assets/aistudio/down_street_station_1794391687146.jpg', caption: 'Original subterranean tunnel tiles and executive chambers beneath central London untouched since wartime duty.' },
      { image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg', caption: 'Vaulted deep-level chambers lit exclusively by portable amber floor uplighters for acoustic recitals.' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Private spirit bottles transported in temperature-controlled panniers for post-briefing tastings.' },
    ]
  },
  'city-bullion-vaults': {
    timingWindow: '18:30 – 02:00 GMT · Biometric Vault Entry',
    groupCapacity: '2 to 10 Principals',
    ingressProtocol: 'Palm-vein biometric reader hidden inside a quiet Lombard Street courtyard opens the passenger lift descending past three levels of granite masonry.',
    culinaryNotes: 'Pre-embargo Havana leaves drawn from cedar lockers #04 and #09, accompanied by 1900 Bas-Armagnac and bone-marrow sourdough toast points.',
    architecturalNotes: 'Twentieth-century Chubb circular steel doors weighing twenty tons set against hand-laid 1720s brick vaults with whisper-quiet air extraction.',
    extraNarrative: 'Principals utilize these sealed sub-Thames catacombs when delicate cross-border settlements, private treaty drafts, or high-value watch inspections require total sanctuary in the heart of the Square Mile.',
    gallery: [
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Aged vintage reserves and hand-blown crystal service inside London’s oldest private bullion cellars.' },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Candlelit dining tables beneath 18th-century arched brickwork protected by circular steel vault doors.' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Private leather-panelled smoking room adjoining the main cellar lockers.' },
    ]
  },
  'brunel-thames-shaft': {
    timingWindow: '19:30 – 00:30 GMT · Tidal & Nocturne Lock',
    groupCapacity: '4 to 18 Principals',
    ingressProtocol: 'Stealth river launch pulls directly alongside Rotherhithe pontoon steps; security escorts guests through the locked brick courtyard gate down the spiral staircase.',
    culinaryNotes: 'Dry-aged Scottish venison and native oysters roasted beside forged iron braziers, poured with premier cru Chablis and tawny ports.',
    architecturalNotes: 'Vertical 65-foot diameter Victorian brick rotunda with original soot patina from 19th-century steam locos and cathedral-grade circular acoustics.',
    extraNarrative: 'Hearing a lone cello resonance climb sixty feet up hand-laid bricks beneath the Thames water table creates an atmospheric memory that outshines every public concert hall in Europe.',
    gallery: [
      { image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg', caption: 'Inside Brunel’s historic Rotherhithe brick amphitheatre where evening strings perform under warm hearth light.' },
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'Private midnight tender waiting at Rotherhithe steps to whisk guests back up-river beneath Tower Bridge.' },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Candlelit tasting table set directly at the base of the Victorian engineering shaft.' },
    ]
  },
  'soho-card-vault': {
    timingWindow: '22:00 – 05:30 GMT · Encrypted Table Seating',
    groupCapacity: '4 to 9 Seats Per Table',
    ingressProtocol: 'Rear service alley entry off Wardour Street leads through an unmarked antique bookbindery; Faraday signal pouches seal all mobile hardware at the oak threshold.',
    culinaryNotes: 'Karuizawa single-cask drams, tableside A5 Miyazaki Wagyu sliders, and hand-carved crystal ice served unobtrusively between hands.',
    architecturalNotes: 'Georgian walnut panelling lined over lead acoustic baffling, felt competition tables milled in Vienna, and brass visor shading over the dealer well.',
    extraNarrative: 'Unlike public casinos where pit bosses, cameras, and casual onlookers crowd the felt, every seat here is introduced personally and settled invisibly through vetted escrow accounts—preserving both adrenaline and serenity.',
    gallery: [
      { image: '/assets/aistudio/meard_poker_sanctum.jpg', caption: 'Mahogany tables and shaded overhead brass lamps inside the unlisted Meard Street high-stakes card room.' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Japanese single casks and rare pre-embargo bottles reserved exclusively for seated gaming principals.' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Armoured vehicles stage discreetly along parallel Soho lanes for effortless 04:00 AM departure.' },
    ]
  },
  'concrete-bass-vault': {
    timingWindow: '23:30 – 05:00 GMT · Sound Sanctuary Lockout',
    groupCapacity: '4 to 24 Principals (VIP Booth Buyouts)',
    ingressProtocol: 'Stealth Maybach enters the unmarked shuttered delivery court off Hanover Mews; Julian Sterling protection lead clears the heavy acoustic airlock directly to elevated walnut banquettes.',
    culinaryNotes: 'Dom Pérignon P2 magnums in matte-black chillers, spiced yuzu mezcal infusions, and 02:30 AM Tokyo-style charcoal yakitori trays.',
    architecturalNotes: 'Board-formed poured concrete shell decoupled from surrounding structures on neoprene springs, housing custom cedar and birch-ply sub-bass horn stacks.',
    extraNarrative: 'This room bridges global hip-hop and underground club authenticity with billionaire operational discipline: world-class producers test unreleased acetates over warm analog rotary mixers while zero smartphone lenses cross the doorway.',
    gallery: [
      { image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', caption: 'Subterranean concrete hip-hop sound room illuminated in deep amber with bespoke walnut horn speakers.' },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Close-up of the custom Kyoto-built analog rotary mixer and visiting selector booth inside the vault.' },
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Evening wear leans toward archival outerwear and limited-run sneakers steps from Hanover Square.' },
    ]
  },
  'shoreditch-turntable-loft': {
    timingWindow: '21:00 – 04:30 GMT · Full Penthouse Buyout',
    groupCapacity: '8 to 40 Guests',
    ingressProtocol: 'Dedicated freight elevator off Redchurch Street with rotating daily keycard; private concierge greets arrivals on the sixth-floor timber threshold.',
    culinaryNotes: 'Late-night open woodfire wagyu sandos, truffle ramen broth bowls at 02:00 AM, and magnum allocations from Champagne salons.',
    architecturalNotes: 'Refurbished Victorian spice warehouse crown pairing exposed cast-iron columns, Crittall steel framing across Bishopsgate spires, and Klipsch/McIntosh valve acoustics.',
    extraNarrative: 'Principals routinely fly touring headline selectors in for private forty-guest celebrations where guests step effortlessly onto wraparound terraces overlooking the glittering Square Mile.',
    gallery: [
      { image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg', caption: 'Skyline views across the City from the private Redchurch turntable penthouse terrace after dark.' },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Dual Technics SL-1200G decks and warm vinyl crate library curated for late-night selector sets.' },
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Private adjoining styling trunk lounge for visiting artists and collectors.' },
    ]
  },
  'soho-street-couture-salon': {
    timingWindow: '19:00 – 02:00 GMT · Midnight Keyholder Viewing',
    groupCapacity: '1 to 6 Principals',
    ingressProtocol: 'Blacked-out storefront off Brewer Street opens onto a cedar-scented staircase after private confirmation by your Lifestyle Manager.',
    culinaryNotes: 'Chilled Krug Grande Cuvée poured beside Kyoto hand-dripped single-origin coffee during midnight trunk fittings.',
    architecturalNotes: 'Minimalist brushed aluminum display plinths set against blackened Belgian oak paneling and studio museum lighting.',
    extraNarrative: 'Visiting music executives and collectors rely on this closed vault before midnight sets to commission bespoke leather stage outerwear, inspect archived runway prototypes, and walk straight out with tour-grade monogrammed pieces.',
    gallery: [
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Archive runway outerwear and rare footwear editions arranged privately under matte gallery spots.' },
      { image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg', caption: 'Velvet fitting alcove stocked with archival collaborations flown in from Tokyo and Milan.' },
      { image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', caption: 'Discreet vehicle staging behind Soho mews immediately following midnight trunk viewings.' },
    ]
  },
  'mayfair-mews-listening-room': {
    timingWindow: '22:00 – 05:00 GMT · Mews Intercom Entry',
    groupCapacity: '2 to 14 Principals',
    ingressProtocol: 'Chauffeurs swing past the mechanical bollard off Bourdon Place right up to an unmarked bronze door five paces from the salon bar.',
    culinaryNotes: 'Aged artisanal mezcals, rare Hibiki 30 pours, and midnight bluefin toro temaki wrapped fresh to order.',
    architecturalNotes: 'Fluted dark walnut acoustic diffusion walls, deep mohair booths, and low-glare architectural candlelight.',
    extraNarrative: 'Designed explicitly so touring icons, Premier League captains, and founders can listen to rare hip-hop and jazz pressings at 03:00 AM knowing no lens or unvetted stranger occupies the same room.',
    gallery: [
      { image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', caption: 'Gated Mayfair cobblestone passage keeping vehicle alights completely clear of Berkeley Square lenses.' },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Custom horn speakers and rotary console hidden behind the fluted walnut panelling.' },
      { image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', caption: 'Low-lit acoustic lounge booths reserved solely by direct host verification.' },
    ]
  }
};

function getExtendedIntel(dossier: ClandestineDossier): DossierExtendedIntel {
  if (DEFAULT_EXTENDED_INTEL[dossier.id]) return DEFAULT_EXTENDED_INTEL[dossier.id];
  const categoryGalleries: Record<ClandestineDossier['category'], { image: string; caption: string }[]> = {
    subterranean: [
      { image: dossier.image, caption: `${dossier.title} inspected ahead of evening custodial unlock.` },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Candlelit dining tables staged quietly beneath vaulted Georgian and Victorian brickwork.' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Archival library vintages decanted inside temperature-stabilised stone cellars.' },
    ],
    industrial: [
      { image: dossier.image, caption: `Private viewing access at ${dossier.title} away from commercial crowds.` },
      { image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg', caption: 'Textured modernist concrete terraces overlooking lit Square Mile spires after dusk.' },
      { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Master artisan benches unlocked by private appointment behind unmarked railway arches.' },
    ],
    'underground-combat': [
      { image: dossier.image, caption: `Ringside corridor prepared inside ${dossier.title} under Julian Sterling close protection.` },
      { image: '/assets/aistudio/close_protection_security.jpg', caption: 'SIA-vetted plainclothes detail verifying exterior mews and alley perimeters prior to arrival.' },
      { image: '/assets/aistudio/ufc_arena_ringside.jpg', caption: 'Unobstructed championship sightlines paired with backstage warm-up accreditation.' },
    ],
    'clandestine-gaming': [
      { image: dossier.image, caption: `Private high-limit salon at ${dossier.title} protected by electronic device isolation.` },
      { image: '/assets/aistudio/meard_poker_sanctum.jpg', caption: 'Weighted bone chips, hand-milled tables, and professional European croupiers in private attendance.' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Private bottle lockers poured tableside with zero external restaurant or casino exposure.' },
    ],
    'maritime-nocturne': [
      { image: dossier.image, caption: `High-speed nocturnal passage orchestrated through ${dossier.title}.` },
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'Matte-black twin-outboard carbon hull cutting past floodlit Thames piers at 02:00 AM.' },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Riverside open-fire dining staged inside a locked dockland slipway.' },
    ],
    'counter-culture': [
      { image: dossier.image, caption: `Private buyout evening inside ${dossier.title} behind unmarked Soho or East London doors.` },
      { image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg', caption: 'Intimate chef-counter service with hand-planed hinoki woodwork and day-boat wild catches.' },
      { image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg', caption: 'Amber velvet booths hidden behind stainless cold-storage doors off cobbled Soho lanes.' },
    ],
    'urban-exploration': [
      { image: dossier.image, caption: `Restricted engineering entry coordinated for ${dossier.title}.` },
      { image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg', caption: 'Monumental brick counterweight caverns echoing forty feet beneath the Thames riverbed.' },
      { image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg', caption: 'Harness-secured open-air steel gantry overlooking the financial district skyline at night.' },
    ],
    'after-hours': [
      { image: dossier.image, caption: `After-hours salon staging inside ${dossier.title} past midnight.` },
      { image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg', caption: 'Unamplified upright bass, horn players, and 1928 Steinway grand by candlelit booth.' },
      { image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg', caption: 'Private Georgian undercroft gathering for collector timepiece and vintage cigar exchanges.' },
    ],
    'urban-clubs': [
      { image: dossier.image, caption: `Private sound sanctuary setup at ${dossier.title}.` },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Analog rotary console and visiting headline selector crate curated for closed sets.' },
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Private sample trunk and archive outerwear lounge open prior to late-night club ingress.' },
    ]
  };
  return {
    timingWindow: '20:30 – 03:00 GMT · By Direct Custody Window',
    groupCapacity: '2 to 16 Principals',
    ingressProtocol: `Unmarked perimeter vehicle drop coordinated beside ${dossier.gridCoordinates.split('·')[1]?.trim() || 'private service lane'}; plainclothes escort clears entrance five minutes ahead of arrival.`,
    culinaryNotes: 'Bespoke chef teams, sommeliers, and rare whisky stewards stage tableside hospitality quietly according to each guest household dossier.',
    architecturalNotes: `Authentic historic fabric preserved beneath ${dossier.gridCoordinates} with dedicated acoustic isolation and private security staging bays.`,
    extraNarrative: `Unlike advertised hospitality venues, access here cannot be purchased online or arranged through hotel desks. TGLC coordinates custody directly with site stewards and assigns a plainclothes close-protection lead from arrival through departure.`,
    gallery: categoryGalleries[dossier.category]
  };
}

export const HiddenLondonPage: React.FC<{ initialSubPage?: SubRosaCategory }> = ({ initialSubPage }) => {
  const { openIntroductionModal, navigateTo, route } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<SubRosaCategory>(
    initialSubPage || (route.subSection as SubRosaCategory) || 'all'
  );
  const [detailModalDossier, setDetailModalDossier] = useState<ClandestineDossier | null>(null);
  const [modalGalleryIndex, setModalGalleryIndex] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [sectorSlide, setSectorSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const openDossierModal = (dossier: ClandestineDossier) => {
    setDetailModalDossier(dossier);
    setModalGalleryIndex(0);
  };

  const currentMeta = activeCategory !== 'all' ? SUBPAGE_META[activeCategory] : null;

  useEffect(() => {
    setSectorSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    if (isHeroPaused) return;
    const interval = setInterval(() => {
      if (currentMeta) {
        setSectorSlide((prev) => (prev + 1) % currentMeta.heroSlides.length);
      } else {
        setCurrentHeroSlide((prev) => (prev + 1) % CLANDESTINE_HERO_SLIDES.length);
      }
    }, 5200);
    return () => clearInterval(interval);
  }, [isHeroPaused, currentMeta]);

  useEffect(() => {
    if (initialSubPage) {
      setActiveCategory(initialSubPage);
    } else if (
      route.subSection &&
      [
        'all',
        'subterranean',
        'industrial',
        'underground-combat',
        'clandestine-gaming',
        'maritime-nocturne',
        'counter-culture',
        'urban-exploration',
        'after-hours',
        'urban-clubs',
        'itinerary'
      ].includes(route.subSection)
    ) {
      setActiveCategory(route.subSection as SubRosaCategory);
    }
  }, [initialSubPage, route.subSection]);

  const filteredDossiers =
    activeCategory === 'all'
      ? CLANDESTINE_DOSSIERS
      : CLANDESTINE_DOSSIERS.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] min-h-screen selection:bg-[#B98633]/30 selection:text-[#FAF7F0] pb-14">
      {/* 1. Hero Header — Multi-Slide Carousel across BOTH Sub-Pages and Main Hub */}
      {currentMeta ? (
        <section
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          className="relative min-h-[54vh] sm:min-h-[64vh] flex items-center justify-center overflow-hidden border-b border-[#20222B] pt-14 sm:pt-18 pb-16"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={`${activeCategory}-${sectorSlide}`}
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: [1.07, 1, 1.04] }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{
                  opacity: { duration: 0.9, ease: 'easeInOut' },
                  scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute inset-0"
              >
                <img
                  src={currentMeta.heroSlides[sectorSlide % currentMeta.heroSlides.length]?.image || currentMeta.heroImage}
                  alt={currentMeta.heroSlides[sectorSlide % currentMeta.heroSlides.length]?.title || currentMeta.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center brightness-105 contrast-105"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-transparent to-[#07080B]/75 hidden sm:block" />

            {/* Sector Carousel Navigation Arrows */}
            {currentMeta.heroSlides.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() =>
                    setSectorSlide((prev) => (prev - 1 + currentMeta.heroSlides.length) % currentMeta.heroSlides.length)
                  }
                  className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Previous sector view"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSectorSlide((prev) => (prev + 1) % currentMeta.heroSlides.length)}
                  className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Next sector view"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Sector Slide Indicators & Coordinates Counter */}
            {currentMeta.heroSlides.length > 1 && (
              <div className="absolute bottom-4 inset-x-0 z-20 flex flex-wrap items-center justify-center gap-3 px-4">
                <span className="font-mono text-[11px] tracking-widest text-[#E2BA6B] bg-[#07080B]/85 px-3 py-1 border border-[#232736] backdrop-blur-md tabular-nums">
                  0{(sectorSlide % currentMeta.heroSlides.length) + 1} / 0{currentMeta.heroSlides.length} ·{' '}
                  {currentMeta.heroSlides[sectorSlide % currentMeta.heroSlides.length]?.title} ·{' '}
                  <span className="text-[#8F98AA]">
                    {currentMeta.heroSlides[sectorSlide % currentMeta.heroSlides.length]?.coordinates}
                  </span>
                </span>
                <div className="flex gap-1.5">
                  {currentMeta.heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setSectorSlide(idx)}
                      aria-label={`View sector plate ${idx + 1}: ${slide.title}`}
                      className={`h-1.5 transition-all cursor-pointer ${
                        idx === sectorSlide % currentMeta.heroSlides.length
                          ? 'w-8 bg-[#E2BA6B]'
                          : 'w-2.5 bg-[#FAF7F0]/35 hover:bg-[#FAF7F0]/65'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 space-y-4 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8F98AA] tracking-wide mb-2 font-mono">
              <button onClick={() => navigateTo('home')} className="hover:text-[#FAF7F0] transition-colors">
                Home
              </button>
              <span className="text-[#8B672B]">/</span>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  navigateTo('hidden-london');
                }}
                className="hover:text-[#FAF7F0] transition-colors"
              >
                The Other Side of London
              </button>
              <span className="text-[#8B672B]">/</span>
              <span className="text-[#E2BA6B] font-medium">{currentMeta.title}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#E2BA6B]">
              <Radio className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span>{currentMeta.kicker}</span>
              <span className="text-[#8B672B]">·</span>
              <span className="text-[#D4D8E2] tabular-nums">{currentMeta.coordinates}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF7F0]">{currentMeta.title}</h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] max-w-3xl mx-auto">
              “{currentMeta.tagline}”
            </p>

            <p className="text-xs sm:text-base text-[#D4D8E2] max-w-3xl mx-auto leading-[1.75]">
              {currentMeta.lead}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openIntroductionModal(`Sub-Rosa Clearance: ${currentMeta.title}`)}
                className="btn-gold px-7 py-3 text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Sector Clearance</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  navigateTo('hidden-london');
                }}
                className="btn-outline-gold px-5 py-3 text-xs cursor-pointer"
              >
                ← View All 9 Sectors
              </button>
            </div>
          </motion.div>
        </section>
      ) : (
        <section
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          className="relative min-h-[54vh] sm:min-h-[64vh] flex items-center justify-center overflow-hidden border-b border-[#20222B] pt-14 sm:pt-18 pb-12"
        >
          {/* Animated Hero Carousel Background with Ken-Burns */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentHeroSlide}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: [1.08, 1, 1.04] }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{
                  opacity: { duration: 1.1, ease: 'easeInOut' },
                  scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute inset-0"
              >
                <img
                  src={CLANDESTINE_HERO_SLIDES[currentHeroSlide].image}
                  alt={CLANDESTINE_HERO_SLIDES[currentHeroSlide].title}
                  className="w-full h-full object-cover object-center brightness-105 contrast-105"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/45 to-[#08090C]/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/85 via-transparent to-[#08090C]/65 hidden sm:block" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#08090C_90%)]" />

            {/* Carousel Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
              <button
                type="button"
                onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + CLANDESTINE_HERO_SLIDES.length) % CLANDESTINE_HERO_SLIDES.length)}
                className="pointer-events-auto p-2.5 bg-[#08090C]/75 hover:bg-[#B98633] text-[#CFA85E] hover:text-[#08090C] border border-[#B98633]/30 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % CLANDESTINE_HERO_SLIDES.length)}
                className="pointer-events-auto p-2.5 bg-[#08090C]/75 hover:bg-[#B98633] text-[#CFA85E] hover:text-[#08090C] border border-[#B98633]/30 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators & Counter */}
            <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-3">
              <div className="px-2.5 py-1 bg-[#08090C]/80 border border-[#B98633]/30 text-[10px] tracking-widest text-[#DDB872] font-mono backdrop-blur-md">
                0{currentHeroSlide + 1} / 0{CLANDESTINE_HERO_SLIDES.length} · {CLANDESTINE_HERO_SLIDES[currentHeroSlide].title}
              </div>
              <div className="flex gap-1.5">
                {CLANDESTINE_HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentHeroSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 transition-all cursor-pointer ${
                      idx === currentHeroSlide ? 'w-8 bg-[#CFA85E]' : 'w-2 bg-[#F4F1EA]/30 hover:bg-[#F4F1EA]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
            <motion.div
              initial={{ opacity: 0.9, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2BA6B]"
            >
              <Radio className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span>The Sub-Rosa Network</span>
              <span className="text-[#8B672B]">·</span>
              <span className="text-[#D4D8E2]">London Clandestine Desk</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0.9, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-[#FAF7F0] text-balance"
            >
              The Other Side of London.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0.9, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
            >
              “Where ultra-wealthy principals go secretly—protected by connections, discretion, and SAS-trained security.”
            </motion.p>

            <motion.p
              initial={{ opacity: 0.9, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-xs sm:text-base text-[#D4D8E2] max-w-3xl mx-auto leading-[1.75]"
            >
              Beyond the quiet townhouses of Mayfair lies an exhilarating, raw London that few outsiders ever see: subterranean DJ & hip-hop concrete vaults with Maybach back-alley ingress, bare-knuckle railway arch sparring, clandestine £50k poker salons behind Soho shops, 02:00 AM Thames stealth sprints, and Churchill’s wartime bunkers. Protected under Director Julian Sterling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="pt-2 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={() => openIntroductionModal('Sub-Rosa & Clandestine London Inquiry')}
                className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Clandestine Allocation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('subrosa-explorer');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline-gold px-6 py-3.5 text-xs backdrop-blur-md cursor-pointer"
              >
                Explore 9 Secret Sectors ↓
              </button>
            </motion.div>
          </div>
        </section>
      )}

      <GoldDivider />

      {/* 2. Sticky Discipline Bar with 9 Complete Sectors + Rogue Protocol */}
      <section
        id="subrosa-explorer"
        className="sticky top-[64px] sm:top-[76px] z-30 bg-[#0A0C12]/95 backdrop-blur-md border-b border-[#232736] shadow-xl py-3 px-4 sm:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#E2BA6B] hidden xl:inline pr-3 border-r border-[#232736] whitespace-nowrap">
              Sanctum Sectors
            </span>

            {[
              { id: 'all' as const, label: `All (${CLANDESTINE_DOSSIERS.length})`, icon: null },
              { id: 'subterranean' as const, label: 'Subterranean & Bunkers', icon: Lock },
              { id: 'industrial' as const, label: 'Brutalist & Monoliths', icon: Compass },
              { id: 'underground-combat' as const, label: 'Underground Combat', icon: Zap },
              { id: 'clandestine-gaming' as const, label: 'Secret Gaming Salons', icon: Dice5 },
              { id: 'maritime-nocturne' as const, label: 'Thames Nocturne', icon: Anchor },
              { id: 'counter-culture' as const, label: 'Subversive Gastronomy', icon: Flame },
              { id: 'urban-exploration' as const, label: 'Restricted Heights & Rails', icon: Eye },
              { id: 'after-hours' as const, label: 'Bohemian Jazz Salons', icon: Radio },
              { id: 'urban-clubs' as const, label: 'Urban DJ & Hip-Hop Clubs', icon: Disc3 },
              { id: 'itinerary' as const, label: '007 Rogue Itinerary', icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id)}
                  className={`relative h-9 px-3 text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                    isActive
                      ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                      : 'text-[#D4D8E2] hover:text-[#FAF7F0] bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#07080B]' : 'text-[#E2BA6B]'}`} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[#8F98AA] shrink-0 whitespace-nowrap">
            <Shield className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span>Julian Sterling CP Active</span>
          </div>
        </div>
      </section>

      {/* Sub-Rosa Tactical Overview Banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 space-y-6">
        <div className="p-6 sm:p-8 bg-[#0D1017] border border-[#232736] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E2BA6B] block">
              The Edge of London · Protected Discretion
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              Why London’s Elite Explore the Edge Through TGLC
            </h2>
          </div>
          <p className="lg:col-span-7 text-xs sm:text-sm text-[#D4D8E2] leading-[1.75]">
            Ultra-wealthy principals frequently tire of the predictable hotel ballrooms and sanitized dining rooms of Central London. They crave the raw, edgy, authentic pulse of underground London—from 02:00 AM hip-hop sound vaults with headline DJs and back-alley Maybach arrivals, to railway arch fight rings and midnight river interceptors—experienced with ironclad security under Julian Sterling.
          </p>
        </div>

        {/* 4 Featured Sector Vignettes (including New Urban Sound & Hip-Hop Spotlight) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              img: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
              alt: 'Concrete Hip-Hop & DJ Nightlife Vault',
              tag: 'Sector 09 · Urban Sound',
              title: 'Hip-Hop Vaults & DJ Lofts',
              desc: 'Raw poured-concrete rooms with custom walnut horn stacks, touring vinyl selectors, street couture trunks, and locked Maybach alley entry.',
              category: 'urban-clubs' as const
            },
            {
              img: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
              alt: 'Underground Combat & Raw Arch Rings',
              tag: 'Sector 03 · Combat',
              title: 'Raw Pugilism & Arch Sparring',
              desc: 'Unsanctioned boxing exhibitions and closed railway arch sparring where former champions trade rounds behind locked shutters under SAS protection.',
              category: 'underground-combat' as const
            },
            {
              img: '/assets/aistudio/meard_poker_sanctum.jpg',
              alt: 'Clandestine High-Roller Gaming',
              tag: 'Sector 04 · High-Roller Gaming',
              title: 'Soho High-Stakes Card Sanctums',
              desc: 'Fifty-thousand-pound buy-ins behind antique shop doors. European croupiers, Faraday signal shielding, and trust-account settlements.',
              category: 'clandestine-gaming' as const
            },
            {
              img: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
              alt: 'Nocturne River Stealth & Interceptor Sprints',
              tag: 'Sector 05 · River Stealth',
              title: '02:00 AM Thames Interceptors',
              desc: 'Matte-black twin-engine speed launches planing past illuminated bridges to abandoned Isle of Dogs drydocks for private open-fire feasts.',
              category: 'maritime-nocturne' as const
            },
          ].map((tile, idx) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setActiveCategory(tile.category)}
              className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-colors overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={tile.img}
                  alt={tile.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">{tile.tag}</span>
                <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#F0CC83] transition-colors">{tile.title}</h3>
                <p className="text-xs text-[#D4D8E2] leading-relaxed">{tile.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* 3. Itinerary Timeline OR Clandestine Dossiers */}
      {activeCategory === 'itinerary' ? (
        <section className="py-10 sm:py-12 px-5 sm:px-8 max-w-7xl mx-auto">
          <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#E2BA6B] font-medium block">
              Curated Nocturne Schedule · Confidential
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
              The 007 Rogue London Protocol
            </h2>
            <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
              A dusk-to-dawn movement linking London’s quietest cellars, concrete urban bass vaults, underground combat rings, Thames speed arteries, and dawn brutalist rooftops under elite close-protection escort.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[#8B672B]/50 before:to-transparent">
            {ROGUE_ITINERARY.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 items-start sm:items-center ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#08090C] border-2 border-[#CFA85E] flex items-center justify-center z-10">
                  <span className="text-[10px] text-[#CFA85E] font-semibold tabular-nums">0{idx + 1}</span>
                </div>

                <div className="w-full sm:w-[calc(50%-3rem)] pl-12 sm:pl-0">
                  <div className="p-6 sm:p-8 bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-all duration-300 shadow-xl space-y-4 group">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-[#CFA85E] font-semibold px-2.5 py-0.5 bg-[#181A22] border border-[#8B672B] tabular-nums">
                        {step.time} Hours
                      </span>
                      <span className="text-[11px] tracking-wider text-[#9C968A]">{step.codename}</span>
                    </div>

                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#181A22] border border-[#242630]">
                      <img
                        src={step.asset}
                        alt={step.action}
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#CFA85E] block mb-1">
                        {step.location}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] group-hover:text-[#DDB872] transition-colors">
                        {step.action}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed mt-2 font-light">
                        {step.detail}
                      </p>
                      <div className="mt-3 pt-3 border-t border-[#20222B] flex items-center gap-2 text-[11px] text-[#CFA85E]">
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-light">{step.securityNote}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => openIntroductionModal('007 Rogue London Nocturne Full Itinerary Charter')}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Commission Complete Nocturne Protocol</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      ) : (
        <section className="py-10 sm:py-12 px-5 sm:px-8 max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#20232E]">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] tabular-nums">
                Sub-Rosa Dossiers · {filteredDossiers.length} Active Practices
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                {activeCategory === 'all' && 'The Complete Clandestine Inventory'}
                {activeCategory === 'subterranean' && 'Subterranean Citadels & Historic Bank Vaults'}
                {activeCategory === 'industrial' && 'Brutalist Penthouses & Underground Ateliers'}
                {activeCategory === 'underground-combat' && 'Underground Combat & Raw Arch Rings'}
                {activeCategory === 'clandestine-gaming' && 'Secret High-Stakes Gaming & Clandestine Salons'}
                {activeCategory === 'maritime-nocturne' && 'Thames Nocturne Stealth Interceptors'}
                {activeCategory === 'counter-culture' && 'Counter-Culture High Gastronomy & Supper Clubs'}
                {activeCategory === 'urban-exploration' && 'Forbidden Urban Heights & Restricted Rails'}
                {activeCategory === 'after-hours' && 'Clandestine Bohemian Jazz & Society Salons'}
                {activeCategory === 'urban-clubs' && 'Urban Sound, DJ & Hip-Hop Sanctums'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D4D8E2] max-w-md leading-relaxed">
              Each address operates behind strict discretion protocols and personal security escort. Open any full dossier for ingress details.
            </p>
          </div>

          <div className="space-y-10">
            {filteredDossiers.map((dossier) => {
              const ext = getExtendedIntel(dossier);
              return (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-all duration-300 shadow-2xl overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 flex flex-col justify-between bg-[#07080B]">
                    <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[430px] overflow-hidden">
                      <img
                        src={dossier.image}
                        alt={dossier.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0D1017]/75" />

                      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none font-mono text-[10px]">
                        <div className="bg-[#07080B]/85 backdrop-blur-md px-3 py-1.5 border border-[#8B672B]/60 flex items-center gap-2">
                          <Crosshair className="w-3.5 h-3.5 text-[#E2BA6B]" />
                          <span className="uppercase tracking-widest text-[#E2BA6B] tabular-nums">
                            {dossier.gridCoordinates}
                          </span>
                        </div>
                        <span className="bg-[#07080B]/85 backdrop-blur-md px-2.5 py-1 text-[#D4D8E2]">
                          {dossier.clearanceLevel} · {ext.gallery.length} Photographs
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/88 backdrop-blur-md p-4 border border-[#232736]">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block mb-1">
                          Insider Whisper
                        </span>
                        <p className="font-serif italic text-sm sm:text-base text-[#FAF7F0]">
                          “{dossier.insiderWhisper}”
                        </p>
                      </div>
                    </div>

                    {/* Interactive Preview Gallery Strip */}
                    <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-[#0A0C12] border-t border-[#202432]">
                      {ext.gallery.map((g, gIdx) => (
                        <button
                          key={gIdx}
                          type="button"
                          onClick={() => {
                            setDetailModalDossier(dossier);
                            setModalGalleryIndex(gIdx);
                          }}
                          className="relative aspect-[16/9] overflow-hidden border border-[#232736] hover:border-[#E2BA6B] transition-colors cursor-pointer group/thumb"
                          aria-label={`Inspect photo ${gIdx + 1} of ${dossier.title}`}
                        >
                          <img
                            src={g.image}
                            alt={g.caption}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover brightness-95 group-hover/thumb:brightness-110 group-hover/thumb:scale-105 transition-all duration-300"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] mb-2">
                        <span className="uppercase tracking-[0.2em] text-[#E2BA6B]">
                          {dossier.kicker}
                        </span>
                        <span className="text-[#8B672B]">·</span>
                        <span className="text-[#8F98AA]">
                          {dossier.categoryLabel}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF7F0] mb-3 leading-snug group-hover:text-[#E2BA6B] transition-colors">
                        {dossier.title}
                      </h3>

                      <p className="font-serif italic text-base text-[#E2BA6B] mb-4">“{dossier.tagline}”</p>

                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-[1.75] mb-5">
                        {dossier.intelBrief}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-t border-b border-[#232736] text-xs">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block mb-0.5">
                            Timing Window
                          </span>
                          <span className="text-[#FAF7F0] tabular-nums">{ext.timingWindow}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block mb-0.5">
                            Capacity & Dress Code
                          </span>
                          <span className="text-[#FAF7F0]">{ext.groupCapacity} · {dossier.dressCode}</span>
                        </div>
                      </div>

                      <div className="pt-4 p-3.5 bg-[#07080B] border border-[#232736] text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-[#E2BA6B] font-mono text-[10px] uppercase tracking-wider font-semibold">
                          <Shield className="w-3 h-3" />
                          <span>Tactical Risk Mitigation</span>
                        </div>
                        <p className="text-[11px] text-[#D4D8E2] leading-relaxed">
                          {dossier.riskMitigation}
                        </p>
                      </div>

                      <div className="pt-5 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block mb-2">
                          Guaranteed Deliverables:
                        </span>
                        {dossier.deliverables.map((del, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#D4D8E2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#232736] flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openIntroductionModal(`Inquiry regarding ${dossier.title}`)}
                        className="btn-gold px-6 py-3 text-xs inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Request Clearance</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openDossierModal(dossier)}
                        className="btn-outline-gold px-4 py-3 text-xs cursor-pointer"
                      >
                        Full Dossier Intel ({ext.gallery.length} Photos) →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </section>
      )}

      <GoldDivider />

      {/* 5. Clandestine Dispatch Banner */}
      <section className="py-10 sm:py-14 px-5 sm:px-8 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-t border-[#232736]">
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#E2BA6B] font-medium block">
            Sub-Rosa Private Line Authority · Mayfair HQ
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight">
            Need immediate access to an unlisted room or tactical escort?
          </h2>

          <p className="text-xs sm:text-base text-[#D4D8E2] max-w-xl mx-auto leading-relaxed">
            Our London directors and Julian Sterling’s security desk stay on call day and night with direct keys to private vaults, concrete DJ & hip-hop sound rooms, underground combat rings, and river piers.
          </p>

          <div className="p-4 max-w-md mx-auto bg-[#0D1017] border border-[#232736] flex items-center justify-center gap-3 text-xs">
            <Key className="w-4 h-4 text-[#E2BA6B]" />
            <span className="text-[#8F98AA] font-mono">Direct Line:</span>
            <span className="text-[#FAF7F0] font-semibold font-mono text-sm tabular-nums">{TGLC_CONTACT.telephone}</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal('Immediate Clandestine Dispatch Request')}
              className="btn-gold px-8 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Transmit Discreet Request</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigateTo('home')} className="btn-outline-gold px-6 py-3.5 text-xs cursor-pointer">
              Return to Overview
            </button>
          </div>
        </motion.div>
      </section>

      {/* 6. Full Dossier Modal with Multi-Photo Gallery Switcher & Deep Intel */}
      <AnimatePresence>
        {detailModalDossier && (() => {
          const modalExt = getExtendedIntel(detailModalDossier);
          const activePhoto = modalExt.gallery[modalGalleryIndex % modalExt.gallery.length] || modalExt.gallery[0];
          return (
          <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl bg-[#0D1017] border border-[#E2BA6B]/60 p-6 sm:p-10 shadow-2xl relative space-y-6 my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setDetailModalDossier(null)}
                className="absolute top-4 right-4 p-2 text-[#8F98AA] hover:text-[#E2BA6B] focus:outline-none cursor-pointer"
                aria-label="Close dossier"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#E2BA6B] border-b border-[#232736] pb-3">
                <FileText className="w-4 h-4" />
                <span className="uppercase tracking-widest">
                  TGLC House Intelligence Briefing · {detailModalDossier.categoryLabel}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] tabular-nums block mb-1">
                  {detailModalDossier.gridCoordinates} · {detailModalDossier.clearanceLevel}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                  {detailModalDossier.title}
                </h3>
                <p className="font-serif italic text-lg text-[#E2BA6B] mt-1">
                  “{detailModalDossier.tagline}”
                </p>
              </div>

              {/* Interactive Multi-Photo Gallery Viewer */}
              <div className="space-y-3">
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#07080B] border border-[#232736] relative">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105"
                  />
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#D4D8E2]">
                  {activePhoto.caption}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {modalExt.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalGalleryIndex(idx)}
                      className={`aspect-[16/9] overflow-hidden border transition-all cursor-pointer ${
                        idx === modalGalleryIndex % modalExt.gallery.length
                          ? 'border-[#E2BA6B] ring-1 ring-[#E2BA6B]'
                          : 'border-[#232736] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Operational Spec Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-[#07080B] border border-[#232736]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">Timing Window</span>
                  <span className="text-[#FAF7F0] mt-1 block tabular-nums">{modalExt.timingWindow}</span>
                </div>
                <div className="p-3.5 bg-[#07080B] border border-[#232736]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">Group Capacity</span>
                  <span className="text-[#E2BA6B] mt-1 block tabular-nums">{modalExt.groupCapacity}</span>
                </div>
                <div className="p-3.5 bg-[#07080B] border border-[#232736]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">Dress Standard</span>
                  <span className="text-[#FAF7F0] mt-1 block">{detailModalDossier.dressCode}</span>
                </div>
              </div>

              {/* Extended Multi-Paragraph Briefing */}
              <div className="space-y-4 text-xs sm:text-sm text-[#D4D8E2] leading-[1.8]">
                <p>{detailModalDossier.intelBrief}</p>
                {detailModalDossier.deepNarrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p>{modalExt.extraNarrative}</p>
              </div>

              {/* Ingress & Culinary Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#07080B] border border-[#232736] space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
                    Arrival & Exfiltration Sequence
                  </span>
                  <p className="text-[#D4D8E2] leading-relaxed">{modalExt.ingressProtocol}</p>
                </div>
                <div className="p-4 bg-[#07080B] border border-[#232736] space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] block">
                    Cellar, Culinary & Spatial Notes
                  </span>
                  <p className="text-[#D4D8E2] leading-relaxed">{modalExt.culinaryNotes}</p>
                  <p className="text-[#8F98AA] leading-relaxed pt-1">{modalExt.architecturalNotes}</p>
                </div>
              </div>

              <div className="p-4 bg-[#07080B] border border-[#232736] space-y-2">
                <div className="flex items-center gap-2 text-[#E2BA6B]">
                  <Shield className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold block">
                    Security Directive & Tactical Escort Protocol
                  </span>
                </div>
                <p className="text-xs text-[#D4D8E2]">
                  {detailModalDossier.securityProtocol}. Coordinated strictly through pre-verified registration, SAS-trained security lead escort, and counter-surveillance sweep.
                </p>
                <p className="text-xs text-[#E2BA6B] pt-1">
                  <strong>Risk Mitigation:</strong> {detailModalDossier.riskMitigation}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase tracking-widest text-[#DDB872] block mb-2">
                  Guaranteed Consortium Deliverables:
                </span>
                {detailModalDossier.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D9D4CA] font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#CFA85E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#242630] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const name = detailModalDossier.title;
                    setDetailModalDossier(null);
                    openIntroductionModal(`Inquiry regarding ${name}`);
                  }}
                  className="btn-gold px-6 py-3 text-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Ingress Clearance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDetailModalDossier(null)}
                  className="px-4 py-3 text-xs uppercase tracking-widest text-[#9C968A] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
