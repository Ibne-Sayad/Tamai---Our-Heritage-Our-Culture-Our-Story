"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {browserSupabase} from "@/lib/supabase/client";
import {contributionStatuses,type Contribution} from "@/types/community";
import {CommunityPage,Pagination} from "./community-shared";
import {useLanguage} from "./language-provider";
export function AdminQueue(){
 const{copy}=useLanguage();const t=copy.community;const[status,setStatus]=useState("submitted");const[page,setPage]=useState(0);const[rows,setRows]=useState<Contribution[]>([]);const[loading,setLoading]=useState(true);const[error,setError]=useState(false);
 useEffect(()=>{let active=true;const c=browserSupabase();if(!c)return;setLoading(true);void c.from("contributions").select("*").eq("status",status as Contribution["status"]).order("submitted_at",{ascending:false}).order("id").range(page*12,page*12+12).then(({data,error})=>{if(active){setRows(data??[]);setError(!!error);setLoading(false);}});return()=>{active=false;};},[status,page]);
 return <CommunityPage title={t.queue} intro={t.staffOnly}><label>{t.status}<select value={status} onChange={e=>{setStatus(e.target.value);setPage(0);}}>{contributionStatuses.filter(s=>s!=="draft").map(s=><option key={s} value={s}>{t.statuses[s]}</option>)}</select></label>{loading?<p role="status">{t.loading}</p>:error?<p role="alert">{t.error}</p>:rows.length?<div className="community-record-list">{rows.slice(0,12).map(c=><article key={c.id}><span className="community-status">{t.statuses[c.status]}</span><h2>{c.title}</h2><Link href={"/admin/"+c.id} className="text-link">{t.review}</Link></article>)}</div>:<p className="public-notice">{t.reviewEmpty}</p>}<Pagination page={page} hasNext={rows.length>12} onChange={setPage}/></CommunityPage>;
}
