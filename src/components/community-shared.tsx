"use client";
import {useEffect,useState,type ReactNode} from "react";
import Link from "next/link";
import {PublicShell} from "./public-shared";
import {useLanguage} from "./language-provider";
import {browserSupabase} from "@/lib/supabase/client";
export function CommunityPage({title,intro,children}:{title:string;intro?:string;children:ReactNode}){
 return <PublicShell><section className="container community-page section"><p className="eyebrow">TAMAI · <span lang="bn">তামাই</span></p><h1>{title}</h1>{intro&&<p className="community-lead">{intro}</p>}{children}</section></PublicShell>;
}
export function CommunityGate({state}:{state:"setup"|"error"|"forbidden"}){const {copy}=useLanguage();const t=copy.community;return <CommunityPage title={t.account}><p role="status" className="public-notice">{t[state]}</p><Link className="text-link" href="/">{copy.nav[0]}</Link></CommunityPage>;}
export function Pagination({page,hasNext,onChange}:{page:number;hasNext:boolean;onChange:(page:number)=>void}){const{copy,locale}=useLanguage();const t=copy.community;return <nav className="community-pagination" aria-label={t.page}><button disabled={page===0} onClick={()=>onChange(page-1)}>{t.previous}</button><span>{t.page} {new Intl.NumberFormat(locale).format(page+1)}</span><button disabled={!hasNext} onClick={()=>onChange(page+1)}>{t.next}</button></nav>;}
export function PrivateMedia({bucket,path,label,image=false}:{bucket:string;path:string;label:string;image?:boolean}){
 const [url,setUrl]=useState("");const [failed,setFailed]=useState(false);const{copy}=useLanguage();
 useEffect(()=>{let active=true;setUrl("");setFailed(false);async function sign(){try{const c=browserSupabase();if(!c)return;const {data,error}=await c.storage.from(bucket).createSignedUrl(path,60);if(active){setUrl(data?.signedUrl??"");setFailed(!!error);}}catch{if(active)setFailed(true);}}void sign();const timer=setInterval(()=>void sign(),45000);return()=>{active=false;clearInterval(timer);};},[bucket,path]);
 if(!url)return <span className="community-media-empty">{failed?copy.community.error:copy.community.loading}</span>;
 return image?<img className="community-image" src={url} alt={label} loading="lazy"/>:<a href={url} target="_blank" rel="noopener noreferrer" className="text-link">{label} ↗</a>;
}
