import { pageMetadata } from "@/lib/site";
import { TextileHeritage } from "@/components/textile-heritage";
import "./textile.css";

export const metadata = pageMetadata("/lungi-textile", "Lungi & Textile Heritage — Tamai", "Explore Tamai’s weaving roots, lungi and power loom identity, the people behind the fabric, and a growing bilingual textile heritage archive.");
export default function TextilePage() { return <TextileHeritage/>; }
