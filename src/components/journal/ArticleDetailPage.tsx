import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { JOURNAL_ARTICLES, TEAM_MEMBERS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowLeft, ArrowUpRight, Calendar } from 'lucide-react';

interface ArticleDetailPageProps {
  articleSlug?: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleSlug }) => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  const article = JOURNAL_ARTICLES.find((a) => a.slug === articleSlug) || JOURNAL_ARTICLES[0];
  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const matchingTeam = TEAM_MEMBERS.find((m) => article.author.includes(m.name));

  const editorialGallery =
    article.editorialImages && article.editorialImages.length >= 3
      ? article.editorialImages
      : [
          article.editorialImages?.[0] || '/assets/aistudio/tglc_st_james_salon.jpg',
          article.editorialImages?.[1] || '/assets/aistudio/savile_row_bespoke.jpg',
          '/assets/aistudio/bond_street_jewellery.jpg',
          '/assets/aistudio/mayfair_fine_dining.jpg',
        ];

  const captions = article.editorialCaptions || [
    `Inside one of the private salons documented for our ${article.category} archive.`,
    `Evening details photographed during preparation for visiting TGLC principals.`,
    `Behind the scenes with the custodians, hosts, and specialists leading the evening.`,
    `Final late-night departure staging arranged discreetly from private rear entrances.`,
  ];

  const widePlate = editorialGallery[0];
  const firstDiptych = editorialGallery.slice(1, 3);
  const secondaryPlates = editorialGallery.slice(3);

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] pt-6 sm:pt-8 pb-16 overflow-x-clip">
      {/* Scroll-linked Top Reading Progress Bar (Compositor scaleX) */}
      <motion.div
        style={{ scaleX }}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#E2BA6B] origin-left z-50 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-9">
        {/* Return Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#20232E] pb-4">
          <button
            type="button"
            onClick={() => navigateTo('journal')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Journal</span>
          </button>

          <div className="tglc-meta flex flex-wrap items-center gap-2.5 text-[11px]">
            <span className="text-[#E2BA6B] uppercase tracking-wider">
              {article.articleType || 'Feature Essay'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-[#E2BA6B]">{editorialGallery.length + 1} Photographs</span>
          </div>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0.88, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-4xl"
        >
          <span className="tglc-kicker block">
            {article.articleType || 'Feature Essay'} · {article.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#FAF7F0] leading-[1.08] text-balance">
            {article.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-1 tglc-meta flex flex-wrap items-center gap-2.5 text-xs">
            <span>
              By <strong className="text-[#FAF7F0] font-medium">{article.author}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E2BA6B]">{article.authorRole}</span>
          </div>
        </motion.header>

        {/* Full-Width 16:9 Hero Plate */}
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#0D1017] border border-[#242630]">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 9, ease: 'easeOut' }}
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-105 contrast-105"
          />
        </div>

        {/* Optional Pull-Stats Key Metrics Bar */}
        {article.pullStats && article.pullStats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0D1017] border border-[#242630] p-5">
            {article.pullStats.map((stat, idx) => (
              <div
                key={idx}
                className="sm:border-l first:border-l-0 border-[#20232E] sm:pl-5 first:pl-0 flex flex-col justify-center"
              >
                <span className="font-serif text-2xl sm:text-3xl text-[#E2BA6B] tabular-nums">{stat.value}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8F98AA] mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Asymmetric 12-Column Editorial Layout: 8-col Main Essay + 4-col Sticky Briefing Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-2">
          {/* Left / Main Reading Column */}
          <article className="lg:col-span-8 max-w-prose space-y-6 text-base sm:text-[17px] text-[#D4D8E2] leading-[1.78]">
            {/* Opening Paragraph with Gold Drop Cap */}
            {article.contentParagraphs[0] && (
              <p className="text-[#FAF7F0] first-letter:text-5xl first-letter:font-serif first-letter:text-[#E2BA6B] first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:leading-none">
                {article.contentParagraphs[0]}
              </p>
            )}

            {/* 1st Embedded Full-Width Documentary Plate */}
            <figure className="my-7 space-y-2.5">
              <div className="aspect-[16/9] w-full overflow-hidden border border-[#242630] bg-[#0D1017]">
                <img
                  src={widePlate}
                  alt={captions[0] || article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105"
                />
              </div>
              <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                {captions[0]}
              </figcaption>
            </figure>

            {/* Remaining Intro Paragraphs */}
            {article.contentParagraphs.slice(1).map((para, i) => (
              <p key={i + 1}>{para}</p>
            ))}

            {/* Centered Pull Quote (Hairline Top/Bottom Borders Only) */}
            {article.pullQuote && (
              <motion.blockquote
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45 }}
                className="my-8 py-7 px-6 sm:px-10 border-y border-[#8B672B]/55 bg-[#0D1017] text-center space-y-3"
              >
                <p className="font-serif italic text-2xl sm:text-3xl text-[#FAF7F0] leading-relaxed">
                  “{article.pullQuote}”
                </p>
                <cite className="not-italic tglc-kicker block">TGLC Editorial Notes</cite>
              </motion.blockquote>
            )}

            {/* 2-Up Photography Diptych */}
            {firstDiptych.length > 0 && (
              <motion.div
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45 }}
                className="my-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {firstDiptych.map((imgPath, gIdx) => (
                  <figure key={gIdx} className="space-y-2">
                    <div className="aspect-[4/3] overflow-hidden border border-[#242630] bg-[#0D1017] group">
                      <img
                        src={imgPath}
                        alt={captions[gIdx + 1] || `${article.title} photograph ${gIdx + 2}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                      {captions[gIdx + 1] || 'Scenes documented across the evenings covered in this briefing.'}
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            )}

            {/* Long-Form Subheadings with Clear Typographic Separation & Interleaved Extra Gallery */}
            {article.subheadings &&
              article.subheadings.map((sub, idx) => (
                <React.Fragment key={idx}>
                  <section className="space-y-3.5 pt-5 border-t border-[#1A1D28]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#E2BA6B] block">
                      Chapter {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] leading-snug">
                      {sub.title}
                    </h2>
                    {sub.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-[#D4D8E2]">
                        {p}
                      </p>
                    ))}
                  </section>

                  {/* Insert additional photography spread mid-essay when article supplies 4-5 images */}
                  {idx === 1 && secondaryPlates.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0.9, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.45 }}
                      className={`my-7 grid gap-5 ${
                        secondaryPlates.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                      }`}
                    >
                      {secondaryPlates.map((extraImg, eIdx) => (
                        <figure key={eIdx} className="space-y-2">
                          <div
                            className={`${
                              secondaryPlates.length > 1 ? 'aspect-[4/3]' : 'aspect-[16/9]'
                            } overflow-hidden border border-[#242630] bg-[#0D1017] group`}
                          >
                            <img
                              src={extraImg}
                              alt={captions[eIdx + 3] || `${article.title} additional view ${eIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                            {captions[eIdx + 3] || 'On-site field frame recorded by our Albemarle Street editorial desk.'}
                          </figcaption>
                        </figure>
                      ))}
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
          </article>

          {/* Right Sticky Briefing Dossier Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#0D1017] border border-[#242630] p-6 space-y-5">
              <div>
                <span className="tglc-kicker block">Briefing Dossier</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0] mt-1">
                  Operational Context
                </h3>
              </div>

              <dl className="divide-y divide-[#1E2230] text-xs">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Format</dt>
                  <dd className="text-[#FAF7F0] text-right font-medium">{article.articleType || 'Feature Essay'}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Discipline</dt>
                  <dd className="text-[#FAF7F0] text-right">{article.category}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Published</dt>
                  <dd className="text-[#FAF7F0] text-right tabular-nums">{article.publishDate}</dd>
                </div>
                {article.eventDates && (
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Window</dt>
                    <dd className="text-[#E2BA6B] text-right font-medium">{article.eventDates}</dd>
                  </div>
                )}
                {article.venueNote && (
                  <div className="py-2.5 space-y-1">
                    <dt className="text-[#8F98AA] font-mono uppercase tracking-wider">Locations</dt>
                    <dd className="text-[#D4D8E2] leading-relaxed">{article.venueNote}</dd>
                  </div>
                )}
              </dl>

              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="pt-2 border-t border-[#1E2230] space-y-2.5">
                  <span className="tglc-kicker block">Key Intelligence</span>
                  <ul className="space-y-2">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="text-xs text-[#D4D8E2] leading-relaxed flex items-start gap-2">
                        <span className="text-[#E2BA6B] font-mono shrink-0">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => openIntroductionModal(`Journal Brief: ${article.title}`)}
                  className="btn-gold w-full py-3 px-4 text-xs flex items-center justify-center gap-2"
                >
                  <span>Inquire / Request Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('calendar')}
                  className="btn-outline-gold w-full py-3 px-4 text-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Browse Calendar Events</span>
                </button>
              </div>
            </div>

            {/* Author Card inside Dossier Column */}
            <div
              onClick={() => navigateTo('about')}
              className="bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] p-5 flex items-start gap-4 cursor-pointer transition-colors"
            >
              {matchingTeam ? (
                <img
                  src={matchingTeam.image}
                  alt={article.author}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover object-top border border-[#8B672B] shrink-0"
                />
              ) : (
                <div className="w-14 h-14 bg-[#131722] border border-[#8B672B] flex items-center justify-center font-serif text-xl text-[#E2BA6B] shrink-0">
                  {article.author.charAt(0)}
                </div>
              )}
              <div className="space-y-1 min-w-0">
                <span className="tglc-kicker text-[10px] block">House Contributor</span>
                <h4 className="font-serif text-lg text-[#FAF7F0] leading-tight">{article.author}</h4>
                <p className="text-[11px] text-[#E2BA6B] leading-snug">{article.authorRole}</p>
                <p className="text-xs text-[#8F98AA] leading-relaxed pt-1">
                  Dispatches originate from 45 Albemarle Street, Mayfair.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <GoldDivider />

        {/* Related Dispatches & Briefings */}
        <section className="pt-2 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="tglc-kicker block">Further Reading</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                Continue Through The Journal
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('journal')}
              className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors flex items-center gap-1"
            >
              <span>All Dispatches</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <motion.article
                key={rel.slug}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigateTo('journal-article', { articleSlug: rel.slug })}
                className="group bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/70 cursor-pointer transition-colors overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#131722]">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="tglc-meta text-[11px] flex items-center gap-2">
                      <span className="text-[#E2BA6B] uppercase tracking-wider">
                        {rel.articleType || 'Essay'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.category}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#8F98AA] line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-4 text-xs font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center gap-1">
                  <span>Open Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
