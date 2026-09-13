import { pageMetadata } from "@/lib/site";
import { CulturePage } from "@/components/culture-page";
import "./culture.css";
export const metadata = pageMetadata("/culture", "Culture & Traditions — Tamai", "A bilingual community collection in progress for Tamai’s celebrations, family life, food, recreation and everyday memories.");
export default function Page() { return <CulturePage/>; }