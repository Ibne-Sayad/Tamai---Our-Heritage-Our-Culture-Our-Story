const fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript'),assert=require('node:assert/strict');
function moduleFor(path,requires,env={}){const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};vm.runInNewContext(code,{exports,require:id=>requires[id],process:{env},URL,atob,Buffer});return exports;}
(async()=>{
 const profile={role:'user'};let client=null;let identity={data:{user:null},error:null};let profileResult={data:profile,error:null};
 const guards=moduleFor('src/lib/supabase/guards.ts',{'next/navigation':{redirect:path=>{throw new Error('redirect:'+path)}},'./server':{serverSupabase:async()=>client},'@/types/community':{isReviewer:role=>role==='admin'||role==='moderator'}});
 assert.equal((await guards.requireAccount('/dashboard')).state,'setup');
 client={auth:{getUser:async()=>identity},from:()=>({select:()=>({eq:()=>({single:async()=>profileResult})})})};
 await assert.rejects(()=>guards.requireAccount('/admin',true),/redirect:\/auth\/sign-in/);
 identity={data:{user:{id:'test-user'}},error:null};assert.equal((await guards.requireAccount('/dashboard')).state,'ready');
 assert.equal((await guards.requireAccount('/admin',true)).state,'forbidden');
 for(const role of ['moderator','admin']){profileResult={data:{role},error:null};assert.equal((await guards.requireAccount('/admin',true)).state,'ready');}
 profileResult={data:null,error:{message:'database unavailable'}};assert.equal((await guards.requireAccount('/admin',true)).state,'error');
 identity={data:{user:null},error:{message:'expired'}};await assert.rejects(()=>guards.requireAccount('/dashboard'),/redirect:/);
 const next=moduleFor('src/lib/auth-redirect.ts',{}).safeNext;
 for(const path of ['https://example.invalid','//example.invalid','/dashboard/../../admin','/dashboard\\evil'])assert.equal(next(path),'/dashboard');
 assert.equal(next('/dashboard/profile'),'/dashboard/profile');
 const config=env=>moduleFor('src/lib/supabase/config.ts',{},env).supabaseConfig();
 assert.equal(config({}),null);
 assert.equal(config({NEXT_PUBLIC_SUPABASE_URL:'http://localhost:54321',NEXT_PUBLIC_SUPABASE_ANON_KEY:'sb_secret_test'}),null);
 const service='x.'+Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url')+'.x';
 assert.equal(config({NEXT_PUBLIC_SUPABASE_URL:'http://localhost:54321',NEXT_PUBLIC_SUPABASE_ANON_KEY:service}),null);
 assert.throws(()=>moduleFor('next.config.ts',{}, {NEXT_PUBLIC_SUPABASE_ANON_KEY:'sb_secret_test'}),/must never be bundled/);
 assert.throws(()=>moduleFor('next.config.ts',{}, {NEXT_PUBLIC_SUPABASE_ANON_KEY:service}),/must never be bundled/);
 console.log('PASS: server guards fail closed for guests/users/expired sessions, staff access, safe redirects and secret-key rejection.');
})().catch(e=>{console.error(e);process.exit(1)});
