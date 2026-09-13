import {createServerClient} from "@supabase/ssr";
import {NextResponse,type NextRequest} from "next/server";
import {supabaseConfig} from "@/lib/supabase/config";
export async function proxy(request:NextRequest){
 const config=supabaseConfig();if(!config)return NextResponse.next();
 let response=NextResponse.next({request});
 const client=createServerClient(config.url,config.key,{cookies:{getAll:()=>request.cookies.getAll(),setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options));}}});
 try{await client.auth.getClaims();}catch{/* Protected routes separately validate identity and fail closed. */}
 response.headers.set("Cache-Control","private, no-store");
 return response;
}
export const config={matcher:["/dashboard/:path*","/admin/:path*","/auth/:path*","/contribute"]};
