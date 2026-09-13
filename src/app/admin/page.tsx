import {requireAccount} from "@/lib/supabase/guards";
import {CommunityGate} from "@/components/community-shared";
import {AdminQueue} from "@/components/admin-queue";
export const dynamic="force-dynamic";
export const metadata={title:"Review queue — Tamai",robots:{index:false,follow:false}};
export default async function Page(){const account=await requireAccount("/admin",true);return account.state==="ready"?<AdminQueue/>:<CommunityGate state={account.state}/>;}
