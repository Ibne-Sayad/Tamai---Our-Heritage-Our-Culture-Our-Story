"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from "react";
import type {User} from "@supabase/supabase-js";
import {browserSupabase} from "@/lib/supabase/client";
import type {Profile} from "@/types/community";
const AuthContext=createContext<{user:User|null;profile:Profile|null;loading:boolean;refresh:()=>Promise<void>}>({user:null,profile:null,loading:true,refresh:async()=>{}});
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [profile,setProfile]=useState<Profile|null>(null);const [loading,setLoading]=useState(true);const generation=useRef(0);
 async function refresh(){const version=++generation.current;const c=browserSupabase();if(!c){setLoading(false);return;}try{const {data}=await c.auth.getUser();let current:Profile|null=null;if(data.user){const{data:p}=await c.from("profiles").select("*").eq("id",data.user.id).single();current=p;}if(version===generation.current){setUser(data.user);setProfile(current);}}catch{if(version===generation.current){setUser(null);setProfile(null);}}finally{if(version===generation.current)setLoading(false);}}
 useEffect(()=>{const c=browserSupabase();if(!c){setLoading(false);return;}let active=true;void refresh();const {data}=c.auth.onAuthStateChange((event,session)=>{if(!active)return;if(!session){generation.current++;setUser(null);setProfile(null);setLoading(false);}if(event!=="INITIAL_SESSION")setTimeout(()=>{if(active)void refresh();},0);});return()=>{active=false;generation.current++;data.subscription.unsubscribe();};},[]);
 return <AuthContext.Provider value={{user,profile,loading,refresh}}>{children}</AuthContext.Provider>;
}
export function useAuth(){return useContext(AuthContext);}
