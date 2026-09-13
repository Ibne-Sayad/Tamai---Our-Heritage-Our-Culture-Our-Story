"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Header, Footer } from "./site-shell";
import { SectionHeading } from "./section-heading";
import { Arrow, Icon } from "./icon";

export function CulturePage() {
  const { copy, locale } = useLanguage();
  const t = copy.culture;
  const number = (i: number) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1);
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a><Header/>
    <main id="main" className="culture-page">
      <section className="container culture-hero" id="culture-top">
        <div><nav className="culture-breadcrumb" aria-label={t.title}><Link href="/">{copy.nav[0]}</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.nav[2]}</span></nav><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="culture-subtitle">{t.subtitle}</p><a className="text-link" href="#culture-themes">{t.explore}<span aria-hidden="true">↓</span></a></div>
        <figure className="culture-hero-art"><div className="culture-fabric"><div className="culture-fabric-window" aria-hidden="true"/><p>{t.artTitle}</p><span aria-hidden="true" className="culture-stitch"/></div><figcaption>{t.artCaption}</figcaption></figure>
      </section>
      <section className="culture-intro"><div className="container culture-columns"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><div className="culture-prose"><p>{t.introText}</p><p className="culture-note">{t.introNote}</p><span className="culture-status">{t.progress}</span></div></div></section>
      <section className="container section" id="culture-themes"><SectionHeading eyebrow={t.themesLabel} title={t.themesTitle} text={t.themesText}/><div className="culture-themes">{t.themes.map((item,i)=><section className="culture-theme" aria-labelledby={`culture-theme-${i}`} key={item.title}><span className="culture-number" aria-hidden="true">{number(i)}</span><div><h3 id={`culture-theme-${i}`}>{item.title}</h3><p>{item.text}</p><span className="culture-story-space">{t.storyPending}</span></div><div className="culture-photo-space"><Icon kind={5}/><span>{t.photoPending}</span></div></section>)}</div></section>
      <section className="culture-life section"><div className="container culture-columns"><div><SectionHeading eyebrow={t.lifeLabel} title={t.lifeTitle}/><p>{t.lifeText}</p></div><div><ul className="culture-ruled-list">{t.lifeItems.map((item,i)=><li key={item}><span aria-hidden="true">{number(i)}</span>{item}</li>)}</ul><p className="culture-note">{t.lifeNote}</p></div></div></section>
      <section className="container section"><div className="culture-food"><div><SectionHeading eyebrow={t.foodLabel} title={t.foodTitle}/><p>{t.foodText}</p></div><div><ul className="culture-topic-list">{t.foodItems.map(item=><li key={item}>{item}</li>)}</ul><p className="culture-note">{t.foodNote}</p></div></div></section>
      <section className="container section culture-sports"><div className="culture-columns"><SectionHeading eyebrow={t.sportsLabel} title={t.sportsTitle}/><div><p>{t.sportsText}</p><ul className="culture-topic-list">{t.sportsItems.map(item=><li key={item}>{item}</li>)}</ul><p className="culture-note">{t.sportsNote}</p></div></div></section>
      <section className="culture-change section" id="culture-then-now"><div className="container"><div className="culture-columns"><SectionHeading eyebrow={t.changeLabel} title={t.changeTitle}/><p>{t.changeText}</p></div><div className="culture-comparisons">{t.changeTopics.map((topic,i)=><section className="culture-comparison" key={topic} aria-labelledby={`change-${i}`}><h3 id={`change-${i}`}>{topic}</h3><div className="culture-time-pair"><div><h4>{t.then}</h4><p>{t.thenPending}</p></div><div><h4>{t.now}</h4><p>{t.nowPending}</p></div></div></section>)}</div><p className="culture-change-note">{t.changeNote}</p></div></section>
      <section className="container section" id="culture-voices"><SectionHeading eyebrow={t.voicesLabel} title={t.voicesTitle} text={t.voicesText}/><ul className="culture-voices">{t.voices.map(voice=><li key={voice}><span className="culture-voice-mark" aria-hidden="true">“</span><div><h3>{voice}</h3><p>{t.voicePending}</p></div></li>)}</ul></section>
      <section className="container section culture-contribution"><div className="contribute-section"><div><p className="eyebrow">{t.contributeLabel}</p><h2>{t.contributeTitle}</h2><p>{t.contributeText}</p><Link className="button button-green" href="/contribute">{t.contributeButton}<Arrow/></Link></div><div className="contribute-actions"><ul>{t.contributeItems.map(item=><li key={item}><span aria-hidden="true">＋</span>{item}</li>)}</ul></div></div></section>
      <section className="container section culture-gallery"><SectionHeading eyebrow={t.galleryLabel} title={t.galleryTitle} text={t.galleryText}/><div className="culture-gallery-grid">{t.galleryItems.map((item,i)=><figure key={item}><div className={`photo-placeholder culture-gallery-photo culture-gallery-photo-${i%3}`}><Icon kind={5}/><span>{t.photoPending}</span></div><figcaption><span aria-hidden="true">{number(i)}</span>{item}</figcaption></figure>)}</div></section>
    </main><Footer/>
  </>;
}