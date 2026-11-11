import { SERVICES_DATA, CALENDAR_EVENTS, JOURNAL_ARTICLES, LONDON_NEIGHBOURHOODS, TEAM_MEMBERS } from '../data/tglcData';
import { GlobalSearchResult, SearchCategoryType, PageRoute } from '../types';

interface IndexItem {
  id: string;
  category: 'services' | 'journal' | 'calendar' | 'consortium';
  categoryLabel: string;
  title: string;
  subtitle: string;
  snippet: string;
  meta: string;
  targetRoute: PageRoute;
  routeParams?: {
    serviceId?: string;
    subServiceId?: string;
    articleSlug?: string;
  };
  keywords: string[];
  searchableContent: string;
}

// Build index once
const buildSearchIndex = (): IndexItem[] => {
  const items: IndexItem[] = [];

  // 1. Service Categories
  for (const cat of SERVICES_DATA) {
    items.push({
      id: `service-cat-${cat.id}`,
      category: 'services',
      categoryLabel: 'Core Service',
      title: cat.title,
      subtitle: cat.kicker,
      snippet: cat.shortDesc,
      meta: `Services · ${cat.subServices.length} Practices`,
      targetRoute: 'service-detail',
      routeParams: { serviceId: cat.id },
      keywords: [cat.title, cat.kicker, cat.tagline, ...cat.features],
      searchableContent: `${cat.title} ${cat.kicker} ${cat.tagline} ${cat.shortDesc} ${cat.overview} ${cat.features.join(' ')}`
    });

    // Sub-services
    for (const sub of cat.subServices) {
      items.push({
        id: `subservice-${cat.id}-${sub.id}`,
        category: 'services',
        categoryLabel: 'Sub-Practice',
        title: sub.title,
        subtitle: `${cat.title} · Practice`,
        snippet: sub.shortDesc,
        meta: `Practice · ${cat.title}`,
        targetRoute: 'subservice-detail',
        routeParams: { serviceId: cat.id, subServiceId: sub.id },
        keywords: [sub.title, cat.title, ...sub.detailedPoints],
        searchableContent: `${sub.title} ${sub.shortDesc} ${sub.leadParagraph} ${sub.detailedPoints.join(' ')} ${cat.title}`
      });
    }
  }

  // 2. Journal Articles
  for (const article of JOURNAL_ARTICLES) {
    items.push({
      id: `journal-${article.slug}`,
      category: 'journal',
      categoryLabel: 'Journal Dispatch',
      title: article.title,
      subtitle: article.subtitle,
      snippet: article.excerpt,
      meta: `Journal · ${article.category} · ${article.readTime}`,
      targetRoute: 'journal-article',
      routeParams: { articleSlug: article.slug },
      keywords: [article.title, article.subtitle, article.author, article.category, article.slug],
      searchableContent: `${article.title} ${article.subtitle} ${article.excerpt} ${article.author} ${article.category} ${article.contentParagraphs.join(' ')}`
    });
  }

  // 3. Calendar Events
  for (const event of CALENDAR_EVENTS) {
    items.push({
      id: `calendar-${event.id}`,
      category: 'calendar',
      categoryLabel: 'London Calendar',
      title: event.title,
      subtitle: `${event.location} · ${event.dates}`,
      snippet: event.description,
      meta: `Calendar · ${event.category} · ${event.neighbourhood}`,
      targetRoute: 'calendar',
      keywords: [event.title, event.location, event.neighbourhood, event.category, event.month, event.badge || ''],
      searchableContent: `${event.title} ${event.location} ${event.neighbourhood} ${event.category} ${event.description} ${event.curatorNote}`
    });
  }

  // 4. Consortium & Enclaves Pages
  items.push(
    {
      id: 'consortium-overview',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'The Consortium Overview',
      subtitle: 'London-based private lifestyle-management house',
      snippet: 'Discreet private network making complex lives feel effortless through refined judgement, relationships, and cultural understanding.',
      meta: 'Consortium · Institutional Overview',
      targetRoute: 'consortium',
      keywords: ['consortium', 'overview', 'advisory', 'london', 'king street', 'st james'],
      searchableContent: 'The Consortium Overview private concierge lifestyle management family office discretion'
    },
    {
      id: 'consortium-leadership',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Leadership & Senior Partners',
      subtitle: TEAM_MEMBERS.map(m => m.name).join(', '),
      snippet: 'The directors and partners guiding TGLC across London, Geneva, Monaco, New York, and Tokyo.',
      meta: 'Consortium · Leadership Dossiers',
      targetRoute: 'about',
      keywords: ['leadership', 'partners', ...TEAM_MEMBERS.map(m => m.name.toLowerCase())],
      searchableContent: `Leadership Senior Partners ${TEAM_MEMBERS.map(m => `${m.name} ${m.role} ${m.specialism} ${m.bio}`).join(' ')}`
    },
    {
      id: 'consortium-ethos',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Our Ethos & Principles',
      subtitle: 'Five foundational covenants of private service',
      snippet: 'Quiet Authority, Incorruptible Discretion, Depth of Access, Effortless Composure, and Cultural Range.',
      meta: 'Consortium · Ethos & Governance',
      targetRoute: 'ethos',
      keywords: ['ethos', 'principles', 'discretion', 'covenants', 'governance'],
      searchableContent: 'Our Ethos Five Principles Quiet Authority Incorruptible Discretion Depth of Access'
    },
    {
      id: 'consortium-approach',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Our Approach & Methodology',
      subtitle: 'Five-stage lifecycle of private advisory',
      snippet: 'Deep Discovery, Architectural Design, Seamless Execution, Continuous Refinement, and Sovereign Privacy.',
      meta: 'Consortium · Methodology',
      targetRoute: 'approach',
      keywords: ['approach', 'methodology', 'discovery', 'execution', 'process'],
      searchableContent: 'Our Approach Five-Stage Methodology Deep Discovery Architectural Design Seamless Execution'
    },
    {
      id: 'consortium-network',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'The TGLC Global Network',
      subtitle: 'London, Geneva, Monaco, New York, Milan, Dubai, Tokyo',
      snippet: 'Sovereign relationships across international financial and cultural capitals.',
      meta: 'Consortium · Global Enclaves',
      targetRoute: 'network',
      keywords: ['network', 'global', 'geneva', 'monaco', 'new york', 'milan', 'dubai', 'tokyo'],
      searchableContent: 'The TGLC Global Network London Geneva Monaco New York Milan Dubai Tokyo'
    },
    {
      id: 'consortium-privacy',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Privacy, Governance & Discretion',
      subtitle: 'Confidentiality protocols and non-disclosure standards',
      snippet: 'Institutional-grade discretion, zero marketing publicity, and air-gapped member communications.',
      meta: 'Consortium · Security & Trust',
      targetRoute: 'privacy-discretion',
      keywords: ['privacy', 'discretion', 'nda', 'confidentiality', 'security', 'governance'],
      searchableContent: 'Privacy Governance Discretion confidentiality non-disclosure air-gapped'
    },
    {
      id: 'consortium-membership',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Private Membership Tiers',
      subtitle: 'The London Membership, The Global Membership, The Private Office',
      snippet: 'Strictly capped invitations for discerning families, founders, executives, and family offices.',
      meta: 'Consortium · Membership Pathways',
      targetRoute: 'membership',
      keywords: ['membership', 'tiers', 'london member', 'global member', 'private office', 'admissions'],
      searchableContent: 'Membership Tiers The London Membership The Global Membership The Private Office admissions'
    },
    {
      id: 'consortium-sub-rosa',
      category: 'services',
      categoryLabel: 'Unlisted Access',
      title: 'Sub-Rosa London & Prime Access',
      subtitle: 'UFC Championship Ringside, Sold-Out Arenas & Vault Clubs',
      snippet: 'Front-row UFC cageside seats, Wembley Stadium and O2 Arena private suites, 300-year-old bank vault clubs, and midnight supercar runs.',
      meta: 'Unlisted · Sub-Rosa Network',
      targetRoute: 'hidden-london',
      keywords: ['ufc', 'ufc london', 'mma', 'fighting', 'boxing', 'concerts', 'stadium suites', 'wembley', 'o2 arena', 'vaults', 'speakeasy', 'sub-rosa', 'nightclubs', 'after hours', 'supercar run', 'royal albert hall'],
      searchableContent: 'Sub-Rosa London UFC fighting MMA championship ringside cageside sold-out concerts stadium suites Wembley O2 Arena subterranean bank vault speakeasies midnight supercar runs'
    },
    {
      id: 'consortium-commission-studio',
      category: 'services',
      categoryLabel: 'Interactive Studio',
      title: 'Private Commission Studio & Itinerary Engine',
      subtitle: 'Configure Bespoke Lifestyle Scenarios, Armoured Fleet & Protection',
      snippet: 'Interactive bespoke commission builder for Mayfair sartorial fittings, Thames stealth runs, UFC cageside suites, and RAF Northolt private charters.',
      meta: 'Studio · Bespoke Orchestration',
      targetRoute: 'commission-studio',
      keywords: ['studio', 'commission', 'itinerary', 'builder', 'planner', 'bespoke', 'dossier', 'manifest', 'stealth boat', 'cullinan', 'phantom', 'bunker', 'charter'],
      searchableContent: 'Commission Studio Bespoke Itinerary Engine Mayfair Savile Row Thames Stealth Run UFC cageside RAF Northolt Challenger 350 armoured fleet manifest dossier'
    },
    {
      id: 'consortium-portal',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Private Member Access Portal',
      subtitle: 'Direct member requests, itineraries, and live director messaging',
      snippet: 'Dedicated digital dossier for confirmed members, including ongoing itineraries, reservations, and lifestyle director contact.',
      meta: 'Portal · Member Suite',
      targetRoute: 'member-portal',
      keywords: ['member portal', 'portal', 'login', 'itinerary', 'concierge request', 'james ashford', 'camilla vance'],
      searchableContent: 'Private Member Access Portal itinerary concierge requests reservations dossier Camilla Vance-Moreau'
    },
    {
      id: 'consortium-contact',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Contact & TGLC House Enquiries',
      subtitle: '3rd Floor, 45 Albemarle Street, London W1S 4JL',
      snippet: 'Private introductions desk, confidential advisory consultations, Company No. 16831098, and emergency member line.',
      meta: 'Contact · Mayfair London W1S 4JL',
      targetRoute: 'contact',
      keywords: ['contact', 'address', 'telephone', 'albemarle street', 'mayfair', 'w1s 4jl', 'enquiries', 'phone', '020 3951 6369', '16831098'],
      searchableContent: 'Contact TGLC House 3rd Floor 45 Albemarle Street Mayfair London W1S 4JL telephone 020 3951 6369 company number 16831098 introductions'
    },
    {
      id: 'consortium-faqs',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Frequently Asked Questions',
      subtitle: 'Admissions, services scope, discretion, and member benefits',
      snippet: 'Detailed responses on membership criteria, emergency response, international coverage, and family office integrations.',
      meta: 'Advisory · FAQs',
      targetRoute: 'faq',
      keywords: ['faq', 'questions', 'answers', 'criteria', 'fees', 'scope'],
      searchableContent: 'Frequently Asked Questions admissions criteria services scope discretion international family office'
    }
  );

  // Add individual London enclaves / neighbourhoods
  for (const enclave of LONDON_NEIGHBOURHOODS) {
    items.push({
      id: `enclave-${enclave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'consortium',
      categoryLabel: 'London Enclave',
      title: `${enclave.name} Enclave`,
      subtitle: enclave.vibe,
      snippet: enclave.summary,
      meta: `Our London · ${enclave.name}`,
      targetRoute: 'our-london',
      keywords: [enclave.name, enclave.vibe, ...enclave.highlights],
      searchableContent: `${enclave.name} ${enclave.vibe} ${enclave.summary} ${enclave.highlights.join(' ')}`
    });
  }

  return items;
};

const SEARCH_INDEX = buildSearchIndex();

// Clean string for matching
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

/**
 * Searches the TGLC global index with relevance scoring.
 */
export function searchTGLC(query: string, category: SearchCategoryType = 'all'): GlobalSearchResult[] {
  const trimmed = query.trim();

  // If empty query, return curated highlights
  if (!trimmed) {
    return getCuratedEditorialSuggestions(category);
  }

  const normalizedQuery = normalize(trimmed);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) {
    return getCuratedEditorialSuggestions(category);
  }

  const results: { item: IndexItem; score: number }[] = [];

  for (const item of SEARCH_INDEX) {
    if (category !== 'all' && item.category !== category) {
      continue;
    }

    const normTitle = normalize(item.title);
    const normSubtitle = normalize(item.subtitle);
    const normContent = normalize(item.searchableContent);

    let score = 0;

    // Exact title phrase match
    if (normTitle === normalizedQuery) {
      score += 150;
    } else if (normTitle.startsWith(normalizedQuery)) {
      score += 100;
    } else if (normTitle.includes(normalizedQuery)) {
      score += 70;
    }

    // Subtitle phrase match
    if (normSubtitle.includes(normalizedQuery)) {
      score += 40;
    }

    // Token matching across title, keywords, and content
    let allTokensFound = true;
    for (const token of queryTokens) {
      const inTitle = normTitle.includes(token);
      const inSubtitle = normSubtitle.includes(token);
      const inKeywords = item.keywords.some(k => normalize(k).includes(token));
      const inContent = normContent.includes(token);

      if (inTitle) {
        score += 35;
      } else if (inKeywords) {
        score += 25;
      } else if (inSubtitle) {
        score += 15;
      } else if (inContent) {
        score += 8;
      } else {
        allTokensFound = false;
      }
    }

    // Boost if all multi-word tokens are present
    if (queryTokens.length > 1 && allTokensFound) {
      score += 50;
    }

    if (score > 0) {
      results.push({ item, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 16).map(({ item }) => ({
    id: item.id,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    subtitle: item.subtitle,
    snippet: item.snippet,
    meta: item.meta,
    targetRoute: item.targetRoute,
    routeParams: item.routeParams
  }));
}

/**
 * Returns curated editorial suggestions when query is empty.
 */
export function getCuratedEditorialSuggestions(category: SearchCategoryType = 'all'): GlobalSearchResult[] {
  const curatedIds: string[] = [
    'subservice-travel-aviation-private-aviation',
    'subservice-dining-nightlife-london-dining',
    'journal-the-new-rules-of-discreet-travel',
    'journal-a-private-guide-to-london-after-dark',
    'journal-the-art-of-the-perfect-london-weekend',
    'calendar-cal-01',
    'calendar-cal-02',
    'enclave-mayfair-st-james-s',
    'consortium-overview',
    'consortium-leadership'
  ];

  const matched = SEARCH_INDEX.filter(item => {
    if (category !== 'all' && item.category !== category) return false;
    return curatedIds.includes(item.id);
  });

  return matched.map(item => ({
    id: item.id,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    subtitle: item.subtitle,
    snippet: item.snippet,
    meta: item.meta,
    targetRoute: item.targetRoute,
    routeParams: item.routeParams
  }));
}
