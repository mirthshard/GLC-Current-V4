import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getBreadcrumbsForRoute, getBackLinkForRoute } from '../../utils/breadcrumb';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const BreadcrumbNav: React.FC = () => {
  const { route, navigateTo } = useNavigation();

  const crumbs = getBreadcrumbsForRoute(route);
  const backLink = getBackLinkForRoute(route);

  if (!crumbs || crumbs.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Location context"
      className="pt-[68px] sm:pt-[76px] bg-[#0B0C10] border-b border-[#22242C] text-[#F4F1EA]"
    >
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4"
      >
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs tracking-[0.04em] font-medium">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <li key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#4A453F] text-[10px] select-none">
                      /
                    </span>
                  )}
                  {isLast || !crumb.route ? (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className="text-[#F4F1EA] font-normal truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => navigateTo(crumb.route!, crumb.params)}
                      className="text-[#CFA85E] hover:text-[#F4F1EA] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C4933F] whitespace-nowrap"
                    >
                      {crumb.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {backLink && (
          <button
            onClick={() => navigateTo(backLink.route, backLink.params)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-wide text-[#9C968A] hover:text-[#CFA85E] transition-colors shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C4933F] whitespace-nowrap"
            aria-label={backLink.label}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C4933F]" aria-hidden="true" />
            <span>{backLink.label}</span>
          </button>
        )}
      </motion.div>
    </aside>
  );
};
