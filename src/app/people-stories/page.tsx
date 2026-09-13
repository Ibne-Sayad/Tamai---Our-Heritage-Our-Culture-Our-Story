import { PeopleStoriesPage } from "@/components/people-stories-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("/people-stories", "People & Stories — Tamai", "The lives, memories and experiences of Tamai’s people. A bilingual archive framework for family stories, oral histories and community contributions.");
export default function Page(){return <PeopleStoriesPage/>;}
