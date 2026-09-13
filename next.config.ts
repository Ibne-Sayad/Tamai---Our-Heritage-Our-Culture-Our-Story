import type {NextConfig} from "next";
const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
let elevated=key?.startsWith("sb_secret_")??false;
if(key?.split(".").length===3){
 try{const payload=JSON.parse(Buffer.from(key.split(".")[1],"base64url").toString("utf8"));elevated=elevated||payload.role==="service_role";}catch{/* Invalid public configuration is handled by the setup state. */}
}
if(elevated)throw new Error("Use only a Supabase public anon/publishable key in NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Secret and service-role keys must never be bundled.");
const nextConfig:NextConfig={};
export default nextConfig;
