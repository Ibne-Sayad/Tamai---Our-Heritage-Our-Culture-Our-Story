-- Tamai Phase 2. Apply once to a new Supabase project.
begin;
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, anon;

create table public.paras (
 id uuid primary key default gen_random_uuid(),
 name_en text not null check(length(name_en) between 1 and 120),
 name_bn text not null check(length(name_bn) between 1 and 120),
 active boolean not null default true
);
-- Intentionally no invented para names.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null check(length(trim(full_name)) between 1 and 120),
 avatar_url text,
 relationship_to_tamai text not null check(relationship_to_tamai in ('born','family','lived','current','connected')),
 para text not null default 'other' check(length(para) <= 120),
 para_other text not null default '' check(length(para_other) <= 120),
 school text not null default '' check(length(school)<=160),
 current_city text not null default '' check(length(current_city)<=120),
 current_country text not null default '' check(length(current_country)<=120),
 public_profile boolean not null default false,
 role text not null default 'user' check(role in ('user','moderator','admin')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.contributions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 contribution_type text not null check(contribution_type in ('history','story','institution','photo','textile','culture','correction','other')),
 title text not null default '' check(length(title)<=200),
 description text not null default '' check(length(description)<=30000),
 approximate_year text not null default '' check(length(approximate_year)<=120),
 location_text text not null default '' check(length(location_text)<=200),
 source_information text not null default '' check(length(source_information)<=4000),
 additional_notes text not null default '' check(length(additional_notes)<=4000),
 status text not null default 'draft' check(status in ('draft','submitted','under_review','needs_changes','approved','rejected','published')),
 good_faith boolean not null default false, rights_confirmed boolean not null default false,
 reviewer_notes text not null default '' check(length(reviewer_notes)<=4000),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 submitted_at timestamptz, published_at timestamptz
);
create table public.contribution_media (
 id uuid primary key default gen_random_uuid(),
 contribution_id uuid not null references public.contributions(id) on delete cascade,
 user_id uuid not null references public.profiles(id) on delete cascade,
 bucket text not null check(bucket in ('contribution-images','contribution-documents')),
 path text not null, original_name text not null check(length(original_name)<=200),
 created_at timestamptz not null default now(),
 unique(bucket,path)
);
create table public.review_events (
 id bigint generated always as identity primary key,
 contribution_id uuid not null references public.contributions(id) on delete cascade,
 reviewer_id uuid not null references public.profiles(id),
 from_status text not null, to_status text not null, notes text not null,
 created_at timestamptz not null default now()
);
create index profiles_public_directory on public.profiles(full_name,id) where public_profile;
create index contributions_owner_status on public.contributions(user_id,status,updated_at desc);
create index contributions_queue on public.contributions(status,submitted_at desc,id);
create index media_contribution on public.contribution_media(contribution_id);
create index review_contribution on public.review_events(contribution_id,created_at);

