"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Header, Footer } from "./site-shell";
import { SectionHeading } from "./section-heading";
import { Arrow, Icon } from "./icon";
import { InstitutionCategoryIcon, InstitutionRecord, InstitutionStatusBadge } from "./institution-record";
import { institutionCategoryIds, institutionStatuses } from "@/types/institution";

export function InstitutionsPage() {
  const { copy, locale } = useLanguage();
  const t = copy.institutionPage;
  const number = (i: number) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1);
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a><Header/>
    <main className="institutions-page" id="main">
      <section className="container institutions-hero" id="institutions-top">
        <div><nav className="institutions-breadcrumb" aria-label={t.title}><Link href="/">{copy.nav[0]}</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.nav[4]}</span></nav><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="institutions-subtitle">{t.subtitle}</p><p className="institutions-hero-lead">{t.lead}</p><a className="text-link" href="#institution-categories">{t.explore}<span aria-hidden="true">↓</span></a></div>
        <figure className="institutions-hero-figure"><div className="community-study"><p className="eyebrow">{t.heroArtLabel}</p><p className="community-study-title">{t.heroArtTitle}</p><div className="community-study-icons" aria-hidden="true">{institutionCategoryIds.map(id => <div key={id}><InstitutionCategoryIcon category={id}/><span/></div>)}</div><div className="community-study-border" aria-hidden="true"/></div><figcaption>{t.heroArtCaption}</figcaption></figure>
      </section>

      <section className="institutions-intro"><div className="container institutions-two-col"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><div className="institutions-prose"><p>{t.introText}</p><p className="institutions-note">{t.introNote}</p></div></div></section>

      <section className="container section" id="institution-categories"><SectionHeading eyebrow={t.categoriesLabel} title={t.categoriesTitle} text={t.categoriesText}/>
        <div className="institution-category-grid">{institutionCategoryIds.map((id, i) => <section className="institution-category" id={`category-${id}`} key={id} aria-labelledby={`category-title-${id}`}><div className="institution-category-heading"><InstitutionCategoryIcon category={id}/><span aria-hidden="true">{number(i)}</span></div><h3 id={`category-title-${id}`}>{t.categories[id].title}</h3><p>{t.categories[id].description}</p><div className="category-future-list"><span>{t.comingSoon}</span><p>{t.categories[id].examples}</p></div></section>)}</div>
      </section>

      <section className="institution-record-section section" id="example-record"><div className="container"><div className="institutions-two-col record-section-heading"><SectionHeading eyebrow={t.recordLabel} title={t.recordTitle}/><p>{t.recordText}</p></div><InstitutionRecord/></div></section>

      <section className="container section institution-historical-role"><div className="institutions-two-col"><div><SectionHeading eyebrow={t.roleLabel} title={t.roleTitle}/><Link href="/history" className="text-link">{t.historyLink}<Arrow/></Link></div><div className="institutions-prose"><p>{t.roleText}</p><p>{t.roleMore}</p></div></div><ul className="institution-role-themes">{t.roleThemes.map((theme, i) => <li key={theme}><span aria-hidden="true">{number(i)}</span>{theme}</li>)}</ul></section>

      <section className="institution-status-section" id="institution-status"><div className="container"><div className="institutions-two-col"><SectionHeading eyebrow={t.statusLabel} title={t.statusTitle}/><p>{t.statusText}</p></div><dl className="institution-status-legend">{institutionStatuses.map(status => <div key={status}><dt><InstitutionStatusBadge status={status}/></dt><dd>{t.statuses[status].description}</dd></div>)}</dl><p className="institutions-note">{t.statusNote}</p></div></section>

      <section className="container section" id="institution-contribute"><div className="contribute-section institutions-contribute"><div><p className="eyebrow">{t.contributeLabel}</p><h2>{t.contributeTitle}</h2><p>{t.contributeText}</p><Link className="button button-green" href="/contribute">{t.contributeButton}<Arrow/></Link></div><div className="contribute-actions"><ul>{t.contributeItems.map(item => <li key={item}><span aria-hidden="true">＋</span>{item}</li>)}</ul><p className="institutions-note">{t.contributeNote}</p></div></div></section>

      <section className="container section institution-directory" id="institution-directory"><SectionHeading eyebrow={t.directoryLabel} title={t.directoryTitle} text={t.directoryText}/>
        <p id="directory-preview-notice" className="directory-preview-notice">{t.directoryNotice}</p>
        <div className="directory-toolbar"><fieldset disabled aria-describedby="directory-preview-notice"><legend className="sr-only">{t.directoryLabel}</legend><div><label htmlFor="institution-search">{t.searchLabel}</label><div className="directory-search-wrap"><svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg><input id="institution-search" type="search" placeholder={t.searchPlaceholder}/></div></div><div><label htmlFor="institution-category-filter">{t.filterLabel}</label><select id="institution-category-filter" defaultValue=""><option value="">{t.allCategories}</option>{institutionCategoryIds.map(id => <option key={id} value={id}>{t.categories[id].title}</option>)}</select></div></fieldset><div className="directory-count"><span>{t.countLabel}</span><p><span aria-hidden="true">—</span>{t.countPending}</p></div></div>
        <div className="directory-listing-placeholder" aria-labelledby="directory-listing-title"><p className="eyebrow" id="directory-listing-title">{t.listingLabel}</p><div className="directory-empty"><Icon kind={3}/><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p><a href="#example-record" className="text-link">{t.sampleLink}<span aria-hidden="true">↑</span></a></div></div>
      </section>
    </main><Footer/>
  </>;
}
