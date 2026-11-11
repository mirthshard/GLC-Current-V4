export type PageRoute =
  | 'home'
  | 'consortium'
  | 'about'
  | 'ethos'
  | 'approach'
  | 'network'
  | 'our-london'
  | 'privacy-discretion'
  | 'services'
  | 'service-detail' // requires serviceId
  | 'subservice-detail' // requires serviceId & subServiceId
  | 'membership'
  | 'commission-studio' // Interactive Lifestyle Commission & Itinerary Studio
  | 'case-studies' // Curated Portfolio of 20+ Signature Itineraries & Case Studies
  | 'calendar'
  | 'journal'
  | 'journal-article' // requires articleSlug
  | 'member-portal'
  | 'contact'
  | 'faq'
  | 'hidden-london'
  | 'hidden-london-subterranean'
  | 'hidden-london-industrial'
  | 'hidden-london-combat'
  | 'hidden-london-gaming'
  | 'hidden-london-maritime'
  | 'hidden-london-gastronomy'
  | 'hidden-london-exploration'
  | 'hidden-london-after-hours'
  | 'hidden-london-urban-clubs'
  | 'hidden-london-itinerary'
  | 'privacy-policy'
  | 'terms'
  | 'cookie-policy'
  | 'accessibility'
  | 'image-credits'
  | 'sitemap'
  | 'not-found';

export type SearchCategoryType = 'all' | 'services' | 'journal' | 'calendar' | 'consortium';

export interface GlobalSearchResult {
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
}

export interface RouteState {
  page: PageRoute;
  serviceId?: string;
  subServiceId?: string;
  articleSlug?: string;
  categoryFilter?: string;
  subSection?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  title: string;
  bio: string;
  specialism: string;
  location: string;
  image: string;
}

export interface SubService {
  id: string;
  title: string;
  shortDesc: string;
  leadParagraph: string;
  extendedOverview?: string[];
  detailedPoints: string[];
  keyScenarios: {
    title: string;
    description: string;
    outcome: string;
  }[];
  image: string;
  galleryImages?: { image: string; caption: string }[];
  operationalPhases?: { phase: string; title: string; detail: string }[];
  slaBenchmarks?: { label: string; value: string; note: string }[];
  vettedPartners?: string[];
  faqs?: { q: string; a: string }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  kicker: string;
  tagline: string;
  shortDesc: string;
  overview: string;
  heroImage: string;
  galleryImages: string[];
  galleryCaptions?: string[];
  deliveryMetrics?: { label: string; metric: string }[];
  subServices: SubService[];
  features: string[];
  memberScenario: {
    client: string;
    brief: string;
    solution: string;
    details: string;
  };
  faqs: { question: string; answer: string }[];
  regulatoryNote?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'Art & Culture' | 'Dining' | 'Fashion' | 'Music' | 'Sport' | 'Family' | 'London After Dark' | 'Private Invitations';
  dates: string;
  month: string;
  day: number;
  location: string;
  neighbourhood: string;
  description: string;
  curatorNote: string;
  isPrivateInvitation?: boolean;
  image: string;
  badge?: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: 'London Intelligence' | 'Travel Notes' | 'The Cultural Edit' | 'Dining & Entertaining' | 'Private Residences' | 'Objects of Desire' | 'Member Stories';
  articleType?: 'News Dispatch' | 'Event Briefing' | 'Feature Essay' | 'Field Report';
  eventDates?: string;
  venueNote?: string;
  keyTakeaways?: string[];
  pullStats?: { value: string; label: string }[];
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  excerpt: string;
  heroImage: string;
  pullQuote?: string;
  contentParagraphs: string[];
  editorialImages?: string[];
  editorialCaptions?: string[];
  subheadings?: { title: string; paragraphs: string[] }[];
}

export interface MemberProfile {
  id: string;
  name: string;
  tier: 'The London Membership' | 'The Global Membership' | 'The Private Office';
  memberSince: string;
  lifestyleManager: {
    name: string;
    role: string;
    image: string;
    phone: string;
    email: string;
  };
  upcomingItinerary: {
    destination: string;
    dates: string;
    flightDetails: string;
    accommodation: string;
    keyArrangements: string[];
    chauffeurStatus: string;
  };
  upcomingArrangements: {
    date: string;
    time: string;
    venue: string;
    type: string;
    details: string;
    status: 'Confirmed' | 'Discreet Preparation' | 'In Progress';
  }[];
  activeRequests: {
    id: string;
    title: string;
    category: string;
    submittedDate: string;
    status: 'Assigned to Manager' | 'Sourcing Options' | 'Confirmed';
    notes: string;
  }[];
  savedPreferences: {
    preferredAirlines: string[];
    hotelStyle: string;
    dietaryNotes: string;
    vehiclePreference: string;
    preferredContact: string;
    confidentialityLevel: string;
  };
}

export interface FAQItem {
  id: string;
  category: 'Membership' | 'Services & Scope' | 'Discretion & Privacy' | 'International' | 'Family & Private Office' | 'Admissions';
  question: string;
  answer: string;
}
