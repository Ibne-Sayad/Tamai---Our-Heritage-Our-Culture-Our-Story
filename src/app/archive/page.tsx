import {PublishedArchive} from "@/components/published-archive";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("/archive","Community Archive — Tamai","Community contributions published after review, preserved in their original language.");
export default function Page(){return <PublishedArchive/>;}
