import {redirect} from "next/navigation";
import {serverSupabase} from "./server";
import {isReviewer} from "@/types/community";
export async function requireAccount(path:string,staff=false){
 const client=await serverSupabase();
 if(!client)return {state:"setup" as const};
 const {data,error}=await client.auth.getUser();
 if(error||!data.user)redirect("/auth/sign-in?next="+encodeURIComponent(path));
 const {data:profile,error:profileError}=await client.from("profiles").select("*").eq("id",data.user.id).single();
 if(profileError||!profile)return {state:"error" as const};
 if(staff&&!isReviewer(profile.role))return {state:"forbidden" as const};
 return {state:"ready" as const,user:data.user,profile};
}
