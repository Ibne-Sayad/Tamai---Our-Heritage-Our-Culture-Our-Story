import { pageMetadata, siteName } from "@/lib/site";
import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import "./public-pages.css";
import { ContributionDraftProvider } from "@/components/contribution-draft-provider";
import { LanguageProvider } from "@/components/language-provider";

const headingFont = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], display: "swap", variable: "--font-heading" });
const bodyFont = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const banglaFont = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-bangla" });

export const metadata = pageMetadata("/", siteName, "A community-driven digital heritage project for Tamai, Belkuchi, Sirajganj, Bangladesh. Explore our history, culture, weaving heritage and community stories.");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Grammarly and similar extensions may add body attributes before React hydrates.
  // Suppression is scoped to this element; descendants retain hydration checks.
  return <html lang="en" data-scroll-behavior="smooth" className={`${headingFont.variable} ${bodyFont.variable} ${banglaFont.variable}`}><body suppressHydrationWarning><LanguageProvider><ContributionDraftProvider>{children}</ContributionDraftProvider></LanguageProvider></body></html>;
}
