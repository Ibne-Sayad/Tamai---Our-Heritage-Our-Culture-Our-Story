import { GalleryPage } from "@/components/gallery-page";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("/gallery", "Tamai Gallery — Photographs & Visual Records", "A community visual archive for Tamai, with collection spaces for real photographs, documents and the stories behind them.");
export default function Page(){return <GalleryPage/>;}
