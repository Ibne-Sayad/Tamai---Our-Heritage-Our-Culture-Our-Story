"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Header, Footer } from "./site-shell";
import { SectionHeading } from "./section-heading";
import { Arrow, Icon } from "./icon";
import { historyStatuses, historyTimeline, type HistoryStatus } from "@/content/history";

const chapterIds = ["history-intro", "history-timeline", "liberation-war", "origin-settlement", "history-institutions", "voices", "history-sources"];
const statusSymbols: Record<HistoryStatus, string> = { documented: "▤", oral: "◌", memory: "◇", review: "…" };

function StatusLabel({ status, short = false }: { status: HistoryStatus; short?: boolean }) {
  const { copy } = useLanguage();
  const label = copy.history.statuses[status];
  return <span className={`history-status history-status-${status}`}><span aria-hidden="true">{statusSymbols[status]}</span>{short ? label.short : label.label}</span>;
}

export function HistoryPage() {
  const { copy, locale } = useLanguage();
  const t = copy.history;
  const index = (i: number) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1);
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <Header/>
    <main className="history-page" id="main">
      <section className="container history-hero" id="history-top">
        <div>
          <nav className="history-breadcrumb" aria-label={t.contents}><Link href="/">{copy.nav[0]}</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.nav[1]}</span></nav>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="history-subtitle">{t.subtitle}</p>
          <p className="history-hero-lead">{t.lead}</p>
          <a href="#history-timeline" className="text-link">{t.explore}<span aria-hidden="true">↓</span></a>
        </div>
        <figure className="history-folio">
          <div className="folio-study">
            <div className="folio-back" aria-hidden="true"/><div className="folio-paper">
              <div className="folio-rule" aria-hidden="true"/>
              <p className="eyebrow">{t.heroArtLabel}</p>
              <span className="folio-title">{t.heroArtTitle}</span>
              <div className="folio-lines" aria-hidden="true"/><div className="folio-emblem" aria-hidden="true"><Icon kind={0}/></div>
            </div>
            <div className="folio-ribbon" aria-hidden="true"/>
          </div>
          <figcaption>{t.heroArtCaption}</figcaption>
        </figure>
      </section>

      <nav className="history-chapters" aria-label={t.contents}><div className="container"><span className="eyebrow">{t.contents}</span><ol>{t.chapters.map((name, i) => <li key={name}><a href={`#${chapterIds[i]}`}><span>{index(i)}</span>{name}</a></li>)}</ol></div></nav>

      <section className="container section history-intro" id="history-intro">
        <div className="history-two-col"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><div className="history-prose"><p className="history-lead">{t.introLead}</p><p>{t.introText}</p><p className="history-note">{t.introNote}</p></div></div>
        <aside className="history-legend" id="history-labels" aria-labelledby="history-legend-title">
          <div className="legend-heading"><h3 id="history-legend-title">{t.legendTitle}</h3><p>{t.legendNote}</p></div>
          <dl>{historyStatuses.map(status => <div key={status}><dt><StatusLabel status={status}/></dt><dd>{t.statuses[status].description}</dd></div>)}</dl>
        </aside>
      </section>

      <section className="history-timeline-section section" id="history-timeline"><div className="container history-timeline-layout">
        <div className="history-timeline-heading"><SectionHeading eyebrow={t.timelineLabel} title={t.timelineTitle} text={t.timelineText}/><p className="history-note">{t.timelineNote}</p></div>
        <ol className="history-timeline">{historyTimeline.map((phase, i) => {
          const entry = t.timeline[phase.id];
          return <li key={phase.id} data-status={phase.status}><span className="history-timeline-marker" aria-hidden="true">{index(i)}</span><div><StatusLabel status={phase.status}/><h3>{entry.title}</h3><p>{entry.text}</p><p className="history-material">{entry.material}</p></div></li>;
        })}</ol>
      </div></section>

      <section className="history-war textile-section" id="liberation-war"><div className="container">
        <div className="history-war-heading"><div><p className="eyebrow">{t.warLabel}</p><p className="history-year">{new Intl.NumberFormat(locale, { useGrouping: false }).format(1971)}</p><StatusLabel status="review"/></div><div><h2>{t.warTitle}</h2><p>{t.warText}</p><p className="history-war-note">{t.warNote}</p></div></div>
        <ul className="history-war-collections">{t.warCollections.map((name, i) => <li key={name}><Icon kind={[4,0,5,3,0][i]}/><h3>{name}</h3><p>{t.collectionPending}</p></li>)}</ul>
      </div></section>

      <section className="container section history-origin" id="origin-settlement"><div className="history-two-col"><SectionHeading eyebrow={t.originLabel} title={t.originTitle}/><div className="history-prose"><p>{t.originText}</p><ul className="history-origin-themes">{t.originThemes.map(theme => <li key={theme}><span aria-hidden="true">＋</span>{theme}</li>)}</ul></div></div>
        <aside className="history-name-note" aria-labelledby="name-origin-title"><Icon kind={0}/><div><p className="eyebrow">{t.researchStatus}</p><h3 id="name-origin-title">{t.nameTitle}</h3><p>{t.nameText}</p></div><StatusLabel status="review"/></aside>
      </section>

      <section className="history-institutions-section" id="history-institutions"><div className="container history-two-col">
        <div><SectionHeading eyebrow={t.institutionsLabel} title={t.institutionsTitle} text={t.institutionsText}/><Link className="text-link" href="/institutions">{t.institutionLink}<Arrow/></Link><p className="history-caption">{t.institutionNote}</p></div>
        <ul className="history-institution-list">{t.institutions.map((name, i) => <li key={name}><span>{index(i)}</span><h3>{name}</h3><Icon kind={3}/></li>)}</ul>
      </div></section>

      <section className="container section history-voices" id="voices">
        <div className="history-two-col"><div><SectionHeading eyebrow={t.voicesLabel} title={t.voicesTitle}/><p className="history-voices-intro">{t.voicesText}</p></div><ul className="history-voice-topics">{t.voicesTopics.map(topic => <li key={topic}>{topic}</li>)}</ul></div>
        <aside className="history-principle"><p className="eyebrow">{t.principleLabel}</p><p className="history-principle-text">{t.principle}</p><div><p>{t.principleText}</p><p className="history-caption">{t.voicesNote}</p></div></aside>
      </section>

      <section className="history-sources-section section" id="history-sources"><div className="container">
        <div className="history-sources-heading"><SectionHeading eyebrow={t.sourcesLabel} title={t.sourcesTitle} text={t.sourcesText}/><div className="history-mini-legend"><p className="eyebrow">{t.sourceLegend}</p><ul>{historyStatuses.map(status => <li key={status}><a href="#history-labels"><StatusLabel status={status} short/></a></li>)}</ul></div></div>
        <dl className="history-source-list">{t.sources.map((source, i) => <div key={source.title}><dt><span aria-hidden="true">{index(i)}</span>{source.title}</dt><dd>{source.description}</dd></div>)}</dl><p className="history-note">{t.sourceNote}</p>
      </div></section>

      <section className="container section history-contribution" id="history-contribute"><div className="contribute-section history-contribute-inner">
        <div><p className="eyebrow">{t.contributeLabel}</p><h2>{t.contributeTitle}</h2><p>{t.contributeText}</p><Link className="button button-green" href="/contribute">{t.contributeButton}<Arrow/></Link></div>
        <div className="contribute-actions"><ul>{t.contributeItems.map(item => <li key={item}><span aria-hidden="true">＋</span>{item}</li>)}</ul><p className="history-note">{t.contributeNote}</p></div>
      </div></section>
    </main>
    <Footer/>
  </>;
}
