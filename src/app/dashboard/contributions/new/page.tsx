import {requireAccount} from "@/lib/supabase/guards";
import {CommunityGate} from "@/components/community-shared";
import {AccountEditorPage} from "@/components/account-editor-page";
export const dynamic="force-dynamic";
export const metadata={title:"New contribution — Tamai",robots:{index:false,follow:false}};
export default async function Page(){const account=await requireAccount("/dashboard/contributions/new");return account.state==="ready"?<AccountEditorPage/>:<CommunityGate state={account.state}/>;}
