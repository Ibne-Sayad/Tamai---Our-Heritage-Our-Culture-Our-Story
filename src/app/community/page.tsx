import {CommunityDirectory} from "@/components/community-directory";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("/community","Tamai Community — Member Directory","Meet Tamai-connected community members who have opted to share their profiles.");
export default function Page(){return <CommunityDirectory/>;}
