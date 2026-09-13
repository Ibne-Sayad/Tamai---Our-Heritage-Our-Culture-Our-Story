"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { publicRoutes } from "@/lib/routes";
import { AccountNavigation } from "./account-navigation";
import { useLanguage } from "./language-provider";

const anchors = ["home", "history", "culture", "textile", "institutions", "stories", "gallery", "contribute"];
function destination(index: number) { return publicRoutes[index]; }
export function Wordmark() {
  const { copy } = useLanguage();
  return <Link href="/" className="wordmark"><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>{copy.name}<span className="brand-dot">.</span></Link>;
}
export function Header() {
  const { copy, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = publicRoutes.findIndex(route => route === pathname);
  return <><AccountNavigation/><header className="site-header"><div className="container header-inner"><Wordmark/>
    <nav aria-label={copy.menu} className="desktop-nav">{copy.nav.map((label, i) => <Link key={anchors[i]} href={destination(i)} aria-current={i === current ? "page" : undefined} className={i === current ? "current" : i === 7 ? "nav-contribute" : ""}>{label}</Link>)}</nav>
    <div className="header-actions"><div className="language-switch" role="group" aria-label={copy.language}><button lang="en" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button><span aria-hidden="true">/</span><button lang="bn" aria-pressed={locale === "bn"} onClick={() => setLocale("bn")}>বাংলা</button></div><button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? copy.close : copy.menu}<span aria-hidden="true">{open ? "×" : "☰"}</span></button></div>
    <nav id="mobile-nav" aria-label={copy.menu} className="mobile-nav" hidden={!open} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".menu-button")?.focus(); } }}>{copy.nav.map((label, i) => <Link key={anchors[i]} href={destination(i)} aria-current={i === current ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
  </div></header></>;
}
export function Footer() {
  const { copy: t } = useLanguage();
  const pathname = usePathname();
  const home = pathname === "/";
  const top = home ? "#home" : pathname === "/history" ? "#history-top" : pathname === "/culture" ? "#culture-top" : pathname === "/lungi-textile" ? "#textile-top" : pathname === "/institutions" ? "#institutions-top" : ["/people-stories", "/gallery", "/contribute"].includes(pathname) ? "#page-top" : "#main";
  return <footer><div className="container"><div className="footer-main"><div><Wordmark/><p className="footer-tagline">{t.tagline}</p><p>{t.footerNote}</p></div><nav aria-label={t.menu}>{t.nav.slice(1).map((name, i) => <Link href={destination(i + 1)} key={name}>{name}</Link>)}</nav></div><div className="footer-bottom"><span>{t.footerPlace}</span><span>{t.footerEnd}</span><a href={top}>{t.backTop} ↑</a></div></div></footer>;
}
