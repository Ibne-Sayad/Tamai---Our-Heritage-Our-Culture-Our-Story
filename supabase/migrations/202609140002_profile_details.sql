-- Add signup details without removing existing relationship data.
-- Current address is deliberately excluded from community_members.
begin;
alter table public.profiles
 add column profession text not null default '' check(length(profession)<=160),
 add column current_address text not null default '' check(length(current_address)<=500);
create or replace function private.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,full_name,relationship_to_tamai,para,para_other,profession,current_address,public_profile)
 values(new.id, left(coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'),''),'Community member'),120),
 case when new.raw_user_meta_data->>'relationship_to_tamai' in ('born','family','lived','current','connected') then new.raw_user_meta_data->>'relationship_to_tamai' else 'connected' end,
 left(coalesce(nullif(new.raw_user_meta_data->>'para',''),'other'),120),
 left(coalesce(new.raw_user_meta_data->>'para_other',''),120),
 left(trim(coalesce(new.raw_user_meta_data->>'profession','')),160),
 left(trim(coalesce(new.raw_user_meta_data->>'current_address','')),500),
 coalesce(new.raw_user_meta_data->>'public_profile','false')='true');
 return new;
end; $$;

create or replace function public.save_profile(p_data jsonb) returns public.profiles language plpgsql security definer set search_path='' as $$
declare result public.profiles; para_value text:=coalesce(nullif(p_data->>'para',''),'other'); avatar text:=nullif(p_data->>'avatar_url','');
begin
 if auth.uid() is null then raise exception 'unauthorized'; end if;
 if para_value<>'other' and not exists(select 1 from public.paras where id::text=para_value and active) then raise exception 'invalid_para'; end if;
 if avatar is not null and not exists(select 1 from storage.objects where bucket_id='avatars' and name=avatar and (storage.foldername(name))[1]=auth.uid()::text) then raise exception 'invalid_avatar'; end if;
 update public.profiles set full_name=trim(p_data->>'full_name'),
 relationship_to_tamai=coalesce(p_data->>'relationship_to_tamai',relationship_to_tamai),para=para_value,para_other=coalesce(p_data->>'para_other',''),
 profession=trim(coalesce(p_data->>'profession',profession)),current_address=trim(coalesce(p_data->>'current_address',current_address)),
 school=coalesce(p_data->>'school',''),current_city=coalesce(p_data->>'current_city',''),current_country=coalesce(p_data->>'current_country',''),
 avatar_url=avatar,public_profile=coalesce((p_data->>'public_profile')::boolean,false),updated_at=now()
 where id=auth.uid() returning * into result;
 if not found then raise exception 'profile_missing'; end if;
 return result;
end; $$;


commit;
