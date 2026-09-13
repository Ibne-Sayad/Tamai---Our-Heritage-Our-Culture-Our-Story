import {requireAccount} from "@/lib/supabase/guards";
import {CommunityGate} from "@/components/community-shared";
import {ProfileForm} from "@/components/profile-form";
export const dynamic="force-dynamic";
export const metadata={title:"Profile — Tamai",robots:{index:false,follow:false}};
export default async function Page(){const account=await requireAccount("/dashboard/profile");return account.state==="ready"?<ProfileForm initial={account.profile}/>:<CommunityGate state={account.state}/>;}
