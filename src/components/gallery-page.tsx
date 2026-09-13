"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PublicShell, PublicHero, ArchiveVisual, ArchiveStatusBadge } from "./public-shared";
import { SectionHeading } from "./section-heading";
import { Arrow } from "./icon";
import { galleryCategories, type GalleryCategory, type GalleryRecord } from "@/types/archive";
export function GalleryPage() {
 const { copy, locale } = useLanguage(); const t=copy.public.gallery; const c=copy.public.common;
 const [filter,setFilter]=useState<GalleryCategory | "all">("all");
 const [selected,setSelected]=useState<string | null>(null);
 const dialog=useRef<HTMLDialogElement>(null); const opener=useRef<HTMLButtonElement | null>(null);
 const records: GalleryRecord[]=galleryCategories.map((category,i)=>({id:category,category,title:t.categories[i],caption:t.captions[i],year:t.pending,location:t.pending,source:t.pending,contributor:t.pending,status:"review",placeholder:true}));
 const visible=records.filter(record=>filter==="all" || record.category===filter);
 const active=records.find(record=>record.id===selected);
 function open(record: GalleryRecord, button: HTMLButtonElement) { opener.current=button;setSelected(record.id);dialog.current?.showModal(); }
 function close() { dialog.current?.close(); }
 return <PublicShell><PublicHero {...t} target="#gallery-collection"/>
  <section className="public-intro"><div className="container public-columns"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><p>{t.intro}</p></div></section>
  <section className="container section" id="gallery-collection"><SectionHeading eyebrow={t.collectionLabel} title={t.collectionTitle}/><div className="gallery-filters" role="group" aria-label={t.filter}><button aria-pressed={filter==="all"} onClick={()=>setFilter("all")}>{c.all}</button>{galleryCategories.map((category,i)=><button key={category} aria-pressed={filter===category} onClick={()=>setFilter(category)}>{t.categories[i]}</button>)}</div><p className="gallery-result-count" aria-live="polite">{t.count}: {new Intl.NumberFormat(locale).format(visible.length)}</p><div className="public-gallery-grid">{visible.map(record=><figure key={record.id} className={`archive-frame archive-frame-${record.category}`}><button className="gallery-preview-button" onClick={event=>open(record,event.currentTarget)} aria-label={c.preview+": "+record.title}><ArchiveVisual image={record.image} label={c.photo}/><span className="gallery-open-mark" aria-hidden="true">↗</span></button><figcaption><span className="eyebrow">{c.placeholder}</span><h3>{record.title}</h3><p>{record.caption}</p></figcaption></figure>)}</div></section>
  <section className="public-tinted section"><div className="container public-columns"><SectionHeading eyebrow={t.wantedLabel} title={t.wantedTitle}/><div><p>{t.wantedText}</p><ul className="public-topic-list">{t.wantedItems.map(item=><li key={item}>{item}</li>)}</ul><Link className="button button-green gallery-contribute-link" href="/contribute">{t.cta}<Arrow/></Link></div></div></section>
  
  <dialog ref={dialog} className="archive-dialog public-page" aria-labelledby="gallery-dialog-title" aria-describedby="gallery-dialog-note" onKeyDown={event=>{if(event.key!=="Tab")return;const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}} onClose={()=>{setSelected(null);opener.current?.focus();}} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}}}><button className="dialog-close" onClick={close} autoFocus>{c.close}<span aria-hidden="true">×</span></button>{active && <><h2 id="gallery-dialog-title">{active.title}</h2><p id="gallery-dialog-note" className="public-notice">{t.modalNote}</p><ArchiveVisual image={active.image} label={c.photo}/><p>{active.caption}</p><dl className="public-facts">{([["category",t.categories[galleryCategories.indexOf(active.category)]],["year",active.year],["location",active.location],["source",active.source],["contributor",active.contributor]] as const).map(([key,value])=><div key={key}><dt>{c.labels[key]}</dt><dd>{value}</dd></div>)}<div><dt>{c.labels.status}</dt><dd><ArchiveStatusBadge status={active.status}/></dd></div><div><dt>{c.labels.related}</dt><dd>{active.relatedStory ? <Link href={active.relatedStory.href} onClick={close}>{active.relatedStory.title}</Link> : t.relatedPending}</dd></div></dl></>}</dialog>
 </PublicShell>;
}
