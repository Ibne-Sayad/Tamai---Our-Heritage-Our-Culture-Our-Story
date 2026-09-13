"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Header, Footer } from "./site-shell";
import { SectionHeading } from "./section-heading";
import { Arrow, Icon } from "./icon";

const chapterIds = ["identity", "generations", "making", "patterns", "people", "textile-archive"];
const weavingReference = "https://www.campop.geog.cam.ac.uk/research/occupations/outputs/onlineatlas/textiles.pdf#page=7";

function ProcessDrawing({ step }: { step: number }) {
  const drawings = [
    <g key="yarn"><path d="M20 8h24M20 56h24M23 8v48M41 8v48M23 16l18 6-18 6 18 6-18 6 18 6"/><path d="M17 56c-8 0-9-12-2-12"/></g>,
    <g key="warp"><path d="M12 10h40M12 54h40M17 10v44M23 10v44M29 10v44M35 10v44M41 10v44M47 10v44"/></g>,
    <g key="loom"><path d="M10 56V12h44v44M16 24h32M16 44h32M20 24v20M26 24v20M32 24v20M38 24v20M44 24v20M6 56h52"/></g>,
    <g key="weave"><path d="M14 10v44M24 10v44M34 10v44M44 10v44M10 18h44M10 28h44M10 38h44M10 48h44"/><path d="m44 28 12 5-12 5"/></g>,
    <g key="check"><path d="M10 10h36v36H10zM22 10v36M34 10v36M10 22h36M10 34h36M40 51l5 5 12-14"/></g>,
    <g key="finish"><path d="M15 12h34v36H15zM15 20h34M15 40h34M15 48v7m7-7v7m7-7v7m7-7v7m7-7v7m6-7v7"/></g>,
    <g key="fold"><path d="m10 23 22-12 22 12-22 12-22-12Zm0 11 22 12 22-12M10 45l22 12 22-12M32 35v22M22 17l22 12"/></g>,
  ];
  return <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[step]}</svg>;
}

export function TextileHeritage() {
  const { copy, locale } = useLanguage();
  const t = copy.textile;
  const number = (i: number) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1);
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <Header/>
    <main id="main" className="textile-page">
      <section className="container textile-page-hero" id="textile-top">
        <div className="textile-hero-copy">
          <nav className="textile-breadcrumb" aria-label={t.contents}><Link href="/">{copy.nav[0]}</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.nav[3]}</span></nav>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="textile-subtitle">{t.subtitle}</p>
          <p className="textile-lead">{t.lead}</p>
          <a href="#identity" className="text-link">{t.explore}<span aria-hidden="true">↓</span></a>
        </div>
        <figure className="textile-hero-study">
          <div className="loom-study" aria-hidden="true"><div className="loom-threads"/><div className="loom-cloth"/><div className="loom-shuttle"/><div className="loom-crossbar"/></div>
          <figcaption><span>{t.heroCaption}</span><span>{t.illustration}</span></figcaption>
        </figure>
      </section>

      <nav className="textile-chapter-nav" aria-label={t.contents}><div className="container"><span className="eyebrow">{t.contents}</span><ol>{t.chapters.map((chapter, i) => <li key={chapter}><a href={`#${chapterIds[i]}`}><span>{number(i)}</span>{chapter}</a></li>)}</ol></div></nav>

      <section className="container section textile-editorial" id="identity">
        <SectionHeading eyebrow={t.introLabel} title={t.introTitle}/>
        <div className="textile-prose"><p className="textile-intro-lead">{t.introLead}</p><p>{t.introText}</p><p className="textile-archive-note">{t.introNote}</p></div>
      </section>

      <section className="textile-history section" id="generations"><div className="container textile-history-layout">
        <div><SectionHeading eyebrow={t.historyLabel} title={t.historyTitle} text={t.historyText}/><p className="textile-archive-note">{t.historyNote}</p><div className="history-thread-art" aria-hidden="true"><span/><span/><span/></div></div>
        <ol className="textile-timeline">{t.history.map((stage, i) => <li key={stage.title}><span className="timeline-marker" aria-hidden="true">{number(i)}</span><div><p className="eyebrow">{stage.label}</p><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol>
      </div></section>

      <section className="container section textile-process" id="making">
        <SectionHeading eyebrow={t.processLabel} title={t.processTitle} text={t.processText}/>
        <ol className="process-grid">{t.process.map((step, i) => <li key={step.title}><div className="process-visual"><ProcessDrawing step={i}/><span aria-hidden="true">{number(i)}</span></div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <div className="process-context"><p>{t.processNote}</p><a href={weavingReference} className="reference-link">{t.processSource}<Arrow/></a></div>
      </section>

      <section className="textile-patterns textile-section" id="patterns"><div className="container">
        <div className="pattern-heading"><SectionHeading eyebrow={t.patternsLabel} title={t.patternsTitle}/><p>{t.patternsText}</p></div>
        <div className="pattern-studies">{t.patterns.map((pattern, i) => <figure key={pattern.title}><div className={`pattern-sample pattern-sample-${i}`} aria-hidden="true"/><figcaption><span className="pattern-index">{number(i)}</span><div><h3>{pattern.title}</h3><p>{pattern.text}</p></div></figcaption></figure>)}</div>
        <p className="pattern-disclaimer">{t.patternNote}</p>
      </div></section>

      <section className="container section textile-people" id="people"><div><SectionHeading eyebrow={t.peopleLabel} title={t.peopleTitle}/><p>{t.peopleText}</p><Link className="text-link" href="/people-stories">{t.peopleLink}<Arrow/></Link></div>
        <ul className="textile-roles">{t.roles.map((role, i) => <li key={role}><span aria-hidden="true">{number(i)}</span><h3>{role}</h3><Icon kind={4}/></li>)}</ul>
      </section>

      <section className="container textile-economy"><div className="economy-motif" aria-hidden="true"/><div><p className="eyebrow">{t.economyLabel}</p><h2>{t.economyTitle}</h2></div><div className="textile-prose"><p>{t.economyText}</p><p>{t.economyMore}</p></div></section>

      <section className="container section textile-archive-wrap" id="textile-archive"><div className="contribute-section textile-contribute">
        <div><p className="eyebrow">{t.archiveLabel}</p><h2>{t.archiveTitle}</h2><p>{t.archiveText}</p><Link href="/contribute" className="button button-green">{t.archiveButton}<Arrow/></Link></div>
        <div className="contribute-actions"><ul>{t.contributions.map(item => <li key={item}><span aria-hidden="true">＋</span>{item}</li>)}</ul><p className="textile-archive-note">{t.archiveNote}</p></div>
      </div></section>

      <section className="container section textile-gallery" id="textile-gallery"><SectionHeading eyebrow={t.galleryLabel} title={t.galleryTitle} text={t.galleryText}/>
        <div className="textile-gallery-grid">{t.gallery.map((label, i) => <figure key={label}><div className="photo-placeholder"><Icon kind={5}/><span>{copy.photoPending}</span></div><figcaption><span>{label}</span><span>{number(i)}</span></figcaption></figure>)}</div><p className="gallery-note">{t.galleryNote}</p>
      </section>
    </main>
    <Footer/>
  </>;
}
