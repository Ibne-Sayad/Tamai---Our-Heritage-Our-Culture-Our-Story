import type { Metadata } from "next";
export { publicRoutes } from "./routes";
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
export const siteUrl = new URL(configured);
if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash || siteUrl.pathname !== "/") {
 throw new Error("NEXT_PUBLIC_SITE_URL must be an http(s) site origin, without a path, credentials, query or fragment.");
}
export const siteName = "Tamai — Our Heritage, Our Culture, Our Story";
export function pageMetadata(path: string, title: string, description: string): Metadata {
 const url = new URL(path, siteUrl);
 return {
  metadataBase: siteUrl, title, description, alternates: { canonical: url },
  openGraph: { type: "website", title, description, url, siteName, locale: "en_US", alternateLocale: ["bn_BD"],
   images: [{ url: new URL("/social-preview.png",siteUrl), width:1200, height:630, alt:"Tamai — Our Heritage, Our Culture, Our Story. A woven graphic." }] },
  twitter: { card:"summary_large_image", title, description, images:[new URL("/social-preview.png",siteUrl).toString()] }
 };
}
