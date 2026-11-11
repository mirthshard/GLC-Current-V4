import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { GoldDivider } from '../common/GoldDivider';
import {
  Compass,
  Plane,
  Clock,
  Shield,
  MapPin,
  ArrowUpRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  Calendar,
  Search,
  Eye,
  Radio,
  Lock,
} from 'lucide-react';

export type CaseStudyCategory =
  | 'all'
  | 'ultra-luxury'
  | 'hidden-london'
  | 'aviation-yacht'
  | 'culture-sourcing'
  | 'security-convoy';

export interface ItineraryStop {
  time: string;
  title: string;
  location: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  category: CaseStudyCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  heroImage: string;
  clientProfile: string;
  challenge: string;
  solution: string;
  testimonial: string;
  clientQuoteAuthor: string;
  itinerary: ItineraryStop[];
  highlights: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    category: 'ultra-luxury',
    categoryLabel: 'Ultra-Luxury & Estates',
    title: 'The Transatlantic Sovereign Summit & RAF Northolt Wheels-Up',
    subtitle: 'From a private breakfast in Eaton Square to Manhattan penthouse helipad in under eight hours.',
    location: 'London Belgravia ➔ RAF Northolt ➔ Teterboro & Manhattan',
    duration: '24-Hour Sovereign Transfer',
    heroImage: '/assets/aistudio/private_jet_interior_suite.jpg',
    clientProfile: 'Chairman of a global technology investment consortium & family delegation',
    challenge: 'Principal required simultaneous multi-party road transfers, pre-cleared diplomatic luggage handling, and unlisted transatlantic heavy jet departure on three hours notice following an unscheduled corporate buyout in London.',
    solution: 'Julian Sterling coordinated with RAF Northolt VIP Apron Gate 4 for immediate wheels-up slot allocation on Bombardier Global 7500 (G-TGLC). Luggage pre-cleared by close protection detail while an unmarked B6 Range Rover SV convoy provided a 22-minute blue-light escorted corridor from Belgravia.',
    testimonial: '“TGLC removed every seam of friction. We stepped from the mews arch directly into our cabin seats without ever entering a public facility or queue. Extraordinary precision.”',
    clientQuoteAuthor: 'Managing Partner, London & New York',
    highlights: ['Bombardier Global 7500 FL450 supersonic transatlantic corridor', 'Bespoke Mayfair cold collation & rare Meursault decanted onboard', 'Helicopter transfer from Teterboro direct to West 30th Street Heliport'],
    itinerary: [
      { time: '08:15', title: 'Belgravia Mews Departure', location: 'Eaton Square, Belgravia W1', description: 'Two matched Range Rover SV Sentinel vehicles hold at mews arch. Luggage pre-screened and loaded into forward cargo hold.' },
      { time: '08:42', title: 'Tarmac Handshake at RAF Northolt', location: 'EGWU VIP Apron Gate 4', description: 'Direct apron vehicle access right to airstairs. Diplomatic passports stamped onboard by accredited border liaison.' },
      { time: '09:05', title: 'Wheels Up · Flight TGLC-01', location: 'London to New York Flight Path', description: 'Climb directly to FL430. Private cabin partitioned into stateroom and executive conference lounge.' },
      { time: '11:45 EST', title: 'Touchdown & Manhattan Skylink', location: 'Teterboro Airport ➔ West 30th St', description: 'Sikorsky S-76 helicopter waiting at adjacent pad for five-minute transit to Manhattan rooftop.' }
    ]
  },
  {
    id: 'cs-02',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Sub-Rosa Thames Interceptor & 300-Year Bullion Vault Banquet',
    subtitle: 'A midnight blacked-out stealth launch under Tower Bridge into candlelit subterranean catacombs.',
    location: 'Wapping Pier to Square Mile Underground Catacombs',
    duration: 'Nocturne (21:30 – 03:00)',
    heroImage: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    clientProfile: 'Visiting Swiss private banking family & international art collectors',
    challenge: 'Clients desired an authentic, edgy, adrenaline-fuelled nocturnal experience that conventional luxury concierges deem impossible or too legally complex.',
    solution: 'Secured an ex-special forces 45ft matte-black stealth interceptor with silenced twin V8s. Following an exhilarating high-speed Thames run past nocturnal London docks, the party was met by Julian Sterling’s team at a derelict wharf and escorted through an unmarked subterranean steel vault door into 18th-century bullion catacombs for a private six-course feast.',
    testimonial: '“This showed us a London that 99% of people never know exists. The combination of speed on the river and absolute silence forty feet underground was hauntingly beautiful.”',
    clientQuoteAuthor: 'Principal Trustee, Geneva Private Office',
    highlights: ['Matte-black twin-engine stealth vessel licensed for night navigation', 'Descend through 20-ton bank-grade steel vault blast door', 'Six-course tasting menu paired with 1982 Armagnacs by candlelight'],
    itinerary: [
      { time: '21:30', title: 'Unmarked Mews Extraction', location: 'Mount Street, Mayfair', description: 'Private chauffeur transfer to secluded east London maritime embarkation slip.' },
      { time: '22:15', title: 'Thames Nocturne Stealth Run', location: 'Tower Bridge to Greenwich Reach', description: 'Blacked-out twin-engine sprint beneath London bridges with tactical helmsman.' },
      { time: '23:30', title: 'Bullion Catacombs Descent', location: 'Historic City Financial Vaults', description: 'Entry through subterranean reinforced blast door into 18th-century vaulted stone chambers.' },
      { time: '02:00', title: 'Subterranean Cellar Tasting', location: 'Private Archival Wine Cellar', description: 'Unopened allocations of pre-phylloxera Madeira and single-estate cigars under vaulted brickwork.' }
    ]
  },
  {
    id: 'cs-03',
    category: 'culture-sourcing',
    categoryLabel: 'Culture, Arts & Horology',
    title: 'The Uffizi Vasari Corridor Private Keyholder Residency',
    subtitle: 'Closed-door after-hours access through the secret elevated corridor of the Medici Grand Dukes.',
    location: 'Piazza della Signoria, Palazzo Vecchio & Florence Oltrarno',
    duration: '3-Day Residency Itinerary',
    heroImage: '/assets/aistudio/florence_palazzo_courtyard.jpg',
    clientProfile: 'American museum trustee & European Renaissance art patron',
    challenge: 'The historic Vasari Corridor had been closed for extensive restorations; client sought exclusive private transit from Palazzo Vecchio across the Ponte Vecchio to the Boboli Gardens without museum crowds.',
    solution: 'Dr. Helena Zhang-Somerset negotiated after-hours ministerial access with the Soprintendenza Archeologia Belle Arti. Accompanied by the Senior Conservator, the family walked the 1-kilometre elevated corridor in total privacy, followed by an acoustic lute recital inside a privately opened Renaissance chapel.',
    testimonial: '“To stand alone in the Vasari Corridor as dusk settled over the Arno, with keys that opened doors closed for centuries, was unforgettable. TGLC’s cultural credentials are peerless.”',
    clientQuoteAuthor: 'Patron of Renaissance Antiquities',
    highlights: ['Closed-door keyholder passage above the Ponte Vecchio', 'Private access to the Medici self-portrait collection', 'Candlelit supper in private Palazzo cloister with rare Brunello'],
    itinerary: [
      { time: '17:30', title: 'Private Palazzo Pickup', location: 'Borgo Pinti Garden Suite', description: 'Discreet transfer in unmarked Maserati Quattroporte to Palazzo Vecchio rear portico.' },
      { time: '18:15', title: 'Keyholder Entrance to Vasari Corridor', location: 'Palazzo Vecchio Secret Passage', description: 'Private keys turned by Italian Ministry conservator; exclusive private traversal above the Arno.' },
      { time: '20:00', title: 'Exit into Boboli Grottoes', location: 'Pitti Palace Private Courtyard', description: 'Emerge into illuminated Medici gardens with private security escort waiting.' },
      { time: '21:00', title: 'Cloister Supper at Four Seasons', location: 'Firenze Private Garden Alcove', description: 'Bespoke tasting menu curated by Executive Chef Vito Mollica with 2004 Soldera Brunello.' }
    ]
  },
  {
    id: 'cs-04',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The East End Arches Underground Fight Club & High-Roller Speakeasy',
    subtitle: 'Ringside in raw Victorian brick arches under heavy security escort, followed by unlisted gaming.',
    location: 'Bethnal Green Railway Arches & Shoreditch Sub-Basements',
    duration: 'Night Event (20:00 – 02:30)',
    heroImage: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    clientProfile: 'High-net-worth venture founder & international sports team owner',
    challenge: 'Client wanted to witness London’s legendary raw boxing heritage in an edgy, underground industrial setting—an environment where ultra-wealthy principals require discreet, battle-tested protective security.',
    solution: 'Julian Sterling stationed two senior SIA close-protection officers in sharp dark tailoring to accompany the client into an unlisted historic railway arch hosting an invitation-only boxing showcase. Following the fights, the party was escorted into a hidden subterranean high-stakes gaming den behind a commercial dry cleaner.',
    testimonial: '“The energy was electrifying. I felt completely safe the entire evening while being right in the thick of a world you never get to see through ordinary channels.”',
    clientQuoteAuthor: 'Tech Founder & Investor, Silicon Valley',
    highlights: ['Front-row ringside staging inside closed Victorian railway arch', 'Two close-protection officers with discreet counter-surveillance', 'Secret doorway entry to high-roller backroom with £50k table stakes'],
    itinerary: [
      { time: '20:00', title: 'Tactical Chauffeur Staging', location: 'The Ned, City of London', description: 'Armoured Mercedes-Maybach transfer with close protection driver to east London perimeter.' },
      { time: '20:45', title: 'Railway Arch Invitation Check', location: 'Bethnal Green Arches', description: 'Password verified at heavy iron door; escorted to private mezzanine overlooking raw boxing ring.' },
      { time: '23:15', title: 'Ringside Champagne & Purse Wagering', location: 'Underground Ring Perimeter', description: 'Chilled Krug champagne served in crystal while watching Olympic-tier exhibition bouts.' },
      { time: '00:30', title: 'Dry Cleaner Secret Doorway Passage', location: 'Shoreditch Sub-Level', description: 'Passage through false refrigeration door into confidential high-roller backroom poker salon.' }
    ]
  },
  {
    id: 'cs-05',
    category: 'ultra-luxury',
    categoryLabel: 'Ultra-Luxury & Estates',
    title: 'Wimbledon Centre Court Debentures & Royal Box Hospitality',
    subtitle: 'The pinnacle of the English summer social season with private car access right to Gate 4.',
    location: 'All England Lawn Tennis Club, Church Road, Wimbledon SW19',
    duration: 'Full Championship Day (10:30 – 21:00)',
    heroImage: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
    clientProfile: 'Sovereign family visiting from the Gulf with teenage tennis aspiring juniors',
    challenge: 'Securing prime Centre Court Debenture seats for Men’s Semi-Finals day with private hospitality lounge access and direct car park access avoiding Wimbledon Village gridlock.',
    solution: 'TGLC deployed our permanent Centre Court debenture allocation with reserved seats right behind the Royal Box. Chauffeur utilized police-priority car park passes for Gate 4. In the Debenture Lounge, a private dining table was held all afternoon with unlimited vintage champagne and Kentish strawberries.',
    testimonial: '“The view of the baseline was majestic, but the true luxury was the effortless exit into our Range Rover waiting twenty yards from the gate while thousands waited for taxis.”',
    clientQuoteAuthor: 'Family Office Principal, Abu Dhabi',
    highlights: ['Tier-1 Debenture tickets with Royal Box sightlines', 'Dedicated private dining suite with vintage Pol Roger', 'Gate 4 priority parking pass with Met Police traffic clearance'],
    itinerary: [
      { time: '10:30', title: 'Belgravia Chauffeur Departure', location: 'Eaton Square Mews', description: 'Range Rover SV departs via South Kensington and Putney Common with priority route clearance.' },
      { time: '11:15', title: 'Arrival at Gate 4 Debenture Portal', location: 'AELTC Church Road Gate 4', description: 'Direct walking access through private Debenture turnstiles into the Champions Lounge.' },
      { time: '12:30', title: 'Three-Course Debenture Luncheon', location: 'The Renshaw Dining Room', description: 'Chilled poached native lobster, English asparagus, and vintage champagne.' },
      { time: '13:45', title: 'Centre Court Play Commences', location: 'Centre Court Gangway 204', description: 'Front-tier debenture seating with unrestricted court baseline angles for five-set championship play.' }
    ]
  },
  {
    id: 'cs-06',
    category: 'ultra-luxury',
    categoryLabel: 'Ultra-Luxury & Estates',
    title: 'The Cotswolds Estate Autumn Shoot & Multi-Generational Retreat',
    subtitle: 'Turnkey staffing, private gamekeeper, and helicopter transfer from Battersea Heliport.',
    location: 'Battersea Heliport to Daylesford & Gloucestershire Estate',
    duration: '4-Day Weekend Charter',
    heroImage: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    clientProfile: 'British-American industrial family gathering 14 members across three generations',
    challenge: 'A historic 1,200-acre estate required full domestic re-staffing, fire logs laid, heating calibrated, gamekeeper briefings, and sporting clays organized for novice family members.',
    solution: 'Camilla Vance-Moreau dispatched our estate advance team 48 hours prior. Two AgustaWestland AW109 helicopters transferred the family from Battersea to the estate lawn in 28 minutes. A team of four chefs, three housekeepers, and senior gamekeepers oversaw private shoots and fireside suppers.',
    testimonial: '“Everything was orchestrated to perfection. Walking into the great hall with fires blazing, beds made with Italian linen, and a bespoke shoot planned for the boys was magnificent.”',
    clientQuoteAuthor: 'Industrial Group Chairman',
    highlights: ['Two twin-engine AgustaWestland helicopters from Battersea', 'Twelve-gun private shoot with master loaders and gunsmiths', 'Private cellar sommelier and organic estate feast in candlelit barn'],
    itinerary: [
      { time: '14:00', title: 'Battersea Heliport VIP Lounge', location: 'Bridges Court, London SW11', description: 'Fast-track luggage boarding directly onto twin AgustaWestland helicopters.' },
      { time: '14:32', title: 'Lawn Landing in the Cotswolds', location: 'Gloucestershire Manor Parkland', description: 'Gentle touchdown on private south lawn. Butler team waiting with warm refreshments.' },
      { time: '16:00', title: 'Gun Fitting & Simulator Practice', location: 'Estate Walled Gun Room', description: 'Master gunsmith from Purdey fits custom 20-bore side-by-sides for all shooters.' },
      { time: '20:00', title: 'Fireside Game Feast', location: 'Great Oak Dining Hall', description: 'Roast venison and game terrine with 1996 Chateau Latour decanted over open hearth.' }
    ]
  },
  {
    id: 'cs-07',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Secret High-Stakes Poker Salon in Soho & Subterranean Jazz Den',
    subtitle: 'Behind an unassuming tailor shop, £100,000 table stakes, armed discreet protection, and rare Japanese whisky.',
    location: 'Berwick Street Alleyways, Soho W1',
    duration: 'Night Session (22:00 – 04:30)',
    heroImage: '/assets/aistudio/tglc_st_james_salon.jpg',
    clientProfile: 'International poker enthusiast & hedge fund founder',
    challenge: 'Client wanted a true private high-stakes poker game away from commercial Mayfair casinos, requiring elite security vetting and guaranteed privacy.',
    solution: 'Introduced client to a private club held inside a restored Georgian townhouse basement behind a Savile Row cloth merchant. Julian Sterling assigned close-protection officers stationed at discreet entry and exit perimeters, while the client played alongside sovereign principals and elite players.',
    testimonial: '“The atmosphere was straight out of a classic spy thriller. Top-tier cards, incredible cigars, and total discretion.”',
    clientQuoteAuthor: 'Quantitative Fund CIO',
    highlights: ['Private invitation-only game with zero commercial casino rake', 'Armoured Range Rover extraction on standby 24/7', 'Private Japanese barman serving Karuizawa and Yamazaki 25'],
    itinerary: [
      { time: '22:00', title: 'Alleyway Discrete Drop-Off', location: 'Hopkins Street, Soho', description: 'Unmarked luxury Sprinter pulls up; security agent verifies street clearance.' },
      { time: '22:15', title: 'Secret Mirror Door Access', location: 'Merchant Sub-Level', description: 'Passage through false fabric rack into oak-lined cardroom with vintage felt tables.' },
      { time: '01:00', title: 'Midnight Smoked Wagyu Supper', location: 'Private Banquette Lounge', description: 'A5 Wagyu sliders and vintage champagne delivered tableside.' },
      { time: '04:15', title: 'Secure Cashier Settlement & Convoy Exit', location: 'Private Rear Loading Mews', description: 'Discreet wire settlement and direct vehicle loading away from public eyes.' }
    ]
  },
  {
    id: 'cs-08',
    category: 'aviation-yacht',
    categoryLabel: 'Aviation & Superyacht',
    title: 'Monaco Grand Prix Sovereign Berth & Superyacht Tender',
    subtitle: 'A 55-metre tri-deck motor yacht berthed trackside on Quay des États-Unis in Port Hercule.',
    location: 'Nice Côte d’Azur Airport (LFMN) ➔ Port Hercule, Monaco',
    duration: '5-Day Grand Prix Weekend',
    heroImage: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    clientProfile: 'Motorsport patron & global real estate magnate',
    challenge: 'Trackside yacht berths in Monaco sell out eighteen months ahead; client needed a prime Zone 1 berth overlooking the chicane on six weeks notice.',
    solution: 'TGLC mobilized our direct superyacht brokerage network to secure a 55m Benetti yacht with guaranteed trackside mooring directly facing the Nouvelle Chicane. Coordinated Monacair helicopter transfers from Nice, Michelin-starred guest chefs onboard, and access to the F1 Paddock Club.',
    testimonial: '“Drinking champagne on the sundeck as the cars blasted past twenty feet away was the highlight of our sporting year. Unbelievable access.”',
    clientQuoteAuthor: 'Real Estate Managing Director',
    highlights: ['Prime trackside Quay des États-Unis superyacht mooring', 'Private helicopter transfer from Nice tarmac in seven minutes', 'Exclusive evening yacht parties with resident DJ and caviar service'],
    itinerary: [
      { time: '11:00', title: 'Nice Airport Tarmac Helicopter Transfer', location: 'LFMN Helipad', description: 'Direct helicopter boarding from private jet steps; scenic coast flight into Monaco Heliport.' },
      { time: '11:30', title: 'Superyacht Tender Handover', location: 'Monaco Outer Breakwater', description: 'Wajer 38 chase boat brings party to 55m Benetti trackside berth in Port Hercule.' },
      { time: '14:00', title: 'Qualifying Session Viewing', location: 'Sundeck Chicane Lounge', description: 'Unmatched acoustic roar as Formula 1 cars negotiate the chicane below the bow.' },
      { time: '21:00', title: 'Sovereign Evening Soirée', location: 'Aft Bridge Deck', description: 'Tasting of Beluga Imperial caviar and Dom Pérignon with acoustic live jazz ensemble.' }
    ]
  },
  {
    id: 'cs-09',
    category: 'culture-sourcing',
    categoryLabel: 'Culture, Arts & Horology',
    title: 'The Royal Opera House Grand Tier Box & Maestro Private Salon',
    subtitle: 'Curtain up from Box 12, private interval drawing room, and maestro introductions in Covent Garden.',
    location: 'Bow Street, Covent Garden, London WC2E',
    duration: 'Evening Performance (18:30 – 23:30)',
    heroImage: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    clientProfile: 'European arts philanthropist & family celebrating a milestone anniversary',
    challenge: 'Client requested the premier Grand Tier Box for a sold-out staging of Puccini’s Tosca, complete with private interval supper in an anteroom and introductions to the lead soprano.',
    solution: 'TGLC holds direct institutional patronage privileges at Covent Garden. Arranged Grand Tier Box 12 with exclusive access to the adjoining private salon. Pre-set with white lilies, crystal flutes of Taittinger Comtes de Champagne, and cold canapés. Arranged post-performance introduction with the music director.',
    testimonial: '“The private drawing room behind the box made the evening feel like a 19th-century salon. An utterly sublime London experience.”',
    clientQuoteAuthor: 'Cultural Philanthropist, Zurich & London',
    highlights: ['Grand Tier Box 12 with direct private anteroom salon', 'Chauffeured Rolls-Royce Phantom staged at Bow Street private stage door', 'Exclusive post-curtain stage tour and conductor introduction'],
    itinerary: [
      { time: '18:30', title: 'Bow Street Private Entrance', location: 'ROH Bow Street Portico', description: 'Escorted past public foyer straight up private staircase to Grand Tier Box 12.' },
      { time: '19:30', title: 'Act I Curtain Up', location: 'Grand Tier Front Row', description: 'Flawless sightlines and acoustic resonance from the premier horseshoe tier.' },
      { time: '20:45', title: 'Interval Supper in Private Drawing Room', location: 'Box 12 Private Salon', description: 'Chilled Krug champagne, Scottish langoustines, and artisan chocolates.' },
      { time: '22:30', title: 'Stage Door Maestro Introduction', location: 'Conductor Dressing Suite', description: 'Private toast with the musical director and inspection of the historic orchestral pit.' }
    ]
  },
  {
    id: 'cs-10',
    category: 'ultra-luxury',
    categoryLabel: 'Ultra-Luxury & Estates',
    title: 'Goodwood Revival Drivers Club Paddock & Historic Racing Hypercars',
    subtitle: 'Access to the inner sanctum of historic motorsport dressed in authentic 1950s tweed tailoring.',
    location: 'Goodwood Motor Circuit, Chichester, West Sussex',
    duration: '2-Day Racing Festival',
    heroImage: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    clientProfile: 'Automobile collector & historic racing driver',
    challenge: 'Access to the restricted Drivers Club and paddock areas at Goodwood Revival requires formal team or owner accreditation; client wanted his family embedded in the pit lane.',
    solution: 'Secured full Driver Paddock passes through our partnerships with historic Ferrari and Jaguar racing teams. Commissioned period-accurate tailored tweeds from Savile Row cutters, arranged helicopter shuttles from Battersea directly to the Goodwood infield, and staged a 1957 Ferrari 250 Testa Rossa for client inspection.',
    testimonial: '“Walking the pit lane beside Sir Jackie Stewart and having coffee in the drivers’ mess was the ultimate dream for my father and sons.”',
    clientQuoteAuthor: 'Automotive Collector & Investor',
    highlights: ['Restricted Drivers Club and Pit Lane accreditation', 'Period-correct Savile Row bespoke suits crafted in 4 weeks', 'Infield helicopter pad arrival avoiding all A3 Sussex traffic'],
    itinerary: [
      { time: '08:30', title: 'Battersea Heliport Takeoff', location: 'London SW11', description: 'Scenic flight over Surrey Hills direct to Goodwood Circuit infield helipad.' },
      { time: '09:05', title: 'Paddock Accreditation & Driver Breakfast', location: 'Drivers Club Marquee', description: 'Warm bacon rolls, vintage tea, and drivers briefing beside legendary champions.' },
      { time: '11:30', title: 'Pit Lane Staging for RAC TT Celebration', location: 'Goodwood Pit Wall', description: 'Up-close smell of Castrol R and roaring V12 engines on the starting grid.' },
      { time: '15:00', title: 'Duke of Richmond Private Lawn Garden', location: 'Goodwood House Grounds', description: 'Afternoon tea and private concours d’elegance judging.' }
    ]
  },
  {
    id: 'cs-11',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'Churchill’s Secret Paddock War Citadel Candlelit State Dinner',
    subtitle: 'Forty feet beneath London clay inside the classified WW2 bunker history forgot.',
    location: 'Neasden Sub-Terrain Citadel, North-West London',
    duration: 'Evening Gathering (18:30 – 23:30)',
    heroImage: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    clientProfile: 'Global sovereign wealth delegation & international geopolitical scholars',
    challenge: 'Hosting an ultra-private geopolitical dinner where participants required zero electronic interception, absolute physical discretion, and a deeply atmospheric historic venue.',
    solution: 'Obtained rare custodial permission to activate Paddock—the alternate subterranean war bunker built in 1939 with five-foot blast walls. A 12-seat banquet was constructed in the original Cabinet War Room beside preserved oak maps, served by discreet staff under strict non-disclosure.',
    testimonial: '“An extraordinary evening. To hold a confidential discussion in the very room where Churchill planned alternative naval movements gave the conversation unmatched gravitas.”',
    clientQuoteAuthor: 'Senior Geopolitical Advisor',
    highlights: ['Full Faraday-cage acoustic and electromagnetic isolation', 'Custodial keys to sealed subterranean steel bulkheads', 'Historian briefing on classified 1940 government contingency plans'],
    itinerary: [
      { time: '18:30', title: 'Unmarked Convoy Rendezvous', location: 'St James’s Square', description: 'Range Rover convoy transfers delegation to North London secret bunker portal.' },
      { time: '19:15', title: 'Descent Past Blast Air-Locks', location: 'Paddock Citadel Sub-Level 2', description: 'Electronic lockbox deposit; descent forty feet into reinforced concrete bunker.' },
      { time: '20:00', title: 'Seven-Course Banquet in Map Room', location: 'Churchill Cabinet Chamber', description: 'English roast beef, potted shrimps, and vintage claret served beside original battle maps.' },
      { time: '22:45', title: 'Secure Vault Resurfacing', location: 'Covert Surface Exit', description: 'Vehicles waiting with engines warm for return to Mayfair residential suites.' }
    ]
  },
  {
    id: 'cs-12',
    category: 'culture-sourcing',
    categoryLabel: 'Culture, Arts & Horology',
    title: 'Savile Row Bespoke Head Cutter in High-Floor Penthouse & Horology Salon',
    subtitle: 'Private in-residence basted fitting, 60 hours hand-stitching, and archival Patek viewing.',
    location: '45 Albemarle Street, Mayfair & Belgravia Residence',
    duration: 'Full-Day Bespoke Session',
    heroImage: '/assets/aistudio/savile_row_bespoke.jpg',
    clientProfile: 'Tech venture general partner & bespoke clothing enthusiast',
    challenge: 'Client lacked time to visit multiple Mayfair boutiques between board meetings and wanted world-class cutters and rare watch specialists to attend him in his private residence.',
    solution: 'Arranged for the Senior Head Cutter of a 150-year-old Savile Row house to visit the client’s Eaton Square penthouse with bolts of rare Scottish cashmere. Simultaneously, a leading horology scholar brought two unpolished vintage Patek Philippe chronographs from private vaults for examination.',
    testimonial: '“The ultimate luxury is when the finest artisans in London come to your drawing room. No queues, no commercial theatre—just pure craft.”',
    clientQuoteAuthor: 'Venture Capital Partner',
    highlights: ['Head cutter attendance with custom brown-paper pattern drafting', 'Private inspection of vintage Patek reference 3970 and 5004', 'Discreet delivery of finished garments to private flight apron'],
    itinerary: [
      { time: '09:30', title: 'Drawing Room Consultation & Measurements', location: 'Belgravia Residence Salon', description: '32 bespoke anatomical measurements taken over Earl Grey tea.' },
      { time: '11:00', title: 'Cloth Selection from Yorkshire Mills', location: 'Private Swatch Vault', description: 'Selection of 14oz flannel, super 160s worsteds, and vicuña overcoat cloth.' },
      { time: '14:00', title: 'Archival Horology Inspection', location: 'Secure Drawing Room', description: 'Inspection of 1970s Rolex Daytona Paul Newman dial under 20x stereo loupe.' },
      { time: '16:30', title: 'Commission Contract & First Fitting Scheduled', location: 'Private Office Desk', description: 'First basted canvas fitting set for 14 days later at TGLC Albemarle salon.' }
    ]
  },
  {
    id: 'cs-13',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Stealth River Gunboat to Silvertown Industrial Rooftop Rave',
    subtitle: 'High-speed midnight Thames arrival into an exclusive secret rave atop a decommissioned grain silo.',
    location: 'Canary Wharf Slipway to Silvertown Industrial Docks',
    duration: 'Late Night (23:00 – 05:00)',
    heroImage: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    clientProfile: 'European electronic music patron & young sovereign heirs',
    challenge: 'Clients wanted to attend an ultra-exclusive, unannounced underground electronic music gathering in an edgy industrial dockland location with full personal security and VIP extraction on standby.',
    solution: 'Julian Sterling coordinated a midnight water approach via a military-grade RIB directly to an abandoned dockland slipway. Close-protection officers secured a private rooftop gantry overlooking the London skyline with bottle service and immediate evacuation route by river or road.',
    testimonial: '“Arriving by water in the dark and walking up the concrete industrial stairs into that sound was mind-blowing. Security was so subtle my friends didn’t even realize they were there.”',
    clientQuoteAuthor: 'Creative Director & Sovereign Heir',
    highlights: ['Covert waterborne arrival avoiding road chokepoints and crowds', 'Private elevated gantry section with dedicated tactical CP officer', 'Instant extraction protocol back to central London in 25 minutes'],
    itinerary: [
      { time: '23:00', title: 'Canary Wharf Private Pier Boarding', location: 'South Dock Marina', description: 'Board high-speed Zodiac boat equipped with night-vision forward FLIR camera.' },
      { time: '23:35', title: 'Silvertown Industrial Beaching', location: 'Millennium Mills Slipway', description: 'Dock at secured pontoon; tactical officer escorts party through private steel gates.' },
      { time: '00:15', title: 'Rooftop Gantry VIP Section', location: 'Decommissioned Silo Roof', description: 'Panoramic vistas of Canary Wharf towers while Berlin techno sets play below.' },
      { time: '04:00', title: 'Convoy Extraction to Mayfair', location: 'Silvertown Road Access', description: 'Armoured Mercedes JetVan waiting for calm, quiet drive back to Claridge’s.' }
    ]
  },
  {
    id: 'cs-14',
    category: 'security-convoy',
    categoryLabel: 'Tactical Protection & Convoy',
    title: 'UFC Championship Cageside & Athlete Warmup Suite Access',
    subtitle: 'Backstage tunnel credentials, Octagon front-row seats, and tactical exit corridor at The O2.',
    location: 'The O2 Arena VIP Security Portal, Greenwich Peninsula',
    duration: 'Full Championship Evening (17:30 – 01:00)',
    heroImage: '/assets/aistudio/ufc_arena_ringside.jpg',
    clientProfile: 'International sports team principal & martial arts aficionado',
    challenge: 'Client wanted front-row cageside seats at UFC London with private athlete tunnel access, avoiding public concourses and enthusiastic crowds during a sold-out 20,000-seat event.',
    solution: 'Secured official backstage athlete credentials through promotion leadership. Chauffeur entered via the underground logistics loading dock. Stationed two close-protection officers with earpieces to shadow the client into the warm-up dressing rooms before escorting them to Octagon seats.',
    testimonial: '“To stand in the warm-up room while the main event fighter wrapped his hands, and then walk through the smoke to cageside seats was unforgettable.”',
    clientQuoteAuthor: 'Sports Team Principal',
    highlights: ['Direct underground loading dock drive-in access', 'Official athletic commission tunnel badge credentials', 'Guaranteed front-row cageside seats beside international celebrities'],
    itinerary: [
      { time: '17:30', title: 'Underground Arena Gate Entry', location: 'The O2 Sub-Level Logistics Dock', description: 'Armoured Maybach drives into secured subterranean arena tunnel.' },
      { time: '18:00', title: 'Athlete Warm-Up Suite Inspection', location: 'Backstage Locker Suite B', description: 'Private observation of title challenger pad work and hand wrapping.' },
      { time: '19:30', title: 'Cageside Front Row Seating', location: 'Octagon Row 1, Seats 4–6', description: 'Unobstructed view of championship fights with dedicated drinks runner.' },
      { time: '23:45', title: 'Tactical Tunnel Departure', location: 'Underground VIP Exit', description: 'Exit via private loading bay before main arena crowd discharges.' }
    ]
  },
  {
    id: 'cs-15',
    category: 'aviation-yacht',
    categoryLabel: 'Aviation & Superyacht',
    title: 'Saint-Tropez to Verbier Alpine Skiing Helicopter Transition',
    subtitle: 'From a clifftop Mediterranean villa to an alpine chalet in three hours with pre-stocked boot rooms.',
    location: 'La Mole (Saint-Tropez) ➔ Sion Airport ➔ Verbier Les Esserts',
    duration: 'Same-Day Seasonal Transition',
    heroImage: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    clientProfile: 'Multi-family office principal and private equity partner',
    challenge: 'Client wanted to conclude a summer Mediterranean retreat and transition the entire household to their Verbier ski chalet for early season snow on the same day with zero commercial transfers.',
    solution: 'Chartered a Pilatus PC-24 jet out of La Mole Airport (Saint-Tropez) directly to Sion in the Swiss Valais. A private Eurocopter EC130 transferred the party up the valley to the Verbier chalet pad, where our chalet staff had fires roaring and ski equipment fitted in the boot room.',
    testimonial: '“Having lunch on the beach in Pampelonne and enjoying fondue in front of the fire in the Swiss Alps four hours later was miraculous. Flawless execution.”',
    clientQuoteAuthor: 'Private Office Trustee',
    highlights: ['Pilatus PC-24 short-runway jet out of La Mole', 'Helicopter transfer directly onto private Verbier chalet lawn', 'Chalet pre-stocked with bespoke organic provisions and private ski guides'],
    itinerary: [
      { time: '11:00', title: 'Beachside Villa Departure', location: 'Cap Camarat, Saint-Tropez', description: 'Chauffeured transfer to La Mole Saint-Tropez Airport.' },
      { time: '12:00', title: 'Wheels Up on Pilatus PC-24', location: 'La Mole ➔ Sion Airport', description: 'Scenic flight over the French and Swiss Alps with light Mediterranean lunch.' },
      { time: '13:15', title: 'Alpine Helicopter Transfer', location: 'Sion Airport Pad ➔ Verbier', description: '10-minute flight up the mountain directly to private chalet landing pad.' },
      { time: '14:00', title: 'Chalet Arrival & Boot Room Fitting', location: 'Les Esserts, Verbier', description: 'Specialist ski technicians waiting in boot room with custom Stöckli skis.' }
    ]
  },
  {
    id: 'cs-16',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Subterranean Clerkenwell Meat-Hook Supper Club',
    subtitle: 'Behind a stainless steel industrial freezer door, a secret Michelin-level gastronomic dining room.',
    location: 'Smithfield Market Sub-Basements, Clerkenwell EC1',
    duration: 'Evening Dining (19:30 – 00:30)',
    heroImage: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    clientProfile: 'International restaurateur & private equity gourmand',
    challenge: 'Client wanted an avant-garde dining experience impossible to book publicly—a clandestine gastronomic showcase featuring rare butchery and wood-fire cookery deep beneath historic London.',
    solution: 'Arranged exclusive buyout of a private dining salon concealed behind the refrigerated storage vaults of historic Smithfield. An acclaimed two-Michelin-starred guest chef prepared an eight-course wood-fired feast paired with rare natural wines.',
    testimonial: '“Stepping past the heavy steel freezer curtain into a candlelit room with an open flame hearth was magic. The most memorable meal I’ve had in five years.”',
    clientQuoteAuthor: 'Global Hospitality Investor',
    highlights: ['Hidden entrance through industrial meat locker freezer door', 'Eight-course custom menu cooked entirely over silver birch wood embers', 'Private sommelier pairing featuring rare allocations of Jura and Burgundy'],
    itinerary: [
      { time: '19:30', title: 'Smithfield Mews Drop-Off', location: 'St John Street, Clerkenwell', description: 'Discreet drop-off beside the Victorian market iron gates.' },
      { time: '19:45', title: 'Walk-Through Cold Storage Vaults', location: 'Sub-Level Cold Room', description: 'Escorted past suspended carcasses and refrigeration units to heavy vault door.' },
      { time: '20:15', title: 'Wood-Fired Hearth Dinner Commences', location: 'The Secret Butcher’s Table', description: '45-day dry-aged Galician beef cooked over open glowing coals.' },
      { time: '23:30', title: 'Digestifs & Direct Vehicle Pickup', location: 'Private Market Loading Arch', description: 'Vintage Chartreuse tasting before calm transfer back to Mayfair.' }
    ]
  },
  {
    id: 'cs-17',
    category: 'culture-sourcing',
    categoryLabel: 'Culture, Arts & Horology',
    title: 'Domaine de la Romanée-Conti Private Cellar Buyout & Bonded Transit',
    subtitle: 'Sourcing unopened 1990 and 1996 DRC cases directly from a private European family cellar.',
    location: 'Beaune, Burgundy ➔ London Bonded Vaults',
    duration: '2-Week Acquisition Mandate',
    heroImage: '/assets/aistudio/mayfair_fine_dining.jpg',
    clientProfile: 'Sovereign wine collector & family office investment committee',
    challenge: 'A principal sought complete cases of 1990 and 1996 Domaine de la Romanée-Conti Romanée-Conti with unbroken cold-chain provenance, avoiding secondary auction markets where counterfeits abound.',
    solution: 'Mickell Washington contacted a private collector in Dijon who had purchased original wooden cases directly from the Domaine upon release. Coordinated independent ullage and label verification by a master of wine, followed by climate-controlled armoured transit to private bonded vaults in London.',
    testimonial: '“The provenance was bulletproof. Having the bottles inspected under ultraviolet and transferred in a temperature-calibrated vehicle gave me complete peace of mind.”',
    clientQuoteAuthor: 'Private Family Office Principal',
    highlights: ['Direct private cellar acquisition without auction buyer’s premium', 'Full Master of Wine provenance certification and laser bottle inspection', 'Armoured climate-controlled bonded storage transit at strictly 12°C'],
    itinerary: [
      { time: 'Day 1', title: 'Private Mandate Verification', location: '45 Albemarle Street, Mayfair', description: 'Establishing target vintages and max allocation budget.' },
      { time: 'Day 4', title: 'On-Site Cellar Inspection in Beaune', location: 'Private Burgundy Estate Cellar', description: 'Bottles inspected for capsule spin, cork integrity, and original Domaine banding.' },
      { time: 'Day 8', title: 'Chilled Armoured Transit', location: 'Burgundy to London Port', description: 'Dedicated vehicle maintaining constant 12.5°C and 70% humidity across English Channel.' },
      { time: 'Day 12', title: 'Deposit into Private Bonded Vault', location: 'London Subterranean Cellars', description: 'Secured under member’s private tax-exempt bonded warehouse account.' }
    ]
  },
  {
    id: 'cs-18',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Kingsway Deep Intelligence Tunnel Private Acoustic Recital',
    subtitle: 'One hundred feet beneath Holborn with London Philharmonic string quartet in total silence.',
    location: 'Chancery Lane Deep Underground Tunnel Network',
    duration: 'Late Evening (20:30 – 01:00)',
    heroImage: '/assets/aistudio/down_street_station_1794391687146.jpg',
    clientProfile: 'Philharmonic patron & acoustic architecture enthusiast',
    challenge: 'Client wanted to experience a private chamber music performance in a completely silent acoustic chamber with zero ambient surface noise from London traffic or underground rail.',
    solution: 'Obtained temporary activation permits for Kingsway Tunnels—the deepest subterranean space in central London, constructed as deep-level air raid shelters and later used for the transatlantic telephone cable terminal. Arranged four principal string players from the London Philharmonic for a private acoustic performance.',
    testimonial: '“The sound inside that deep tunnel was unlike anything I have ever heard. No street vibration, no city hum—just pure, resonant cello notes ringing through history.”',
    clientQuoteAuthor: 'Classical Music Patron, London',
    highlights: ['One hundred feet below London clay with zero surface vibration', 'Solo cello and string quartet performance in historic generator gallery', 'Private atmospheric bar staged inside the historic switchroom'],
    itinerary: [
      { time: '20:30', title: 'Discreet Shaft Elevator Descent', location: 'Furnival Street Unmarked Portal', description: 'Descend via industrial goods elevator into historic Cold War tunnels.' },
      { time: '21:15', title: 'Champagne Reception in Intelligence Gallery', location: 'Tunnel Chamber 4', description: 'Chilled champagne served under vaulted circular tube segments.' },
      { time: '21:45', title: 'Bach Cello Suites in Deep Silence', location: 'Central Acoustic Gallery', description: 'Acoustic performance with natural reverberation of historic brickwork.' },
      { time: '23:30', title: 'Midnight Resurfacing & Mews Chauffeur', location: 'Holborn Street Level', description: 'Chauffeur waiting at alleyway exit for smooth journey home.' }
    ]
  },
  {
    id: 'cs-19',
    category: 'security-convoy',
    categoryLabel: 'Tactical Protection & Convoy',
    title: 'The Diplomatic Summit Three-Tier Convoy & Child Safeguarding',
    subtitle: 'Three armored Range Rover SV Sentinels, Met Police liaison, and zero public exposure.',
    location: 'Heathrow VIP Windsor Suite to Lancaster House & Belgravia',
    duration: '10-Day Summit Residency',
    heroImage: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
    clientProfile: 'Visiting head of delegation, spouse, and three young children',
    challenge: 'Visiting during a high-profile diplomatic summit with road closures across Whitehall, demanding absolute security for the principal while allowing the spouse and children to shop and visit museums with warmth and normalcy.',
    solution: 'Julian Sterling divided the security detail into two coordinated teams: Team Alpha (diplomatic protocol convoy for official bilateral meetings) and Team Bravo (unobtrusive close-protection chauffeurs in charcoal tailoring providing discreet child-friendly safeguarding during private visits to Harrods and the British Museum).',
    testimonial: '“The balance between absolute security and gentle, friendly accompaniment for my children was magnificent. Julian’s drivers became trusted family friends.”',
    clientQuoteAuthor: 'Ambassador & Principal',
    highlights: ['VPAM VR8 ballistic armored Range Rover SV Sentinels', 'Direct Met Police Special Operations liaison for priority traffic lanes', 'Zero public terminal interaction at Heathrow Windsor Suite'],
    itinerary: [
      { time: 'Day 1', title: 'Heathrow Windsor Suite Tarmac Meet', location: 'EGLL VIP Apron', description: 'Convoy staged planeside; children escorted directly into rear heated cabin.' },
      { time: 'Day 3', title: 'Lancaster House Bilateral Meeting', location: 'St James’s, London', description: 'Team Alpha delivers principal via police-cleared secure motorcade corridor.' },
      { time: 'Day 5', title: 'Private Harrods Toy Concierge & Tea', location: 'Knightsbridge Private Suite', description: 'Team Bravo escorts family through private rear entrance with zero paparazzi presence.' },
      { time: 'Day 10', title: 'Smooth Apron Departure', location: 'Heathrow VIP Apron', description: 'Bespoke luggage pre-screening and direct departure with zero delays.' }
    ]
  },
  {
    id: 'cs-20',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Secret Soho Jazz Den & 1920s Speakeasy Buyout',
    subtitle: 'Unmarked alleyway entrance, private jazz quintet, and rare Japanese whisky flight.',
    location: 'Meard Street & Dean Street Alleyways, Soho W1',
    duration: 'Late Evening (22:00 – 03:30)',
    heroImage: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    clientProfile: 'Grammy-winning record producer & private members club founder',
    challenge: 'Client wanted to celebrate an album launch with 20 close friends in an authentic, unpretentious, historic Soho setting that retained the spirit of 1950s bohemian London with top-shelf mixology.',
    solution: 'Negotiated closed-door buyout of an unlisted basement jazz salon behind an antique shop on Meard Street. Arranged a live acoustic bebop quintet, an unlisted bar stocked with vintage bourbon and Japanese whisky, and bespoke charcoal-grilled midnight skewers.',
    testimonial: '“It felt like we had stumbled through a secret wardrobe into London in 1956. Unforgettable energy, flawless drinks, and zero phones in sight.”',
    clientQuoteAuthor: 'Music Producer & Record Executive',
    highlights: ['Unmarked wooden door access via private password', 'Custom cocktail flight curated by legendary Mayfair mixologist', 'Strict no-phone policy ensuring total privacy for international artists'],
    itinerary: [
      { time: '22:00', title: 'Alleyway Secret Door Arrival', location: 'Meard Street, Soho', description: 'Guests arrive quietly; door opened by discreet host in vintage tuxedo.' },
      { time: '22:30', title: 'Live Quintet First Set', location: 'Basement Velvet Salon', description: 'Acoustic jazz set featuring trumpet, upright bass, and vintage upright piano.' },
      { time: '00:30', title: 'Karuizawa & Yamazaki 18 Flight', location: 'The Back Snug Bar', description: 'Rare Japanese whisky tasting with hand-carved ice spheres.' },
      { time: '03:15', title: 'Staggered Chauffeur Departures', location: 'Dean Street Mews', description: 'Pre-stationed vehicles transport guests smoothly home across London.' }
    ]
  },
  {
    id: 'cs-21',
    category: 'ultra-luxury',
    categoryLabel: 'Ultra-Luxury & Estates',
    title: 'The Continental Hypercar Tour: Geneva to Florence via Italian Lakes',
    subtitle: 'Bugatti Chiron and Ferrari Daytona SP3 convoy with support mechanics and private villa staging.',
    location: 'Geneva ➔ Lake Como ➔ Modena ➔ Florence Apennines',
    duration: '5-Day Driving Odyssey',
    heroImage: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
    clientProfile: 'Private hypercar syndicate of three collector couples',
    challenge: 'Navigating low-clearance hypercars over high alpine passes and through historic Italian city centres while securing secure indoor parking, pre-scouted routes, and luggage transport.',
    solution: 'Julian Sterling pre-scouted every kilometre of mountain pass, mapping smooth road surfaces and low-incline fuel stops. A dedicated Mercedes Sprinter service van followed with luggage and dedicated master technicians. Villa d’Este and a private Florence palazzo provided private secured courtyards.',
    testimonial: '“To drive these machines on empty Alpine passes knowing our luggage was already unpacked and private mechanics were waiting at every stop was perfection.”',
    clientQuoteAuthor: 'Hypercar Syndicate Lead',
    highlights: ['Pre-scouted Alpine passes with police road telemetry', 'Dedicated chase van with master technicians and tyre telemetry', 'Secured private courtyard staging at Villa d’Este and Florence palazzo'],
    itinerary: [
      { time: 'Day 1', title: 'Geneva Lakefront Departure', location: 'Hotel des Bergues, Geneva', description: 'Morning departure through the Mont Blanc Tunnel towards Lake Como.' },
      { time: 'Day 2', title: 'Villa d’Este Private Mooring & Rest', location: 'Cernobbio, Lake Como', description: 'Secured lakeside garage staging and private Riva boat cruise on the lake.' },
      { time: 'Day 3', title: 'Modena Factory Private Museum Tour', location: 'Maranello & Modena Valley', description: 'VIP entrance to private Ferrari Classiche department and factory floor.' },
      { time: 'Day 5', title: 'Apennine Pass Run into Florence', location: 'Passo della Futa ➔ Florence', description: 'Exhilarating descent through Tuscan hills directly into private palazzo gates.' }
    ]
  },
  {
    id: 'cs-22',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'The Tower Bridge Bascule Chamber Subterranean Brass Performance',
    subtitle: 'Descending into the massive counterweight chambers beneath the Thames riverbed.',
    location: 'Tower Bridge Southern Abutment Sub-Level, London SE1',
    duration: 'Evening Gathering (19:00 – 23:00)',
    heroImage: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    clientProfile: 'Architectural foundation trustee & contemporary music collector',
    challenge: 'Accessing the operational bascule chambers beneath Tower Bridge—a strictly restricted industrial marvel normally off-limits to the public—for an acoustic brass performance.',
    solution: 'Coordinated with the City of London Corporation and Bridge Master for after-hours access into the southern subterranean bascule chamber, where giant 1,200-ton counterweights pivot. Arranged an extraordinary acoustic brass recital taking advantage of the soaring subterranean cavern.',
    testimonial: '“Standing beneath the riverbed looking up at the Victorian steel and brickwork while the French horns echoed was an architectural revelation.”',
    clientQuoteAuthor: 'Architectural Scholar & Trustee',
    highlights: ['Direct access beneath the river Thames inside the working bascule chambers', 'Acoustic brass performance curated specifically for 10-second industrial reverb', 'Private riverside dinner on the Shard illuminated yacht afterwards'],
    itinerary: [
      { time: '19:00', title: 'Bridge Master Private Gate Access', location: 'Tower Bridge South Pier', description: 'Escorted through unmarked brass door into the stone abutment.' },
      { time: '19:30', title: 'Descent Beneath the Riverbed', location: 'Sub-Level Bascule Chamber', description: 'Steel catwalks reveal the monumental counterweights and hydraulic machinery.' },
      { time: '20:15', title: 'Acoustic Brass Recital', location: 'Lower Industrial Void', description: 'Haunting contemporary brass performance taking advantage of the cavernous acoustics.' },
      { time: '21:30', title: 'Private Yacht Supper on the Thames', location: 'HMS Belfast Moorings', description: 'Board private river launch for dinner with panoramic vistas of illuminated bridge.' }
    ]
  },
  {
    id: 'cs-23',
    category: 'hidden-london',
    categoryLabel: 'The Other Side of London (Edgy & Urban)',
    title: 'Vauxhall Concrete Bass Vault & Satin-Black Maybach Late-Night Buyout',
    subtitle: 'Custom analog hip-hop rotary DJ session, street-couture archive capsule, and zero-trace alley exits.',
    location: 'Vauxhall Railway Arches SE1 · Soho Streetwear Loft W1F',
    duration: 'Nocturnal Session (22:30 – 04:30)',
    heroImage: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    clientProfile: 'Global music producer & visiting tech founders',
    challenge: 'Principal sought raw underground London hip-hop and rotary vinyl culture in an architecturally raw railway arch with zero public street queueing or smartphone photography.',
    solution: 'Dr. Helena Zhang-Somerset secured full midnight buyout of a sound-isolated double-brick arch fitted with hand-wired horn stacks, preceded by a closed Soho archive clothing appointment and staggered satin-black Maybach lane departures.',
    testimonial: '“Unbeatable acoustics, total privacy in the booth, and pulling straight into the rear alley Maybach without a single lens outside.”',
    clientQuoteAuthor: 'Music Producer & Venture Principal',
    highlights: ['Hand-built analog rotary sound system inside sound-isolated railway vault', 'Private Soho archive street-couture preview with studio pattern master', 'Faraday cloakroom pouch protocol and dual-lane alley extraction'],
    itinerary: [
      { time: '20:30', title: 'Locked Soho Street-Couture Viewing', location: 'Berwick Street Loft Showroom', description: 'Private archive preview of numbered runway outerwear and rare sneaker editions.' },
      { time: '22:30', title: 'Alley Maybach Staging & Vault Entry', location: 'Vauxhall Viaduct Arch 14', description: 'Rear service lane arrival past magnetic airlock into brick bass chamber.' },
      { time: '00:15', title: 'Resident Vinyl Selector Session', location: 'Custom Birch Booth', description: 'All-vinyl hip-hop and 1990s deep cuts on custom Altec-derived horn rig.' },
      { time: '04:00', title: 'Tactical Convoy Return to Mayfair', location: 'Albert Embankment Service Lane', description: 'Two unmarked Maybachs staged along river embankment for twelve-minute return.' }
    ]
  },
  {
    id: 'cs-24',
    category: 'culture-sourcing',
    categoryLabel: 'Culture, Arts & Horology',
    title: 'Frieze Masters Private Pavilion Night Buyout & Saddlery Trunk Delivery',
    subtitle: 'After-hours Regent’s Park walkthrough with conservators, paired with custom Shropshire leather cases.',
    location: 'Regent’s Park NW1 ➔ Fitzrovia Private Salon',
    duration: 'Evening Patronage (19:00 – 00:00)',
    heroImage: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    clientProfile: 'European museum trustee & contemporary art patron family',
    challenge: 'Principals wished to inspect post-war canvases and Master drawings in total quiet away from VIP preview crowds, while finalizing travel trunk commissions from Shropshire.',
    solution: 'Arranged private after-closing Regent’s Park wing access accompanied by independent painting conservators, followed by Fitzrovia salon supper where bespoke Bridgnorth leather case samples were measured.',
    testimonial: '“Walking through the darkened pavilions with a dedicated conservator and concluding over quiet burgundy made Frieze feel intimate again.”',
    clientQuoteAuthor: 'Museum Trustee, Geneva & London',
    highlights: ['Closed-door after-hours Frieze Masters pavilion walkthrough', 'Independent museum conservator condition assessment', 'Direct pattern sizing for custom Shropshire bridle-leather travel trunks'],
    itinerary: [
      { time: '19:00', title: 'VIP Garden Pavilion Arrival', location: 'Regent’s Park South Gate', description: 'Chauffeured entry directly alongside private museum liaison entrance.' },
      { time: '19:15', title: 'Quiet Wing Conservation Walkthrough', location: 'Master Drawings Section', description: 'Unhurried northern-lit loupe inspection with specialist art historian.' },
      { time: '21:15', title: 'Fitzrovia Private Salon Supper', location: 'Fitzroy Square Townhouse', description: 'Four-course autumn game menu paired with mature Côte de Nuits vintages.' },
      { time: '22:45', title: 'Bespoke Bridle-Leather Trunk Sizing', location: 'Private Drawing Room', description: 'Measurement of collector pieces alongside Shropshire leather pattern samples.' }
    ]
  }
];

