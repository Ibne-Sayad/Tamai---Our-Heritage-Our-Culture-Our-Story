import type { Profile,Para,Contribution,Media,Member,PublishedContribution,ReviewEvent } from "./community";
export type Json = string|number|boolean|null|{[key:string]:Json|undefined}|Json[];
type Table<T> = {Row:{[K in keyof T]:T[K]};Insert:never;Update:never;Relationships:[]};
export type Database = { public:{
 Tables:{profiles:Table<Profile>;paras:Table<Para>;contributions:Table<Contribution>;contribution_media:Table<Media>;review_events:Table<ReviewEvent>};
 Views:Record<string,never>;Enums:Record<string,never>;CompositeTypes:Record<string,never>;
 Functions:{
 save_profile:{Args:{p_data:Json};Returns:Profile[]};
 save_contribution:{Args:{p_id:string|null;p_data:Json;p_submit:boolean};Returns:Contribution[]};
 review_contribution:{Args:{p_id:string;p_status:string;p_notes:string};Returns:Contribution[]};
 register_media:{Args:{p_contribution:string;p_bucket:string;p_path:string;p_name:string};Returns:Media[]};
 remove_media:{Args:{p_id:string};Returns:undefined};
 community_members:{Args:{p_search?:string;p_para?:string;p_school?:string;p_country?:string;p_relationship?:string;p_page?:number};Returns:Member[]};
 published_contributions:{Args:{p_page?:number};Returns:PublishedContribution[]};
 }
}};
