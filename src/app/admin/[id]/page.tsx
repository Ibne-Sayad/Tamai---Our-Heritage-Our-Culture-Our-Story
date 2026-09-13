import {notFound} from "next/navigation";
import {requireAccount} from "@/lib/supabase/guards";
import {serverSupabase} from "@/lib/supabase/server";
import {CommunityGate} from "@/components/community-shared";
import {ReviewPanel} from "@/components/review-panel";
export const dynamic="force-dynamic";
export const metadata={title:"Review contribution — Tamai",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))notFound();const account=await requireAccount("/admin/"+id,true);if(account.state!=="ready")return <CommunityGate state={account.state}/>;const c=await serverSupabase();const{data:record,error}=await c!.from("contributions").select("*").eq("id",id).neq("status","draft").maybeSingle();if(error)return <CommunityGate state="error"/>;if(!record)notFound();const [media,person,events]=await Promise.all([c!.from("contribution_media").select("*").eq("contribution_id",id),c!.from("profiles").select("full_name").eq("id",record.user_id).single(),c!.from("review_events").select("*").eq("contribution_id",id).order("created_at",{ascending:false})]);if(media.error||person.error||events.error)return <CommunityGate state="error"/>;return <ReviewPanel initial={record} media={media.data??[]} contributor={person.data!.full_name} events={events.data??[]} reviewerId={account.user.id}/>;}
