export const relationships = ["born","family","lived","current","connected"] as const;
export type Relationship = typeof relationships[number];
export const contributionTypes = ["history","story","institution","photo","textile","culture","correction","other"] as const;
export const contributionStatuses = ["draft","submitted","under_review","needs_changes","approved","rejected","published"] as const;
export type ContributionStatus = typeof contributionStatuses[number];
export type Role = "user"|"moderator"|"admin";
export interface Profile { id:string;full_name:string;avatar_url:string|null;relationship_to_tamai:Relationship;para:string;para_other:string;profession:string;current_address:string;school:string;current_city:string;current_country:string;public_profile:boolean;role:Role;created_at:string;updated_at:string; }
export interface Para {id:string;name_en:string;name_bn:string;active:boolean;}
export interface Contribution {id:string;user_id:string;contribution_type:typeof contributionTypes[number];title:string;description:string;approximate_year:string;location_text:string;source_information:string;additional_notes:string;status:ContributionStatus;good_faith:boolean;rights_confirmed:boolean;reviewer_notes:string;created_at:string;updated_at:string;submitted_at:string|null;published_at:string|null;}
export interface Media {id:string;contribution_id:string;user_id:string;bucket:"contribution-images"|"contribution-documents";path:string;original_name:string;created_at:string;}
export interface Member {member_key:string;full_name:string;avatar_url:string|null;para:string;para_bn:string;school:string;current_city:string;current_country:string;relationship_to_tamai:Relationship;join_year:number;}
export type PublishedContribution = Pick<Contribution,"id"|"contribution_type"|"title"|"description"|"approximate_year"|"location_text"|"source_information"|"published_at">;
export interface ReviewEvent {id:number;contribution_id:string;reviewer_id:string;from_status:string;to_status:string;notes:string;created_at:string;}
export function isReviewer(role?:string){return role==="admin"||role==="moderator";}
export function reviewTransitions(status:ContributionStatus):ContributionStatus[]{return status==="submitted"?["under_review","needs_changes","rejected"]:status==="under_review"?["needs_changes","approved","rejected"]:status==="approved"?["published","needs_changes","rejected"]:[];}
