"use client";
import {useState} from "react";
import Link from "next/link";
import {useLanguage} from "./language-provider";
import {PublicShell,PublicHero,ArchiveStatusBadge} from "./public-shared";
import {SectionHeading} from "./section-heading";
import {archiveStatuses} from "@/types/archive";
import {contributionTypes} from "@/types/community";
import {ContributionEditor} from "./contribution-editor";
export function ContributePage(){
 const{copy}=useLanguage();const t=copy.public.contribution;const c=copy.community;const[type,setType]=useState<typeof contributionTypes[number]>("history");
 return <PublicShell><PublicHero {...t} target="#contribution-types"/><section className="public-intro"><div className="container public-columns"><SectionHeading eyebrow={t.introLabel} title={t.introTitle}/><p>{t.intro}</p></div></section><section className="container section" id="contribution-types"><h2>{t.typesTitle}</h2><div className="contribution-types">{t.types.map((label,i)=><a href="#contribution-form" key={label} onClick={()=>setType(contributionTypes[i])}><span aria-hidden="true">＋</span>{label}<span aria-hidden="true">↓</span></a>)}</div></section><section className="public-tinted section" id="contribution-form"><div className="container contribution-form-layout"><div><SectionHeading eyebrow={t.formLabel} title={t.formTitle}/><p className="public-notice">{c.liveNotice}</p></div><ContributionEditor selectedType={type}/></div></section><section className="container section"><SectionHeading eyebrow={t.futureLabel} title={c.workflowTitle} text={c.workflowText}/><ol className="public-workflow">{t.workflow.map(item=><li key={item}>{item}</li>)}</ol><Link className="text-link" href="/dashboard">{c.dashboard}</Link></section><section className="public-trust section"><div className="container"><div className="public-columns"><SectionHeading eyebrow={t.trustLabel} title={t.trustTitle}/><p>{c.moderationText}</p></div><ol className="moderation-workflow">{t.moderation.map(item=><li key={item}>{item}</li>)}</ol><h3>{t.statusTitle}</h3><p>{t.statusText}</p><dl className="public-status-legend">{archiveStatuses.map(status=><div key={status}><dt><ArchiveStatusBadge status={status}/></dt><dd>{copy.public.common.status[status].text}</dd></div>)}</dl><Link className="text-link" href="/archive">{c.viewArchive}</Link></div></section></PublicShell>;
}
