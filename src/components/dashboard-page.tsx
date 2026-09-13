"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {useLanguage} from "./language-provider";
import {browserSupabase} from "@/lib/supabase/client";
import {contributionStatuses,type Contribution,type Profile} from "@/types/community";
import {CommunityPage,Pagination} from "./community-shared";
export function DashboardPage({profile}:{profile:Profile}){
 const{copy}=useLanguage();const t=copy.community;const[status,setStatus]=useState("");const[page,setPage]=useState(0);const[rows,setRows]=useState<Contribution[]>([]);const[loading,setLoading]=useState(true);const[error,setError]=useState(false);
 useEffect(()=>{let active=true;const c=browserSupabase();if(!c)return;setLoading(true);let query=c.from("contributions").select("*").eq("user_id",profile.id).order("updated_at",{ascending:false}).order("id").range(page*12,page*12+12);if(status)query=query.eq("status",status as Contribution["status"]);void query.then(({data,error})=>{if(active){setRows(data??[]);setError(!!error);setLoading(false);}});return()=>{active=false;};},[profile.id,status,page]);
 return <CommunityPage title={t.dashboard} intro={profile.full_name}><div className="community-actions"><Link href="/dashboard/profile" className="text-link">{t.profile}</Link><Link href="/dashboard/contributions/new" className="button button-green">{t.newContribution}</Link></div><h2>{t.myContributions}</h2><div className="gallery-filters" role="group" aria-label={t.status}>{["",...contributionStatuses].map(id=><button key={id} aria-pressed={status===id} onClick={()=>{setStatus(id);setPage(0);}}>{id?t.statuses[id as keyof typeof t.statuses]:t.all}</button>)}</div>{loading?<p role="status">{t.loading}</p>:error?<p role="alert">{t.error}</p>:!rows.length?<p className="public-notice">{t.noContributions}</p>:<div className="community-record-list">{rows.slice(0,12).map(row=><article key={row.id}><span className="community-status">{t.statuses[row.status]}</span><h3>{row.title||t.statuses.draft}</h3>{row.reviewer_notes&&<p>{row.reviewer_notes}</p>}<Link className="text-link" href={"/dashboard/contributions/"+row.id}>{t.edit}</Link></article>)}</div>}<Pagination page={page} hasNext={rows.length>12} onChange={setPage}/></CommunityPage>;
}
