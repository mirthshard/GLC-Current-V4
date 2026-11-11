import { SubService } from '../types';

export type SubServiceEnrichment = Pick<
  SubService,
  | 'extendedOverview'
  | 'galleryImages'
  | 'operationalPhases'
  | 'slaBenchmarks'
  | 'vettedPartners'
  | 'faqs'
> & {
  extraScenarios?: { title: string; description: string; outcome: string }[];
  extraPoints?: string[];
};

export const SUB_SERVICE_ENRICHMENTS: Record<string, SubServiceEnrichment> = {
  'private-aviation': {
    extendedOverview: [
      'Direct private aviation at TGLC goes well beyond matching an empty leg or sending a standard retail brokerage quote. Our aviation desk audits operator Maintenance Control logs, pilot rest cycles, hull age, and EASA/FAA safety standings directly with fleet directors at RAF Northolt, Farnborough, and Biggin Hill.',
      'For principals crossing continents with multi-generational families, security details, or diplomatic couriers, cabin configuration matters as much as range. We align low cabin-pressurization altitudes (down to 2,900ft on Global 7500 and G650ER airframes), bespoke dietary provisioning from Mayfair kitchens, and ramp-to-car tarmac handovers so public concourses are bypassed entirely.',
      'When winter frost or summer Mediterranean airway congestion forces sudden slot shifts, our 24/7 dispatch desk holds dual-field contingency aircraft on warm standby alongside twin-engine AW109 helicopter connections straight to Alpine pads and country estates.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png', caption: 'Dedicated four-zone heavy cabin staged prior to an overnight transatlantic departure' },
      { image: '/assets/aistudio/private_jet_interior_suite.jpg', caption: 'Sound-attenuated club stateroom laid out with fine bone china and private cellar selections' },
      { image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png', caption: 'Challenger 350 positioning on the private Farnborough apron ahead of morning boarding' },
      { image: '/assets/aistudio/luxury_sprinter_jetvan.jpg', caption: 'Bespoke Sprinter JetVan waiting three paces from the aircraft stairs for direct Mayfair transit' }
    ],
    operationalPhases: [
      { phase: '01 · Mission Brief', title: 'Airframe & Routing Audit', detail: 'Verify passenger manifest, luggage volume, pet passports, and dual-runway weather contingencies across departure and arrival fields.' },
      { phase: '02 · Slot Lock', title: 'PPR Clearance & FBO Apportionment', detail: 'Lock scarce RAF Northolt Gate 4 or Samedan mountain landing slots alongside Eurocontrol tail-privacy masking.' },
      { phase: '03 · Cabin Staging', title: 'Culinary, Medical & Luggage Loading', detail: 'Stage high-altitude bespoke menus, heated de-icing holds, and advance tarmac baggage transfer from your residence.' },
      { phase: '04 · Wheels Down', title: 'Apron Transfer & Continuation', detail: 'Chauffeured Maybach, armoured SUV, or twin-engine helicopter awaits directly alongside steps with zero waiting.' }
    ],
    slaBenchmarks: [
      { label: 'Wheels-Up Dispatch', value: '3.5 – 4 hrs', note: 'European urgent standby departures' },
      { label: 'Apron Kerb-to-Cabin', value: '< 90 sec', note: 'Direct vehicle-to-stairs customs clearing' },
      { label: 'Tail Privacy Masking', value: '100% Block', note: 'FAA / Eurocontrol LADD suppression active' }
    ],
    vettedPartners: [
      'Direct AOC Part 135 European Fleet Owners',
      'RAF Northolt Military & Diplomatic Handling Desk',
      'TAG Farnborough Private Hangar & Customs Liaison',
      'Battersea Heliport Twin-Engine Rotary Wings'
    ],
    extraPoints: [
      'Zero broker fee layering: verbatim operator charter invoices presented directly to your family office',
      'Synchronized diplomatic passport pre-clearance for multi-jurisdiction Middle East, Swiss, and US arrivals'
    ],
    extraScenarios: [
      {
        title: 'Geneva Davos Slot Compression Pivot',
        description: 'Sudden freezing fog forced Zurich private ramps to close two hours prior to a bilateral summit departure.',
        outcome: 'Rerouted Challenger 350 to Basel-Mulhouse within 35 minutes, holding an AW109 helicopter to land straight at the St Moritz snow pad.'
      },
      {
        title: 'Multi-Dog Cabin Relocation to Nice',
        description: 'Moving three family hounds alongside six principals without cargo hold crating.',
        outcome: 'Cleared DEFRA documentation in advance with bespoke cabin seating mats and veterinary tarmac sign-off.'
      }
    ],
    faqs: [
      { q: 'Can you block public flight tracking websites from seeing our tail number?', a: 'Yes. Every mission chartered through TGLC utilizes ICAO privacy address rotation and active FAA/Eurocontrol blocking lists so tail movements remain invisible online.' },
      { q: 'Are catering kitchens adapted specifically for high altitude?', a: 'Yes. Standard sea-level dishes lose flavour in dry pressurized cabins; our Mayfair kitchen partners craft umami-forward consommés, fresh herbs, and wine pairings tuned for 35,000ft.' },
      { q: 'Do you arrange diplomatic apron clearance at RAF Northolt?', a: 'Where civil PPR movement quotas apply, our handling team files clearance early and maintains simultaneous Farnborough standby slots as guaranteed backup.' },
      { q: 'Can we split multiple generations across heavy jet and turbo-prop regional legs?', a: 'Routinely. We synchronize arrival windows within five minutes at island strips such as Olbia, Samedan, or Chambéry.' }
    ]
  },

  'bespoke-travel-design': {
    extendedOverview: [
      'A memorable journey leaves room for wonder rather than rushing through tick-box tourist landmarks. When TGLC designs a sabbatical through Kyoto, a private architectural tour across the Veneto, or a multi-generational safari in northern Botswana, every day is paced around the curiosity and energy of the household.',
      'Our curators bypass commercial tour operators entirely, working directly with living museum directors, temple abbots, alpine mountain guides, and antiquarian scholars who rarely open their calendars to visitors.',
      'Logistics unfold silently beneath the surface: luggage vaults forward to the next estate ahead of your train or flight, physicians remain briefed along remote routes, and spontaneous changes of heart are welcomed rather than penalised.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/florence_palazzo_courtyard.jpg', caption: 'Secluded Oltrarno noble courtyard opened exclusively for morning coffee with palazzo custodians' },
      { image: '/assets/aistudio/swiss_alpine_chalet.jpg', caption: 'Ski-in Engadin timber retreat provisioned ahead of a two-week winter mountain sabbatical' },
      { image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg', caption: 'Intimate counter seating hosted by third-generation Japanese culinary masters' },
      { image: '/assets/aistudio/royal_opera_gallery.jpg', caption: 'After-hours candlelit walkthroughs arranged inside continental museum galleries' }
    ],
    operationalPhases: [
      { phase: '01 · Curatorial Dialogue', title: 'Intellectual & Pacing Profile', detail: 'Map scholarly passions, physical adventure thresholds, and family rest rhythms before selecting a single hotel.' },
      { phase: '02 · Custodial Access', title: 'Closed-Door & Scholar Openings', detail: 'Secure after-hours museum keys, temple introductions, and master workshop appointments unavailable online.' },
      { phase: '03 · Silent Logistics', title: 'Baggage & Private Transit Chains', detail: 'Link scenic helicopters, vintage rail carriages, and local fixers so rooms appear pre-unpacked on arrival.' },
      { phase: '04 · Live Evolution', title: 'On-Trip Adaptability', detail: '24-hour regional attachés flex dinner timings, route detours, and weather shifts in real time.' }
    ],
    slaBenchmarks: [
      { label: 'Regional Attaché', value: '35+ Cities', note: 'In-person bilingual hosts on station' },
      { label: 'Itinerary Adaptation', value: '< 15 min', note: 'Live weather or preference re-routing' },
      { label: 'Advance Keys', value: 'Private Only', note: 'Zero shared group excursions' }
    ],
    vettedPartners: [
      'Palazzo & Chateau Family Custodians Across Italy & France',
      'Kyoto & Kanazawa Living National Treasure Craftsmen',
      'UIAGM High-Mountain Heli-Ski Guides',
      'Independent Renaissance & Contemporary Art Historians'
    ],
    extraPoints: [
      'Printed linen-bound field journals prepared with historical context and uncrowded morning walk routes',
      'Seamless coordination between remote wilderness camps and urban recovery clinics'
    ],
    extraScenarios: [
      {
        title: 'Oltrarno & Umbria Private Chapels Study Week',
        description: 'Tracing early Renaissance fresco conservation across private estates not open to ticketed tourism.',
        outcome: 'Arranged private dinners in three noble family palazzi with a conservation lead from the Opificio delle Pietre Dure.'
      },
      {
        title: 'Patagonian Glaciology Family Expedition',
        description: 'Combining private aircraft southern crossings with luxury estancia stays for teenagers and grandparents.',
        outcome: 'Staged field biologists onboard private twin-otters with heated base camps and seamless medical evacuation cover.'
      }
    ],
    faqs: [
      { q: 'Do you book standard resort package itineraries?', a: 'No. Every journey is drawn from a blank sheet in our Mayfair planning library around your exact family cadence and intellectual interests.' },
      { q: 'Can you accompany a solo trip without making it feel scripted?', a: 'Yes. We prepare light frameworks that leave free mornings open while guaranteeing private tables, keyholders, and local drivers remain waiting whenever you choose.' },
      { q: 'How far ahead are Japanese ryokans or Italian private estates booked?', a: 'Ideally four to eight months for cherry blossom or harvest windows, though our regional partners frequently hold discretionary rooms for urgent member requests.' },
      { q: 'Are children’s activities educational rather than generic kids’ clubs?', a: 'Always. We pair young travellers with paleontologists, swordsmiths, marine naturalists, and astronomy guides.' }
    ]
  },

  'hotels-villas-residences': {
    extendedOverview: [
      'Public hotel booking engines show only commercial suite inventory while the finest private residences—a gated Provençal bastide overlooking Cap Ferrat, a ski-in penthouse above Verbier, or a restored Cotswolds priory—never list publicly online.',
      'TGLC inspects every property physically or via trusted local inspectors prior to lease execution. We verify acoustic glazing, high-throughput Starlink/fibre redundancy, perimeter sightlines from adjacent roads, nursery stair gates, and wine cellar cooling before a family signs.',
      'Simultaneously, we recruit and brief seasonal domestic teams: private Michelin-pedigree chefs, multilingual housekeepers, lifeguards, and estate managers who arrive forty-eight hours before the principal to turn glass and stone into a warm home.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/swiss_alpine_chalet.jpg', caption: 'Off-market Verbier timber sanctuary with heated ski boot room and mountain terrace' },
      { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Gloucestershire Cotswold stone manor surrounded by private parkland and walled gardens' },
      { image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg', caption: 'Highland sporting estate in Perthshire offering twenty square miles of complete seclusion' },
      { image: '/assets/aistudio/florence_palazzo_courtyard.jpg', caption: 'Private Mediterranean villa courtyard prepared for multi-generational summer stays' }
    ],
    operationalPhases: [
      { phase: '01 · Off-Market Search', title: 'Owner & Custodian Outreach', detail: 'Source non-listed family estates, historic villas, and discreet top-floor suites matching exact privacy specs.' },
      { phase: '02 · Technical Audit', title: 'Site Inspection & RF Hygiene', detail: 'Audit security fencing, Wi-Fi speeds, generator backups, mattress preferences, and pool safety alarms.' },
      { phase: '03 · House Staffing', title: 'Chef, Butler & Estate Assembly', detail: 'Install DBS-checked culinary, housekeeping, and childcare staff vetted under non-disclosure agreements.' },
      { phase: '04 · Pre-Stock & Turnkey', title: '72-Hour Arrival Activation', detail: 'Pantry organic shopping, preferred vintage cellars, crisp non-feather linens, and welcome flora staged beforehand.' }
    ],
    slaBenchmarks: [
      { label: 'Off-Market Share', value: '82% Unlisted', note: 'Private owner estates not on public portals' },
      { label: 'Audit Checklist', value: '48 Points', note: 'Physical security, acoustics, nursery & tech' },
      { label: 'Staff Onboarding', value: '72 hrs Notice', note: 'Private chefs, nannies & estate butlers' }
    ],
    vettedPartners: [
      'Private Villa Families in Côte d’Azur, Ibiza & Como',
      'Independent Swiss Chalet Trustees in Verbier & Gstaad',
      'Four Seasons, Aman, Oetker & Rosewood General Managers',
      'Specialist Domestic Chef & Estate Recruitment Agencies'
    ],
    extraPoints: [
      'Corporate entity and pseudonym contracting shielding family names from municipal guest registers',
      'Guaranteed early morning check-in and late evening airport-timed checkouts across partner luxury hotels'
    ],
    extraScenarios: [
      {
        title: 'Urgent Verbier Christmas Chalet Recovery',
        description: 'A principal’s direct rental collapsed ten days before New Year’s Eve due to structural water leaks.',
        outcome: 'Activated owner-held timber chalet with indoor lap pool, full Austrian ski butler team, and stocked Krug cellar in 36 hours.'
      },
      {
        title: 'Anonymous Grand Prix Week Monaco Villa',
        description: 'High-visibility principal wanting panoramic harbour views away from hotel lobby crowds.',
        outcome: 'Secured cliffside Roquebrune residence with 4-minute private chase-boat commute directly into Port Hercule pontoon.'
      }
    ],
    faqs: [
      { q: 'Can you rent private family villas under a corporate or trust pseudonym?', a: 'Yes. With compliance KYC held cleanly by TGLC, local leases can be structured via nominee vehicles to keep your family surname off vendor sheets.' },
      { q: 'What happens if the hotel suite or villa fails inspection upon arrival?', a: 'Because our inspectors preview properties prior to occupation, surprises are practically eliminated; should an unexpected infrastructure failure occur, our network prioritizes immediate suite upgrades or replacement residence shifts within hours.' },
      { q: 'Can we keep preferred mattresses, linen weights, and espresso roasts across hotels?', a: 'Your Member Dossier records exact pillow density, sheets, room temperature, and coffee specs, dispatched automatically before every arrival.' },
      { q: 'Do you coordinate private estate security during seasonal summer stays?', a: 'Yes. Julian Sterling’s advance unit places static gate guards, shoreline watch crews, and discreet drivers at European estates.' }
    ]
  },

  'yachts-coastal-escapes': {
    extendedOverview: [
      'Any broker can send glossy brochures showing sunpads and Jacuzzis. Real yachting mastery rests in crew longevity, acoustic vibration damping under anchor, tender speed, and a captain who knows where wind gusts roll around volcanic islands twelve hours ahead.',
      'Before shortlisting a 45m to 95m vessel across the Cyclades, Sardinia, St Barths, or Norwegian fjords, our maritime desk reviews shipyard maintenance periods, interviews the Captain and Chief Stewardess directly, and verifies zero crew turnover over at least two consecutive seasons.',
      'We pair larger motherships with high-speed chase tenders—Wajer 55 or VanDutch hulls—so guests can glide straight from secluded bay anchorages into beach club berths or cliffside harbour trattorias without waiting on inflatable dinghies.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/mediterranean_superyacht_deck.jpg', caption: 'Teak aft dining deck prepared for golden-hour Mediterranean table service at anchor' },
      { image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg', caption: 'Twilight stern mooring at Port Hercule timed for Grand Prix trackside hospitality' },
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'Matte carbon chase interceptor deployed for rapid night shore transfers' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Chef-curated regional catch paired with cellared white Burgundy onboard' }
    ],
    operationalPhases: [
      { phase: '01 · Vessel & Crew Vetting', title: 'Captain & Chef Chemistry Check', detail: 'Interview active captains on route experience, stabilizer torque, and onboard chef pedigree.' },
      { phase: '02 · Berths & Tenders', title: 'Chase Boat & Marina Slotting', detail: 'Lock rare stern-to berths in Portofino, Capri, St Tropez, or Monaco plus dedicated high-speed tenders.' },
      { phase: '03 · Cellar & Toy Staging', title: 'APA & Galley Provisioning', detail: 'Pre-load library champagne vintages, organic farm produce, seabed seabobs, and qualified dive instructors.' },
      { phase: '04 · Live Route Pivoting', title: 'Daily Anchor Optimization', detail: 'Monitor swell telemetry daily so sheltered turquoise coves replace choppy channels seamlessly.' }
    ],
    slaBenchmarks: [
      { label: 'Vessel Fleet Range', value: '35m – 110m', note: 'Motor, explorer & classic sailing yachts' },
      { label: 'Captain Vetting', value: '100% Direct', note: 'Crew tenure & logbook audit pre-charter' },
      { label: 'Harbour Chase Link', value: '< 10 min', note: 'Shore-to-stern high-speed tender shuttle' }
    ],
    vettedPartners: [
      'North European Custom Shipyard Charter Managers (Lürssen, Feadship, Benetti)',
      'Monaco & Antibes Port Captains & Berth Concessions',
      'Specialist Marine Wine & Organic Galley Provisioners',
      'Private Helideck & Maritime Aviation Handlers'
    ],
    extraPoints: [
      'Clear Advance Provisioning Allowance (APA) reconciliation preventing unexpected end-of-charter billing surprises',
      'Private onboard wellness suites stocked with osteopaths, acupuncturists, and hyperbaric recovery kits upon request'
    ],
    extraScenarios: [
      {
        title: 'Last-Minute Ionian Sanctuary Swap',
        description: 'High Mistral forecasts rendered the Gulf of Lion uncomfortable for a 10-day charter.',
        outcome: 'Switched itinerary seamlessly across Kefalonia, Ithaca, and Paxos aboard an equivalent 62m Benetti with onboard helipad.'
      },
      {
        title: 'Monaco Historic Trackside Mooring',
        description: 'Securing Zone A harbour berth overlooking Tabac Corner for 28 corporate guests.',
        outcome: 'Booked verified triple-deck yacht with chef service, close protection, and private track shuttle tenders.'
      }
    ],
    faqs: [
      { q: 'Why does Captain tenure matter more than hull length?', a: 'A cohesive crew who have sailed three summers together anticipate preferences effortlessly, resolve mechanical hiccups invisibly, and preserve calm warmth onboard.' },
      { q: 'How does APA (Advance Provisioning Allowance) accounting work?', a: 'Usually 30–35% of charter rate covers fuel, dockage, wine, and food. Our office audits the captain’s itemized purser ledger at disembarkation.' },
      { q: 'Can you organize helicopter drop-offs straight onto the yacht deck?', a: 'Where the vessel carries certified commercial helideck ratings (primarily 70m+ explorer and motor yachts), we coordinate offshore touch-and-go clearances cleanly.' },
      { q: 'Can guests embark privately without walking down busy marina quays?', a: 'Yes. We position covered chase boats at secluded adjacent coves or private harbour piers away from onlookers.' }
    ]
  },

  'global-mobility-logistics': {
    extendedOverview: [
      'Cross-border movement breaks down in the seams: missed tarmac connections, stuck sports trunks in customs sheds, unbriefed ground drivers at crowded terminals, or shifting consular visa circulars.',
      'Our Global Mobility desk maps every multi-city executive tour and family relocation as an uninterrupted corridor. Door-to-door bag tracking ships seasonal wardrobes seventy-two hours ahead, while regional fixers meet aircraft doors with diplomatic fast-track lanes in Dubai, Tokyo, London, and New York.',
      'In complex jurisdictions or during sudden civic disruption, our tactical unit coordinates armoured transfers, satellite communications backups, and instant flight diversion alternatives before schedules stall.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Synchronized evening executive convoy cleared for seamless central London transit' },
      { image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png', caption: 'Private aviation apron transfer eliminating public terminal transit entirely' },
      { image: '/assets/aistudio/luxury_sprinter_jetvan.jpg', caption: 'Soundproofed mobile briefing lounge configured with dual encrypted uplinks' },
      { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Advance luggage dispatch unboxed and steamed inside suites prior to touchdown' }
    ],
    operationalPhases: [
      { phase: '01 · Route Architecture', title: 'Jurisdiction & Risk Mapping', detail: 'Inspect visa rules, diplomatic immunities, medical advisories, and traffic corridors across all stops.' },
      { phase: '02 · Advance Freight', title: 'Wardrobe & Vault Forwarding', detail: 'Insured white-glove courier ships luggage, ski gear, and artworks to await in-suite unpacking.' },
      { phase: '03 · Airside Meet', title: 'Tarmac & Fast-Track Clearing', detail: 'Airside greeters manage border kiosks, biometric escort, and luggage straight to waiting convoy.' },
      { phase: '04 · Live Control', title: '24/7 Mission Watch', detail: 'Monitor strike alerts, volcanic/weather air corridors, and ground routes with ready fallback wings.' }
    ],
    slaBenchmarks: [
      { label: 'Jurisdiction Span', value: '95+ Countries', note: 'Accredited ground handlers & fixers' },
      { label: 'Arrival Gate Wait', value: '< 3 min', note: 'Airside escort to kerbside flagship' },
      { label: '24/7 Watch Desk', value: 'Always Live', note: 'Flight & disruption rerouting standby' }
    ],
    vettedPartners: [
      'Specialist Global Diplomatic Courier & Customs Brokers',
      'Commercial First Class Airside VIP Lounge Concessions (Heathrow Windsor Suite, PS LAX)',
      'SIA & International Close Protection Drivers',
      'Cross-Border Medical Evacuation Aviation Standbys'
    ],
    extraPoints: [
      'Direct booking authority into Heathrow Windsor Suite and VIP terminal pavilions worldwide',
      'Sealed garment pressing and cedar wardrobe staging completed ahead of principal check-in'
    ],
    extraScenarios: [
      {
        title: 'Five-Capital Roadshow in Six Days',
        description: 'Executing London, Riyadh, Zurich, Mumbai, and Singapore roadshow with zero missed meetings.',
        outcome: 'Matched time-zone rest briefs with Heathrow Windsor Suite exits and standby local armoured convoys.'
      },
      {
        title: 'Winter Ski Quiver Door-to-Chalet Shipments',
        description: 'Moving 14 custom ski bags and formal luggage from Chelsea to St Moritz safely.',
        outcome: 'Cleared Swiss customs via advance ATA Carnet and installed in boot room before landing.'
      }
    ],
    faqs: [
      { q: 'Can you secure Heathrow Windsor Suite even when flying commercial First?', a: 'Yes, for Royal, diplomatic, and qualifying First Class departures/arrivals via direct Windsor Suite handling registration.' },
      { q: 'How do you track valuable luggage transported separately from passengers?', a: 'Trunks travel inside sealed tamper-evident transit cases accompanied by bonded logistics partners and GPS telemetry logs.' },
      { q: 'Do you handle expedited travel documents?', a: 'We work alongside specialist regulated immigration and visa agencies to coordinate priority courier submissions; legal counsel always resides with accredited specialists.' },
      { q: 'What happens if an airline strike strands guests overseas?', a: 'Our charter desk holds immediate light and mid-size jets ready on short positioning notice to recover principals smoothly.' }
    ]
  },

  'london-dining': {
    extendedOverview: [
      'At Mayfair’s finest tables, public apps show no availability two months out while the corner banquette stays quietly held until 18:00 for known patrons of the house.',
      'TGLC does not flood restaurant receptionists with generic emails. Our team speaks directly with owners, General Managers, and head sommeliers across Mount Street, St James’s, Soho, and Notting Hill who welcome our members knowing they appreciate craft, arrive on time, and treat dining teams with warmth.',
      'Your table placement considers room acoustics for private conversation, discreet sightlines away from dining room cameras, and pre-briefed kitchen knowledge of every allergy and wine preference.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Candlelit corner banquette held privately ahead of a sensitive evening business supper' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Direct cellar reserve allocations uncorked and decanted two hours prior to seating' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Pre-dinner cocktails arranged quietly inside TGLC House on Albemarle Street' },
      { image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg', caption: 'Twelve-seat chef counter dining unlocked via direct proprietor introduction' }
    ],
    operationalPhases: [
      { phase: '01 · Mood Match', title: 'Acoustics, Cuisine & Discretion', detail: 'Pair business discretion, celebratory vibrancy, or intimate romance to the exact room and corner table.' },
      { phase: '02 · House Liaison', title: 'Direct Maitre d’ Placement', detail: 'Confirm table numbers directly with General Managers rather than automated aggregator waitlists.' },
      { phase: '03 · Pre-Table Brief', title: 'Allergy & Sommelier Readiness', detail: 'Share dietary nuances, champagne chill preferences, and preferred payment shielding ahead of arrival.' },
      { phase: '04 · Host Settling', title: 'Invisible Bill Clearance', detail: 'Settle charges via TGLC member ledger when requested so no cheque ever interrupts closing conversation.' }
    ],
    slaBenchmarks: [
      { label: 'Prime Mayfair Hold Rate', value: '96% Placed', note: 'Peak Thursday–Saturday dinner tables' },
      { label: 'Last-Minute Table Window', value: '< 90 min', note: 'Urgent same-day seating requests' },
      { label: 'Table-Side Receipts', value: 'Optional Zero', note: 'Pre-settled invoice ledger option' }
    ],
    vettedPartners: [
      'Three-Star & Two-Star Michelin Kitchens Across W1 & SW1',
      'Mount Street, St James’s & Marylebone Heritage Dining Rooms',
      'Master Sommeliers & Independent Natural Wine Cellars',
      'Shoreditch & Soho Chef Counter Pioneers'
    ],
    extraPoints: [
      'Off-menu whole roast Dover sole, white truffle, or dry-aged rib cuts arranged pre-seating',
      'Rear courtyard chauffeur coordination timed with coffee service for seamless departure'
    ],
    extraScenarios: [
      {
        title: '18:00 Same-Night Mount Street Deal Table',
        description: 'Client landed early from Geneva needing a quiet corner table for four at 20:15 on Friday.',
        outcome: 'Placed in discreet banquette beneath original painting with 2010 Meursault chilled beforehand.'
      },
      {
        title: 'Strict Anaphylaxis Child Birthday Lunch',
        description: 'Host family requiring zero-trace culinary safety across four courses in Knightsbridge.',
        outcome: 'Direct Executive Chef kitchen clearance signed off 48 hours ahead with dedicated pastry station.'
      }
    ],
    faqs: [
      { q: 'Can bills be settled discreetly without tapping a card at the table?', a: 'Yes. At participating partner houses, TGLC authorizes settlement against your pre-cleared account so you rise smoothly from coffee.' },
      { q: 'Can you request specific corner tables for private discussions?', a: 'Yes. We log preferred seat numbers in your Member Dossier and request quiet wall booths away from busy service aisles.' },
      { q: 'What happens if plans delay flights and dinner needs pushing back an hour?', a: 'We monitor your flight tail directly and hold kitchen warmth automatically without losing your table.' },
      { q: 'Do you cover casual neighbourhood gems as well as formal Michelin rooms?', a: 'Equally enthusiastically—whether a Soho noodle bar counter or an unmarked Belgravia bistrot.' }
    ]
  },

  'private-dining-celebrations': {
    extendedOverview: [
      'Public dining rooms cannot hold sovereign strategy talks, family governance milestones, or candid birthday toasts. Across London’s Georgian townhouses, bank bullion cellars, museum courtyards, and bankside penthouses sit private dining rooms built for total enclosure.',
      'We inspect acoustic decibel attenuation personally so confidential negotiations stay strictly inside four panelled walls. Floral architects source seasonal English garden stems, hand-calligraphed menus appear on cotton stock, and guest Michelin chefs adapt menus course by course to household heritage.',
      'Whether hosting eight partners behind heavy oak in St James’s or sixty family friends inside the Wallace Collection’s glazed courtyard, every element settles seamlessly into place.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/subrosa_catacomb_dinner.jpg', caption: 'Candlelit stone chamber arranged for private sovereign cellar banquets' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Georgian mahogany dining salon configured for twelve guests under soft lighting' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Library vintages decanted and catalogued tableside with visiting estate ambassadors' },
      { image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg', caption: 'Panoramic private Southbank reception overlooking illuminated City bridges' }
    ],
    operationalPhases: [
      { phase: '01 · Room Match', title: 'Architectural & Acoustic Sizing', detail: 'Select private cellar vaults, townhouse salons, or conservatory halls tailored to exact headcount.' },
      { phase: '02 · Culinary Curation', title: 'Chef, Menu & Vintage Sourcing', detail: 'Co-author multi-course tasting menus and pull pristine single-owner wines straight from bonded vaults.' },
      { phase: '03 · Room Craft', title: 'Lighting, Sound & Tabletop', detail: 'Specify cotton paper menu calligraphy, floral height restraint, background quartet music, and candles.' },
      { phase: '04 · Quiet Execution', title: 'Arrival Screening & Disbursement', detail: 'Staff private guest greeting lists, coat checks, and direct fleet departures without congestion.' }
    ],
    slaBenchmarks: [
      { label: 'Capacity Range', value: '6 – 120 Guests', note: 'Intimate wine cellars to grand halls' },
      { label: 'Acoustic Screening', value: 'STC-55 Rated', note: 'Private rooms tested for confidential M&A' },
      { label: 'Turnkey Lead Time', value: '48h – 12wks', note: 'Rapid executive dinners to gala feasts' }
    ],
    vettedPartners: [
      'TGLC House Third-Floor Private Salon, 45 Albemarle Street',
      'Wallace Collection Courtyard & V&A Private Evening Halls',
      'St James’s Antiquarian Wine Vaults & Historic Mansions',
      'Independent Bespoke Florists & Michelin Consultant Chefs'
    ],
    extraPoints: [
      'Dedicated SIA-licensed doorman screening uninvited arrivals on residential garden squares',
      'Multi-vintage vertical tastings orchestrated with visiting French & Italian domain proprietors'
    ],
    extraScenarios: [
      {
        title: 'Museum Courtyard 50th Anniversary Dinner',
        description: 'Private after-hours dinner for forty beneath illuminated Old Master galleries.',
        outcome: 'Secured private closing museum curfew, bespoke four-course spring menu, and string trio.'
      },
      {
        title: 'Six-Course St James’s Merger Table',
        description: 'Confidential dinner for ten institutional principals requiring zero staff eavesdropping.',
        outcome: 'Booked acoustically sealed sub-basement salon using single-team cleared sommelier service.'
      }
    ],
    faqs: [
      { q: 'Can we bring rare bottles from our own home cellar?', a: 'In almost all TGLC private buyouts and partner salons, we manage corkage clearance, temperature standing 48 hours ahead, and sommelier decanting.' },
      { q: 'Are NDAs signed by temporary waiters and musicians?', a: 'Every independent contractor entering private TGLC events executes our non-disclosure and zero-device charter before setup.' },
      { q: 'Do you manage audiovisual equipment for private family tributes?', a: 'Discreetly concealed projection screens and bespoke sound arrays can be installed prior to arrival and removed overnight.' },
      { q: 'Can guests arrive individually via secure mews entrances?', a: 'Yes, we stage private valet marshals on adjacent side streets so arrival stays peaceful.' }
    ]
  },

  'members-clubs-introductions': {
    extendedOverview: [
      'London’s private members’ club landscape operates by written codes and unwritten manners. St James’s heritage townhouses built in 1820 carry entirely different conversational codes from contemporary Mayfair dining clubs or East London creative houses.',
      'TGLC provides honest, insider cultural counsel before you commit to proposing memberships—saving international principals from awkward committee mismatches or clubs crowded with transient day-trippers.',
      'Where introductions align, we broker warm proposer discussions, arrange private trial lunches inside diplomatic clubs, and activate international reciprocal letters across Paris, New York, Milan, and Tokyo.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Wood-panelled drawing room ambiance characteristic of Pall Mall and St James’s clubs' },
      { image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg', caption: 'Historic Georgian doorways along Mayfair and St James’s club corridors' },
      { image: '/assets/aistudio/meard_poker_sanctum.jpg', caption: 'Private evening games and late-night conversation suites hidden behind velvet drapery' },
      { image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg', caption: 'Late-night creative acoustic clubs across Soho hosting musicians and writers' }
    ],
    operationalPhases: [
      { phase: '01 · Culture Audit', title: 'Character & Use Matching', detail: 'Evaluate whether quiet board meetings, late-night dining, wine cellars, or sports clubs fit best.' },
      { phase: '02 · House Tours', title: 'Hosted Reciprocal Introductions', detail: 'Dine inside prospective clubs alongside existing committee acquaintances before filing nominations.' },
      { phase: '03 · Proposal Path', title: 'Proposer & Seconder Readiness', detail: 'Prepare clear candidate dossiers aligned with individual club election committees and rules.' },
      { phase: '04 · Global Letters', title: 'Reciprocal Privileges Overseas', detail: 'Coordinate reciprocal club guest letters across Manhattan, Paris, Geneva, and Hong Kong.' }
    ],
    slaBenchmarks: [
      { label: 'London Heritage Houses', value: '28+ Mapped', note: 'St James’s, Mayfair, Soho & City clubs' },
      { label: 'Reciprocal Cities', value: '22 Capitals', note: 'Global club letters issued by request' },
      { label: 'Hosting Etiquette', value: 'Briefed Clear', note: 'Dress codes, phone rules & guest limits' }
    ],
    vettedPartners: [
      'Traditional St James’s & Pall Mall Committee Proposers',
      'Contemporary Mayfair & Berkeley Square House Directors',
      'Leading Arts, Literary & Creative Industry Soho Clubs',
      'International Reciprocal Sister Clubs in Europe, US & Asia'
    ],
    extraPoints: [
      'Direct guidance on mobile phone zones, neckwear etiquette, and private dining room hosting privileges',
      'Immediate guest hosting reservations inside TGLC House, 45 Albemarle Street while applications advance'
    ],
    extraScenarios: [
      {
        title: 'Dual Club Alignment for Relocating Founder',
        description: 'Tech founder wanting one quiet morning Pall Mall study club plus one lively Mayfair evening dining house.',
        outcome: 'Matched two distinct institutions with private tasting lunches and clear committee introductions.'
      },
      {
        title: 'Tokyo & New York Boardroom Reciprocals',
        description: 'Visiting member needing private Manhattan & Ginza entertaining space on four days’ notice.',
        outcome: 'Arranged clean honorary reciprocal guest cards via senior club secretary offices.'
      }
    ],
    faqs: [
      { q: 'Can TGLC guarantee election to a historic club?', a: 'No external firm controls sovereign election committees; rather, we ensure you apply to rooms aligned with your genuine interests with properly prepared introductions.' },
      { q: 'While waiting on traditional waiting lists, where can we host private dinners?', a: 'Members utilize the third-floor salon suites at TGLC House on Albemarle Street plus our curated partner club private rooms.' },
      { q: 'Do you cover bohemian or music-focused clubs alongside traditional houses?', a: 'Yes, ranging from quiet Soho cinema salons to high-energy Mayfair & Shoreditch listening clubs.' },
      { q: 'How are club dress rules changing across St James’s?', a: 'Many historic houses preserve collar-and-jacket requirements after 18:00 while contemporary Mayfair houses favour relaxed tailoring; we brief clearly beforehand.' }
    ]
  },

  'nightlife-after-dark': {
    extendedOverview: [
      'True London after-dark culture avoids velvet rope queues, flash photography, and watered-down club mixers. Beyond daylight avenues lie bespoke acoustic rooms: basement jazz pianos humming at 02:00 AM, Shoreditch vinyl lofts powered by custom horn speakers, and private hip-hop booths where artists relax off tour.',
      'Your security and privacy come first. Phones lock safely into pouches, unmarked alley doors swing clear as our satin-black Maybach halts inside adjacent mews, and booths are placed far from public dancefloors.',
      'When energy shifts from city clubs to stillness at 03:30 AM, matte-black Thames stealth interceptors or private brutalist skyline lofts remain queued to finish the night on your terms.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg', caption: 'Concrete sub-level hip-hop and rotary sound lounge with warm amber booth elevation' },
      { image: '/assets/aistudio/urban_vinyl_booth_deep.jpg', caption: 'Late-night vinyl selector booth tucked behind custom brass and velvet screens' },
      { image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg', caption: 'Shoreditch rooftop turntable suite available for private midnight selector sessions' },
      { image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg', caption: 'Unamplified Soho cellar quartet playing late sets past 02:00 AM' }
    ],
    operationalPhases: [
      { phase: '01 · Sonic Curation', title: 'Venue & Genre Alignment', detail: 'Choose bohemian unamplified jazz, pre-ban absinthe cellars, or high-energy hip-hop & vinyl vaults.' },
      { phase: '02 · Back-Alley Ingress', title: 'Non-Public Door Passage', detail: 'Route chauffeured vehicles into gated rear service alleys skipping crowded pavements completely.' },
      { phase: '03 · Booth Architecture', title: 'Table Position & Reserve Stock', detail: 'Stage preferred bottle vintages, non-alcoholic craft botanicals, and dedicated booth guards.' },
      { phase: '04 · Dawn Exfiltration', title: 'Staged Extraction & Next Leg', detail: 'Coordinate private nightcap transfers or morning airfield sprints smoothly upon exit.' }
    ],
    slaBenchmarks: [
      { label: 'Queue Wait Time', value: 'Zero', note: 'Verified host & service door access' },
      { label: 'Sound Vaults', value: '18+ Rooms', note: 'Mayfair, Soho, Shoreditch & Vauxhall' },
      { label: 'Camera Privacy', value: 'Enforced', note: 'Strict non-photography house policies' }
    ],
    vettedPartners: [
      'Private Rotary Audio & Hip-Hop Listening Vaults (W1 / SE1 / E2)',
      'Soho Late-Night Jazz & Musicians’ Jam Cellars',
      'Shoreditch Skyline Lofts & Guest Resident DJs',
      'Julian Sterling Night Close-Protection Specialists'
    ],
    extraPoints: [
      'Private DJ booking & custom analog sound setups arranged inside penthouse loft buyouts',
      'Late-night wagyu sandos, sashimi trays, or hearth kitchens serving straight to VIP tables past 02:00'
    ],
    extraScenarios: [
      {
        title: 'Post-Concert Unlisted Afterparty for 25',
        description: 'Touring headline artist needing a private room straight after an O2 show without press lenses.',
        outcome: 'Moved convoy cleanly to locked Vauxhall masonry arch with custom vinyl selector & security cordon.'
      },
      {
        title: 'Discreet Jazz & Armagnac Evening in Soho',
        description: 'Two visiting founders wanting authentic unamplified acoustics and rare spirits after dinner.',
        outcome: 'Walked via unlisted courtyard gate to front sofa beside Steinway trio until 02:30 AM.'
      }
    ],
    faqs: [
      { q: 'Can you unlock underground hip-hop or DJ rooms beyond traditional Mayfair velvet clubs?', a: 'Yes. Sector 09 covers concrete bass rooms, Shoreditch rooftop vinyl lofts, and street-couture night sessions.' },
      { q: 'How are phones and social media leaks controlled in private booths?', a: 'Many rooms apply Faraday pouches or lens seals at door admission, reinforced by our booth host team.' },
      { q: 'Can a security officer accompany our table quietly without drawing attention?', a: 'Yes. Officers dress seamlessly to room code—whether bespoke tailoring in Mayfair or clean luxury streetwear in East London.' },
      { q: 'Is safe driver transport ready no matter how late the evening concludes?', a: 'Chauffeurs stage in adjacent side mews on open radio watch until every member reaches home.' }
    ]
  },

  'global-dining-culinary': {
    extendedOverview: [
      'Securing an eight-seat counter seat in Ginza or a private cellar room in Alba requires trusted human introductions rather than third-party concierge hotlines. Language nuance, seasonal produce peaks, and respect for chef discipline dictate who receives seats.',
      'TGLC works directly with regional culinary attachés in Tokyo, Paris, San Sebastian, New York, Milan, and Hong Kong. From closed winery barrel tastings in Champagne and Barolo to private truffler hunts in Piedmont, every encounter goes straight to the craft.',
      'Should late international flights collide with rigid Japanese seating schedules, local attachés maintain live communication with chef teams to preserve seats respectfully.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg', caption: 'Eight-seat hinoki wood counter omakase coordinated via Tokyo culinary attachés' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Estate limestone cave tastings hosted directly by Grand Cru winemakers' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Evening European tasting menu paired with single-domaine cellar pours' },
      { image: '/assets/aistudio/florence_palazzo_courtyard.jpg', caption: 'Seasonal white-truffle dining under vaulted Renaissance stone porticos' }
    ],
    operationalPhases: [
      { phase: '01 · Harvest Timing', title: 'Regional Seasonality Calendar', detail: 'Align visits with Alba white truffle weeks, Toyosu bluefin peaks, or Bordeaux en primeur tastings.' },
      { phase: '02 · Local Attaché', title: 'Native-Language Chef Briefing', detail: 'Confirm bookings in Japanese, French, Italian, or Spanish alongside detailed allergy translation.' },
      { phase: '03 · Estate Access', title: 'Vineyard & Market Walks', detail: 'Pair evening dining with morning artisan farms, tsunami-safe fish markets, or barrel samplings.' },
      { phase: '04 · Wine Logistics', title: 'Ship-to-Home Tax Bonding', detail: 'Arrange temperature-controlled delivery of rare estate bottles back to London home cellars.' }
    ],
    slaBenchmarks: [
      { label: 'Culinary Hubs', value: '18 Capitals', note: 'Tokyo, Paris, NYC, Milan, San Sebastian' },
      { label: 'Allergy Accuracy', value: 'Native Cards', note: 'Chef-verified bilingual allergy briefs' },
      { label: 'Domain Estates', value: 'Private Keys', note: 'Closed cellar visits across France & Italy' }
    ],
    vettedPartners: [
      'Ginza & Kyoto Three-Star Omakase Proprietors',
      'Grand Cru Burgundy & Champagne Domaine Estates',
      'Basque Michelin Grill Kitchens & Sherry Bodegas',
      'Manhattan, Paris & Milan Chef Counter Hosts'
    ],
    extraPoints: [
      'Bilingual culinary translators accompanying counter omakase tastings on request so dialogue with the itamae flows easily',
      'Chilled travel case shipping for rare sake and European estate olive oils acquired en route'
    ],
    extraScenarios: [
      {
        title: 'Four-Day Tokyo & Kyoto Sushi Study',
        description: 'Booking four invitation-only Tokyo and Kyoto counters within ten days’ notice.',
        outcome: 'Confirmed every counter via resident hotel concierges and local attachés, providing English-Japanese allergy folios.'
      },
      {
        title: 'Piedmont White Truffle Hunt & Nebbiolo Vertical',
        description: 'Family group seeking private hillside forest hunt and winemaker lunch.',
        outcome: 'Walked private Alba oak woods at dawn with champion dogs before hosting cellar lunch dating back to 1978.'
      }
    ],
    faqs: [
      { q: 'Can you secure Kyoto Kaiseki or Ginza sushi counters where foreigners rarely book?', a: 'Yes, via local Tokyo hotel directors and long-standing restaurant proprietors trusted by TGLC, always respecting strict no-perfume and punctual arrival etiquette.' },
      { q: 'Can purchased cellar wines from Champagne or Tuscany be shipped cleanly to the UK?', a: 'Yes. Consolidated temperature-controlled reefers ship cases straight to London bonded facilities with customs duty settled cleanly.' },
      { q: 'Do you arrange private cooking workshops for families travelling?', a: 'We connect families with pastry, pasta, and fermentation masters inside private kitchens worldwide.' },
      { q: 'Are strict religious or medical dietary rules accommodated seamlessly abroad?', a: 'Native-language kitchen cards confirm exact oil, shellfish, kosher, or halal preparation steps ahead of seating.' }
    ]
  },

  'art-design-collecting': {
    extendedOverview: [
      'Public art fair VIP previews have grown into congested social promenades rather than serious spaces to examine pigment, brush velocity, or patina. TGLC returns seriousness and calm to acquiring art.',
      'Led by Dr. Helena Zhang-Somerset, we unlock closed museum rooms once doors bolt to the public, organize unhurried afternoons inside working East London sculpture foundries and painterly warehouses, and arrange ultraviolet and provenance checks with independent scholars ahead of auctions.',
      'Once an artwork is acquired, our registrars manage museum-grade crating, non-reflective conservation glass, water-gilded basswood frames, and bonded Freeport storage across London and Geneva.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg', caption: 'Pre-opening museum tent inspection in Regent’s Park prior to collector admission' },
      { image: '/assets/aistudio/royal_opera_gallery.jpg', caption: 'Private illuminated portrait wing toured after hours alongside senior curators' },
      { image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg', caption: 'Collector loft installation balancing contemporary minimalism with stone architecture' },
      { image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg', caption: 'Custom picture lighting calibrated to preserve delicate oils and archival works on paper' }
    ],
    operationalPhases: [
      { phase: '01 · Scholarly Audit', title: 'Collection Mapping & Gap Analysis', detail: 'Clarify collecting focus—Old Masters, post-war sculpture, conceptual works, or architectural furniture.' },
      { phase: '02 · Access & Studio', title: 'Closed Doors & Foundry Visits', detail: 'Enter artists’ working yards, dealer backrooms, and closed fair aisles before general opening.' },
      { phase: '03 · Due Diligence', title: 'UV Inspection & Provenance Check', detail: 'Verify exhibition stamps, catalogue raisonné numbers, and relining integrity independently.' },
      { phase: '04 · Installation', title: 'Crating, Framing & Lighting', detail: 'Manage customs export licenses, museum glass installation, and temperature-logged transit.' }
    ],
    slaBenchmarks: [
      { label: 'Preview Clearance', value: '48 hrs Prior', note: 'Early viewing ahead of evening auctions' },
      { label: 'Foundry Network', value: '18+ Studios', note: 'Hackney, Deptford, Zurich & Milan' },
      { label: 'Handling Spec', value: 'Museum Grade', note: 'Climate-controlled fine art transit' }
    ],
    vettedPartners: [
      'Independent Provenance Researchers & UV Conservators',
      'Cork Street, Fitzrovia & East London Artist Studios',
      'St James’s Hand-Carved Water Gilding Framers',
      'London & Geneva Freeport Bonded Art Logistics'
    ],
    extraPoints: [
      'Confidential telephone bidding and discreet saleroom paddle representation preserving collector anonymity',
      'Museum loan documentation for foundations sharing works publicly'
    ],
    extraScenarios: [
      {
        title: 'Unlisted Post-War British Sculpture Commission',
        description: 'Collector wishing to commission a site-specific bronze work directly for a Belgravia courtyard.',
        outcome: 'Orchestrated three Deptford foundry studio days; bronze installed on reinforced courtyard plinth within four months.'
      },
      {
        title: 'Closed-Door Wallace Collection Evening Tour',
        description: 'Private 10-person study tour of Fragonard canvases and French decorative arts after closing.',
        outcome: 'Curatorial Head unlocked private galleries with champagne courtyard service afterward.'
      }
    ],
    faqs: [
      { q: 'Does TGLC accept gallery kickbacks on works purchased by members?', a: 'Never. We advise strictly for our member’s scholarly interest and net acquisition terms, remaining independent of any dealer commission.' },
      { q: 'Can you help insure and value inherited collections sitting undocumented at home?', a: 'Yes. Accredited museum valuers conduct confidential in-residence cataloguing, high-resolution photography, and provenance research.' },
      { q: 'Do you cover architectural and mid-century furniture alongside paintings?', a: 'Extensively—sourcing verified works by Jean Royère, Charlotte Perriand, and Nakashima via Paris and Milan specialists.' },
      { q: 'How are export licenses navigated when bringing works out of continental Europe?', a: 'Our fine art logistics partners manage heritage ministry clearances cleanly ahead of packing.' }
    ]
  },

  'music-theatre-performance': {
    extendedOverview: [
      'Acoustic sweet spots, interval serenity, and zero ticketing queue drama separate ordinary theatre nights from transcendent evenings of music and stage.',
      'From central Grand Tier Box allocations overlooking the Royal Opera House to intimate candlelit string recitals inside submerged Tower Bridge masonry vaults, we place guests in prime rows backed by private interval salons.',
      'For family celebrations or creative summits, our performance desk also engages soloists, West End leads, and headline contemporary recording artists privately behind acoustic screens.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/royal_opera_box_1794391694654.jpg', caption: 'Central Grand Tier box with direct doorway to private interval drawing room' },
      { image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg', caption: 'Late-night unamplified quartet sessions booked behind Soho basement doors' },
      { image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg', caption: 'Private loft acoustics staged for resident selectors and visiting artists' },
      { image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg', caption: 'Fourteen-second natural architectural reverb reserved for private cello recitals' }
    ],
    operationalPhases: [
      { phase: '01 · Acoustic Match', title: 'Sightline & Box Apportionment', detail: 'Hold central acoustic positions with adjoining private salon access rather than cramped stalls.' },
      { phase: '02 · Interval Table', title: 'Champagne & Pre-Order Timing', detail: 'Pre-stage interval platters and chilled pours in private rooms eliminating queue crowds.' },
      { phase: '03 · Backstage Links', title: 'Director & Cast Introductions', detail: 'Arrange post-curtain green room meetings with conductors, soloists, and choreographers.' },
      { phase: '04 · Fleet Exit', title: 'Side-Lane Staged Pickup', detail: 'Extract principals quietly from floral hall lanes bypassing congested Covent Garden exits.' }
    ],
    slaBenchmarks: [
      { label: 'Premier Boxes', value: 'Direct Holds', note: 'Royal Opera, Albert Hall & Glyndebourne' },
      { label: 'Interval Prep', value: 'Pre-Set', note: 'Zero bar queuing during breaks' },
      { label: 'Sold-Out Tours', value: 'Suite & Row 1', note: 'Arena, classical & West End openings' }
    ],
    vettedPartners: [
      'Covent Garden Patrons & Glyndebourne Lawn Pavilion Holders',
      'West End Theatre Producers & Official Box Concessions',
      'Wigmore Hall & Barbican Chamber Soloists',
      'International Artist Booking Representatives'
    ],
    extraPoints: [
      'Custom four-course hamper and silver service installed cleanly on Glyndebourne Ha-Ha lawns during 90-minute summer intervals',
      'Discreet backstage tour permissions for young musicians visiting conservatories or orchestra rehearsals'
    ],
    extraScenarios: [
      {
        title: 'Private Glyndebourne Opening Night',
        description: 'Four principals flying by helicopter to Sussex with white-linen lawn supper.',
        outcome: 'Arranged private lawn gazebo, butler waitstaff, top-stalls seating, and twilight flight back to Battersea.'
      },
      {
        title: 'Closed Subterranean Cello Performance',
        description: 'Private acoustic performance for ten family guests inside a candlelit London vault.',
        outcome: 'Engaged principal orchestra cellist inside Brunel’s Thames Tunnel Shaft for a 45-minute private set.'
      }
    ],
    faqs: [
      { q: 'Are concert and West End seats sourced directly rather than inflated resale sites?', a: 'Yes. We procure exclusively via theatre producers, patron debenture boxes, and verified primary artist allocations.' },
      { q: 'Can TGLC book a celebrity DJ or classical soloist for a private birthday?', a: 'Yes, coordinating technical rider acoustics, sound-level permits, and NDA artist logistics privately.' },
      { q: 'Do you cover international festivals such as Salzburg or Bayreuth?', a: 'Full continental opera travel combines Salzburg Festival seats with private lakefront estates and helicopter hops.' },
      { q: 'Is pre-theatre dining timed strictly around 19:00 or 19:30 curtain rises?', a: 'Chauffeurs remain standing right outside kitchens calibrated precisely to complete courses with comfortable time.' }
    ]
  },

  'fashion-private-shopping': {
    extendedOverview: [
      'Luxury couture shopping should never require waiting in queue outside flagship doors or carrying paper carrier bags along packed avenues. Whether opening Bond Street houses before 10:00 AM, fitting Savile Row suits over chilled tea in your London residence, or sourcing archival streetwear runway capsules behind blackened Soho windows, fashion feels serene when orchestrated on your territory.',
      'We connect members directly with Paris haute couture ateliers, Savile Row master cutters, and Harrods/Selfridges Private Penthouse directors. Cloth samples, diamond high-jewellery parures, and seasonal ready-to-wear trunks are brought straight into private fitting apartments.',
      'For collectors bridging heritage tailoring and global street couture, we secure rare Japanese denim collaborations and numbered sneaker drops straight from design vaults.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/savile_row_bespoke.jpg', caption: 'Individual brown-paper patterns drafted across Savile Row cutting tables' },
      { image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg', caption: 'Heritage Tudor architecture housing private closed-door shopping suites' },
      { image: '/assets/aistudio/shoreditch_street_couture.jpg', caption: 'Private street-couture capsule racks presented before public global drops' },
      { image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg', caption: 'Discreet styling lounge pairing custom outerwear with archival footwear editions' }
    ],
    operationalPhases: [
      { phase: '01 · Wardrobe Brief', title: 'Sizing, Occasion & Silhouette', detail: 'Catalogue exact cut measurements, climate needs, and formal gala dress codes cleanly.' },
      { phase: '02 · Closed Salon', title: 'After-Hours or In-Suite Edit', detail: 'Pre-curate twenty to forty looks inside flagship penthouses or bring houses directly to your townhouse.' },
      { phase: '03 · Master Fitting', title: 'Basted Tailoring & Alterations', detail: 'Direct access to Savile Row cutters and seamstresses for expedited diplomatic turnaround.' },
      { phase: '04 · Steamed Load', title: 'Cedar Wardrobe Delivery', detail: 'Deliver altered garments pressed on wooden hangers ready for private aircraft closets.' }
    ],
    slaBenchmarks: [
      { label: 'Salon Privacy', value: '100% Closed', note: 'Before-opening or private penthouse rooms' },
      { label: 'Turnaround', value: '2 – 3 wks', note: 'Expedited bespoke tailoring rush possible' },
      { label: 'Street Capsule Desk', value: 'First-Look', note: 'Pre-drop Milan, Tokyo & Soho samples' }
    ],
    vettedPartners: [
      'Savile Row Bespoke Houses (Huntsman, Henry Poole, Anderson & Sheppard)',
      'Harrods Penthouse & Selfridges Duke Street Private Suites',
      'New Bond Street & Sloane Street Haute Couture Directors',
      'Independent Streetwear Archivists & Japanese Denim Mills'
    ],
    extraPoints: [
      'Subterranean turntable car arrival at Harrods Hans Crescent porticos with express penthouse lift',
      'Bespoke motoring gloves, cashmere travel coats, and cedar garment luggage built to coordinate ensembles'
    ],
    extraScenarios: [
      {
        title: '48-Hour Royal Enclosure Wardrobe Recovery',
        description: 'Airline lost principal’s formal morning dress trunks on arrival before Royal Ascot.',
        outcome: 'Opened Savile Row cutter and millinery atelier late evening; fitted bespoke charcoal morning coat overnight.'
      },
      {
        title: 'In-Residence Geneva Seasonal Trunk Edit',
        description: 'Busy chairman unable to visit Bond Street ahead of winter Davos schedule.',
        outcome: 'Flew three tailoring and outerwear directors to Belgravia drawing room for 90-minute complete edit.'
      }
    ],
    faqs: [
      { q: 'Can Savile Row cutters measure me at my home or hotel outside London?', a: 'Head cutters travel routinely across New York, Geneva, and Hong Kong; TGLC coordinates private in-suite appointments seamlessly.' },
      { q: 'Does TGLC assist with rare Hermès leather or runway sample allocations?', a: 'We connect qualified members transparently with boutique Private Client Directors respecting house allocation protocols.' },
      { q: 'Can you balance formal diplomatic dressing with contemporary street culture?', a: 'Yes—pairing bespoke Scottish worsted tailoring with closed-door Soho collector streetwear previews.' },
      { q: 'Do stylists retain commission markups on clothing sourced?', a: 'We advise independently and pass negotiated maison courtesies cleanly on house invoices.' }
    ]
  },

  'sport-motorsport': {
    extendedOverview: [
      'Watching elite sport from the best position demands official debenture legitimacy alongside frictionless movement through massive event perimeters. Public queues and shuttles rob major fixtures of their elegance.',
      'Across Wimbledon Centre Court, Silverstone and Monaco F1 Paddock Clubs, Royal Ascot’s Royal Enclosure, Goodwood Revival, and UFC Row 1 Octagon placements, TGLC coordinates official tickets, heli-transfers directly bypassing circuit jams, and private pitchside marquees.',
      'For members wishing to compete rather than watch, we also arrange private supercar track days with former Le Mans instructors, closed St Andrews links tee times, and East End championship boxing gym sparring.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg', caption: 'Centre Court debenture rows paired with private Rosewater Pavilion terrace dining' },
      { image: '/assets/aistudio/ufc_arena_ringside.jpg', caption: 'Row 1 Octagon cageside passes with backstage fighter tunnel credentials' },
      { image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg', caption: 'Concours lawns and closed supercar track paddocks at Goodwood and Blenheim' },
      { image: '/assets/aistudio/east_end_boxing_1794391694652.jpg', caption: 'Private railway arch sparring sessions under World Championship ring coaches' }
    ],
    operationalPhases: [
      { phase: '01 · Credential Lock', title: 'Official Debenture & Paddock Pass', detail: 'Secure genuine verified passes—never unverified secondary reseller PDFs.' },
      { phase: '02 · Air Bypass', title: 'Helicopter Slot Reservation', detail: 'Book Battersea AW109 flights straight onto Wimbledon Common, Silverstone, or Ascot pads.' },
      { phase: '03 · Trackside Base', title: 'Hospitality Suites & Sommelier', detail: 'Reserve quiet pitchside or pit-lane dining tables with dedicated butler teams.' },
      { phase: '04 · Athlete Encounters', title: 'Private Clinics & Paddock Walks', detail: 'Arrange post-round hitting lessons, pit telemetry briefs, or ringside corner walks.' }
    ],
    slaBenchmarks: [
      { label: 'Ticket Provenance', value: '100% Official', note: 'Direct debenture & Paddock allocations' },
      { label: 'Air Transit Savings', value: '7–18 min', note: 'Flights replacing 2-hour event traffic' },
      { label: 'Fixture Coverage', value: 'Global Majors', note: 'F1, Majors Tennis, Ascot, Polo, UFC' }
    ],
    vettedPartners: [
      'All England Lawn Tennis Club Debenture Holders',
      'Formula 1 Paddock Club & Historic Team Principal Boxes',
      'Royal Ascot & Guards Polo Smith’s Lawn Concessions',
      'Battersea & Regional Airfield Heli-Charter Directors'
    ],
    extraPoints: [
      'Private VIP parking permits directly inside Gate 4 SW19 and Goodwood Drivers’ Club grounds',
      'Custom coaching weekends with Ryder Cup professionals, Davis Cup captains, and world-title boxers'
    ],
    extraScenarios: [
      {
        title: 'Silverstone Qualifying & Paddock Telemetry Brief',
        description: 'Four motorsport patrons requesting pit wall briefings alongside trackside helicopter commuting.',
        outcome: 'Locked Paddock Club hospitality with team garage engineer tour and 22-minute flight from Battersea.'
      },
      {
        title: 'Wimbledon Mens Semi-Finals with Village Dinner',
        description: 'Visiting American family celebrating milestone anniversary across SW19.',
        outcome: 'Secured debenture baseline seats, morning Rosewater lobster lunch, and private garden room at Cannizaro.'
      }
    ],
    faqs: [
      { q: 'Are Wimbledon seats debenture holders rather than risky unverified transfers?', a: 'Always. Every Wimbledon ticket arrives officially transferred via debenture holder allocations carrying full Renshaw/Rosewater lounge rights.' },
      { q: 'Can helicopter pads take whole families together?', a: 'Twin-engine helicopters accommodate up to 6–7 guests cleanly, or dual flights fly in loose formation from Battersea.' },
      { q: 'Can you organize private golf tee times on restricted Scottish links?', a: 'Yes, via private club introductions and licensed PGA accompanying hosts at historic coastal courses.' },
      { q: 'Do you cover gritty combat sports as well as traditional British racing?', a: 'From Row 1 UFC O2 cageside tunnels to unsanctioned railway arch boxing exhibitions with full tactical security.' }
    ]
  },

  'private-celebrations-milestones': {
    extendedOverview: [
      'Milestone anniversaries, fortieth birthdays, and intimate family vows belong in spaces filled with memory rather than generic hotel banquets. TGLC designs complete weekend takeovers inside Grade I English country manors, Scottish Highland castles, and Tuscan palazzi.',
      'Production unfolds invisibly: architectural candle lighting replaces harsh floodlights, custom floral meadows dress dining barns, Michelin kitchen teams cook over local oak fires, and surprise musical artists appear cleanly without technical disruption.',
      'Critically, every guest enjoys effortless individual travel—from private jet charters to rural estate helicopter pads and chauffeured estate Range Rovers.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Full three-day Cotswolds manor takeover reserved exclusively for sixty milestone guests' },
      { image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg', caption: 'Scottish stone estate grounds staging Highland dinners, fireworks, and stag walks' },
      { image: '/assets/aistudio/florence_palazzo_courtyard.jpg', caption: 'Tuscan courtyard reception illuminated solely by three hundred beeswax tapers' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Bespoke banquet tables styled in seasonal botanicals and etched crystal' }
    ],
    operationalPhases: [
      { phase: '01 · Canvas Lock', title: 'Complete Estate Buyout', detail: 'Secure 15–45 bedroom historic houses under total privacy and zero overlapping public weddings.' },
      { phase: '02 · Guest Flight Logistics', title: 'Private Planes, Helis & Cars', detail: 'Choreograph multi-continent guest arrivals smoothly into local estates without airport bottlenecks.' },
      { phase: '03 · Set & Sound Design', title: 'Taste-Led Production Architecture', detail: 'Commission lighting designers, botanical florists, sound engineers, and quiet fireworks technicians.' },
      { phase: '04 · Live Stage Management', title: 'Invisible Timing & Clearance', detail: 'Mayfair senior directors remain on station throughout weekend ensuring effortless celebration.' }
    ],
    slaBenchmarks: [
      { label: 'Estate Portfolios', value: '40+ Manors', note: 'UK, France, Italy & Swiss retreats' },
      { label: 'Privacy Control', value: 'Air-Tight NDA', note: 'All crew & talent phone-sealed' },
      { label: 'Weekend Staff Ratio', value: '2 : 1 Host', note: 'Chefs, stewards & concierges on site' }
    ],
    vettedPartners: [
      'Private Listed Country Houses Across Gloucestershire & Sussex',
      'Botanical Landscape Designers & Candlelight Architects',
      'Headlining Symphony, Jazz & Contemporary Recording Talent',
      'Quiet-Noise Estate Pyrotechnic & Laser Show Teams'
    ],
    extraPoints: [
      'Pre-printed bespoke weekend itineraries in saddle-stitched leather slips placed on every guest’s pillow',
      'Recovery spas, wild swimming docks, and wellness practitioners stationed discreetly on Sunday mornings'
    ],
    extraScenarios: [
      {
        title: 'Oxfordshire 3-Day 50th Milestone Estate',
        description: 'Hosting forty-five guests from New York, London, and Singapore without any public trace.',
        outcome: 'Full private house buyout with Friday game feast, Saturday black-tie conservatory ball, and surprise Grammy artist set.'
      },
      {
        title: 'Vow Renewal Inside Closed Venetian Palace',
        description: 'Intimate 16-guest ceremony followed by private wooden water-taxi procession.',
        outcome: 'Orchestrated closed Grand Canal palazzo access with resident chamber orchestra and private lagoon feast.'
      }
    ],
    faqs: [
      { q: 'How early should major weekend castle or country estate buyouts begin planning?', a: 'Six to twelve months ensures ideal estates and headline talent lock cleanly, though compact Mayfair or Cotswolds productions run within 4 weeks.' },
      { q: 'Can you run completely phone-free and leak-free private parties for public figures?', a: 'Yes. Perimeter checkpoints, encrypted RF detection, and vendor NDAs keep celebration photographs wholly private.' },
      { q: 'How do international guests reach remote Scottish or Tuscan houses seamlessly?', a: 'We operate dedicated charter shuttle wings landing nearby synced with waiting Range Rover convoys.' },
      { q: 'Can you balance lively late-night DJ dancing without waking older relatives resting upstairs?', a: 'We engineer sound-isolated vaulted stables, stone outbuildings, or acoustic marquees set clear of sleeping quarters.' }
    ]
  },

  'family-next-generation': {
    extendedOverview: [
      'Wealth preserves character when future generations encounter discipline, craftsmanship, science, and philanthropy firsthand rather than through passive privilege.',
      'We curate extraordinary, deeply human experiences for young principals aged seven to twenty-four: examining actual dinosaur fossils beside Natural History Museum research fellows, observing independent watchmakers cut microscopic escapement wheels by hand, or shadow-mentoring renewable marine biologists offshore.',
      'Everything adapts naturally to family rhythm, backed by child-friendly private security and vetted educators who inspire rather than lecture.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg', caption: 'Hands-on contemporary art making and gallery walks led by practising artists' },
      { image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg', caption: 'Wilderness falconry, forestry, and outdoor stewardship across Highland glens' },
      { image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', caption: 'Micro-mechanical horology workshops sparking appreciation for precision engineering' },
      { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Equestrian weekends and regenerative farming walks designed for multi-generational families' }
    ],
    operationalPhases: [
      { phase: '01 · Curiosity Brief', title: 'Age & Passion Alignment', detail: 'Tailor experiences for seven-year-old curiosity, teen scholarship, or university career shadows.' },
      { phase: '02 · Mentor Matching', title: 'Fellows & Practitioners', detail: 'Pair young guests with museum researchers, astronauts, oceanographers, or master craftspeople.' },
      { phase: '03 · Safeguarding', title: 'Enhanced DBS & Chaperone Care', detail: 'Ensure all academic tutors, riding instructors, and museum escorts carry rigorous background clearance.' },
      { phase: '04 · Memory Records', title: 'Private Archival Keepings', detail: 'Deliver signed specimens, sketches, or leather-bound logs recording lessons explored.' }
    ],
    slaBenchmarks: [
      { label: 'Instructor Vetting', value: 'Enhanced DBS', note: 'Mandatory safeguarding clearance' },
      { label: 'Museum Vault Access', value: 'Private Keys', note: 'Natural History, Science & V&A archives' },
      { label: 'Age Range', value: '6 – 24 yrs', note: 'Adapted for families & young founders' }
    ],
    vettedPartners: [
      'Senior Research Fellows at Natural History & Science Museums',
      'Wildlife Conservationists & Marine Research Vessels',
      'Oxford & Cambridge Humanities & STEM Summer Mentors',
      'Independent Master Craftsmen (Bookbinding, Saddlery, Luthiers)'
    ],
    extraPoints: [
      'Unpublicized philanthropic field journeys visiting vetted conservation initiatives supported by family foundations',
      'Private etiquette and cultural confidence mentorship for teenage heirs attending global galas'
    ],
    extraScenarios: [
      {
        title: 'Natural History Museum Archive Morning',
        description: 'Two eleven-year-old siblings obsessed with paleontology and meteor geology.',
        outcome: 'Three closed vault hours examining specimens in research drawers with the Keeper of Earth Sciences.'
      },
      {
        title: 'Oceanographic Field Week in the Azores',
        description: 'Family wishing their university-age teens experienced genuine marine biology rather than resort beaches.',
        outcome: 'Matched family on explorer vessel accompanied by marine biologists tagging pelagic species.'
      }
    ],
    faqs: [
      { q: 'How thoroughly are external mentors, ski guides, and tutors vetted around children?', a: 'Without exception: full Enhanced DBS verification, in-person interviews, multi-year employment checks, and signed NDA/safeguarding protocols.' },
      { q: 'Can grandfathers and grandchildren share experiences comfortably without exhaustion?', a: 'We stage staggered energy rhythms, ground-level museum lifts, warm rest pavilions, and private driver standby throughout.' },
      { q: 'Do you arrange university shadowing and coding/astronomy labs?', a: 'Yes, introducing promising teens to working robotics labs, observatory nights, and literary workshops.' },
      { q: 'Are young-generation street-culture and music production sessions also arranged?', a: 'Including private studio engineering days alongside accredited London mastering producers.' }
    ]
  },

  'london-residences': {
    extendedOverview: [
      'A Grade I Georgian townhouse in Eaton Square or a steel-and-glass penthouse along Bankside deteriorates quickly when left unattended between international trips. Historic lime plaster swells with winter damp, boiler pumps seize, and courier parcels pile beside gates.',
      'TGLC operates dedicated residential engineering and stewardship calendars tailored for principals who inhabit their London homes intermittently. Weekly physical checks monitor humidity, security alarms, roof flashing, and cellar chillers.',
      'Six hours ahead of private arrival from Geneva or New York, our team activates the residence: balancing heating to 20.5°C, installing bespoke seasonal stems, pressing linen sheets, stocking preferred organic groceries, and positioning vehicles cleanly inside mews bays.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Belgravia stucco drawing rooms maintained at balanced gallery humidity year-round' },
      { image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg', caption: 'Nash terrace architecture along Regent’s Park overseen through regular conservation checks' },
      { image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg', caption: 'Lateral modern riverside residences managed under continuous keyholding custody' },
      { image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg', caption: 'Evening pre-arrival preparation: table settings, lighting warmth, and fresh flora' }
    ],
    operationalPhases: [
      { phase: '01 · Property Takeover', title: 'Technical & Meter Audit', detail: 'Document every HVAC valve, smart panel, art light, and utility contract inside an encrypted home bible.' },
      { phase: '02 · Weekly Care', title: 'Physical Inspections & Running', detail: 'Flush traps, test standby generators, inspect garden locks, and submit signed inspection notes.' },
      { phase: '03 · 48h Activation', title: 'Groceries, Flowers & Pressing', detail: 'Refresh flowers, balance pantry perishables, launder bedding, and warm suites prior to landing.' },
      { phase: '04 · Seamless Exit', title: 'Shutdown & Laundering Care', detail: 'Clear perishables cleanly, press travelling wardrobes, and re-arm perimeter sensors post-departure.' }
    ],
    slaBenchmarks: [
      { label: 'Emergency Callout', value: '< 45 min', note: '24/7 master plumber, HVAC & locksmith' },
      { label: 'Arrival Readiness', value: '6 – 24 hrs', note: 'Full residence activation turn-around' },
      { label: 'Keyholding Audit', value: 'Dual Seal', note: 'Insured Albemarle vault custody' }
    ],
    vettedPartners: [
      'Grosvenor, Cadogan & Crown Estate Approved Heritage Trades',
      'Lutron, Crestron & Bang & Olufsen Smart Home Engineers',
      'Insured Silver, Conservation Linen & Wine Cellar Stewards',
      '24/7 BS8418 Security & Alarm Monitoring Centres'
    ],
    extraPoints: [
      'Centralised contractor coordination so your private household number stays shielded from external plumbers and decorators',
      'Consolidated monthly property utility and vendor ledgers audited straight for family office bookkeeping'
    ],
    extraScenarios: [
      {
        title: '48-Hour Sudden Belgravia Home Activation',
        description: 'Family diverted transatlantic flight to spend unexpected ten days in SW1 after four months empty.',
        outcome: 'Cleared cold pipes, turned beds with fresh Italian percale, stocked organic pantry, and met arrival at midnight.'
      },
      {
        title: 'Burst Roof Pipe Prevention During January Freeze',
        description: 'Telemetry warning detected sub-zero pipe sensor in unoccupied Marylebone mews.',
        outcome: 'Engineered immediate master plumber shutdown and heated drying within 28 minutes, zero damage to art below.'
      }
    ],
    faqs: [
      { q: 'Does TGLC hold keys securely at 45 Albemarle Street?', a: 'Yes, coded unlabelled keys rest inside insured biometric custody, signed out strictly under senior Lifestyle Manager supervision.' },
      { q: 'Will tradespeople ever know the surname of the residence owner?', a: 'No. Contractors enter accompanied by TGLC residence managers under project reference numbers.' },
      { q: 'Do you coordinate private garden squares upkeep and courtyard lighting?', a: 'Our landscape specialists keep town terraces and private garden square keys running smoothly across seasons.' },
      { q: 'What happens if emergency glass repair or alarm work strikes at 03:00 AM?', a: 'Our retained security & maintenance contractors hold 45-minute central London callout obligations 365 nights annually.' }
    ]
  },

  'off-market-property': {
    extendedOverview: [
      'Upwards of seventy percent of trophy transactions across Eaton Square, Mount Street, Holland Park, and Regent’s Park close discreetly without reaching property portals or newspaper supplements. Sellers protect privacy just as fiercely as buyers.',
      'TGLC does not act as a statutory estate broker. Instead, we open introductions between members and trusted private owners, boutique buying agents, estate trustees, and family office real estate directors.',
      'Every viewing runs out-of-hours under absolute discretion alongside independent chartered building surveyors and planning solicitors so architectural due diligence remains sharp and pressure-free.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg', caption: 'Double-fronted Nash residences accessed directly via private trustees before public sale' },
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Wide lateral Knightsbridge townhouses sought quietly off-market' },
      { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Private Gloucestershire manor estates quietly transitioning between families' },
      { image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg', caption: 'Penthouse trophy residences overlooking the River Thames and Southbank skyline' }
    ],
    operationalPhases: [
      { phase: '01 · Acquisition Brief', title: 'Architectural & Security Wish-List', detail: 'Define square footage, ceiling heights, garden frontage, carriage drives, and subterranean garage specs.' },
      { phase: '02 · Trustee Outreach', title: 'Quiet Family & Agent Soundings', detail: 'Tap independent buying agents, private bankers, and landed estates for upcoming unlisted transfers.' },
      { phase: '03 · Private Viewings', title: 'Evening & Owner-Only Walkthroughs', detail: 'Arrange quiet property tours outside agent open days alongside conservation architects.' },
      { phase: '04 · Statutory Handover', title: 'Solicitor & Surveyor Assembly', detail: 'Introduce regulated conveyancers, structural engineers, and tax counsel smoothly to execute completion.' }
    ],
    slaBenchmarks: [
      { label: 'Unlisted Share', value: 'Off-Portal', note: 'Belgravia, Mayfair, Chelsea & Rural' },
      { label: 'Advisory Independence', value: 'Conflict-Free', note: 'Never acting as seller’s agent' },
      { label: 'Due Diligence Desk', value: 'Regulated', note: 'Accredited RICS surveyors & counsel' }
    ],
    vettedPartners: [
      'Boutique Prime Central London Independent Buying Agents',
      'Grosvenor, Cadogan & Portman Leasehold Specialists',
      'Historic Building RICS Conservation Surveyors',
      'Prime Private Client Real Estate & Tax Solicitors'
    ],
    extraPoints: [
      'Short-term unlisted bridging leases for six-to-twelve months while permanent family residences complete renovations',
      'Discreet valuation intelligence comparing actual Land Registry comps rather than optimistic asking estimates'
    ],
    extraScenarios: [
      {
        title: 'Off-Market Belgravia Townhouse Acquisition',
        description: 'Finding a 10,000 sq ft lateral house with rear mews access within three months.',
        outcome: 'Connected principal directly with long-held family trustees ahead of auction; exchanged privately inside 6 weeks.'
      },
      {
        title: 'Confidential 9-Month Knightsbridge Bridging Lease',
        description: 'Need for a turnkey five-bedroom home on Cadogan Square with zero online footprint.',
        outcome: 'Arranged direct landlord private license agreement with full staff transition inside ten days.'
      }
    ],
    faqs: [
      { q: 'Does TGLC charge property sales commission or act as a broker?', a: 'No. We comply strictly with UK regulatory boundaries, facilitating confidential introductions to duly regulated buying agents and solicitors.' },
      { q: 'Can we view potential properties accompanied by our interior architect first?', a: 'Routinely. Early daylight walk-throughs with conservation architects evaluate structural wall removals prior to making formal offers.' },
      { q: 'Do you cover prime country estates alongside central London?', a: 'Yes, linking Sussex, Gloucestershire, Hampshire, and Berkshire sporting and equestrian estates.' },
      { q: 'How are seller confidentiality NDAs handled before disclosure of address?', a: 'Standard reciprocal NDAs clear smoothly through our office within an hour of prospect validation.' }
    ]
  },

  'relocation-settling-in': {
    extendedOverview: [
      'Moving a multi-generational household to London touches every practical pillar at once: independent school admissions interviews, international art and pet customs clearances, utility contracts, NHS/private family GP onboarding, and local neighborhood warmth.',
      'Rather than forcing principals to juggle six disparate brokers, TGLC harmonises independent education consultants, regulated immigration counsel, specialist removals fleets, and local domestic setup into one cohesive timetable.',
      'Our team physically prepares the new house from fresh towel monograms and electric vehicle wall chargers down to neighborhood orientation walks—making Belgravia or Marylebone feel familiar before the first school run.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Newly installed Eaton Square drawing rooms prepared ahead of international family touchdown' },
      { image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg', caption: 'Family townhouses selected within walking distance of Regent’s Park and premier schools' },
      { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Insured fine-art and heirloom crating arriving through customs clearance smoothly' },
      { image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg', caption: 'Priority Harley Street family physician and dental registration completed on day one' }
    ],
    operationalPhases: [
      { phase: '01 · 90-Day Roadmap', title: 'School, Medical & Housing Sync', detail: 'Align regulated visa counsel milestones with school assessment dates and residence handovers.' },
      { phase: '02 · Freight & Customs', title: 'Transfer of Residence Exemptions', detail: 'Coordinate international bonded removals crews handling UK Transfer of Residence VAT/duty forms.' },
      { phase: '03 · Home Wiring', title: 'Connectivity, Security & Banking Intro', detail: 'Establish fibre lines, utilities, vehicle registrations, and private bank compliance introductions.' },
      { phase: '04 · Cultural Landing', title: 'Neighbourhood & Social Ease', detail: 'Introduce sports clubs, local grocers, veterinarians, and cultural circles warmly.' }
    ],
    slaBenchmarks: [
      { label: 'Full Move Turnaround', value: '4 – 8 Weeks', note: 'Urgent executive family transitions' },
      { label: 'Compliance Scope', value: 'Regulated', note: 'Licensed immigration & tax partners' },
      { label: 'Arrival Readiness', value: 'Day-One Ready', note: 'Wi-Fi, cars & kitchen active' }
    ],
    vettedPartners: [
      'Independent British Education Consultants (7+, 11+, 13+, A-Level)',
      'Fine Art & International White-Glove Removals Lines',
      'Private GP, Paediatric & Harley Street Dental Concierges',
      'London Local Authority & Security Systems Integrators'
    ],
    extraPoints: [
      'Private familiarisation mornings driving preferred school runs at 08:00 AM so children know routes comfortably',
      'Direct introductions to vetted French, Mandarin, Spanish, and Arabic family tutors'
    ],
    extraScenarios: [
      {
        title: 'Geneva to Knightsbridge Family Transfer in 6 Weeks',
        description: 'Relocating corporate family with two teenagers plus grand piano and extensive wine cellar.',
        outcome: 'Matched leasing residence, installed cellar humidity unit, booked independent school placements, cleared customs flawlessly.'
      },
      {
        title: 'Temporary Executive Transition Year',
        description: 'New York couple spending nine-month project sabbatical across SW3.',
        outcome: 'Arranged complete Chelsea townhouse turnkey, private gallery memberships, and domestic housekeeping without friction.'
      }
    ],
    faqs: [
      { q: 'Does TGLC provide UK visa or tax residency advice directly?', a: 'No. We introduce families to regulated immigration solicitors and dual-qualified international private client tax advisors while running logistical coordination alongside them.' },
      { q: 'Can you help place children outside standard September British intake calendars?', a: 'Independent school specialists inside our network advise discreetly on occasional mid-year vacancies, interim homeschooling bridges, and bespoke assessment prep.' },
      { q: 'Can household staff relocate with us from overseas?', a: 'We connect your legal advisors with UK immigration counsel managing domestic worker sponsorship regulations.' },
      { q: 'Do you set up utility direct debits, council tax, and TV licenses seamlessly?', a: 'Yes, sparing principals hours of administrative municipal forms while recording clean ledger documentation.' }
    ]
  },

  'household-management': {
    extendedOverview: [
      'The atmosphere of a fine private residence mirrors the skill, loyalty, and poise of its internal household team. Hiring the wrong house manager or housekeeper introduces endless daily friction rather than sanctuary.',
      'We act as strategic counsel to private residences, drafting clear role hierarchies, standard operating procedures for museum-grade surface care, and briefing shortlisted candidates vetted by London’s oldest domestic agencies.',
      'Beyond initial hiring, we provide holiday cover relief butlers, seasonal upholstery conservation, silverware cataloguing, and discreet staff coordination so the family wakes each morning to effortless quiet.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Formal table presentation, crystal polishing, and tea preparation set to diplomatic standard' },
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Drawing rooms preserved meticulously beneath daily residential stewardship' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'In-residence Michelin-trained private chefs executing daily menus and family dinners' },
      { image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg', caption: 'Fine joinery and delicate linen cared for without harsh commercial detergents' }
    ],
    operationalPhases: [
      { phase: '01 · Household Audit', title: 'Staffing Structure & Roster Design', detail: 'Balance live-in housekeepers, travelling butlers, laundresses, and seasonal estate gardeners efficiently.' },
      { phase: '02 · Specialist Search', title: 'Reference & Background Clearances', detail: 'Conduct multi-year reference verification, enhanced DBS checks, and NDAs ahead of family interviews.' },
      { phase: '03 · SOP Manual', title: 'Custom Residence Care Bible', detail: 'Produce visual house manuals covering marble care, cashmere steaming, wine logs, and pantry systems.' },
      { phase: '04 · Continuity Support', title: 'Relief Cover & Payroll Handover', detail: 'Arrange temporary Michelin chefs and relief butlers smoothly during leave periods alongside payroll agencies.' }
    ],
    slaBenchmarks: [
      { label: 'Candidate Screening', value: '5-Stage Audit', note: 'DBS, identity, NDA & verbal references' },
      { label: 'Emergency Chef Cover', value: '< 12 hrs', note: 'Same-day vetted kitchen replacement' },
      { label: 'Discretion Covenant', value: 'Lifetime NDA', note: 'Strict non-disclosure & media ban' }
    ],
    vettedPartners: [
      'Royal Household-Trained Butler & Housekeeper Placement Agencies',
      'Private Residence Employment Law & Payroll Administrators',
      'Le Cordon Bleu & Michelin-Experienced Private Chefs',
      'Museum-Standard Textile, Carpet & Silver Conservators'
    ],
    extraPoints: [
      'Quarterly private cellar temperature, humidity, and vintage drinkability tracking inside the household portal',
      'Uniform tailoring and quiet hospitality etiquette refresher workshops for existing estate teams'
    ],
    extraScenarios: [
      {
        title: 'Four-Person Mayfair House Staffing in 14 Days',
        description: 'New eight-bedroom house purchase requiring Estate Manager, Head Housekeeper, Laundress, and Chef immediately.',
        outcome: 'Presented eight vetted candidates; completed trials and inducted full team three days before family arrived.'
      },
      {
        title: 'Urgent Holiday Relief Chef Substitution',
        description: 'Resident family chef fell ill on eve of 12-person dining week.',
        outcome: 'Installed familiar rosette-pedigree TGLC relief chef within four hours keeping dinner completely unruffled.'
      }
    ],
    faqs: [
      { q: 'Does TGLC act as the direct employer of household staff?', a: 'No. Principals retain direct employment relationships assisted by UK specialist payroll and employment law advisors while we run vetting and operational induction.' },
      { q: 'How do you preserve privacy when recruiting into high-profile homes?', a: 'First-round candidate screening runs blindly under TGLC agency briefs; actual family identity and street address remain sealed until NDA execution.' },
      { q: 'Can you help modernize paper chaos into digital household inventories?', a: 'Yes. We establish shared digital maintenance schedules, laundry tags, and cellar inventories tailored to your staff.' },
      { q: 'What happens if a temporary relief butler or babysitter is required for a weekend?', a: 'Our London pool of vetted seasonal staff provides dependable short-notice relief cover 365 days a year.' }
    ]
  },

  'interior-home-services': {
    extendedOverview: [
      'Maintaining Georgian joinery, silk damask wall hangings, Italian limestone, and concert-grade residential audio-visuals requires artisans trained in architectural conservation—never generic maintenance contractors.',
      'TGLC bridges London’s celebrated architectural studios, Guildhall stone carvers, French polishers, and automated lighting/HVAC engineers cleanly under single project supervision.',
      'Whether discreetly hanging an Old Master oil painting behind museum non-reflective glass or updating a town courtyard’s lighting choreography, our team delivers quiet craftsmanship without dust or schedule creep.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg', caption: 'Custom walnut panelling and calibrated architectural art washes crafted in Mayfair' },
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Restored cornicing, antique marble hearths, and bespoke woven upholstery' },
      { image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg', caption: 'Contemporary monolithic concrete and acoustic timber ceiling engineering' },
      { image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg', caption: 'Grade I sash window timber conservation respecting Crown Estate stipulations' }
    ],
    operationalPhases: [
      { phase: '01 · Atelier Pairing', title: 'Design & Architect Introduction', detail: 'Match architectural style—classical English, Parisian apartment, or sharp contemporary—to ideal studios.' },
      { phase: '02 · Heritage Clearances', title: 'Freehold & Listed Planning Sync', detail: 'Coordinate Grosvenor/Cadogan Estate alterations licenses alongside specialized heritage planners.' },
      { phase: '03 · Specialist Trades', title: 'Restoration & Smart Integration', detail: 'Oversee stone masons, French polishers, gilders, acoustic baffles, and Lutron lighting scenes.' },
      { phase: '04 · Absentee Oversight', title: 'Clean Handover While Away', detail: 'Manage messy refurbishment periods cleanly while principals spend summers overseas.' }
    ],
    slaBenchmarks: [
      { label: 'Artisan Registry', value: '55+ Trades', note: 'Gilding, marble, joinery & smart AV' },
      { label: 'Listed Approvals', value: 'Freehold Sync', note: 'Grosvenor, Cadogan & Crown briefs' },
      { label: 'Worksite Hygiene', value: 'Private Grade', note: 'Daily dust sealing & security log' }
    ],
    vettedPartners: [
      'AD100 & Mayfair Residential Interior Design Houses',
      'Traditional French Polishers, Chandelier Cleaners & Antique Restorers',
      'Crestron, Savant & Acoustic Sound Room Engineers',
      'Conservation HVAC, Humidification & Wine Cellar Builders'
    ],
    extraPoints: [
      'Sub-millimetre optical museum art hanging with seismic safety hooks and ultraviolet filter calibration',
      'Acoustic insulation upgrades shielding master suites from city road frequency'
    ],
    extraScenarios: [
      {
        title: 'Two-Week Summer Townhouse Refresh While Away',
        description: 'Refreshing library panelling, replacing carpets, and upgrading lighting controls during family travel.',
        outcome: 'Delivered complete spotless re-installation 48 hours ahead of landing with zero construction dust.'
      },
      {
        title: 'Private Belgravia Listening & Cinema Room Build',
        description: 'Converting vaulted lower-ground wine store into acoustic sound screening room.',
        outcome: 'Appointed British acoustic specialist achieving theatre isolation with zero disturbance to neighbours.'
      }
    ],
    faqs: [
      { q: 'Can you oversee major works cleanly while our family stays overseas?', a: 'Yes, issuing weekly photographic progress logs and direct invoice sign-offs to your private office.' },
      { q: 'Do your contractors know historic Grade I listed timber and plaster rules?', a: 'Every heritage trade we introduce holds extensive experience navigating Grosvenor, Cadogan, and Westminster conservation specifications.' },
      { q: 'Can you quietly silence hums from existing hotel or residential air conditioning units?', a: 'Our acoustic engineers regularly isolate vibrating rooftop chillers and balance nocturnal bedroom airflow silently.' },
      { q: 'Are interior designer introductions transparent on trade pricing?', a: 'All studio agreements detail fee structures transparently from initial briefing.' }
    ]
  },

  'country-estates-weekend-homes': {
    extendedOverview: [
      'Stepping out of London on Friday evening should feel immediately restorative—not an audit of cold radiators, overdue paddock fencing, or empty pantries. Across Oxfordshire, Gloucestershire, Hampshire, Sussex, and the Scottish Highlands, rural homes need continuous local care.',
      'We act as your off-site estate liaison: balancing log store deliveries, pool chemical stabilization, walled kitchen vegetable harvests, gamekeepers, and equestrian stable readiness across the whole year.',
      'Whenever friends gather for autumn weekend hospitality, private chefs, four-wheel drive vehicles, wet-weather Barbour fitting sets, and Sunday roast cellars appear waiting on the hall flags.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/cotswolds_manor_estate.jpg', caption: 'Cotswold stone manor house warmed and lit across gravelled estate forecourts' },
      { image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg', caption: 'Scottish sporting lodge overlooking private moorland and river salmon beats' },
      { image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp', caption: 'Chauffeured all-terrain estate vehicles prepped for muddy lane arrivals' },
      { image: '/assets/aistudio/swiss_alpine_chalet.jpg', caption: 'Continental alpine sanctuaries coordinated on identical turnkey winter checklists' }
    ],
    operationalPhases: [
      { phase: '01 · Seasonal Calendar', title: 'Estate Land, Pool & Hearth Prep', detail: 'Schedule tree surgery, roof moss clearing, chimney sweeps, and spring pool openings proactively.' },
      { phase: '02 · Thursday Activation', title: 'Pre-Weekend Provisioning', detail: 'Turn on heating zones, stock farm eggs, butcher meats, logs, and check wine temperatures every Thursday.' },
      { phase: '03 · Guest Hospitality', title: 'Shoot Days, Rides & Menus', detail: 'Book local loaders, falconry instructors, clay traps, and Michelin visiting country cooks.' },
      { phase: '04 · Monday Reset', title: 'Boot Cleaning & Winterising', detail: 'Wax coats, clean mud from country boots, strip bedding, and lock outer farm perimeter gates.' }
    ],
    slaBenchmarks: [
      { label: 'Counties Covered', value: 'All UK + Alps', note: 'Cotswolds, Hampshire, Scotland & Verbier' },
      { label: 'Arrival Heat Timing', value: '-24h Sync', note: 'Thick stone walls take time to warm' },
      { label: 'Helipad Readiness', value: 'Private Lawn', note: 'Landing wind-sock & ground marker briefs' }
    ],
    vettedPartners: [
      'Independent Gamekeepers, Loaders & Equestrian Grooms',
      'Daylesford, organic farm shops & West Country Fishmongers',
      'Biomass, Ground-Source Heat Pump & Borehole Water Engineers',
      'Seasonal Country Chef Teams & Butler Concierges'
    ],
    extraPoints: [
      'Private gun room compliance coordination with licensed registered firearms dealers and storage inspections',
      'Tennis court resurfacing, cold-plunge lake decks, and wildflower meadow seeding schedules'
    ],
    extraScenarios: [
      {
        title: '12-Gun Autumn Weekend Hospitality in Hampshire',
        description: 'International guests arriving straight from Heathrow for two-day estate weekend.',
        outcome: 'Equipped guest boot room to individual sizes, engaged Michelin cook, and arranged seamless Sunday return choppers.'
      },
      {
        title: 'Winter Storm Power Loss Continuity',
        description: 'Regional grid blackout struck Cotswolds valley forty minutes before dinner.',
        outcome: 'Our quarterly diesel generator load testing kicked automatic house switchover seamlessly in four seconds.'
      }
    ],
    faqs: [
      { q: 'Can you keep wet-weather boots, coats, and tweed fitted in advance for visiting foreign guests?', a: 'Yes, gathering shoe sizes two weeks ahead so pristine guest boot lockers welcome friends cleanly.' },
      { q: 'How quickly can rural estates warm up if plans shift last minute on Friday morning?', a: 'Through smart remote boiler overrides paired with local estate caretakers standing thirty minutes away.' },
      { q: 'Do you coordinate private lawn helicopter landings at rural properties?', a: 'Yes—verifying farmer neighbour courtesy alerts, paddock livestock clearing, and safe approach coordinates.' },
      { q: 'Can excess orchard and kitchen-garden harvests be shuttled straight back to London residences?', a: 'Regular Monday courier boxes bring freshly cut country flowers, apples, and honey right to Albemarle or Belgravia tables.' }
    ]
  },

  'chauffeur-luxury-vehicles': {
    extendedOverview: [
      'Great urban chauffeurs eliminate road fatigue invisibly. Knowing how West End theatre streets lock at 22:15, how Park Lane filtering shifts during diplomatic convoys, or which mews archway allows quiet kerbside waiting separates seasoned London drivers from app-navigation fleets.',
      'Our retained and panel chauffeurs hold advanced defensive driving certifications—often honed across royal, corporate chairman, and diplomatic close-protection teams—operating immaculately detailed Range Rover Autobiographies, Mercedes-Maybach S680s, Rolls-Royce Phantoms, and acoustic VIP Sprinter JetVans.',
      'Rear cabins arrive balanced exactly to your preferred climate temperature, holding chilled mineral glass bottles, unread broadsheets, and dual encrypted mobile chargers.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/luxury_sprinter_jetvan.jpg', caption: 'Acoustic-partitioned Mercedes-Benz VIP Sprinter JetVan staged for private group briefing' },
      { image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp', caption: 'Bespoke Rolls-Royce Cullinan staged privately outside diplomatic arrival doors' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Evening two-vehicle protection convoy synchronized across prime Mayfair squares' },
      { image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp', caption: 'Polished coachwork maintained hourly by dedicated London garage teams' }
    ],
    operationalPhases: [
      { phase: '01 · Fleet Fit', title: 'Vehicle & Security Matching', detail: 'Select long-wheelbase privacy saloons, armored Range Rovers, or multi-seat mobile boardrooms.' },
      { phase: '02 · Route Recon', title: 'Chokepoint & Mews Staging', detail: 'Check municipal road closures, diplomatic marches, and discreet rear courtyard bay clearances.' },
      { phase: '03 · Cabin Prep', title: 'Micro-Climate & Child Seats', detail: 'Install ISOFIX seating, preferred cabin humidity, privacy blinds, and acoustic partition barriers.' },
      { phase: '04 · Live Standby', title: 'Flight & Dinner Syncing', detail: 'Adjust waiting spots via encrypted radio automatically if dinners linger or landings run early.' }
    ],
    slaBenchmarks: [
      { label: 'Punctuality Arrival', value: 'T-15 min', note: 'Early positioning in adjacent mews' },
      { label: 'Safety Credentials', value: 'RoSPA Gold+', note: 'Defensive & diplomatic route-trained' },
      { label: 'Urgent Callout', value: '< 40 min', note: 'Central London dedicated vehicle standby' }
    ],
    vettedPartners: [
      'Dedicated Mayfair & St James’s Retained Chauffeur Corps',
      'B6/VR8 Certified Armoured Vehicle Specialist Divisions',
      'RAF Northolt, Farnborough & Heathrow Apron-Licensed Drivers',
      'Geneva, Paris, Monaco & Milan Mirror Fleet Hubs'
    ],
    extraPoints: [
      'Unified preferred chauffeur assignment so visiting principals see the same calm face month after month',
      'Electric fleet pairing for low-profile zero-emission inner city arrivals'
    ],
    extraScenarios: [
      {
        title: 'Four-Stop State Visit Road Closure Reroute',
        description: 'Diplomatic route lockouts paralysed Whitehall forty minutes ahead of board meeting.',
        outcome: 'Executed mapped back-alley Belgravia/Soho rat-run arriving at private bank vault 2 minutes early.'
      },
      {
        title: 'Mobile Boardroom Briefing Aboard VIP JetVan',
        description: 'Six executives requiring uninterrupted PowerPoint screen conference between Farnborough and Canary Wharf.',
        outcome: 'Deployed acoustic-partition Sprinter with bonded dual-SIM uplink, espresso machine, and crystal stemware.'
      }
    ],
    faqs: [
      { q: 'Can the exact same driver look after our family on every trip to London?', a: 'Yes. Dedicated principal drivers remain flagged inside your Member Dossier and prioritized whenever dates synchronize.' },
      { q: 'Do your drivers wait anonymously without visible concierge signboards at terminals?', a: 'Strictly—airside FBO pickups arrive directly alongside wing stairs, and private address pickups wait cleanly out of view.' },
      { q: 'Are baby and booster seats sanitized and inspected properly?', a: 'Freshly steam-cleaned manufacturer-grade Britax/Cybex units install cleanly ahead of family arrivals.' },
      { q: 'Can we book long-term retained vehicles with private 24/7 garage standby?', a: 'Yes, both monthly dedicated chauffeur retainers and flexible daily charters operate effortlessly.' }
    ]
  },

  'private-car-sourcing': {
    extendedOverview: [
      'Visiting Europe for a two-week summer run through the Stelvio Pass or needing a rare coachbuilt saloon waiting at your Geneva chalet requires vehicles far beyond standard airport rental counters.',
      'We source low-mileage immaculate hypercars, flagship British grand tourers, and collector classics—ranging from Bugatti Chiron Super Sports and Koenigsegg CCXRs to restored E-Type Jaguars—delivered inside enclosed single-car transporters directly onto residential driveways.',
      'Every mechanical seal, tyre tread depth, green-card Continental insurance waiver, and international license authorization is cleared days ahead of key handover.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg', caption: 'Rare mid-engine hypercar prepped cleanly ahead of Swiss Alpine grand touring' },
      { image: '/assets/aistudio/25_Koenigsegg_CCXR_Trevita_30-Most-Expensive-Cars-in-the-World_Tyroola_0c18f9f0.jpg', caption: 'Exposed carbon collector machinery vetted through accredited factory workshops' },
      { image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp', caption: 'Flagship grand tourers inspected and ceramic-detailed prior to London delivery' },
      { image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp', caption: 'Long-wheelbase British SUV prepared for rural manor and city estate commutes' }
    ],
    operationalPhases: [
      { phase: '01 · Spec Match', title: 'Transmission, Spec & Telemetry', detail: 'Confirm exact gearbox, paint trim, luggage fit, and right/left-hand drive expectations.' },
      { phase: '02 · Mechanical Sign-Off', title: 'Brand-Certified Pre-Checks', detail: 'Audit brake ceramic wear, factory telemetry health, and complete European winter/summer tyres.' },
      { phase: '03 · Enclosed Transit', title: 'White-Glove Transporter Delivery', detail: 'Deliver inside climate-protected covered trailers straight to villa garages or airport hangars.' },
      { phase: '04 · Rally Support', title: 'Chase Vans & Roadside Technicians', detail: 'Follow continental grand tours with spare mechanics and custom luggage support cars.' }
    ],
    slaBenchmarks: [
      { label: 'Collection Tier', value: 'Hyper & Classic', note: 'Rolls-Royce, Bugatti, Ferrari, Aston' },
      { label: 'Insurance Scope', value: 'Zero Surprise', note: 'Multi-driver international clear cover' },
      { label: 'Enclosed Delivery', value: 'EU & UK', note: 'London, Monaco, St Moritz & Tuscany' }
    ],
    vettedPartners: [
      'Private Collector Garages & Marque Provenance Specialists',
      'Enclosed Hydraulic Motorsport Car Transporters',
      'Bespoke High-Value Motor Insurance Underwriters',
      'Mille Miglia, Goodwood & Alpine Rally Logistics Technicians'
    ],
    extraPoints: [
      'Hand-stitched custom fitted luggage cases tailored specifically to exact Ferrari or Aston Martin boot contours',
      'Private GP circuit buyouts and championship test-driver coaching on continental tracks'
    ],
    extraScenarios: [
      {
        title: 'Geneva to Portofino 4-Car Alpine Rally',
        description: 'Four friends touring alpine passes wanting matched collector GTs plus baggage chase truck.',
        outcome: 'Supplied enclosed car delivery, mapped low-traffic pass schedules, booked hill estates, and towed spares discretely.'
      },
      {
        title: 'Instant Left-Hand Drive Bentley Continental Replacement',
        description: 'Owner’s vehicle stranded in Marbella customs delay prior to coastal wedding.',
        outcome: 'Landed freshly inspected British specification saloon within five hours via regional courier trailer.'
      }
    ],
    faqs: [
      { q: 'Can international driving licenses be insured cleanly on £2M+ hypercars?', a: 'Underwriter panels approve international licences smoothly via clear passport, no-claims verification, and modest advance underwriting.' },
      { q: 'Are cars plastered with ugly commercial rental stickers or dealership number frames?', a: 'Never. Vehicles arrive visually clean like private owned machinery wearing discreet regional registrations.' },
      { q: 'Can TGLC support full purchase acquisition as well as seasonal hire?', a: 'Yes—our Luxury Sourcing automobile wing conducts provenance checks and factory build slots on permanent additions.' },
      { q: 'Do you support battery-tendering and dry storage while principals leave London?', a: 'Climate-controlled dehumidified car bubbles near Kensington and Farnborough maintain exotic fleets year-round.' }
    ]
  },

  'executive-protection': {
    extendedOverview: [
      'Conspicuous sunglasses, bulging earpieces, and aggressive shoulder blocking draw the exact unwanted eyes they claim to deter. Under Julian Sterling’s leadership, TGLC treats personal protection as silent geometric mastery: knowing entrances, reading foot traffic early, and gliding smoothly alongside families.',
      'Every close-protection specialist comes from vetted British Armed Forces, Metropolitan Police Royalty & Specialist Protection, or UK Diplomatic Protection cohorts—carrying active SIA licensing, advanced trauma medical training (FREC4), and flawless Savile Row social poise.',
      'Whether safeguarding children between school runs, inspecting late-night Soho doorways ahead of artists, or shielding high-value horology acquisitions during bond transits, safety settles imperceptibly around your day.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/close_protection_security.jpg', caption: 'Plainclothes close protection officer conducting unobtrusive advance avenue scan' },
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Coordinated arrival staging with lead advance agent clearing pavement approach' },
      { image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', caption: 'Mews gate sweep verifying calm vehicle-to-door exit at late-night venues' },
      { image: '/assets/aistudio/ufc_arena_ringside.jpg', caption: 'High-density arena corridor extraction planned cleanly prior to crowd dispersal' }
    ],
    operationalPhases: [
      { phase: '01 · Threat Brief', title: 'Vulnerability & Profile Review', detail: 'Assess family routine exposure, jewel/watch wear risk, and public visibility levels discreetly.' },
      { phase: '02 · Advance Recce', title: 'Venue, Tunnel & Medical Mapping', detail: 'Inspect rear exits, loading bays, nearest trauma hospitals, and blind corners prior to arrival.' },
      { phase: '03 · Subtle Embed', title: 'Tailored Close Accompaniment', detail: 'Blend naturally into hotel dinners, Bond Street visits, or urban East End clubs without friction.' },
      { phase: '04 · Evacuation Readiness', title: 'Contingency Extraction Protocol', detail: 'Hold primary, secondary, and maritime extraction corridors clear in live digital coordination.' }
    ],
    slaBenchmarks: [
      { label: 'Officer Pedigree', value: 'SIA + Mil/Pol', note: 'Verified UK Forces / RaSP background' },
      { label: 'Medical Readiness', value: 'FREC4 Trauma', note: 'Every officer trained in emergency aid' },
      { label: 'Attire Calibration', value: '100% Matched', note: 'Formal tailoring to discrete street' }
    ],
    vettedPartners: [
      'Former UK Special Forces & Met RaSP Security Consultants',
      'Registered Private Forensic Counter-Surveillance Sweeps',
      'Armoured Vehicle Operators & Certified Tactical Drivers',
      'Residential Perimeter & Gatehouse Guards'
    ],
    extraPoints: [
      'Residential Faraday room installation and RF bug-sweeping inspections ahead of board gatherings',
      'Split Team Alpha / Team Bravo separation keeping corporate summits and family shopping smoothly insulated'
    ],
    extraScenarios: [
      {
        title: 'Frieze & Bond Street Watch Protection Week',
        description: 'International family wearing museum-level Patek & high jewellery across noisy public pavements.',
        outcome: 'Embedded plainclothes shadow pairs walking twenty paces staggered along Bond Street, preventing snatch threats peacefully.'
      },
      {
        title: 'East End Fight Night Exit Choreography',
        description: 'Principal attending unlisted railway arch exhibition late at night in unpredictable warehouse blocks.',
        outcome: 'Julian’s advance team locked steel archway courtyard 10 minutes before bell, stepping directly into Range Rover.'
      }
    ],
    faqs: [
      { q: 'Are protective officers intimidating around young children or nervous family guests?', a: 'Precisely the opposite. Officers train specifically in warm emotional intelligence—operating like composed uncles or private office aides.' },
      { q: 'Are security officers armed in London?', a: 'Private UK firearms carrying is strictly illegal except for statutory police units. Our officers neutralize threats through early avoidance, tactical advance planning, and legal close-protection mastery.' },
      { q: 'Can you accompany us dynamically overseas into Paris, Milan, or Rio?', a: 'Yes, pairing traveling UK team leads with licensed local host-country security units.' },
      { q: 'Do your specialists cover sudden hostile residential trespassing or stalker deterrence?', a: 'Our residential security unit coordinates statutory police liaison, static guards, and architectural gate upgrades seamlessly.' }
    ]
  },

  'secure-travel-event-logistics': {
    extendedOverview: [
      'Moving a forty-person corporate delegation across Westminster or welcoming eighty heads of family offices into a single quiet St James’s square without pavement queues or traffic gridlock requires military staff work.',
      'We synchronize multi-car drop-off windows down to ninety-second headways, deploy licensed road marshals inside private residential mews, coordinate local highway permits, and establish acoustic command posts inside Sprinter vehicles.',
      'When public demonstrations, marathon closures, or diplomatic shutdowns strike central districts unexpectedly, live traffic intelligence redirects convoys via vetted alternative grids seamlessly.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/mayfair_security_convoy.jpg', caption: 'Synchronized multi-saloon arrival cadence spaced across quiet Mayfair side lanes' },
      { image: '/assets/aistudio/luxury_sprinter_jetvan.jpg', caption: 'Mobile command vehicle holding guest arrival manifests and encrypted communications' },
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'Maritime Thames river transfer bypassing surface street closures completely' },
      { image: '/assets/aistudio/down_street_station_1794391687146.jpg', caption: 'Subterranean access coordination ensuring confidential guest ingress behind locked gates' }
    ],
    operationalPhases: [
      { phase: '01 · Flow Modelling', title: 'Convoy Headway & Staging', detail: 'Calculate bay turnaround speeds so twenty cars drop cleanly without tailbacks blocking traffic.' },
      { phase: '02 · Permit Filing', title: 'Local Council & Police Liaison', detail: 'Arrange temporary bay suspensions, river pier berth clearances, and VIP escort awareness.' },
      { phase: '03 · Radio Control', title: 'On-Scene Marshals & Wrist Seals', detail: 'Direct arriving vehicles from adjacent waiting holding streets straight onto red carpets on cue.' },
      { phase: '04 · Dispersal Flow', title: 'Staged Midnight Departure', detail: 'Pre-stage departing saloons in ordered sequence as principals request coats inside.' }
    ],
    slaBenchmarks: [
      { label: 'Headway Tolerance', value: '± 60 sec', note: 'Radio-called staggered arrival bays' },
      { label: 'Event Perimeter', value: 'Closed Access', note: 'Digital QR/Name guest screening' },
      { label: 'Bypass Modes', value: 'Road + River', note: 'Dual water contingency routing' }
    ],
    vettedPartners: [
      'Westminster & Kensington Event Highways Liaison Consultancies',
      'Valet Parking & Private Courtyard Traffic Marshalling Crews',
      'Encrypted Closed-Loop Radio Event Dispatch Operators',
      'River Thames Private Pier Embarkation Stewards'
    ],
    extraPoints: [
      'Acoustic Faraday waiting zones for VIP chauffeurs ensuring sensitive phone chatter stays off open pavement corners',
      'Umbrella-covered arrival tunnels installed discreetly during sudden London showers'
    ],
    extraScenarios: [
      {
        title: '80-Guest St James’s Residence Reception',
        description: 'Zero double-parking permitted along delicate cul-de-sac street during diplomatic gala.',
        outcome: 'Used Pall Mall remote holding zone feeding vehicles single-file onto doorstep within 90-second drop cadence.'
      },
      {
        title: 'River Escape During West End Gridlock',
        description: 'Major demonstration blocked Embankment routes ahead of Canary Wharf investor dinner.',
        outcome: 'Activated backup Cadogan Pier stealth river transfer sliding 14 principals downstream in 22 minutes flat.'
      }
    ],
    faqs: [
      { q: 'Can you prevent paparazzi gathering outside a private venue party?', a: 'Advance positioning maps enclosed service gates, obscured canopy entrances, and private underground garage drops.' },
      { q: 'Do you run technical vehicle checks before guests board hired limousines?', a: 'Routinely—confirming mechanical roadworthiness, clear driver vetting, and radio encryption check prior to staging.' },
      { q: 'What happens if fifteen guests depart simultaneously at midnight?', a: 'Drivers organize in holding lanes five minutes prior based on coatroom alerts transmitted quietly from lobby concierges.' },
      { q: 'Do you liaise directly with Metropolitan Police Diplomatic units when sovereign guests attend?', a: 'Yes, Julian Sterling maintains fluent protocol dialogue with visiting embassy protection leads.' }
    ]
  },

  'privacy-first-lifestyle-support': {
    extendedOverview: [
      'Digital leakage happens quietly: an airline frequent flyer receipt sitting in a hotel inbox, a parcel shipping box displaying a Belgravia postcode, or smart home CCTV cameras defaulting to unpatched cloud passwords.',
      'Our Privacy-First architecture shields physical addresses, personal surnames, and family routines across everyday movement. Dinner tables book under vetted TGLC corporate codes, courier boxes deliver into our secure 45 Albemarle Street receiving room, and private tail-number broadcasts block cleanly.',
      'For sensitive domestic environments or family offices, specialized digital security engineers audit residential Wi-Fi enclaves, mobile devices, and open-source data broker exposures.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg', caption: 'Encrypted signal-isolated consultation vaults preserving unmonitored dialogue' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Central Mayfair proxy address shielding private family postcodes completely' },
      { image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg', caption: 'Discreet courier handovers and rear service arrivals managed quietly off public streets' },
      { image: '/assets/aistudio/meard_poker_sanctum.jpg', caption: 'Zero-device rooms where Faraday pouches enforce authentic digital absence' }
    ],
    operationalPhases: [
      { phase: '01 · Exposure Scan', title: 'Digital Footprint & Broker Sweep', detail: 'Audit leaked public registries, residential street-view photos, and airline/hotel profile data.' },
      { phase: '02 · Proxy Shielding', title: 'Albemarle Mail & Pseudonym Codes', detail: 'Route deliveries, subscriptions, and venue reservations away from primary residential addresses.' },
      { phase: '03 · Home Network Audit', title: 'Smart-Home & Wi-Fi Hardening', detail: 'Segregate domestic staff Wi-Fi, camera feeds, and principal mobile devices via vetted cyber leads.' },
      { phase: '04 · Ongoing Hygiene', title: 'Quarterly Leak Monitoring', detail: 'Re-scrub online broker directories and verify all vendor NDAs annually.' }
    ],
    slaBenchmarks: [
      { label: 'Reservation Shield', value: '100% Proxy', note: 'Zero surname exposure on guest sheets' },
      { label: 'Mail Receiving', value: 'Same-Day Scan', note: 'Encrypted dispatch from W1S vault' },
      { label: 'Digital Erase', value: 'OSINT Audit', note: 'Data broker & registry scrub' }
    ],
    vettedPartners: [
      'Accredited OSINT & Digital Footprint Removal Specialists',
      'Residential Enterprise Cyber & RF Signal Engineers',
      'UK Encrypted Data Sovereignty Hosting Infrastructure',
      'Private Mail Vault & Diplomatic Bag Couriers'
    ],
    extraPoints: [
      'Unregistered pre-vetted secure burners and Signal/Proton operational workspaces arranged for rapid M&A negotiations',
      'Blind vendor briefing rules ensuring jewelers, tailors, and yachts prepare orders before client identity reveals'
    ],
    extraScenarios: [
      {
        title: 'Clean Slate Post-IPO Privacy Overhaul',
        description: 'Founder transitioning from startup anonymity to sudden media attention around Chelsea home.',
        outcome: 'Removed personal records from 42 commercial brokers, shifted parcel deliveries to Albemarle Street, and shielded family dining profiles.'
      },
      {
        title: 'Boardroom RF Acoustic Verification',
        description: 'Sensitive dispute summit inside temporary hired townhouse library.',
        outcome: 'Completed physical spectrum bug sweep 2 hours prior and sealed attendee handsets cleanly.'
      }
    ],
    faqs: [
      { q: 'Are hotel check-ins still lawful under a pseudonym or corporate charter?', a: 'Statutory passport ID still satisfies municipal police/immigration rules quietly at back offices while public booking titles, concierge cards, and folio headers remain strictly masked.' },
      { q: 'How quickly can parcels arriving at 45 Albemarle reach our home?', a: 'X-rayed and signed deliveries run via private TGLC van same afternoon or hold securely until your flight touches down.' },
      { q: 'Does TGLC store sensitive card or passport details in third-party apps?', a: 'Zero third-party SaaS ad sharing; structured records remain segregated inside UK encrypted sovereign vault protocols.' },
      { q: 'Can you scrub residential garden photographs off online real estate archives?', a: 'Our privacy specialists routinely petition property portals and geospatial caches to take down historical listing floorplans.' }
    ]
  },

  'everyday-lifestyle-management': {
    extendedOverview: [
      'Life’s friction rarely arrives from grand challenges alone; it bleeds hours away through mundane logistics—consulate passport lines, servicing rare watches, negotiating garage valet repairs, orchestrating inter-city floral tributes, or sorting seasonal closet rotations.',
      'Your TGLC Lifestyle Manager takes on the daily checklist calmly on a single direct channel. You send one voice note before boarding a flight; by touchdown, dry cleaning hangs freshly inside Mayfair dressing rooms, visas stamp smoothly, and anniversary menus rest cleared.',
      'We blend rapid efficiency with warm continuity—remembering your mother’s preferred tea blend, your accountant’s invoice format, and the quiet dog-walking service across Kensington Gardens.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Dedicated Mayfair lifestyle desk coordinating every household detail around the clock' },
      { image: '/assets/aistudio/savile_row_bespoke.jpg', caption: 'Seasonal garment pressing, cobbler re-soling, and trunk maintenance handled cleanly' },
      { image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', caption: 'Factory watch servicing, strap swaps, and insurance appraisal tracking' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Spontaneous dinner shifts and private celebratory cakes ordered straight onto tables' }
    ],
    operationalPhases: [
      { phase: '01 · Brief Capture', title: 'Direct Voice, Portal or Text', detail: 'Accept fast voice memos, forwarded confirmation emails, or Portal tickets in 2 minutes.' },
      { phase: '02 · Delegated Grind', title: 'Queue Elimination & Couriers', detail: 'Dispatch in-house runners to embassies, auction storage rooms, framers, and repair benches.' },
      { phase: '03 · Active Check', title: 'Follow-Through Verification', detail: 'Confirm completed quality rather than stopping once a vendor promises a delivery slot.' },
      { phase: '04 · Quiet Report', title: 'Evening Summary & Ledger', detail: 'Consolidate status notes cleanly without overwhelming principals in constant email loops.' }
    ],
    slaBenchmarks: [
      { label: 'Initial Reply', value: '< 10 min', note: '24/7 response across voice & WhatsApp' },
      { label: 'Mayfair Runners', value: 'Dedicated', note: 'In-house physical document couriers' },
      { label: 'Billing Consolidate', value: 'Monthly CSV', note: 'Clean receipts for family office' }
    ],
    vettedPartners: [
      'Heritage British Cobblers, Glove Cleaners & Cashmere Darners',
      'Passport & Consulate Priority Courier Agents',
      'Sotheby’s, Christie’s & Phillips Collection Pickup Teams',
      'Boutique Mayfair Florists & Artisan Delis'
    ],
    extraPoints: [
      'Vehicle MOT, ceramic detailing, winter tyre switches, and diplomatic congestion-zone registrations completed without interruption',
      'Custom holiday packing spreadsheets and climate-adapted garment deliveries before departure'
    ],
    extraScenarios: [
      {
        title: 'Same-Day Embassy Legalization & Couture Fix',
        description: 'Needed apostilled corporate document and torn gala hem tailored between 10:00 and 17:00.',
        outcome: 'Delivered papers smoothly to FCDO courier desk while senior seamstress attended Belgravia townhouse directly.'
      },
      {
        title: 'Multi-Recipient Autumn Gratitude Floral Run',
        description: 'Selecting bespoke seasonal arrangements for fourteen London advisory partners avoiding standard bouquet chains.',
        outcome: 'Curated hand-written calligraphy cards with wild English foliage delivered identically by 11:00 AM.'
      }
    ],
    faqs: [
      { q: 'Is any everyday task too simple to send to my Lifestyle Manager?', a: 'Never. Whether locating rare Japanese mineral water cases or organizing a full corporate retreat, freeing your mental headroom is the point.' },
      { q: 'Can my personal assistant communicate with TGLC on my behalf?', a: 'Routinely. We work side-by-side with executive assistants, sharing live statuses cleanly.' },
      { q: 'How quickly do routine requests return closed confirmation?', a: 'Most standard London deliveries, errands, and bookings settle within the same working business afternoon.' },
      { q: 'Are small courier tips or odd cash expenses cleanly tracked?', a: 'Every minor outlay settles against transparent pass-through ledgers with digital receipt uploads.' }
    ]
  },

  'household-staffing-recruitment': {
    extendedOverview: [
      'Inviting someone to live or work daily among your children, private documents, and family artworks demands deeper discernment than an algorithm or generic recruitment board can supply.',
      'TGLC collaborates with London’s most respected private domestic headhunters to recruit travelling butlers, bilingual maternity nurses, Norland-trained nannies, executive estate managers, and classically trained chefs.',
      'We run rigorous reference verification, screen cultural chemistry inside third-party drawing rooms before disclosing household addresses, and introduce specialist employment solicitors to draft clear legal contracts.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg', caption: 'Formal townhouse estates managed by trusted live-in estate directors' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Discreet confidential first-round candidate interviews hosted on Albemarle Street' },
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Immaculately maintained principal rooms supported by career housekeepers' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Private culinary trials scored across seasonal menus and dietary versatility' }
    ],
    operationalPhases: [
      { phase: '01 · Role Architecture', title: 'Duty Roster & Salary Benchmarks', detail: 'Align realistic shift hours, live-in accommodation wings, and competitive London pay scales.' },
      { phase: '02 · Blind Sifting', title: 'Enhanced DBS & Reference Forensics', detail: 'Verify every employment gap, check diplomatic clearances, and vet agency shortlists.' },
      { phase: '03 · Salon Interviews', title: 'Pre-Screening & Culinary Trials', detail: 'Test practical chef tasting dishes or butler silver skills inside TGLC neutral rooms.' },
      { phase: '04 · Onboarding Legal', title: 'NDA & Accredited Contracts', detail: 'Refer to specialized employment counsel for legal contracts, trial periods, and pension setups.' }
    ],
    slaBenchmarks: [
      { label: 'Placement Guarantee', value: 'Trusted Fit', note: 'Structured 90-day trial calibration' },
      { label: 'Roles Covered', value: 'Full Estate', note: 'Butlers, Nannies, Chefs, Drivers' },
      { label: 'Identity Mask', value: 'Phase 1–2', note: 'Home address withheld pre-trial' }
    ],
    vettedPartners: [
      'Norland & Maternity Childcare Placement Agencies',
      'Royal & Diplomatic Butler Recruitment Guilds',
      'UK Private Household Employment Solicitors & Payroll Firms',
      'Private Chef Culinary Assessment Studios'
    ],
    extraPoints: [
      'Multi-lingual nanny sourcing (Mandarin, French, Spanish, Arabic) experienced with international jet schedules',
      'Post-placement 6-month diplomatic check-ins spotting roster strain before valued staff resign'
    ],
    extraScenarios: [
      {
        title: 'Urgent Mandarin-English Travelling Nanny',
        description: 'Family relocating monthly between Hong Kong, London, and Côte d’Azur.',
        outcome: 'Sourced double-passport educator experienced in international aviation transitions within five days.'
      },
      {
        title: 'Discreet Chief Steward to Estate Manager Promotion',
        description: 'Superyacht principal moving ashore wanting proven sea crew discipline applied to Chelsea townhouse.',
        outcome: 'Transitioned vetted former Chief Purser smoothly with bespoke domestic tax & property training.'
      }
    ],
    faqs: [
      { q: 'Can you help handle delicate dismissals or restructurings sensitively?', a: 'Through qualified HR employment solicitors, we organize compliant, respectful terminations and lock/key resets immediately.' },
      { q: 'Are references checked over telephone rather than easy forged letters?', a: 'Always—our specialist agency partners speak personally to former household employers and private offices.' },
      { q: 'Do recruited private chefs handle strict clinical dietary protocols?', a: 'Yes, sourcing culinary specialists experienced in diabetic, renal, macro-athlete, and plant-based haute cuisines.' },
      { q: 'What typical notice period applies to securing permanent senior house managers?', a: 'Typically four to six weeks for senior strategic hires; rapid temporary replacements run within 48 hours.' }
    ]
  },

  'education-family-support': {
    extendedOverview: [
      'Navigating British independent school admissions (7+, 11+, 13+ Common Entrance, Sixth Form) or balancing international relocation alongside IB and US Ivy League counselling demands calm institutional knowledge rather than anxious rumours.',
      'TGLC does not act as a teaching school; we connect families directly to London’s preeminent independent educational consultants, former public school admissions tutors, and Oxbridge doctoral mentors.',
      'From structuring quiet cultural reading programmes ahead of Eton, Wycombe Abbey, Winchester, or St Paul’s interviews to organizing laboratory science workshops during half-terms, young minds flourish with grounded guidance.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg', caption: 'Residential summer scholarship retreats blending outdoor discipline with seminar study' },
      { image: '/assets/aistudio/royal_opera_gallery.jpg', caption: 'Art history, museum scholarship, and rhetoric coaching in central London archives' },
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Quiet tutorial drawing rooms booked discretely between school terms' },
      { image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg', caption: 'Curatorial portfolio preparation guiding creative arts sixth-form candidates' }
    ],
    operationalPhases: [
      { phase: '01 · Diagnostic Map', title: 'Temperament & Academic Audit', detail: 'Assess each child’s true cognitive profile before narrowing day schools vs. historic boarding houses.' },
      { phase: '02 · Registry Strategy', title: 'Admissions Timelines & Tours', detail: 'Schedule private Headmaster visits and navigate multi-year UK registration deadlines cleanly.' },
      { phase: '03 · Scholar Pairing', title: 'Oxbridge & Subject Mentors', detail: 'Match thoughtful tutors across classics, Mandarin, advanced maths, and confident interview prose.' },
      { phase: '04 · Pastoral Sync', title: 'Guardianship & Term Logistics', detail: 'Integrate boarding exeat transfers, uniform trunk prep, and half-term cultural enrichment.' }
    ],
    slaBenchmarks: [
      { label: 'School Pathways', value: 'UK + Ivy', note: 'Eton, Harrow, St Paul’s, Oxbridge, US' },
      { label: 'Tutor Standard', value: 'Verified DBS', note: 'Post-grad & former housemasters' },
      { label: 'Support Window', value: 'Year-Round', note: 'Term time & yacht/villa summer tuition' }
    ],
    vettedPartners: [
      'Accredited Independent British School Placement Advisors',
      'Senior Oxbridge, Imperial & Russell Group Private Tutors',
      'BSE-Accredited International Boarding Guardianship Trusts',
      'Fine Arts, Architecture & STEM Portfolio Counsellors'
    ],
    extraPoints: [
      'Dedicated travelling summer tutors joining Mediterranean yachts or Aspen chalets seamlessly to prevent September slippage',
      'Specialized executive functioning and quiet dyslexic/neurodiverse learning support specialists'
    ],
    extraScenarios: [
      {
        title: '13+ Classics & Interview Readiness Across Two Homes',
        description: 'International student splitting terms between Zurich and SW1 ahead of competitive London assessments.',
        outcome: 'Installed linked hybrid Oxbridge humanities mentor securing confident unconditional entrance placement.'
      },
      {
        title: 'Yacht Summer Pre-University Seminar',
        description: 'Rising undergraduate wanting rigorous macroeconomics reading companion during two weeks at sea.',
        outcome: 'Matched LSE doctoral scholar sailing discretely aboard chase vessel for daily morning deck tutorials.'
      }
    ],
    faqs: [
      { q: 'Can TGLC buy or bypass academic admissions entrances at leading schools?', a: 'No, and we never compromise ethics. Our consultants prepare students to earn places authentically through clear readiness and ideal school matching.' },
      { q: 'Can academic tutors travel aboard our family plane or villa holidays?', a: 'Routinely—providing balanced morning academic focus leaving sunny afternoons clear for family recreation.' },
      { q: 'Do you support children learning English smoothly prior to international prep onboarding?', a: 'Yes, pairing specialist bilingual immersion educators over gentle six-month summer cycles.' },
      { q: 'Do you manage half-term and boarding exeat chauffeur collections automatically?', a: 'Completely—syncing boarding school term lists straight to our chauffeur and flight calendars.' }
    ]
  },

  'health-wellness-recovery': {
    extendedOverview: [
      'Waiting six weeks for an MRI scan or battling rushed reception rooms across commercial private clinics steals vital recovery peace. Under TGLC’s logistical health facilitation, principals reach independent Harley Street consultants, Wellington Hospital diagnostics, and Swiss alpine cellular recovery clinics smoothly.',
      'We maintain strict medical boundaries: clinical diagnosis and prescription always reside solely with licensedGMC-registered doctors and hospitals. TGLC coordinates same-day scans, VIP private side-door arrivals, language translators, in-home nursing rooms, and encrypted medical records transfer.',
      'Beyond acute moments, we orchestrate proactive longevity blueprints—3T whole-body imaging, cardiology VO2 profiling, orthodontic aesthetics, and post-travel circadian recovery.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg', caption: 'Private Harley Street consultation room reserved away from general public waiting lobbies' },
      { image: '/assets/aistudio/swiss_alpine_chalet.jpg', caption: 'Alpine preventative longevity and post-surgical air retreats above Lake Geneva' },
      { image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg', caption: 'Discrete in-residence nursing, osteopathy, and IV wellness care scheduled peacefully' },
      { image: '/assets/aistudio/private_jet_interior_suite.jpg', caption: 'Dedicated air ambulance and medical escort synchronization when emergencies arise abroad' }
    ],
    operationalPhases: [
      { phase: '01 · Fast Triage', title: 'Private GP & Specialist Link', detail: 'Arrange same-day introductions to Harley Street orthopedic, cardiac, or diagnostic leads.' },
      { phase: '02 · Quiet Entry', title: 'Private Wing & Bypass Check-In', detail: 'Coordinate clinical arrivals under neutral reference codes protecting privacy during tests.' },
      { phase: '03 · Home Recovery', title: 'In-Residence Care & Physio', detail: 'Install hospital beds, visiting nurses, orthopaedic physios, and anti-inflammatory kitchen meals.' },
      { phase: '04 · Preventative Plan', title: 'Annual Longevity Retreats', detail: 'Book Zurich/Montreux biometric clinics synchronized with family vacation windows.' }
    ],
    slaBenchmarks: [
      { label: 'MRI Diagnostic Wait', value: '< 3 hrs', note: 'Harley Street urgent 3T scan booking' },
      { label: 'GP House Call', value: '< 60 min', note: '24/7 central London residential visits' },
      { label: 'Clinical Boundary', value: '100% GMC', note: 'Advice solely from licensed physicians' }
    ],
    vettedPartners: [
      'Leading Harley Street Orthopaedic, Cardiac & Oncology Consultants',
      '3T Diagnostic Imaging Centres & Private Hospital Suites',
      'Swiss & German Preventative Cellular & Functional Clinics',
      'Visiting Sports Physiotherapists & Pre-Natal Specialists'
    ],
    extraPoints: [
      'Direct courier transit of encrypted medical scans and pathology samples across London, Zurich, and New York specialists',
      'High-altitude hydration, sleep hygiene, and circadian recovery regimens after transatlantic flights'
    ],
    extraScenarios: [
      {
        title: 'Sunday Evening Ski Knee Injury to Harley Street Scan',
        description: 'Principal tore meniscus in Verbier Sunday morning needing immediate London imaging.',
        outcome: 'Timed airport landing straight to Harley Street scanner at 19:00; lead knee surgeon reviewed MRI by 20:30.'
      },
      {
        title: 'Confidential Post-Operative Suite Installation',
        description: 'Family elder needing quiet two-week residence nursing following minor heart procedure.',
        outcome: 'Arranged private medical equipment installation and bilingual 24-hour nursing shifts seamlessly inside SW1 home.'
      }
    ],
    faqs: [
      { q: 'Does TGLC hold client medical charts or give medical opinions?', a: 'Never. For confidentiality and statutory medical protection, clinical files stay locked inside regulated hospital vaults while we purely coordinate scheduling and transit.' },
      { q: 'Can you help fly a relative safely home on a medical flight if hospitalized overseas?', a: 'Yes—our air charter team connects immediately with accredited European air-ambulance operators carrying flight nurses and ICU modules.' },
      { q: 'Do your medical clinics operate late evenings and weekends for urgent family fevers?', a: 'Retained private GP doctors conduct house calls across prime London postcodes at any hour.' },
      { q: 'Are aesthetic dermatology, dentistry, and preventative checkups equally discreet?', a: 'Privately scheduled via back-door suites across W1 and Swiss clinics without lobby queues.' }
    ]
  },

  'gifting-personal-milestones': {
    extendedOverview: [
      'Anyone can order a standard luxury handbag or boxed pen. Memorable gifting honors someone’s secret obsession—the obscure 1938 architectural monograph, the scent blending highland bog-myrtle with smoked cedarwood, or a hand-engraved compass matching longitude coordinates of a first meeting.',
      'We act as your research scholar and atelier producer. Working directly with antiquarian booksellers on Cecil Court, Goldsmiths’ Hall silversmiths, French perfumers in Grasse, and master leather binders in Shropshire, every piece carries tactile soul.',
      'Presentation rounds out the magic: acid-free solander boxes lined in marbled paper, hand-calligraphed notes, and white-gloved delivery timed to the minute.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Custom bridle leather folios and watch boxes stitched over linen beeswax cord' },
      { image: '/assets/aistudio/bond_street_jewellery.jpg', caption: 'Heirloom signet stones and custom cufflinks engraved cleanly to family archives' },
      { image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', caption: 'Birth-year vintage chronographs located unpolished with intact extract papers' },
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Birth-year grand cru magnums pulled from insured estate reserves' }
    ],
    operationalPhases: [
      { phase: '01 · Biography Brief', title: 'Uncovering Deep Obsessions', detail: 'Note alma mater nostalgia, literary tastes, sports history, and unfulfilled childhood dreams.' },
      { phase: '02 · Archive Search', title: 'Scholarship & Provenance Hunt', detail: 'Track antiquarian books, signed musical scores, or single-owner birth-year wine verticals.' },
      { phase: '03 · Atelier Crafting', title: 'Bespoke Fabrication & Proof', detail: 'Oversee engravers, bookbinders, and perfumers creating one-of-one family objects.' },
      { phase: '04 · Presentation', title: 'Calligraphy & Timed Drop', detail: 'Box inside archival chests delivered privately around breakfasts, planes, or dinners.' }
    ],
    slaBenchmarks: [
      { label: 'Master Registry', value: '42+ Makers', note: 'Bookbinders, silversmiths & scent' },
      { label: 'Birth-Year Hunt', value: 'Global Vaults', note: 'Watches, Cognac & First Editions' },
      { label: 'Milestone Radar', value: 'Proactive', note: '4-week alerts prior to key dates' }
    ],
    vettedPartners: [
      'Cecil Court & Oxford Antiquarian First-Edition Scholars',
      'Shropshire Hand-Stitched Bridle Leather Case Makers',
      'Mayfair & Grasse Custom Fragrance Compounders',
      'Goldsmiths’ Hall Silversmiths & Heraldic Engravers'
    ],
    extraPoints: [
      'Proactive annual calendar alerts flagging spouse anniversaries, family birthdays, and executive gratitude windows 30 days ahead',
      'Discreet custom wrapping using wax family seals and zero visible brand receipts'
    ],
    extraScenarios: [
      {
        title: 'Inscribed 1925 Literary Edition & Solander Chest',
        description: 'Fortieth birthday commission for principal’s spouse who adored modernist literature.',
        outcome: 'Located verified presentation copy in private collection, bound archival clamshell case in emerald Morocco hide.'
      },
      {
        title: 'Custom Sound-Studio Signed Acetate Commission',
        description: 'Gift for hip-hop entrepreneur marking company tenth anniversary.',
        outcome: 'Booked Abbey Road mastering engineer pressing a one-of-one bronze-plated vinyl acetate inside bespoke flight case.'
      }
    ],
    faqs: [
      { q: 'Can TGLC manage corporate holiday gifting for 100 global investors without feeling generic?', a: 'Yes, producing small-batch English honey/single-estate tea coffrets or monogrammed travel trunks mailed globally.' },
      { q: 'How far ahead should bespoke silversmith or bookbinding commissions start?', a: 'Allow six to twelve weeks for custom tools or bespoke scents, though existing antiquarian treasures locate inside days.' },
      { q: 'Can you help track down a specific birth-year bottle of Champagne or whisky?', a: 'Our fine cellar brokers routinely source rare 1960s–1990s single-bottle vintages carrying clean fill levels.' },
      { q: 'What if I forget an anniversary tomorrow morning?', a: 'Keep calm—our local Mayfair curators pull immediate extraordinary flowers, hand-engraved tokens, and evening dining rescues within two hours.' }
    ]
  },

  'private-office-adviser-liaison': {
    extendedOverview: [
      'Family offices protect generational capital through investment directors, fiduciary trustees, tax solicitors, and private bankers. Yet non-financial lifestyle burdens—staff turnover, aviation audits, art insurance appraisals, or hosting global annual assemblies—frequently pull financial executives off core asset governance.',
      'TGLC integrates smoothly alongside Chiefs of Staff and CFOs rather than duplicating authority. We follow existing compliance rules, clear monthly itemized invoices tagged cleanly by entity or household trust, and log board-level hospitality without administrative noise.',
      'From hosting confidential three-day multi-generational retreats at 45 Albemarle Street to consolidating yacht APA accounts into clean trustee spreadsheets, your executive team breathes easier.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/tglc_st_james_salon.jpg', caption: 'Third-floor Albemarle Street boardroom hosted for confidential family trustee meetings' },
      { image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg', caption: 'Lateral riverfront meeting apartments arranged for multi-day governance summits' },
      { image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg', caption: 'Faraday-shielded chambers supporting wholly confidential merger talks' },
      { image: '/assets/aistudio/private_jet_interior_suite.jpg', caption: 'Executive air transit coordinated smoothly with corporate CFO travel policies' }
    ],
    operationalPhases: [
      { phase: '01 · Governance Sync', title: 'CFO & Chief of Staff Onboarding', detail: 'Align invoice coding rules, spending authorizations, and dual-sign-off limits before launch.' },
      { phase: '02 · EA Integration', title: 'Shared Schedule & Flight Mirror', detail: 'Sync directly into executive assistants’ calendar protocols avoiding conflicting bookings.' },
      { phase: '03 · Pass-Through Ledger', title: 'Audit-Ready Reconciliation', detail: 'Deliver single monthly CSV and PDF packs pairing verbatim underlying vendor receipts.' },
      { phase: '04 · Summit Execution', title: 'Annual Family Assemblies', detail: 'Manage flights, boardrooms, translators, security, and dinners for multi-branch trusts.' }
    ],
    slaBenchmarks: [
      { label: 'Accounting Transparency', value: '100% Verbatim', note: 'Zero hidden spreads on disbursements' },
      { label: 'Weekly EA Sync', value: 'Dedicated Desk', note: 'Direct portal & calendar alignment' },
      { label: 'Governance Audit', value: 'Quarterly Review', note: 'Senior Director calibration calls' }
    ],
    vettedPartners: [
      'Multi-Family Office Chief Operating Teams',
      'Boutique Mayfair Tax, Trust & Fiduciary Legal Houses',
      'Secure Transcriber & Simultaneous Translation Booths',
      'Sovereign Private Banking Advisory Concierges'
    ],
    extraPoints: [
      'Entity-separated billing allocating business aviation cleanly apart from personal household retainers',
      'Confidential 3-day board retreat execution blending strategic sessions with quiet evening cultural moments'
    ],
    extraScenarios: [
      {
        title: 'Annual Family Council in Mayfair for 34 Members',
        description: 'Bringing four branches across continents for governance votes, next-gen briefings, and gala supper.',
        outcome: 'Orchestrated private suites across Brown’s and Connaught, hired soundproof meeting floor, and organized Saturday cultural breaks.'
      },
      {
        title: 'Clean Expense Split Across Four Holding Trusts',
        description: 'Family office drowning in messy concierge receipts across planes, homes, and art loans.',
        outcome: 'Introduced structured cost-center ledger formatting saving accounting controllers 20 hours monthly.'
      }
    ],
    faqs: [
      { q: 'Does TGLC give tax, trust law, or investment advice to family offices?', a: 'No. Financial, fiduciary, and legal engineering remains strictly with your accredited counsel; TGLC provides the operational, property, travel, and executive hospitality backbone.' },
      { q: 'Can family office controllers approve large charter spending online before execution?', a: 'Yes, via dual-approval threshold gates configurable inside the Family Office portal view.' },
      { q: 'How many principals and assistants can share a Private Office Charter?', a: 'Unlimited executive assistants alongside tailored multi-household family trees configured seamlessly.' },
      { q: 'Can you provide temporary Mayfair office rooms when visiting London between leases?', a: 'Private drawing rooms and encrypted meeting rooms at 45 Albemarle Street stand ready on booking.' }
    ]
  },

  'fine-jewellery-watches': {
    extendedOverview: [
      'Navigating the upper floors of New Bond Street, Selfridges’ fourth-floor Penthouse, and Geneva’s independent ateliers demands technical literacy in calibre authenticity and natural gem certification—never showroom impulse.',
      'We open private velvet viewing salons where historical maison archives, untreated D-Flawless diamonds, unheated Kashmir sapphires, and independent manual chronographs appear free of retail pressure. Every piece undergoes independent scrutiny: ultraviolet dial testing, Patek/Vacheron archive extract verification, and SSEF/Gübelin origin certification.',
      'Beyond off-shelf salons, we connect collectors straight to independent master jewelers and watchmakers to commission family tiaras, bespoke dial enamel pieces, and bonded vault transfers worldwide.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', caption: 'Vintage perpetual chronographs inspected under stereo loupes alongside archive ledgers' },
      { image: '/assets/aistudio/bond_street_jewellery.jpg', caption: 'Untreated gemstones and archival Bond Street mounts reviewed inside velvet suites' },
      { image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg', caption: 'Closed-door heritage salon previews curated independently of busy shop floors' },
      { image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg', caption: 'Private evening horology exchange tasting single casks behind sealed crypt doors' }
    ],
    operationalPhases: [
      { phase: '01 · Reference Brief', title: 'Calibre or Gem Target Spec', detail: 'Set target reference, dial patina parameters, stone carat weight, and ceiling valuation discipline.' },
      { phase: '02 · Market Sourcing', title: 'Private Collectors & Maisons', detail: 'Reach private Geneva, Zurich, and London vaults cleanly prior to auction cataloguing.' },
      { phase: '03 · Lab Authentication', title: 'UV, Micro & SSEF Checks', detail: 'Verify movement serials, case chamfers, and zero thermal stone treatments via independent scholars.' },
      { phase: '04 · Bonded Handover', title: 'Security Transit & Insurance', detail: 'Deliver inside bespoke travel rolls accompanied by valuation appraisals and armored courier.' }
    ],
    slaBenchmarks: [
      { label: 'Retail Markup', value: 'Zero Spread', note: 'Transparent seller-to-member settlement' },
      { label: 'Provenance Standard', value: 'Dual Lab', note: 'SSEF / Gübelin & maker extract audits' },
      { label: 'Vault Access', value: 'Same-Week', note: 'London, Geneva & Antwerp viewing trays' }
    ],
    vettedPartners: [
      'Burlington Arcade Vintage Horology Scholars (Somlo, Vintage Watch Co)',
      'New Bond Street High Jewellery Directors (Cartier, Graff, Van Cleef)',
      'Independent Geneva & Isle of Man Master Watchmakers',
      'SSEF, GIA & Gübelin Accredited Gemologists'
    ],
    extraPoints: [
      'Private after-hours walk through Burlington Arcade hosted alongside the Head Beadle',
      'Gouache hand-painting and articulated wax mockups guiding bespoke gemstone resetting of heirlooms'
    ],
    extraScenarios: [
      {
        title: 'Early Patek 5970P Unpolished Acquisition',
        description: 'Collector hunting complete factory-sealed paper example avoiding auction room premiums.',
        outcome: 'Sourced single-owner piece in Zurich; verified movement tolerances with independent watchmaker before Albemarle delivery.'
      },
      {
        title: 'Closed-Door Bond Street Anniversary Engagement View',
        description: 'Seeking unheated Type IIa cushion diamond privately without shop windows.',
        outcome: 'Staged fourth-floor heritage salon displaying six loose stones sourced directly with zero retail crowding.'
      }
    ],
    faqs: [
      { q: 'Does TGLC buy watches as a dealer and mark them up to members?', a: 'Never. We facilitate confidential introductions and technical authentication on an open-book basis without dealer markups.' },
      { q: 'Can you get immediate steel sports waitlists bypassed?', a: 'While maisons control retail production strictly, we arrange serious collector dialogue directly with Boutique Directors and source pristine collector-held examples ethically.' },
      { q: 'Are heirloom diamonds safely insured during bespoke resetting workshops?', a: 'Comprehensive jeweller-block transit and studio policies cover every stone from handover through return.' },
      { q: 'Can you help evaluate or quietly divest an inherited 30-piece watch collection?', a: 'Yes, organizing confidential private-treaty collector placements avoiding public auction exposure.' }
    ]
  },

  'art-collectible-design': {
    extendedOverview: [
      'A residence settles into timeless weight when furnishings hold provenance as deeply as paintings: a 1950s Jean Royère armchair stitched in mohair, hand-sculpted Japanese bronze side tables, or limited Italian ceramic monoliths.',
      'We connect patrons straight to historical Parisian design archives, Milanese experimental workshops, and Scandinavian cabinet makers, screening wood patina, original joinery stamps, and exhibition pedigree prior to commitment.',
      'Once acquired, bespoke climate-controlled handlers ship delicate lacquer, travertine, and mid-century timber cleanly from Place des Vosges or Brera straight into Belgravia living rooms.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/royal_opera_gallery.jpg', caption: 'Museum-calibre sculptural pieces calibrated into private architectural interiors' },
      { image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg', caption: 'Mid-century oak and hand-patinated brass lighting curated for Mayfair libraries' },
      { image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg', caption: 'Monolithic contemporary seating balanced inside poured-concrete skyline rooms' },
      { image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg', caption: 'International Design Miami & PAD London collector preview appointments' }
    ],
    operationalPhases: [
      { phase: '01 · Interior Fit', title: 'Scale & Timber Dialogue', detail: 'Evaluate doorway clearances, humidity tolerances, and tonal synergy against your room blueprints.' },
      { phase: '02 · Provenance Verify', title: 'Archive & Original Patina Audit', detail: 'Confirm estate serial stamps, wood species tests, and original upholstery notes cleanly.' },
      { phase: '03 · Maker Commissions', title: 'Numbered Studio Editions', detail: 'Commission bespoke monolithic stone dining tables or textile hangings direct from workshops.' },
      { phase: '04 · Museum Install', title: 'Custom Crating & Floor Load', detail: 'Monitor floor joist loads on stone sculpture and manage discreet evening home installation.' }
    ],
    slaBenchmarks: [
      { label: 'Design Hubs', value: 'Paris · Milan', note: 'Plus London, Tokyo & Copenhagen' },
      { label: 'Provenance Audit', value: 'Archive Verified', note: 'Gallery committee stamps checked' },
      { label: 'Commission Horizon', value: '8 – 16 wks', note: 'Custom architectural studio work' }
    ],
    vettedPartners: [
      'Saint-Germain-des-Prés & Marais Twentieth-Century Design Galleries',
      'PAD London & Design Miami VIP Collector Concessions',
      'Brera & Kyoto Bespoke Metalwork, Ceramic & Lacquer Masters',
      'Museum Conservators Specializing in Lacquer, Bakelite & Timber'
    ],
    extraPoints: [
      'Preventative wax preservation and non-abrasive upholstery dusting guides prepared for residence housekeepers',
      'Floor reinforcement coordination prior to installing multi-ton travertine tables in historic townhouses'
    ],
    extraScenarios: [
      {
        title: '1950s Charlotte Perriand Alpine Residence Set',
        description: 'Acquiring matched Les Arcs chairs and solid pine refectory table with unbroken Chalet provenance.',
        outcome: 'Authenticated archive exhibition records in Paris; restored minor timber shrinkage cleanly and air-freighted to Switzerland.'
      },
      {
        title: 'Custom Bronze Library Table Commission',
        description: 'Principal seeking one-off sand-cast desk fitting curved Mayfair bay window.',
        outcome: 'Arranged studio prototype walkthrough in Battersea followed by four-month numbered fabrication.'
      }
    ],
    faqs: [
      { q: 'How do you spot heavily restored or fake 1950s French furniture before buying?', a: 'Independent design archivists examine screw threads, wood grain oxidative ageing, and committee provenance ledgers before deposits clear.' },
      { q: 'Can furniture works ship to multiple residences globally without breakage?', a: 'Yes, packed inside foam-moulded museum travel crates adjusted for ocean or air-freight pressure.' },
      { q: 'Do you coordinate floor engineers before heavy marble or stone furniture climbs townhouses?', a: 'Always—verifying hoist rigging, window access, and load distribution on Victorian joists beforehand.' },
      { q: 'Can you introduce ceramic and lighting studios to our existing interior decorator?', a: 'Smoothly—we act as an expansive research bench backing your chosen studio without creative turf war.' }
    ]
  },

  'rare-wines-spirits': {
    extendedOverview: [
      'Collecting fine wine rests entirely on unbroken provenance: a bottle of 1982 Château Latour cooked inside a warm dining sideboard loses twenty years of poise overnight. Real cellar wealth requires straight-from-château traceability alongside limestone thermal stability.',
      'We connect members directly with St James’s historic vintners and Burgundy estate custodians for scarce en primeur allocations alongside private single-owner cellar releases held under bond inside Wiltshire stone vaults.',
      'On the spirits front, our rare spirits desk accesses pre-embargo Havana pairing rums, independent cask-strength Speyside sherry butts, and limited Japanese Karuizawa/Yamazaki auctions verified against counterfeit glass molds.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/rare_cellar_vault.jpg', caption: 'Climate-controlled subterranean wine vault cradling First Growth cases under bond' },
      { image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg', caption: 'Private crypt whisky exchange sampling uncut single-cask sherry drams' },
      { image: '/assets/aistudio/mayfair_fine_dining.jpg', caption: 'Estate library verticals pulled and stood upright 48 hours prior to dinner decanting' },
      { image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg', caption: 'Pre-1914 archival botanical distillates poured behind velvet parlour curtains' }
    ],
    operationalPhases: [
      { phase: '01 · Cellar Blueprint', title: 'Taste, Horizon & Bond Architecture', detail: 'Balance ready-to-drink home cellar racks against twenty-year en primeur investment holdings.' },
      { phase: '02 · Forensic Check', title: 'UV, Cork & Fill Inspection', detail: 'Screen secondary bottles for cork replacement marks, seepage, and authentic capsule fonts.' },
      { phase: '03 · Bonded Transfer', title: 'Duty-Free Storage Registration', detail: 'Place holdings inside Octavian Corsham stone mines or private family bond accounts.' },
      { phase: '04 · Dinner Pulling', title: 'Cold Van Delivery & Sommelier Decant', detail: 'Shuttle chilled bottles delicately ahead of residential feasts or aircraft journeys.' }
    ],
    slaBenchmarks: [
      { label: 'Provenance Grade', value: 'Single-Owner', note: 'Verified estate or bonded vault only' },
      { label: 'Climate Control', value: '12°C / 75%RH', note: 'Limestone mine & reefer van chain' },
      { label: 'Authentication', value: 'Zero Forgery', note: 'Glass-mold & UV cork forensics' }
    ],
    vettedPartners: [
      'Historic St James’s Wine Merchants & Bordeaux Negociants',
      'Domaine Ambassadors in Vosne-Romanée, Barolo & Champagne',
      'Wiltshire Limestone Subterranean Bonded Facilities',
      'Master Independent Scotch & Japanese Whisky Brokers'
    ],
    extraPoints: [
      'Private group syndicate cask purchases allowing members to bottle numbered custom labels directly from Scottish distilleries',
      'In-residence cellar temperature telemetry alarms linked directly to TGLC watch team'
    ],
    extraScenarios: [
      {
        title: 'Six-Vintage La Tâche Single-Owner Placement',
        description: 'Acquiring consecutive 1999–2004 DRC cases smoothly avoiding noisy auction floors.',
        outcome: 'Matched collector quietly exiting Geneva bond warehouse; inspected full ullage records and settled cleanly.'
      },
      {
        title: 'Private 30-Year Oloroso Sherry Butt Bottling',
        description: 'Principal commissioning custom numbered Speyside decanters for leadership gifts.',
        outcome: 'Tasted six distillery warehouse samples via master distiller; bottled 240 crystal decanters discreetly.'
      }
    ],
    faqs: [
      { q: 'Can TGLC inspect existing wine forgotten inside an inherited townhouse cellar?', a: 'Yes. Master Sommeliers compile physical bottle condition logs, auction market appraisals, and urgent drinking schedules.' },
      { q: 'Do we pay UK VAT and excise duty if keeping allocations stored under bond?', a: 'Cases held inside accredited HMRC bonded warehouses wait tax-deferred until pulled out for home enjoyment or exported.' },
      { q: 'How are counterfeits spotted across high-value Burgundy or Japanese whisky?', a: 'UV lamp inspection on label rag cellulose, embossed bottle base dates, lead capsule texture, and merchant original paperwork.' },
      { q: 'Can you fly cherished bottles aboard our private jet cleanly?', a: 'Using shocked-cushioned isothermal flight cases preserving stable temperatures safely in baggage holds.' }
    ]
  },

  'automobiles-motoring': {
    extendedOverview: [
      'Limited-run coachbuilt hypercars and pre-war competition classics rarely trade through shiny public forecourts; they move confidentially inside private barns across Oxfordshire, Modena, and Stuttgart between collectors known personally to marque custodians.',
      'We connect enthusiasts straight to off-market allocations, historical factory build-slot discussions, and master coachbuilders overseeing nut-and-bolt concours restorations—whether validating an original 1962 chassis plate or securing trackside support for the Mille Miglia.',
      'Beyond purchases, we handle enclosed single-car global air freight, clean UK/Monaco diplomatic registrations, and climate-controlled collection storage near Mayfair.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg', caption: 'Contemporary hypercars verified directly through factory provenance departments' },
      { image: '/assets/aistudio/25_Koenigsegg_CCXR_Trevita_30-Most-Expensive-Cars-in-the-World_Tyroola_0c18f9f0.jpg', caption: 'Low-production carbon bodywork inspected under factory diagnostic audits' },
      { image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp', caption: 'Bespoke Coachbuilt & Black Badge specifications ordered directly with design directors' },
      { image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp', caption: 'Rare grand tourers stored dehumidified and exercised regularly for peak mechanical poise' }
    ],
    operationalPhases: [
      { phase: '01 · Chassis Audit', title: 'Numbers-Matching Forensics', detail: 'Check engine stampings, original paint depth microns, factory Classiche sheets, and accident logs.' },
      { phase: '02 · Allocation Dialog', title: 'Atelier & Build Spec Guidance', detail: 'Sit alongside marque bespoke leather and paint departments selecting singular trim touches.' },
      { phase: '03 · Track & Rally', title: 'Mille Miglia & Goodwood Entry', detail: 'Prepare FIVA historic technical passports, rally co-drivers, and mechanics chase support.' },
      { phase: '04 · Vault Custody', title: 'Dehumidified Storage & Transit', detail: 'Maintain batteries, flush brake fluids quarterly, and move machinery globally in enclosed air vans.' }
    ],
    slaBenchmarks: [
      { label: 'Inspection Standard', value: 'Factory Audit', note: 'Original chassis & paint depth logs' },
      { label: 'Freight Handling', value: 'Enclosed Only', note: 'Air-ride trailers & cargo charter' },
      { label: 'Rally Ready', value: 'FIVA Compliant', note: 'Full historic technical documentation' }
    ],
    vettedPartners: [
      'Accredited Ferrari Classiche, Aston Works & Porsche Classic Restorers',
      'Confidential Private Collector Collection Custodians',
      'Air-Freight Automotive Charters & Customs ATA Carnet Brokers',
      'Mayfair & West London Private Subterranean Storage Vaults'
    ],
    extraPoints: [
      'Private proving-ground track mornings booked solely for new owners learning hypercar dynamics alongside Le Mans drivers',
      'Bespoke helmet painting, race suits, and custom tool-kits built cleanly for collector booths'
    ],
    extraScenarios: [
      {
        title: 'Off-Market Koenigsegg Private Sale Settlement',
        description: 'Collector locating rare Nordic carbon model held silently in private Scandinavian warehouse.',
        outcome: 'Arranged Ängelholm factory technician physical survey, escrowed clean purchase, and shipped closed-van straight to W1.'
      },
      {
        title: 'Complete Restoration Supervision on Pre-War Bentley',
        description: 'Client wanting 1934 open tourer rebuilt authentically for family historic tours without overspending.',
        outcome: 'Retained independent vintage marque engineer auditing monthly workshop hours and authentic ash framing.'
      }
    ],
    faqs: [
      { q: 'Does TGLC accept hidden back-end dealer commissions on collector car trades?', a: 'No. We provide independent provenance introduction and restoration oversight under straightforward client representation.' },
      { q: 'Can you keep a five-car collection maintained if I live mostly outside England?', a: 'Yes, running dehumidified bay storage, regular road-warming miles, annual MOTs, and tax retention cleanly.' },
      { q: 'Can you fly a vehicle privately to Ibiza or Geneva just for three weeks of summer?', a: 'Routinely—either aboard fast multi-drop air-ride closed vans or commercial/charter freighters.' },
      { q: 'Do you assist selecting bespoke interior hides and embroidery during new factory specs?', a: 'Yes, organizing private Maranello, Goodwood, or Gaydon specification days with design heads.' }
    ]
  },

  'bespoke-gifts-commissions': {
    extendedOverview: [
      'Mass-manufactured logos fade fast when compared against an object crafted specifically for a single human hand. Commissioning fine British craftsmanship brings together maker and patron in intimate dialogue.',
      'We open the workbenches of master saddlers cutting hand-pared bridle hides, Purdey and Holland gunmakers engraving custom lockplates, bespoke crystal houses sculpting commemorative decanters, and cabinetmakers laying book-matched walnut travel desks.',
      'From initial hand-drawn blueprints and hide samples brought to Albemarle Street through quarterly bench photographs to finished delivery inside bespoke brass-bound cases, we shepherd every millimeter cleanly.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg', caption: 'Devon oak-bark tanned hides paired with beeswaxed linen saddle stitches' },
      { image: '/assets/aistudio/savile_row_bespoke.jpg', caption: 'Monogrammed silk smoking jackets, travel blankets, and bespoke evening shirts' },
      { image: '/assets/aistudio/bond_street_jewellery.jpg', caption: 'Custom sterling barware and gold signet rings struck with family heritage dies' },
      { image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg', caption: 'Fitted oak-lined collector chests crafted precisely to mechanical calibre footprints' }
    ],
    operationalPhases: [
      { phase: '01 · Design Concept', title: 'Sketch, Swatch & Material Box', detail: 'Compare leather patinas, suede linings, brass castings, and engraving scripts at TGLC House.' },
      { phase: '02 · Bench Assignment', title: 'Pairing Master Workshops', detail: 'Commission individual Shropshire, Clerkenwell, Milan, or Birmingham heritage makers.' },
      { phase: '03 · Build Milestones', title: 'Progress Sightings & Fit Tests', detail: 'Track stitching counts, hinge tensions, and engraving proofs mid-way through crafting.' },
      { phase: '04 · Unveiling', title: 'Archival Box & Signed Ledger', detail: 'Deliver completed object accompanied by maker-signed certificate of crafting provenance.' }
    ],
    slaBenchmarks: [
      { label: 'Hide Tannage', value: '14-Mo Pit Oak', note: 'Traditional Devon vegetable hides' },
      { label: 'Hardware Quality', value: 'Solid Brass', note: 'Clerkenwell-machined locks & corners' },
      { label: 'Maker Lineage', value: '100% Bespoke', note: 'Signed maker provenance notes' }
    ],
    vettedPartners: [
      'Shropshire Master Bridle Trunk & Case Makers',
      'Clerkenwell Horological Cabinetmakers & Lock Smiths',
      'Birmingham Jewellery Quarter & Goldsmiths’ Engravers',
      'Stourbridge Hand-Cut Lead Crystal Glassblowers'
    ],
    extraPoints: [
      'Steamer trunks contoured down to exact Gulfstream cargo bay dimensions or vintage Bentley boot slopes',
      'Hand-marbled paper gaming chess sets and Connolly leather backgammon tournament cases'
    ],
    extraScenarios: [
      {
        title: 'Custom Biometric-Lock Watch Briefcase',
        description: 'Collector travelling monthly across continents needing unassuming leather attaché concealing six slots.',
        outcome: 'Machined fireproof internal steel frame wrapped invisibly inside classic dark-green bridle leather in nine weeks.'
      },
      {
        title: 'Three-Piece Bespoke Jaguar E-Type Boot Luggage',
        description: 'Matching weekender set filling irregular curved spare-wheel luggage well completely.',
        outcome: '3D-laser scanned vehicle boot; hand-stitched matched chestnut cases fitted seamlessly to corner.'
      }
    ],
    faqs: [
      { q: 'Can artisans visit my home or yacht to measure spaces directly?', a: 'Yes, master makers travel with physical templates and cardboard forms across London or continental airfields.' },
      { q: 'How subtle is personal monogramming on bespoke luggage?', a: 'Blind-debossed subtle initials inside internal strap tongues preserve complete exterior anonymity—or traditional gold leaf where requested.' },
      { q: 'Can you commission one-of-a-kind sporting shotguns or custom fishing rods?', a: 'Through St James’s legendary gunmakers and Hardy riverside rod builders, organizing stock measurements at local shooting grounds.' },
      { q: 'What guarantees cover lifelong thread or lock wear?', a: 'Original maker workshops service, re-condition wax leather hides, and tune mechanical clasps indefinitely.' }
    ]
  },

  'special-requests': {
    extendedOverview: [
      'Certain requests sit intentionally outside normal hospitality categories—securing an extinct architectural blueprint from a private Milan archive, arranging a specialist night sky astronomer atop an Oxfordshire barn, or matching two private orchestras simultaneously across London and New York.',
      'This desk thrives where standard search bars quit. Drawing on historians, investigative archivists, aerospace engineers, theatrical set builders, and quiet collectors worldwide, our research team tackles singular intellectual or operational puzzles head-on.',
      'Every briefing stays strictly confidential inside small, partner-checked circles under ironclad discretion until execution.'
    ],
    galleryImages: [
      { image: '/assets/aistudio/down_street_station_1794391687146.jpg', caption: 'Unlocking civic historic structures and closed wartime vaults for extraordinary moments' },
      { image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg', caption: 'Staging unique acoustic and architectural dinner settings under special permits' },
      { image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg', caption: 'High-speed night river extractions and custom maritime stunts cleared safely' },
      { image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg', caption: 'Restricted urban rooftop access cleared under structural safety certificates' }
    ],
    operationalPhases: [
      { phase: '01 · Feasibility Map', title: 'Legal, Safety & Ethical Check', detail: 'Evaluate regulatory clearances, civic permits, insurance underwriting, and honest viability within 24 hours.' },
      { phase: '02 · Specialist Assembly', title: 'Global Research & Fixers', detail: 'Tap archivists, structural engineers, private pilots, or antiquarians matched strictly to the riddle.' },
      { phase: '03 · Dry Rehearsal', title: 'Acoustic, Weather & Route Test', detail: 'Test tricky timings, sound cues, or boat tides prior to unveiling the experience.' },
      { phase: '04 · Clean Execution', title: 'Director on Station', detail: 'Senior TGLC leadership oversees live execution calmly until final clean departure.' }
    ],
    slaBenchmarks: [
      { label: 'Feasibility Turn', value: '< 24 hrs', note: 'Honest go / no-go tactical assessment' },
      { label: 'Global Fixers', value: '50+ Countries', note: 'Research, permits & specialist guilds' },
      { label: 'Ethics Line', value: '100% Lawful', note: 'Creative ambition within strict statute' }
    ],
    vettedPartners: [
      'Museum Archivists, Military Historians & Genealogists',
      'Marine Meteorology & Aviation Route Specialists',
      'Civic Location Permit & Theatrical Rigging Engineers',
      'Subterranean & Architectural Heritage Custodians'
    ],
    extraPoints: [
      'Zero judgmental curiosity: singular family obsessions receive thoughtful scholarship regardless of scale',
      'Direct private meteorology briefings ahead of offshore races, alpine flights, or open-air weddings'
    ],
    extraScenarios: [
      {
        title: '1974 Limited Architectural Folio & Original Ink Study',
        description: 'Tracking one of 100 signed Brutalist books worldwide before family architect retirement.',
        outcome: 'Located mint numbered folio via retired professor’s archive in Milan, shipped insulated to Mayfair in 5 days.'
      },
      {
        title: 'Private Night River Bascule Lift & Brass Fanfare',
        description: 'Commemorating maritime dynasty anniversary passing beneath Tower Bridge.',
        outcome: 'Timed statutory bridge lift with stealth river chase boats and enclosed river pier champagne greeting.'
      }
    ],
    faqs: [
      { q: 'Are there categories TGLC turns down outright?', a: 'Yes—anything unlawful, unsafe to staff or public infrastructure, exploitative, or breaching partner trust gets respectfully declined immediately.' },
      { q: 'How do unusual research investigations get priced?', a: 'Extensive multi-country archival legwork or complex theatrical permitting carries clear upfront estimate approval before costs accrue.' },
      { q: 'Can you help preserve privacy while hunting rare memorabilia or guitars anonymously?', a: 'Completely—acting purely as discreet blind bidder without signalling collector appetite to market brokers.' },
      { q: 'Can members pitch creative impossible ideas years ahead of landmark milestones?', a: 'Our favourite work starts twelve to eighteen months ahead, allowing time for genuine architectural craftsmanship.' }
    ]
  }
};