create function private.is_reviewer() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=(select auth.uid()) and role in ('admin','moderator'));
$$;
create function private.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,full_name,relationship_to_tamai,para,para_other,public_profile)
 values(new.id, left(coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'),''),'Community member'),120),
 case when new.raw_user_meta_data->>'relationship_to_tamai' in ('born','family','lived','current','connected') then new.raw_user_meta_data->>'relationship_to_tamai' else 'connected' end,
 left(coalesce(nullif(new.raw_user_meta_data->>'para',''),'other'),120),
 left(coalesce(new.raw_user_meta_data->>'para_other',''),120),
 coalesce(new.raw_user_meta_data->>'public_profile','false')='true');
 return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();

alter table public.paras enable row level security;
alter table public.profiles enable row level security;
alter table public.contributions enable row level security;
alter table public.contribution_media enable row level security;
alter table public.review_events enable row level security;
create policy paras_read on public.paras for select using(active);
create policy profiles_private_read on public.profiles for select to authenticated using(id=(select auth.uid()) or (select private.is_reviewer()));
create policy contributions_private_read on public.contributions for select to authenticated using(user_id=(select auth.uid()) or (status<>'draft' and (select private.is_reviewer())));
create policy media_private_read on public.contribution_media for select to authenticated using(
 exists(select 1 from public.contributions c where c.id=contribution_id and (c.user_id=(select auth.uid()) or (c.status<>'draft' and (select private.is_reviewer())))));
create policy review_read on public.review_events for select to authenticated using((select private.is_reviewer()) or exists(select 1 from public.contributions c where c.id=contribution_id and c.user_id=(select auth.uid())));
-- No direct API INSERT/UPDATE/DELETE grants. Validated functions are the only mutation path.
revoke all on public.profiles,public.contributions,public.contribution_media,public.review_events,public.paras from anon,authenticated;
grant select on public.paras to anon,authenticated;
grant select on public.profiles,public.contributions,public.contribution_media,public.review_events to authenticated;

create function public.save_profile(p_data jsonb) returns public.profiles language plpgsql security definer set search_path='' as $$
declare result public.profiles; para_value text:=coalesce(nullif(p_data->>'para',''),'other'); avatar text:=nullif(p_data->>'avatar_url','');
begin
 if auth.uid() is null then raise exception 'unauthorized'; end if;
 if para_value<>'other' and not exists(select 1 from public.paras where id::text=para_value and active) then raise exception 'invalid_para'; end if;
 if avatar is not null and not exists(select 1 from storage.objects where bucket_id='avatars' and name=avatar and (storage.foldername(name))[1]=auth.uid()::text) then raise exception 'invalid_avatar'; end if;
 update public.profiles set full_name=trim(p_data->>'full_name'),
 relationship_to_tamai=p_data->>'relationship_to_tamai',para=para_value,para_other=coalesce(p_data->>'para_other',''),
 school=coalesce(p_data->>'school',''),current_city=coalesce(p_data->>'current_city',''),current_country=coalesce(p_data->>'current_country',''),
 avatar_url=avatar,public_profile=coalesce((p_data->>'public_profile')::boolean,false),updated_at=now()
 where id=auth.uid() returning * into result;
 if not found then raise exception 'profile_missing'; end if;
 return result;
end; $$;

-- Public projection deliberately excludes user IDs, roles, auth data and private notes.
create function public.community_members(p_search text default '',p_para text default '',p_school text default '',p_country text default '',p_relationship text default '',p_page integer default 0)
returns table(member_key text,full_name text,avatar_url text,para text,para_bn text,school text,current_city text,current_country text,relationship_to_tamai text,join_year integer)
language sql stable security definer set search_path='' as $$
 select md5(p.id::text),p.full_name,p.avatar_url,
 case when p.para='other' then p.para_other else coalesce(pa.name_en,'') end,case when p.para='other' then p.para_other else coalesce(pa.name_bn,'') end,p.school,p.current_city,p.current_country,p.relationship_to_tamai,extract(year from p.created_at)::integer
 from public.profiles p left join public.paras pa on pa.id::text=p.para
 where p.public_profile=true and p.full_name ilike '%'||left(p_search,120)||'%'
 and (p_para='' or p.para=p_para) and (p_school='' or p.school ilike '%'||left(p_school,160)||'%')
 and (p_country='' or p.current_country ilike '%'||left(p_country,120)||'%')
 and (p_relationship='' or p.relationship_to_tamai=p_relationship)
 order by p.full_name,p.id limit 13 offset least(greatest(p_page,0),10000)*12;
$$;

create function public.save_contribution(p_id uuid,p_data jsonb,p_submit boolean default false)
returns public.contributions language plpgsql security definer set search_path='' as $$
declare c public.contributions; target uuid;
begin
 if auth.uid() is null then raise exception 'unauthorized'; end if;
 if p_id is null then
  insert into public.contributions(user_id,contribution_type) values(auth.uid(),p_data->>'contribution_type') returning id into target;
 else target:=p_id; end if;
 select * into c from public.contributions where id=target for update;
 if not found or c.user_id<>auth.uid() or c.status not in ('draft','needs_changes') then raise exception 'not_editable'; end if;
 if p_submit and (length(trim(coalesce(p_data->>'title','')))=0 or length(trim(coalesce(p_data->>'description','')))=0 or length(trim(coalesce(p_data->>'source_information','')))=0 or not coalesce((p_data->>'good_faith')::boolean,false)) then raise exception 'incomplete'; end if;
 if p_submit and exists(select 1 from public.contribution_media where contribution_id=target) and not coalesce((p_data->>'rights_confirmed')::boolean,false) then raise exception 'rights_required'; end if;
 update public.contributions set contribution_type=p_data->>'contribution_type',
 title=coalesce(p_data->>'title',''),description=coalesce(p_data->>'description',''),approximate_year=coalesce(p_data->>'approximate_year',''),
 location_text=coalesce(p_data->>'location_text',''),source_information=coalesce(p_data->>'source_information',''),additional_notes=coalesce(p_data->>'additional_notes',''),
 good_faith=coalesce((p_data->>'good_faith')::boolean,false),rights_confirmed=coalesce((p_data->>'rights_confirmed')::boolean,false),
 status=case when p_submit then 'submitted' else c.status end,submitted_at=case when p_submit then now() else c.submitted_at end,updated_at=now()
 where id=target returning * into c;
 return c;
end; $$;

create function public.review_contribution(p_id uuid,p_status text,p_notes text default '')
returns public.contributions language plpgsql security definer set search_path='' as $$
declare c public.contributions; previous text;
begin
 if not private.is_reviewer() then raise exception 'forbidden'; end if;
 select * into c from public.contributions where id=p_id for update;
 if not found or c.user_id=auth.uid() then raise exception 'forbidden'; end if;
 previous:=c.status;
 if not ((previous='submitted' and p_status in ('under_review','needs_changes','rejected')) or
 (previous='under_review' and p_status in ('needs_changes','approved','rejected')) or
 (previous='approved' and p_status in ('published','needs_changes','rejected'))) then raise exception 'invalid_transition'; end if;
 if p_status in ('needs_changes','rejected') and length(trim(p_notes))=0 then raise exception 'notes_required'; end if;
 update public.contributions set status=p_status,reviewer_notes=p_notes,updated_at=now(),published_at=case when p_status='published' then now() else published_at end where id=p_id returning * into c;
 insert into public.review_events(contribution_id,reviewer_id,from_status,to_status,notes) values(p_id,auth.uid(),previous,p_status,p_notes);
 return c;
end; $$;

create function public.register_media(p_contribution uuid,p_bucket text,p_path text,p_name text) returns public.contribution_media
language plpgsql security definer set search_path='' as $$
declare c public.contributions; result public.contribution_media;
begin
 select * into c from public.contributions where id=p_contribution for update;
 if auth.uid() is null or not found or c.user_id<>auth.uid() or c.status not in ('draft','needs_changes') then raise exception 'forbidden'; end if;
 if p_bucket not in ('contribution-images','contribution-documents') or not exists(select 1 from storage.objects where bucket_id=p_bucket and name=p_path and (storage.foldername(name))[1]=auth.uid()::text and (storage.foldername(name))[2]=p_contribution::text) then raise exception 'invalid_file'; end if;
 if (select count(*) from public.contribution_media where contribution_id=p_contribution)>=7 then raise exception 'file_limit'; end if;
 insert into public.contribution_media(contribution_id,user_id,bucket,path,original_name) values(p_contribution,auth.uid(),p_bucket,p_path,left(p_name,200)) returning * into result;
 return result;
end; $$;
create function public.remove_media(p_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare m public.contribution_media; c public.contributions;
begin
 select * into m from public.contribution_media where id=p_id;
 select * into c from public.contributions where id=m.contribution_id for update;
 if auth.uid() is null or c.user_id is distinct from auth.uid() or c.status not in ('draft','needs_changes') then raise exception 'forbidden'; end if;
 delete from public.contribution_media where id=p_id;
end; $$;

create function public.published_contributions(p_page integer default 0)
returns table(id uuid,contribution_type text,title text,description text,approximate_year text,location_text text,source_information text,published_at timestamptz)
language sql stable security definer set search_path='' as $$
 select c.id,c.contribution_type,c.title,c.description,c.approximate_year,c.location_text,c.source_information,c.published_at
 from public.contributions c where c.status='published' order by c.published_at desc,c.id limit 13 offset least(greatest(p_page,0),10000)*12;
$$;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('avatars','avatars',false,2097152,array['image/jpeg','image/png','image/webp']),
 ('contribution-images','contribution-images',false,5242880,array['image/jpeg','image/png','image/webp']),
 ('contribution-documents','contribution-documents',false,10485760,array['application/pdf']);

create function private.can_read_object(bucket text,object_name text) returns boolean
language sql stable security definer set search_path='' as $$
 select case when bucket='avatars' then
 ((storage.foldername(object_name))[1]=auth.uid()::text or exists(select 1 from public.profiles p where p.public_profile and p.avatar_url=object_name))
 else ((storage.foldername(object_name))[1]=auth.uid()::text) or exists(select 1 from public.contribution_media m join public.contributions c on c.id=m.contribution_id where m.bucket=bucket and m.path=object_name and
 (c.status='published' or c.user_id=auth.uid() or (c.status<>'draft' and private.is_reviewer()))) end;
$$;
create function private.can_write_object(bucket text,object_name text) returns boolean
language plpgsql security definer set search_path='' as $$
declare c public.contributions;
begin
 if auth.uid() is null or (storage.foldername(object_name))[1] is distinct from auth.uid()::text then return false; end if;
 if bucket='avatars' then return storage.extension(object_name) in ('jpg','jpeg','png','webp'); end if;
 if (bucket='contribution-images' and storage.extension(object_name) not in ('jpg','jpeg','png','webp')) or
 (bucket='contribution-documents' and storage.extension(object_name)<>'pdf') then return false; end if;
 if bucket not in ('contribution-images','contribution-documents') then return false; end if;
 select * into c from public.contributions where id::text=(storage.foldername(object_name))[2] for update;
 return found and c.user_id=auth.uid() and c.status in ('draft','needs_changes');
end; $$;
create policy tamai_storage_read on storage.objects for select to anon,authenticated using(bucket_id in ('avatars','contribution-images','contribution-documents') and private.can_read_object(bucket_id,name));
create policy tamai_storage_insert on storage.objects for insert to authenticated with check(private.can_write_object(bucket_id,name));
create policy tamai_storage_delete on storage.objects for delete to authenticated using(private.can_write_object(bucket_id,name));
-- No UPDATE policy: objects use fresh UUID names and cannot overwrite approved evidence.

revoke all on function private.is_reviewer(),private.handle_new_user(),private.can_read_object(text,text),private.can_write_object(text,text) from public,anon,authenticated;
grant execute on function private.is_reviewer() to authenticated;
grant execute on function private.can_read_object(text,text) to anon,authenticated;
grant execute on function private.can_write_object(text,text) to authenticated;
revoke all on function public.save_profile(jsonb),public.save_contribution(uuid,jsonb,boolean),public.review_contribution(uuid,text,text),public.register_media(uuid,text,text,text),public.remove_media(uuid) from public,anon,authenticated;
grant execute on function public.save_profile(jsonb),public.save_contribution(uuid,jsonb,boolean),public.review_contribution(uuid,text,text),public.register_media(uuid,text,text,text),public.remove_media(uuid) to authenticated;
revoke all on function public.community_members(text,text,text,text,text,integer),public.published_contributions(integer) from public;
grant execute on function public.community_members(text,text,text,text,text,integer),public.published_contributions(integer) to anon,authenticated;
commit;
