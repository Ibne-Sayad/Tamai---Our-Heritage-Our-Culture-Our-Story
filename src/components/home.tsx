"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";
import { Arrow, Icon } from "./icon";
import Link from "next/link";
import { Header, Footer } from "./site-shell";
import { SectionHeading } from "./section-heading";

export function Home() {
  const { copy: t, locale } = useLanguage();
  const [contributionOpen, setContributionOpen] = useState(false);
  useEffect(() => {
    const openContribution = () => { if (window.location.hash === "#contribution-info") setContributionOpen(true); };
    openContribution();
    window.addEventListener("hashchange", openContribution);
    return () => window.removeEventListener("hashchange", openContribution);
  }, []);
  const categoryAnchors = ["history", "culture", "textile", "institutions", "stories", "gallery"];
  return <><a className="skip-link" href="#main">{t.skip}</a><Header /><main id="main">
    <section className="hero container" id="home"><div className="hero-copy"><p className="eyebrow location"><span aria-hidden="true">◇</span> {t.location}</p><p className="hero-kicker">{t.eyebrow}</p><h1>{t.name}<span>.</span></h1><h2>{t.tagline}</h2><p className="hero-description">{t.intro}</p><div className="hero-buttons"><a className="button button-green" href="#explore">{t.explore}<span aria-hidden="true">↓</span></a><Link className="text-link" href="/contribute">{t.share}<Arrow /></Link></div></div>
      <figure className="hero-art"><div className="art-border"><div className="woven-panel"><div className="woven-sun" aria-hidden="true"/><div className="woven-band band-one"/><div className="woven-band band-two"/><div className="woven-band band-three"/><div className="art-label"><span lang="bn">তামাই</span><span>{t.motif}</span></div></div></div><figcaption><span className="small-diamond" aria-hidden="true">✳</span>{t.motifCaption}</figcaption></figure>
    </section>
    <div className="values-strip"><div className="container">{t.strip.map((text, i) => <span key={text}><span aria-hidden="true">{["✳", "▥", "◇"][i]}</span>{text}</span>)}</div></div>
    <section className="container section about" aria-labelledby="about-title"><div><p className="eyebrow">{t.aboutLabel}</p><h2 id="about-title">{t.aboutTitle}</h2></div><div className="about-copy"><p>{t.about}</p><p>{t.aboutMore}</p></div></section>
    <section className="archive-section section" id="explore"><div className="container"><SectionHeading eyebrow={t.exploreLabel} title={t.exploreTitle} text={t.exploreText}/><div className="category-grid">{t.categories.map((item, i) => <article id={[0,1,4].includes(i) ? categoryAnchors[i] : undefined} className="category-card" key={item.title}><div className="card-top"><Icon kind={i}/><span className="card-number">{new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1)}</span></div><h3>{item.title}</h3><p>{item.description}</p><Link href={i === 0 ? "/history" : i === 1 ? "/culture" : i === 2 ? "/lungi-textile" : i === 3 ? "/institutions" : i === 4 ? "/people-stories" : "/gallery"} className="card-link" aria-label={item.title}><Arrow /></Link></article>)}</div></div></section>
    <section className="textile-section" id="textile"><div className="container textile-inner"><figure className="textile-figure"><div className="swatch-mat"><div className="plaid-swatch" aria-hidden="true"/></div><figcaption><span>{t.swatch}</span><span>{t.swatchNote}</span></figcaption></figure><div className="textile-copy"><p className="eyebrow">{t.textileLabel}</p><h2>{t.textileTitle}</h2><p>{t.textileText}</p><p>{t.textileMore}</p><Link className="text-link" href="/lungi-textile">{t.textileExplore}<Arrow /></Link></div></div></section>
    <section className="container section institutions" id="institutions"><SectionHeading eyebrow={t.institutionsLabel} title={t.institutionsTitle} text={t.institutionsText}/><div className="institution-grid">{t.institutions.map((name, i) => <article key={name}><Icon kind={[0,3,2,4][i]}/><h3>{name}</h3><p>{t.institutionNote}</p></article>)}</div><Link className="text-link mt-7" href="/institutions">{t.institutionPage.title}<Arrow/></Link></section>
    <section className="contribute-section container" id="contribute"><div className="contribute-decoration" aria-hidden="true">✳</div><div><p className="eyebrow">{t.contributeLabel}</p><h2>{t.contributeTitle}</h2><p>{t.contributeText}</p></div><div className="contribute-actions"><ul>{t.contributions.map(item => <li key={item}><span aria-hidden="true">＋</span>{item}</li>)}</ul><Link className="button button-green" href="/contribute">{t.contributeButton}<Arrow /></Link><details id="contribution-info" open={contributionOpen} onToggle={event => setContributionOpen(event.currentTarget.open)}><summary>{t.community.connectionLabel}</summary><p>{t.community.liveNotice}</p></details></div></section>
    <section className="container section gallery" id="gallery"><SectionHeading eyebrow={t.galleryLabel} title={t.galleryTitle} text={t.galleryText}/><div className="gallery-grid">{t.gallery.map((name, i) => <figure key={name} className={`gallery-item gallery-item-${i}`}><div className="photo-placeholder"><Icon kind={5}/><span>{t.photoPending}</span></div><figcaption><span>{name}</span><span aria-hidden="true">{new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1)}</span></figcaption></figure>)}</div><p className="gallery-note">{t.galleryNote}</p><Link className="text-link" href="/gallery">{t.public.gallery.title}<Arrow/></Link></section>
  </main><Footer/></>;
}
