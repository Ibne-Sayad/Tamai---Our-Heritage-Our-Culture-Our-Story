import {NextResponse,type NextRequest} from "next/server";
import {serverSupabase} from "@/lib/supabase/server";
import {safeNext} from "@/lib/auth-redirect";
export async function GET(request:NextRequest){
 const client=await serverSupabase();const code=request.nextUrl.searchParams.get("code");
 const next=request.nextUrl.searchParams.get("next")==="/auth/reset-password"?"/auth/reset-password":safeNext(request.nextUrl.searchParams.get("next"));
 if(client&&code){const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(next,request.url));}
 return NextResponse.redirect(new URL("/auth/sign-in?error=link",request.url));
}
