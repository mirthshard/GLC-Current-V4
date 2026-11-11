import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterLondonLocations,
  getNeighborhoodCounts,
  getCategoryCounts,
  findVenueBySlug,
  getDistrictFocusViewBox,
  LondonVenue,
} from './londonLocations';

const MOCK_VENUES: LondonVenue[] = [
  {
    id: 'tglc-house',
    slug: 'tglc-house-albemarle-street',
    name: 'TGLC House — Albemarle Street',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Dining & Private Clubs',
    address: '3rd Floor, 45 Albemarle Street, Mayfair',
    postcode: 'W1S 4JL',
    coordinates: { x: 476, y: 274 },
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    galleryImages: [],
    tagline: 'Private headquarters and member salons',
    summary: 'The historic headquarters of The Global Luxury Consortium.',
    curatorNotes: 'Discreet third-floor Mayfair entrance.',
    tglcPrivileges: ['Private library salons', 'Discreet courier drops'],
    recommendedSeason: 'Year-round',
    insiderTip: 'Lift access to third-floor reception.',
    closestSanctuary: 'Green Park & Burlington Gardens',
  },
  {
    id: 'selfridges-wonder-room',
    slug: 'selfridges-wonder-room',
    name: 'Selfridges — The Wonder Room',
    neighborhood: 'Marylebone',
    districtKey: 'marylebone-oxford',
    districtName: 'Marylebone & Oxford Street',
    category: 'Horology & Jewellery',
    address: '400 Oxford Street',
    postcode: 'W1A 1AB',
    coordinates: { x: 470, y: 210 },
    image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    galleryImages: [],
    tagline: 'Premier haute horology and high jewellery destination',
    summary: 'Home to rare watchmakers and high jewellery salons.',
    curatorNotes: 'Private VIP salon on Duke Street.',
    tglcPrivileges: ['Private penthouse access', 'After-hours vault showings'],
    recommendedSeason: 'Autumn / Winter',
    insiderTip: 'Direct private elevator from Duke Street.',
    closestSanctuary: 'Manchester Square Garden',
  },
  {
    id: 'harrods-penthouse',
    slug: 'harrods-penthouse',
    name: 'Harrods — Penthouse Private Shopping Suite',
    neighborhood: 'Knightsbridge',
    districtKey: 'knightsbridge-belgravia',
    districtName: 'Knightsbridge & Belgravia',
    category: 'Department Stores & Penthouse Salons',
    address: '87–135 Brompton Road',
    postcode: 'SW1X 7XL',
    coordinates: { x: 390, y: 350 },
    image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
    galleryImages: [],
    tagline: 'Discreet private styling suites and fine watch rooms',
    summary: 'Harrods private shopping enclave away from the crowds.',
    curatorNotes: 'Direct private parking and lift.',
    tglcPrivileges: ['Dedicated wardrobe curators', 'Rare champagne service'],
    recommendedSeason: 'Pre-gala season',
    insiderTip: 'Enter via Hans Crescent.',
    closestSanctuary: 'Hyde Park South Gates',
  },
  {
    id: 'wimbledon-aelte',
    slug: 'wimbledon-aelte',
    name: 'All England Lawn Tennis Club',
    neighborhood: 'Wimbledon',
    districtKey: 'wimbledon-richmond',
    districtName: 'Wimbledon & South West London',
    category: 'Sporting Heritage',
    address: 'Church Road, Wimbledon',
    postcode: 'SW19 5AE',
    coordinates: { x: 230, y: 510 },
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    galleryImages: [],
    tagline: 'Centre Court debenture hospitality and lawn dining',
    summary: 'The historic epicentre of world lawn tennis.',
    curatorNotes: 'Rosewater Pavilion and Debenture access.',
    tglcPrivileges: ['Centre Court prime allocation', 'Helicopter transfer from Battersea'],
    recommendedSeason: 'July Championship Fortnight',
    insiderTip: 'Arrive early for private lawn lunch.',
    closestSanctuary: 'Wimbledon Common Walks',
  },
];

test('filterLondonLocations returns all venues when filters are empty or all', () => {
  const result = filterLondonLocations(MOCK_VENUES, {});
  assert.equal(result.length, 4);

  const resultAll = filterLondonLocations(MOCK_VENUES, { districtKey: 'all', category: 'all' });
  assert.equal(resultAll.length, 4);
});

test('filterLondonLocations filters by districtKey accurately', () => {
  const result = filterLondonLocations(MOCK_VENUES, { districtKey: 'mayfair-stjames' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'tglc-house');
});

test('filterLondonLocations filters by category accurately', () => {
  const result = filterLondonLocations(MOCK_VENUES, { category: 'Horology & Jewellery' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'selfridges-wonder-room');
});

test('filterLondonLocations searches across name, privileges, address, and notes', () => {
  const queryResult = filterLondonLocations(MOCK_VENUES, { query: 'debenture' });
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].id, 'wimbledon-aelte');

  const watchResult = filterLondonLocations(MOCK_VENUES, { query: 'vault' });
  assert.equal(watchResult.length, 1);
  assert.equal(watchResult[0].id, 'selfridges-wonder-room');
});

test('getNeighborhoodCounts and getCategoryCounts calculate distribution accurately', () => {
  const nCounts = getNeighborhoodCounts(MOCK_VENUES);
  assert.equal(nCounts['all'], 4);
  assert.equal(nCounts['mayfair-stjames'], 1);
  assert.equal(nCounts['marylebone-oxford'], 1);
  assert.equal(nCounts['wimbledon-richmond'], 1);

  const cCounts = getCategoryCounts(MOCK_VENUES);
  assert.equal(cCounts['all'], 4);
  assert.equal(cCounts['Sporting Heritage'], 1);
});

test('findVenueBySlug finds venue by slug and id', () => {
  const found = findVenueBySlug(MOCK_VENUES, 'harrods-penthouse');
  assert.ok(found);
  assert.equal(found?.name, 'Harrods — Penthouse Private Shopping Suite');

  const missing = findVenueBySlug(MOCK_VENUES, 'unknown-venue');
  assert.equal(missing, undefined);
});

test('getDistrictFocusViewBox returns correct coordinates and default for unknown', () => {
  const mayfairBox = getDistrictFocusViewBox('mayfair-stjames');
  assert.equal(mayfairBox.x, 380);
  assert.equal(mayfairBox.width, 320);

  const defaultBox = getDistrictFocusViewBox('unknown');
  assert.equal(defaultBox.width, 1000);
  assert.equal(defaultBox.height, 600);
});
