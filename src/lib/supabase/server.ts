import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import type {Database} from "@/types/database";
import {supabaseConfig} from "./config";
export async function serverSupabase(){
 const config=supabaseConfig();if(!config)return null;
 const jar=await cookies();
 return createServerClient<Database>(config.url,config.key,{cookies:{getAll(){return jar.getAll();},setAll(items){try{items.forEach(({name,value,options})=>jar.set(name,value,options));}catch{/* Server Components rely on proxy refresh. */}}}});
}
