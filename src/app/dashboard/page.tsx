import {requireAccount} from "@/lib/supabase/guards";
import {CommunityGate} from "@/components/community-shared";
import {DashboardPage} from "@/components/dashboard-page";
export const dynamic="force-dynamic";
export const metadata={title:"Dashboard — Tamai",robots:{index:false,follow:false}};
export default async function Page(){const account=await requireAccount("/dashboard");return account.state==="ready"?<DashboardPage profile={account.profile}/>:<CommunityGate state={account.state}/>;}
