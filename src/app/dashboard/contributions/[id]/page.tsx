import {notFound} from "next/navigation";
import {requireAccount} from "@/lib/supabase/guards";
import {serverSupabase} from "@/lib/supabase/server";
import {CommunityGate} from "@/components/community-shared";
import {AccountEditorPage} from "@/components/account-editor-page";
export const dynamic="force-dynamic";
export const metadata={title:"Contribution — Tamai",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))notFound();const account=await requireAccount("/dashboard/contributions/"+id);if(account.state!=="ready")return <CommunityGate state={account.state}/>;const c=await serverSupabase();const{data,error}=await c!.from("contributions").select("*").eq("id",id).eq("user_id",account.user.id).maybeSingle();if(error)return <CommunityGate state="error"/>;if(!data)notFound();return <AccountEditorPage initial={data}/>;}
