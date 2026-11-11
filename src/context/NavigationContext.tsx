import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageRoute, RouteState } from '../types';

interface NavigationContextType {
  route: RouteState;
  navigateTo: (page: PageRoute, params?: Partial<Omit<RouteState, 'page'>>) => void;
  isIntroModalOpen: boolean;
  introModalInterest: string;
  openIntroductionModal: (interest?: string) => void;
  closeIntroductionModal: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  cookieConsent: boolean | null;
  setCookieConsent: (consent: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => {
    // Parse initial hash if present
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('service/')) {
      const parts = hash.split('/');
      return { page: parts[2] ? 'subservice-detail' : 'service-detail', serviceId: parts[1], subServiceId: parts[2] };
    }
    if (hash.startsWith('article/')) {
      return { page: 'journal-article', articleSlug: hash.replace('article/', '') };
    }
    if (hash === 'the-consortium' || hash === 'consortium') return { page: 'consortium' };
    if (hash === 'about') return { page: 'about' };
    if (hash === 'ethos') return { page: 'ethos' };
    if (hash === 'approach') return { page: 'approach' };
    if (hash === 'network') return { page: 'network' };
    if (hash === 'our-london') return { page: 'our-london' };
    if (hash === 'privacy-discretion' || hash === 'privacy') return { page: 'privacy-discretion' };
    if (hash === 'services') return { page: 'services' };
    if (hash === 'membership') return { page: 'membership' };
    if (hash === 'commission-studio' || hash === 'studio') return { page: 'commission-studio' };
    if (hash === 'case-studies' || hash === 'itineraries' || hash === 'portfolio') return { page: 'case-studies' };
    if (hash === 'calendar') return { page: 'calendar' };
    if (hash === 'journal') return { page: 'journal' };
    if (hash === 'member-portal' || hash === 'portal') return { page: 'member-portal' };
    if (hash === 'hidden-london' || hash === 'sub-rosa') return { page: 'hidden-london' };
    if (hash === 'hidden-london-subterranean' || hash === 'sub-rosa/subterranean') return { page: 'hidden-london-subterranean' };
    if (hash === 'hidden-london-industrial' || hash === 'sub-rosa/industrial') return { page: 'hidden-london-industrial' };
    if (hash === 'hidden-london-combat' || hash === 'sub-rosa/combat') return { page: 'hidden-london-combat' };
    if (hash === 'hidden-london-gaming' || hash === 'sub-rosa/gaming') return { page: 'hidden-london-gaming' };
    if (hash === 'hidden-london-maritime' || hash === 'sub-rosa/maritime') return { page: 'hidden-london-maritime' };
    if (hash === 'hidden-london-gastronomy' || hash === 'sub-rosa/gastronomy') return { page: 'hidden-london-gastronomy' };
    if (hash === 'hidden-london-exploration' || hash === 'sub-rosa/exploration') return { page: 'hidden-london-exploration' };
    if (hash === 'hidden-london-after-hours' || hash === 'sub-rosa/after-hours') return { page: 'hidden-london-after-hours' };
    if (hash === 'hidden-london-urban-clubs' || hash === 'sub-rosa/urban-clubs') return { page: 'hidden-london-urban-clubs' };
    if (hash === 'hidden-london-itinerary' || hash === 'sub-rosa/itinerary') return { page: 'hidden-london-itinerary' };
    if (hash === 'contact') return { page: 'contact' };
    if (hash === 'faq') return { page: 'faq' };
    if (hash === 'privacy-policy') return { page: 'privacy-policy' };
    if (hash === 'terms') return { page: 'terms' };
    if (hash === 'cookie-policy') return { page: 'cookie-policy' };
    if (hash === 'accessibility') return { page: 'accessibility' };
    if (hash === 'image-credits') return { page: 'image-credits' };
    if (hash === 'sitemap') return { page: 'sitemap' };
    return { page: 'home' };
  });

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [introModalInterest, setIntroModalInterest] = useState('General Membership & Advisory');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cookieConsent, setCookieConsentState] = useState<boolean | null>(() => {
    try {
      const stored = localStorage.getItem('tglc_cookie_consent');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setCookieConsent = (consent: boolean) => {
    setCookieConsentState(consent);
    try {
      localStorage.setItem('tglc_cookie_consent', JSON.stringify(consent));
    } catch {
      // ignore
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsIntroModalOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const navigateTo = (page: PageRoute, params?: Partial<Omit<RouteState, 'page'>>) => {
    const newState: RouteState = { page, ...params };
    setRoute(newState);
    setIsSearchOpen(false);
    setIsIntroModalOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Update URL hash cleanly
    let hash: string = page;
    if (page === 'service-detail' && params?.serviceId) {
      hash = `service/${params.serviceId}`;
      if (params.subServiceId) hash += `/${params.subServiceId}`;
    } else if (page === 'subservice-detail' && params?.serviceId && params?.subServiceId) {
      hash = `service/${params.serviceId}/${params.subServiceId}`;
    } else if (page === 'journal-article' && params?.articleSlug) {
      hash = `article/${params.articleSlug}`;
    } else if (page === 'home') {
      hash = '';
    }
    
    if (hash) {
      window.history.pushState(null, '', `#${hash}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route.page, route.serviceId, route.subServiceId, route.articleSlug]);

  const openIntroductionModal = (interest?: string) => {
    if (interest) setIntroModalInterest(interest);
    setIsSearchOpen(false);
    setIsIntroModalOpen(true);
  };

  const closeIntroductionModal = () => {
    setIsIntroModalOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('service/')) {
        const parts = hash.split('/');
        setRoute({ page: parts[2] ? 'subservice-detail' : 'service-detail', serviceId: parts[1], subServiceId: parts[2] });
      } else if (hash.startsWith('article/')) {
        setRoute({ page: 'journal-article', articleSlug: hash.replace('article/', '') });
      } else if (hash) {
        setRoute({ page: hash as PageRoute });
      } else {
        setRoute({ page: 'home' });
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      // Quick slash key when not in an input/textarea/select
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        route,
        navigateTo,
        isIntroModalOpen,
        introModalInterest,
        openIntroductionModal,
        closeIntroductionModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        cookieConsent,
        setCookieConsent
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
