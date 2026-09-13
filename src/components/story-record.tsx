"use client";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { ArchiveStatusBadge, ArchiveVisual } from "./public-shared";
import type { StoryRecordData } from "@/types/archive";

export function StoryRecord({ record }: { record: StoryRecordData }) {
 const { copy } = useLanguage();
 const t = copy.public.common;
 const fields = [["name", record.name], ["relationship", record.relationship], ["period", record.period], ...(record.role ? [["role", record.role]] : []), ["sourceType", record.sourceType], ["contributor", record.contributor]] as [keyof typeof t.labels, string][];
 return <article className="story-record" data-placeholder={record.placeholder || undefined}>
  {record.placeholder && <p className="public-notice">{t.placeholder}</p>}
  <div className="public-columns"><div><ArchiveVisual image={record.photo} label={t.labels.profile + " · " + t.photo} className="story-portrait"/><dl className="public-facts">{fields.map(([key,value])=><div key={key}><dt>{t.labels[key]}</dt><dd>{value}</dd></div>)}<div><dt>{t.labels.status}</dt><dd><ArchiveStatusBadge status={record.status}/></dd></div></dl></div>
  <div className="story-body"><p className="eyebrow">{t.labels.title}</p><h3>{record.title}</h3><h4>{t.labels.summary}</h4><p>{record.summary}</p><h4>{t.labels.story}</h4><p className="story-full">{record.story}</p><h4>{t.labels.supporting}</h4>{record.supporting.length ? <div className="story-supporting">{record.supporting.map(item=><div key={item.href}>{item.image && <ArchiveVisual image={item.image} label={item.title}/>}<Link className="text-link" href={item.href}>{item.title}<span aria-hidden="true">↗</span></Link></div>)}</div> : <div className="public-empty-inline">{t.pending}</div>}</div></div>
 </article>;
}
