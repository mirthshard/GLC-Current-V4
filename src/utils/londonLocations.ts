export interface LondonVenue {
  id: string;
  slug: string;
  name: string;
  neighborhood: string;
  districtKey: 'mayfair-stjames' | 'knightsbridge-belgravia' | 'marylebone-oxford' | 'chelsea-southken' | 'soho-fitzrovia' | 'city-shoreditch' | 'wimbledon-richmond';
  districtName: string;
  category: 'Horology & Jewellery' | 'Department Stores & Penthouse Salons' | 'Dining & Private Clubs' | 'Arts & Antiquities' | 'Sporting Heritage' | 'Private Residences & Mews';
  address: string;
  postcode: string;
  coordinates: { x: number; y: number }; // Relative SVG map coordinates (0-1000, 0-600)
  image: string;
  galleryImages: string[];
  tagline: string;
  summary: string;
  curatorNotes: string;
  tglcPrivileges: string[];
  recommendedSeason: string;
  insiderTip: string;
  closestSanctuary: string;
}

export interface LocationFilterOptions {
  districtKey?: string;
  category?: string;
  query?: string;
}

export function filterLondonLocations(venues: LondonVenue[], options: LocationFilterOptions = {}): LondonVenue[] {
  const { districtKey, category, query } = options;
  const cleanQuery = query?.trim().toLowerCase();

  return venues.filter((venue) => {
    if (districtKey && districtKey !== 'all' && venue.districtKey !== districtKey) {
      return false;
    }
    if (category && category !== 'all' && venue.category !== category) {
      return false;
    }
    if (cleanQuery) {
      const haystack = [
        venue.name,
        venue.neighborhood,
        venue.districtName,
        venue.category,
        venue.address,
        venue.tagline,
        venue.summary,
        venue.curatorNotes,
        venue.insiderTip,
        ...venue.tglcPrivileges
      ].join(' ').toLowerCase();

      if (!haystack.includes(cleanQuery)) {
        return false;
      }
    }
    return true;
  });
}

export function getNeighborhoodCounts(venues: LondonVenue[]): Record<string, number> {
  const counts: Record<string, number> = { all: venues.length };
  for (const v of venues) {
    counts[v.districtKey] = (counts[v.districtKey] || 0) + 1;
  }
  return counts;
}

export function getCategoryCounts(venues: LondonVenue[]): Record<string, number> {
  const counts: Record<string, number> = { all: venues.length };
  for (const v of venues) {
    counts[v.category] = (counts[v.category] || 0) + 1;
  }
  return counts;
}

export function findVenueBySlug(venues: LondonVenue[], slug: string): LondonVenue | undefined {
  return venues.find((v) => v.slug === slug || v.id === slug);
}

export function getDistrictFocusViewBox(districtKey: string): { x: number; y: number; width: number; height: number } {
  switch (districtKey) {
    case 'mayfair-stjames':
      return { x: 380, y: 190, width: 320, height: 260 };
    case 'knightsbridge-belgravia':
      return { x: 260, y: 260, width: 340, height: 260 };
    case 'marylebone-oxford':
      return { x: 360, y: 130, width: 340, height: 260 };
    case 'chelsea-southken':
      return { x: 200, y: 310, width: 360, height: 270 };
    case 'soho-fitzrovia':
      return { x: 470, y: 170, width: 320, height: 250 };
    case 'city-shoreditch':
      return { x: 620, y: 140, width: 340, height: 270 };
    case 'wimbledon-richmond':
      return { x: 80, y: 360, width: 380, height: 240 };
    default:
      return { x: 0, y: 0, width: 1000, height: 600 };
  }
}
