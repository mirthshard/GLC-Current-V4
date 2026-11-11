import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES_DATA, CALENDAR_EVENTS, JOURNAL_ARTICLES, FAQS_DATA, TGLC_CONTACT } from '../data/tglcData';

test('TGLC Contact information integrity', () => {
  assert.equal(TGLC_CONTACT.telephone, '020 3951 6369');
  assert.equal(TGLC_CONTACT.privateMemberLine, '020 3951 6369');
  assert.equal(TGLC_CONTACT.companyNumber, '16831098');
  assert.equal(TGLC_CONTACT.email, 'info@thegloballuxuryconsortium.com');
  assert.equal(TGLC_CONTACT.memberSupport, 'info@thegloballuxuryconsortium.com');
  assert.ok(TGLC_CONTACT.address.toString().includes('3rd Floor, 45 Albemarle Street'));
  assert.ok(TGLC_CONTACT.address.toString().includes('W1S 4JL'));
});

test('Services dataset has all 7 required core categories', () => {
  assert.equal(SERVICES_DATA.length, 7);
  
  const expectedCategoryIds = [
    'travel-aviation',
    'dining-nightlife',
    'experiences-culture',
    'residences-relocation',
    'transport-security',
    'personal-private-office',
    'luxury-sourcing'
  ];

  for (const id of expectedCategoryIds) {
    const found = SERVICES_DATA.find((s) => s.id === id);
    assert.ok(found, `Category ${id} should exist in SERVICES_DATA`);
    assert.ok(found.subServices.length >= 5, `Category ${id} should have at least 5 sub-services`);
  }
});

test('Total distinct sub-practices exceed 35 across categories', () => {
  const totalSubServices = SERVICES_DATA.reduce((acc, cat) => acc + cat.subServices.length, 0);
  assert.ok(totalSubServices >= 35, `Expected at least 35 sub-services, found ${totalSubServices}`);
});

test('London Calendar has at least 18 events with proper categorization', () => {
  assert.ok(CALENDAR_EVENTS.length >= 18, `Expected at least 18 calendar events, found ${CALENDAR_EVENTS.length}`);
  
  for (const event of CALENDAR_EVENTS) {
    assert.ok(event.id, 'Event must have an id');
    assert.ok(event.title, 'Event must have a title');
    assert.ok(event.dates, 'Event must have dates');
    assert.ok(event.location, 'Event must have a location');
  }
});

test('Journal has at least 12 complete article previews and valid slugs', () => {
  assert.ok(JOURNAL_ARTICLES.length >= 12, `Expected at least 12 journal articles, found ${JOURNAL_ARTICLES.length}`);
  
  const slugs = new Set<string>();
  for (const article of JOURNAL_ARTICLES) {
    assert.ok(article.slug, 'Article must have a slug');
    assert.ok(!slugs.has(article.slug), `Duplicate slug found: ${article.slug}`);
    slugs.add(article.slug);
    assert.ok(article.contentParagraphs.length >= 3, `Article ${article.slug} must have detailed paragraphs`);
  }
});

test('FAQ dataset has at least 18 questions across standard categories', () => {
  assert.ok(FAQS_DATA.length >= 18, `Expected at least 18 FAQs, found ${FAQS_DATA.length}`);
});