interface CaseStudyEnrichment {
  gallery: { image: string; caption: string }[];
  extendedContext: string;
  securityDetail: string;
  measurableOutcome: string;
  leadDirector: string;
}

const SPECIFIC_CASE_ENRICHMENTS: Record<string, CaseStudyEnrichment> = {
  'cs-01': {
    gallery: [
      { image: '/assets/aistudio/private_jet_interior_suite.jpg', caption: 'Bombardier Global 7500 cabin prepared at RAF Northolt for zero-friction transatlantic wheels-up.' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Two matched Range Rover SV Sentinels staged along Belgravia mews for the 22-minute A40 transfer.' },
      { image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg', caption: 'Manhattan penthouse landing arrival timed directly after the West 30th Street heliport transfer.' }
    ],
    extendedContext: 'With commercial transatlantic cabins sold out around board closing dates, TGLC simultaneously coordinated Flight Crew rest verification, UK diplomatic bag border clearance inside Belgravia, and FAA Teterboro arrival priority slots so all eight family members boarded twenty-seven minutes after leaving Eaton Square.',
    securityDetail: 'Advance close-protection detail cleared the Northolt Gate 4 VIP apron ahead of arrival while New York affiliates held tarmac rotorcraft blades running at Teterboro Signature Terminal.',
    measurableOutcome: '07h 48m door-to-penthouse across the North Atlantic with zero public terminal contact.',
    leadDirector: 'Julian Sterling & Camilla Vance-Moreau'
  },
  'cs-02': {
    gallery: [
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'Twin-engine matte-black carbon interceptor planing beneath illuminated bridges at 02:00 AM.' },
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Candlelit six-course banquet inside the Square Mile vaults forty feet beneath Lombard Street.' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: '1890s Bas-Armagnac and rare vintages decanted inside the private brick tasting Alcove.' }
    ],
    extendedContext: 'Operating under tidal clearance from the Port of London Authority, the 45-foot carbon craft maintained thermal forward navigation past Rotherhithe before mooring directly below a derelict Victorian wharf gate where induction chefs awaited.',
    securityDetail: 'Faraday lockboxes sealed all cellular handsets behind the circular Chubb vault bulkhead while two plainclothes officers held the surface stairwell until departure.',
    measurableOutcome: '18-minute river sprint · Complete RF silence across a five-hour nocturnal supper.',
    leadDirector: 'Dr. Helena Zhang-Somerset & Julian Sterling'
  },
  'cs-04': {
    gallery: [
      { image: '/assets/aistudio/east_end_boxing_1794391694652.jpg', caption: 'Victorian railway arch ring set under tungsten floods thirty minutes before doors opened.' },
      { image: '/assets/aistudio/meard_poker_sanctum.jpg', caption: 'Post-fight continuation into an unlisted late-night Soho salon behind an ordinary street shopfront.' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Unmarked convoy vehicles staging inside industrial Southwark lanes during midnight departures.' }
    ],
    extendedContext: 'Rather than sanitizing East End boxing heritage, we embedded the client’s small party ringside beside former Olympic trainers where leather impacts echoed down the soot-darkened brickwork, then shifted seamlessly west into Soho for cards and rare drams.',
    securityDetail: 'Perimeter risk matrix mapped three independent extraction alleys off Spa Terminus and paired two SIA officers in evening wool tailoring beside the red corner banquette.',
    measurableOutcome: '6 bout exhibition card · Zero public detection across two raw urban enclaves.',
    leadDirector: 'Julian Sterling'
  },
  'cs-23': {
    gallery: [
      { image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', caption: 'Poured-concrete Vauxhall bass vault tuned with walnut horn stacks for an unrecorded midnight buyout.' },
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Private Soho sample archive opened earlier that evening for runway outerwear fittings.' },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Custom rotary mixer and crates of 1990s East Coast white labels queued beside the selector booth.' }
    ],
    extendedContext: 'Visiting artists and tech founders frequently request London nightlife that matches Atlanta or Tokyo listening-room energy without VIP table circus theatrics. We combined an after-hours styling appointment with an unrecorded railway-vault session.',
    securityDetail: 'Dual satin-black Maybach sedans drove inside the shuttered delivery bay directly to the heavy acoustic door; smartphone lenses remained sealed inside magnetic Faraday slips.',
    measurableOutcome: 'Zero photography leaks · Seamless multi-venue Soho to Vauxhall alley movement.',
    leadDirector: 'Dr. Helena Zhang-Somerset & Julian Sterling'
  },
};

function getEnrichedCaseStudy(cs: CaseStudy): CaseStudyEnrichment {
  if (SPECIFIC_CASE_ENRICHMENTS[cs.id]) return SPECIFIC_CASE_ENRICHMENTS[cs.id];
  const categoryExtras: Record<Exclude<CaseStudyCategory, 'all'>, { gallery: { image: string; caption: string }[]; contextSuffix: string; securityDefault: string; lead: string }> = {
    'ultra-luxury': {
      gallery: [
        { image: cs.heroImage, caption: `${cs.title} staged to member specification in ${cs.location.split('➔')[0].trim()}.` },
        { image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp', caption: 'Bespoke chauffeur transfer prepared for punctual kerbside and paddock arrivals.' },
        { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Private estate grounds and hospitality suites warmed and provisioned prior to arrival.' }
      ],
      contextSuffix: 'Every property allocation, vehicle hand-off, and dining reservation was cross-checked twice daily against the household preference ledger so principals felt effortlessly at home.',
      securityDefault: 'Discreet uniformed/plainclothes chauffeur accompaniment, pseudonym advance check-in, and contingency heliport standby.',
      lead: 'Camilla Vance-Moreau'
    },
    'hidden-london': {
      gallery: [
        { image: cs.heroImage, caption: `Clandestine setting prepared under strict discretion inside ${cs.location}.` },
        { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Atmospheric private candlelight dining staged inside unlisted subterranean brick vaults.' },
        { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Late-night acoustic and vinyl salons curated strictly for trusted principals and guests.' }
      ],
      contextSuffix: 'All door keys, password clearances, and custodial steward permissions were verified forty-eight hours prior so the evening felt spontaneous yet ran to the minute.',
      securityDefault: 'Plainclothes Julian Sterling advance team, alleyway vehicle holding, and strict device privacy enforcement.',
      lead: 'Dr. Helena Zhang-Somerset & Julian Sterling'
    },
    'aviation-yacht': {
      gallery: [
        { image: cs.heroImage, caption: `Primary flight and maritime positioning along ${cs.location}.` },
        { image: '/assets/aistudio/mediterranean_superyacht_deck.jpg', caption: 'Private aft deck dining and tender logistics verified alongside vessel captain and steward.' },
        { image: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png', caption: 'Apron jet tarmac clearance coordinated directly opposite helicopter and chase boat links.' }
      ],
      contextSuffix: 'Synchronized slot clearance, custom cellar provisioning, and onboard crew briefings removed multi-modal waits between tarmac aprons, rotorcraft pads, and harbour berths.',
      securityDefault: 'Private FBO diplomatic apron admission, marine traffic AIS discretion, and closed passenger manifests.',
      lead: 'Julian Sterling & Mickell Washington'
    },
    'culture-sourcing': {
      gallery: [
        { image: cs.heroImage, caption: `Scholarly private inspection staged at ${cs.location}.` },
        { image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg', caption: 'Closed-door viewing lighting configured with independent conservators and curators.' },
        { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Custom archival bridle-leather travel trunks crafted to store acquired treasures securely.' }
      ],
      contextSuffix: 'Independent condition audits, ultraviolet spectroscopy, and archive extract cross-checks ensured every conversation remained purely scholarly and transparent.',
      securityDefault: 'Armoured fine-art and timepiece transit under museum insurance with unmarked courier handoffs.',
      lead: 'Dr. Helena Zhang-Somerset & Mickell Washington'
    },
    'security-convoy': {
      gallery: [
        { image: cs.heroImage, caption: `Advance convoy posture coordinated around ${cs.location}.` },
        { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Matched satin-black vehicles executing synchronized urban route maneuvers.' },
        { image: '/assets/aistudio/close_protection_security.jpg', caption: 'Former British Special Forces and diplomatic protection detail in Savile Row attire.' }
      ],
      contextSuffix: 'Pre-event traffic telemetry, underground loading-bay sweeps, and secondary departure drills allowed families and executives to move through dense urban gatherings serenely.',
      securityDefault: 'SIA close-protection command, VPAM ballistic fleet deployment, and encrypted inter-vehicle radio architecture.',
      lead: 'Julian Sterling'
    },
  };
  const cfg = categoryExtras[cs.category === 'all' ? 'ultra-luxury' : cs.category];
  return {
    gallery: cfg.gallery,
    extendedContext: `${cs.solution} ${cfg.contextSuffix}`,
    securityDetail: cfg.securityDefault,
    measurableOutcome: `Executed cleanly across ${cs.duration} with 0% third-party markup and zero public exposure.`,
    leadDirector: cfg.lead
  };
}

export const CaseStudiesPage: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<CaseStudyCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [modalGalleryIndex, setModalGalleryIndex] = useState(0);

  const openCaseModal = (cs: CaseStudy, imgIndex = 0) => {
    setSelectedCaseStudy(cs);
    setModalGalleryIndex(imgIndex);
  };

  const categories: { id: CaseStudyCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All 24 Case Studies', count: CASE_STUDIES.length },
    { id: 'ultra-luxury', label: 'Ultra-Luxury & Estates', count: CASE_STUDIES.filter((c) => c.category === 'ultra-luxury').length },
    { id: 'hidden-london', label: 'The Other Side of London (Edgy & Urban)', count: CASE_STUDIES.filter((c) => c.category === 'hidden-london').length },
    { id: 'aviation-yacht', label: 'Aviation & Superyacht', count: CASE_STUDIES.filter((c) => c.category === 'aviation-yacht').length },
    { id: 'culture-sourcing', label: 'Culture, Arts & Horology', count: CASE_STUDIES.filter((c) => c.category === 'culture-sourcing').length },
    { id: 'security-convoy', label: 'Tactical Protection & Convoy', count: CASE_STUDIES.filter((c) => c.category === 'security-convoy').length },
  ];

  const filtered = CASE_STUDIES.filter((cs) => {
    const matchesCategory = selectedCategory === 'all' || cs.category === selectedCategory;
    const matchesSearch =
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] selection:bg-[#B98633]/30 selection:text-[#FAF7F0] min-h-screen pb-16">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center border-b border-[#20222B] pt-20 pb-14 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/private_jet_interior_suite.jpg"
            alt="TGLC Case Studies"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.42] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 mb-1">
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span className="tglc-kicker">
              Sovereign Portfolio & Executed Dossiers
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF7F0] tracking-wide font-light leading-tight">
            Case Studies & Signature Journeys
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] max-w-2xl mx-auto">
            “From sovereign transatlantic air corridors to the raw, underground underbelly of London.”
          </p>

          <p className="tglc-prose text-xs sm:text-sm max-w-2xl mx-auto">
            Explore twenty-four executed commissions demonstrating how TGLC orchestrates ultra-rare access, close protection, and unforgettable lifestyle journeys across the United Kingdom and Europe.
          </p>
        </div>
      </section>

      {/* 2. Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="bg-[#0D1017] border border-[#202530] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#131722] text-[#E2BA6B] border-[#E2BA6B]/70 font-medium'
                      : 'bg-[#0D1017] text-[#8F98AA] border-transparent hover:border-[#2C3140] hover:text-[#FAF7F0]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8F98AA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, location, or asset..."
              className="w-full pl-8.5 pr-3 py-2 bg-[#131722] border border-[#252D3C] text-xs font-mono text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
            />
          </div>
        </div>

        {/* 3. Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs) => {
            const enriched = getEnrichedCaseStudy(cs);
            return (
            <div
              key={cs.id}
              className="bg-[#0D1017] border border-[#202530] hover:border-[#E2BA6B]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#131722]">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                </div>

                {/* Clickable Multi-Photo Strip on Every Story */}
                <div className="grid grid-cols-3 gap-1 p-1.5 bg-[#090B10] border-b border-[#1C222E]">
                  {enriched.gallery.map((g, gIdx) => (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => openCaseModal(cs, gIdx)}
                      className="aspect-[16/9] overflow-hidden border border-[#202530] hover:border-[#E2BA6B] transition-colors cursor-pointer"
                      aria-label={`Inspect photo ${gIdx + 1} for ${cs.title}`}
                    >
                      <img
                        src={g.image}
                        alt={g.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95 hover:brightness-110 transition-all"
                      />
                    </button>
                  ))}
                </div>

                <div className="p-5 space-y-3">
                  <div className="tglc-meta flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="text-[#E2BA6B] uppercase tracking-wider">{cs.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{cs.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{enriched.gallery.length} Photos</span>
                  </div>

                  <div className="tglc-meta flex items-center gap-1.5 text-[10px]">
                    <MapPin className="w-3 h-3 text-[#E2BA6B] shrink-0" />
                    <span className="truncate">{cs.location.split('➔')[0]}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F0] font-normal group-hover:text-[#E2BA6B] transition-colors leading-snug">
                    {cs.title}
                  </h3>

                  <p className="tglc-prose text-xs line-clamp-2">
                    {cs.subtitle}
                  </p>

                  <div className="p-3 bg-[#131722] border border-[#1C222E] space-y-1 text-xs">
                    <span className="text-[9px] font-mono uppercase text-[#8F98AA] block">Execution & Outcome:</span>
                    <p className="text-[#D4D8E2] line-clamp-2">{cs.solution}</p>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {cs.highlights.slice(0, 2).map((hl, i) => (
                      <li key={i} className="text-[11px] text-[#8F98AA] flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3 h-3 text-[#E2BA6B] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#181D26] mt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openCaseModal(cs, 0)}
                  className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:underline flex items-center gap-1 font-medium cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Story & Photos
                </button>
                <button
                  type="button"
                  onClick={() => openIntroductionModal(`Commission Similar Itinerary: ${cs.title}`)}
                  className="text-[10px] font-mono text-[#8F98AA] hover:text-[#FAF7F0] flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  Commission This <ArrowUpRight className="w-3 h-3 text-[#E2BA6B]" />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* 4. Full Journey Modal with Multi-Photo Switcher & Extended Brief */}
      <AnimatePresence>
        {selectedCaseStudy && (() => {
          const modalEnriched = getEnrichedCaseStudy(selectedCaseStudy);
          const activePhoto =
            modalEnriched.gallery[modalGalleryIndex % modalEnriched.gallery.length] || modalEnriched.gallery[0];
          return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl bg-[#0D1016] border border-[#2B3242] p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between pb-4 border-b border-[#202633]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] block">
                    Executed Sovereign Case Study · Ref: {selectedCaseStudy.id.toUpperCase()}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] font-light mt-1">
                    {selectedCaseStudy.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A8B2C4] font-light mt-1">
                    {selectedCaseStudy.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="text-neutral-400 hover:text-[#E2BA6B] text-lg font-mono p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Multi-Photo Gallery Switcher */}
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#202636] bg-black">
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
                  {modalEnriched.gallery.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalGalleryIndex(idx)}
                      className={`aspect-[16/9] overflow-hidden border transition-all cursor-pointer ${
                        idx === modalGalleryIndex % modalEnriched.gallery.length
                          ? 'border-[#E2BA6B] ring-1 ring-[#E2BA6B]'
                          : 'border-[#202636] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={g.image}
                        alt={g.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Dossier Specifications & Outcome Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#12161F] border border-[#1E2432]">
                  <span className="text-[9px] font-mono uppercase text-[#737E94] block">Route & Geometry</span>
                  <span className="text-[#F4F1EA] font-serif mt-0.5 block">{selectedCaseStudy.location}</span>
                </div>
                <div className="p-3 bg-[#12161F] border border-[#1E2432]">
                  <span className="text-[9px] font-mono uppercase text-[#737E94] block">Duration Executed</span>
                  <span className="text-[#CFA85E] font-mono mt-0.5 block tabular-nums">{selectedCaseStudy.duration}</span>
                </div>
                <div className="p-3 bg-[#12161F] border border-[#1E2432]">
                  <span className="text-[9px] font-mono uppercase text-[#737E94] block">Principal Profile</span>
                  <span className="text-[#C2CAD8] mt-0.5 block">{selectedCaseStudy.clientProfile}</span>
                </div>
                <div className="p-3 bg-[#12161F] border border-[#1E2432]">
                  <span className="text-[9px] font-mono uppercase text-[#737E94] block">Lead Desk Directors</span>
                  <span className="text-[#E2BA6B] mt-0.5 block">{modalEnriched.leadDirector}</span>
                </div>
              </div>

              {/* Challenge, Solution & Deep Context */}
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <div className="p-4 bg-[#12161F] border border-[#1E2432] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#CFA85E] font-medium block">
                    The Client Brief & Constraints
                  </span>
                  <p className="text-[#C2CAD8]">{selectedCaseStudy.challenge}</p>
                </div>

                <div className="p-4 bg-[#12161F] border border-[#1E2432] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] font-medium block">
                    Consortium Execution & Extended Operational Narrative
                  </span>
                  <p className="text-[#D8DFEB]">{selectedCaseStudy.solution}</p>
                  <p className="text-[#B8C2D4]">{modalEnriched.extendedContext}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#12161F] border border-[#1E2432] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center gap-1.5 font-medium">
                      <Shield className="w-3.5 h-3.5" /> Protection & Privacy Architecture
                    </span>
                    <p className="text-[#C2CAD8] text-xs">{modalEnriched.securityDetail}</p>
                  </div>
                  <div className="p-4 bg-[#12161F] border border-[#1E2432] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Commission Outcome
                    </span>
                    <p className="text-[#F4F1EA] text-xs">{modalEnriched.measurableOutcome}</p>
                  </div>
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="p-4 bg-[#0B0E14] border border-[#1E2432] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#CFA85E] block">
                  Commission Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {selectedCaseStudy.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-[#D8DFEB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hour-by-Hour Timeline Journey */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-lg text-[#F4F1EA] font-light">
                  Hour-by-Hour Operational Timeline
                </h3>
                <div className="relative space-y-3 pl-5 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-[#2B3547]">
                  {selectedCaseStudy.itinerary.map((step, idx) => (
                    <div key={idx} className="relative space-y-0.5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#CFA85E] font-medium tabular-nums">{step.time}</span>
                        <span className="text-xs text-[#7B869C]">·</span>
                        <span className="font-serif text-sm text-[#F4F1EA]">{step.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8C98AC] block">{step.location}</span>
                      <p className="text-xs text-[#A2ADBF] font-light">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote */}
              <div className="p-4 bg-[#151922] border-y border-[#8C6D32]/50 text-center space-y-2">
                <p className="font-serif italic text-base sm:text-lg text-[#F4F1EA]">
                  {selectedCaseStudy.testimonial}
                </p>
                <span className="text-[10px] font-mono text-[#CFA85E] uppercase tracking-wider block">
                  — {selectedCaseStudy.clientQuoteAuthor}
                </span>
              </div>

              {/* Modal Footer CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#202633]">
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-mono text-[#8C96A8] hover:text-white cursor-pointer"
                >
                  Close Case Study
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedCaseStudy.title;
                    setSelectedCaseStudy(null);
                    openIntroductionModal(`Commission Itinerary: ${title}`);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#E2BA6B] hover:bg-[#F0CC83] text-[#07080B] font-serif text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" /> Commission This Itinerary
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
