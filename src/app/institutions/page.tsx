import { pageMetadata } from "@/lib/site";
import { InstitutionsPage } from "@/components/institutions-page";
import "./institutions.css";

export const metadata = pageMetadata("/institutions", "Institutions of Tamai — Community Directory & Archive", "A bilingual directory foundation for Tamai’s educational, religious, commercial, cultural and public service institutions, with sourced records to follow.");
export default function Page() { return <InstitutionsPage/>; }
