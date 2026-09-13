"use client";
import { useLanguage } from "./language-provider";
import { PublicShell, PublicHero, PublicCTA } from "./public-shared";
import { SectionHeading } from "./section-heading";
import { StoryRecord } from "./story-record";
import { Icon } from "./icon";
import { archiveStatuses, storyCategories, type StoryRecordData } from "@/types/archive";
export function PeopleStoriesPage() {
 const { copy, locale } = useLanguage(); const t = copy.public.people; const c = copy.public.common;
 const record: StoryRecordData = { name:c.pending, relationship:c.pending, title:t.sampleTitle, summary:t.sampleSummary, story:t.sampleStory, period:c.pending, role:c.pending, sourceType:c.pending, contributor:c.pending, status:"review", supporting:[], placeholder:true };
 return <PublicShell><PublicHero {...t} target="#story-categories"/>
  <section className="public-intro"><div className="container public-columns"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><p>{t.intro}</p></div></section>
  <section id="story-categories" className="container section"><SectionHeading eyebrow={t.categoriesLabel} title={t.categoriesTitle}/><div className="story-categories">{t.categories.map((title,i)=><section key={storyCategories[i]}><div className="public-category-top"><Icon kind={i%5}/><span aria-hidden="true">{new Intl.NumberFormat(locale,{minimumIntegerDigits:2}).format(i+1)}</span></div><h3>{title}</h3><p>{t.descriptions[i]}</p><span className="public-pending">{c.pending}</span></section>)}</div></section>
  <section className="public-tinted section"><div className="container"><SectionHeading eyebrow={t.featuredLabel} title={t.featuredTitle} text={t.featuredText}/><StoryRecord record={record}/></div></section>
  <section className="container section public-columns"><SectionHeading eyebrow={t.oralLabel} title={t.oralTitle}/><div><p>{t.oralText}</p><ul className="public-topic-list">{t.oralTopics.map(item=><li key={item}>{item}</li>)}</ul></div></section>
  <section className="public-generations section"><div className="container"><SectionHeading eyebrow={t.generationsLabel} title={t.generationsTitle} text={t.generationsText}/><div className="generation-grid">{t.generations.map((title,i)=><article key={title}><span className="generation-thread" aria-hidden="true"/><h3>{title}</h3><p>{t.generationText[i]}</p></article>)}</div></div></section>
  <section className="container section"><SectionHeading eyebrow={t.archiveLabel} title={t.archiveTitle}/><p className="public-notice" id="story-filter-notice">{c.filterNotice}</p><fieldset disabled className="story-filters" aria-describedby="story-filter-notice"><legend className="sr-only">{t.archiveLabel}</legend><label>{t.search}<input type="search" placeholder={t.search}/></label><label>{t.category}<select><option>{c.all}</option>{t.categories.map(item=><option key={item}>{item}</option>)}</select></label><label>{t.period}<select><option>{t.allPeriods}</option>{t.generations.map(item=><option key={item}>{item}</option>)}</select></label><label>{t.status}<select><option>{t.allStatuses}</option>{archiveStatuses.map(status=><option key={status}>{c.status[status].label}</option>)}</select></label></fieldset><div className="public-empty"><Icon kind={0}/><h3>{c.noRecords}</h3><p>{c.pending}</p></div></section>
  <PublicCTA title={t.cta} text={t.ctaText}/>
 </PublicShell>;
}
