import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamai — Our Heritage, Our Culture, Our Story",
  description: "A community-driven digital archive of Tamai, Belkuchi, Sirajganj, Bangladesh. Explore our history, culture, weaving heritage and community stories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
