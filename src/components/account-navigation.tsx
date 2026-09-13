"use client";
import Link from "next/link";
import {useRouter,usePathname} from "next/navigation";
import {useState} from "react";
import {useLanguage} from "./language-provider";
import {useAuth} from "./auth-provider";
import {browserSupabase} from "@/lib/supabase/client";
import {isReviewer} from "@/types/community";
export function AccountNavigation(){
 const{copy}=useLanguage();const t=copy.community;const{user,profile,loading,refresh}=useAuth();const router=useRouter();const pathname=usePathname();const[error,setError]=useState(false);const[busy,setBusy]=useState(false);
 return <div className="community-nav"><div className="container community-nav-inner"><Link href="/community" aria-current={pathname==="/community"?"page":undefined}>{t.community}</Link><details className="account-menu"><summary>{t.account}</summary><div>{loading?<span>{t.loading}</span>:user?<><Link href="/dashboard" aria-current={pathname==="/dashboard"?"page":undefined}>{t.dashboard}</Link><Link href="/dashboard/profile" aria-current={pathname==="/dashboard/profile"?"page":undefined}>{t.profile}</Link>{isReviewer(profile?.role)&&<Link href="/admin">{t.admin}</Link>}<button disabled={busy} onClick={async()=>{setBusy(true);setError(false);try{const c=browserSupabase();const result=await c?.auth.signOut();if(result?.error)throw result.error;await refresh();router.replace("/auth/sign-in");router.refresh();}catch{setError(true);}finally{setBusy(false);}}}>{t.signOut}</button></>:<><Link href="/auth/sign-in">{t.signIn}</Link><Link href="/auth/sign-up">{t.join}</Link></>}{error&&<p role="alert">{t.error}</p>}</div></details></div></div>;
}
