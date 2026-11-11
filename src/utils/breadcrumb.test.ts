import test from 'node:test';
import assert from 'node:assert/strict';
import { getBreadcrumbsForRoute, getBackLinkForRoute } from './breadcrumb';

test('getBreadcrumbsForRoute returns null for home page', () => {
  const crumbs = getBreadcrumbsForRoute({ page: 'home' });
  assert.equal(crumbs, null);
});

test('getBreadcrumbsForRoute returns correct trail for service category page', () => {
  const crumbs = getBreadcrumbsForRoute({ page: 'service-detail', serviceId: 'travel-aviation' });
  assert.ok(crumbs, 'Expected breadcrumbs for service-detail');
  assert.equal(crumbs.length, 3);
  assert.equal(crumbs[0].label, 'Home');
  assert.equal(crumbs[1].label, 'Services');
  assert.equal(crumbs[2].label, 'Travel & Aviation');
  assert.equal(crumbs[2].isCurrent, true);

  const backLink = getBackLinkForRoute({ page: 'service-detail', serviceId: 'travel-aviation' });
  assert.ok(backLink);
  assert.equal(backLink.route, 'services');
});

test('getBreadcrumbsForRoute returns correct trail for subservice practice page', () => {
  const crumbs = getBreadcrumbsForRoute({
    page: 'subservice-detail',
    serviceId: 'travel-aviation',
    subServiceId: 'private-aviation'
  });
  assert.ok(crumbs, 'Expected breadcrumbs for subservice-detail');
  assert.equal(crumbs.length, 4);
  assert.equal(crumbs[0].label, 'Home');
  assert.equal(crumbs[1].label, 'Services');
  assert.equal(crumbs[2].label, 'Travel & Aviation');
  assert.equal(crumbs[2].route, 'service-detail');
  assert.deepEqual(crumbs[2].params, { serviceId: 'travel-aviation' });
  assert.equal(crumbs[3].label, 'Private Aviation');
  assert.equal(crumbs[3].isCurrent, true);

  const backLink = getBackLinkForRoute({
    page: 'subservice-detail',
    serviceId: 'travel-aviation',
    subServiceId: 'private-aviation'
  });
  assert.ok(backLink);
  assert.equal(backLink.label, 'Back to Travel & Aviation');
  assert.equal(backLink.route, 'service-detail');
});

test('getBreadcrumbsForRoute returns correct trail for journal article page', () => {
  const crumbs = getBreadcrumbsForRoute({
    page: 'journal-article',
    articleSlug: 'a-private-guide-to-london-after-dark'
  });
  assert.ok(crumbs, 'Expected breadcrumbs for journal-article');
  assert.equal(crumbs.length, 4);
  assert.equal(crumbs[0].label, 'Home');
  assert.equal(crumbs[1].label, 'Journal');
  assert.equal(crumbs[2].label, 'London Intelligence');
  assert.equal(crumbs[3].label, 'A Private Guide to London After Dark');
  assert.equal(crumbs[3].isCurrent, true);

  const backLink = getBackLinkForRoute({
    page: 'journal-article',
    articleSlug: 'a-private-guide-to-london-after-dark'
  });
  assert.ok(backLink);
  assert.equal(backLink.label, 'Return to Journal');
  assert.equal(backLink.route, 'journal');
});

test('getBreadcrumbsForRoute returns trail for services and journal index pages', () => {
  const serviceCrumbs = getBreadcrumbsForRoute({ page: 'services' });
  assert.ok(serviceCrumbs);
  assert.equal(serviceCrumbs.length, 2);
  assert.equal(serviceCrumbs[1].isCurrent, true);

  const journalCrumbs = getBreadcrumbsForRoute({ page: 'journal' });
  assert.ok(journalCrumbs);
  assert.equal(journalCrumbs.length, 2);
  assert.equal(journalCrumbs[1].isCurrent, true);
});
