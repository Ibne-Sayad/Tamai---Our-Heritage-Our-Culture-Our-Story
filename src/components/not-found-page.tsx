"use client";
import Link from "next/link";
import { PublicShell } from "./public-shared";
import { useLanguage } from "./language-provider";
export function NotFoundPage(){const {copy}=useLanguage();const t=copy.public.common;return <PublicShell><section className="container public-not-found"><p className="eyebrow">404</p><h1>{t.notFound}</h1><p>{t.notFoundText}</p><Link className="button button-green" href="/">{t.home}<span aria-hidden="true">←</span></Link></section></PublicShell>;}
