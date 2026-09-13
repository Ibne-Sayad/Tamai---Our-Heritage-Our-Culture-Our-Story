"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Header, Footer } from "./site-shell";
import { Arrow, Icon } from "./icon";
import type { ArchiveImage, ArchiveStatus } from "@/types/archive";

export function PublicShell({ children }: { children: ReactNode }) {
 const { copy } = useLanguage();
 return <><a className="skip-link" href="#main">{copy.skip}</a><Header/><main id="main" className="public-page">{children}</main><Footer/></>;
}
export function PublicHero({ title, subtitle, eyebrow, art, target }: { title: string; subtitle: string; eyebrow: string; art: string; target: string }) {
 const { copy } = useLanguage();
 return <section className="container public-hero" id="page-top"><div><nav className="public-breadcrumb" aria-label={title}><Link href="/">{copy.nav[0]}</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="public-subtitle">{subtitle}</p><a href={target} className="text-link">{copy.public.common.explore}<span aria-hidden="true">↓</span></a></div><div className="public-woven-art" aria-hidden="true"><div className="public-woven-inset"/><p>{art}</p></div></section>;
}
export function ArchiveStatusBadge({ status }: { status: ArchiveStatus }) {
 const { copy } = useLanguage();
 return <span className={`public-status status-${status}`}>{copy.public.common.status[status].label}</span>;
}
export function ArchiveVisual({ image, label, className = "" }: { image?: ArchiveImage; label: string; className?: string }) {
 return image ? <div className={`archive-visual ${className}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async"/></div> : <div className={`archive-visual photo-placeholder ${className}`}><Icon kind={5}/><span>{label}</span></div>;
}
export function PublicCTA({ title, text, button }: { title: string; text: string; button?: string }) {
 const { copy } = useLanguage();
 return <div className="container public-cta"><div><h2>{title}</h2><p>{text}</p></div><Link className="button button-green" href="/contribute">{button ?? copy.public.common.contribute}<Arrow/></Link></div>;
}
