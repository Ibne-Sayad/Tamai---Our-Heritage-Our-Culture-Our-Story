import {NextResponse,type NextRequest} from "next/server";
import {serverSupabase} from "@/lib/supabase/server";
import {safeNext} from "@/lib/auth-redirect";
export async function GET(request:NextRequest){
 const client=await serverSupabase();const token=request.nextUrl.searchParams.get("token_hash");const type=request.nextUrl.searchParams.get("type");
 if(client&&token&&(type==="signup"||type==="recovery"||type==="email")){
  const {error}=await client.auth.verifyOtp({token_hash:token,type});
  if(!error)return NextResponse.redirect(new URL(type==="recovery"?"/auth/reset-password":safeNext(request.nextUrl.searchParams.get("next")),request.url));
 }
 return NextResponse.redirect(new URL("/auth/sign-in?error=link",request.url));
}
