"use client";
import { useId } from "react";
import Image from "next/image";
import { useLanguage } from "./language-provider";
import { Icon } from "./icon";
import type { InstitutionCategory, InstitutionRecordData, InstitutionStatus } from "@/types/institution";

export function InstitutionCategoryIcon({ category }: { category: InstitutionCategory }) {
  const paths: Record<InstitutionCategory, React.ReactNode> = {
    education: <path d="M12 5C8 2 3 3 2 4v15c3-2 7-1 10 1 3-2 7-3 10-1V4c-3-2-7-1-10 1Zm0 0v15M5 8l4 1M5 12l4 1M15 9l4-1M15 13l4-1"/>,
    religion: <path d="M4 21V10c0-3 4-4 8-8 4 4 8 5 8 8v11M2 21h20M9 21v-7a3 3 0 0 1 6 0v7M4 10h16"/>,
    commerce: <path d="M3 9 5 3h14l2 6M3 9h18v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9Zm2 6v6h14v-6M9 21v-5h6v5M9 3 8 9M15 3l1 6"/>,
    culture: <path d="M12 21V10M12 15C3 15 2 8 3 5c6 0 9 4 9 10Zm0 0c9 0 10-7 9-10-6 0-9 4-9 10Zm0-5C8 7 9 3 12 1c3 2 4 6 0 9Z"/>,
    services: <path d="M4 21V5h16v16H4ZM9 21v-5h6v5M9 9h6M12 6v6M2 21h20"/>,
    community: <path d="m2 9 10-7 10 7M4 8v13h16V8M9 21v-6h6v6M9 10h6"/>,
  };
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[category]}</svg>;
}

const statusSymbols: Record<InstitutionStatus, string> = { verified: "▤", submitted: "◇", oral: "◌", review: "…" };
export function InstitutionStatusBadge({ status }: { status: InstitutionStatus }) {
  const { copy } = useLanguage();
  return <span className={`institution-status institution-status-${status}`}><span aria-hidden="true">{statusSymbols[status]}</span>{copy.institutionPage.statuses[status].label}</span>;
}

/** Omit record to render a labeled template, never an invented directory entry. */
export function InstitutionRecord({ record }: { record?: InstitutionRecordData }) {
  const { copy, locale } = useLanguage();
  const t = copy.institutionPage;
  const headingId = useId();
  const facts = [
    { label: t.fields.category, value: record ? t.categories[record.category].title : undefined, placeholder: t.placeholders.category },
    { label: t.fields.year, value: record?.establishedYear != null ? new Intl.NumberFormat(locale, { useGrouping: false }).format(record.establishedYear) : undefined, placeholder: t.placeholders.year },
    { label: t.fields.founder, value: record?.founder?.[locale], placeholder: t.placeholders.founder },
    { label: t.fields.location, value: record?.location?.[locale], placeholder: t.placeholders.location },
  ];
  return <article className="institution-record" aria-labelledby={headingId} data-example={!record ? "true" : undefined}>
    {!record && <div className="record-example-notice"><p className="eyebrow">{t.sampleLabel}</p><p>{t.sampleNote}</p></div>}
    <div className="record-title-row"><div><p className="eyebrow">{t.fields.name}</p><h3 id={headingId}>{record?.name[locale] ?? t.placeholders.name}</h3></div><div><p className="record-field-label">{t.fields.status}</p><InstitutionStatusBadge status={record?.status ?? "review"}/></div></div>
    <div className="record-body">
      <div className="record-images"><p className="record-field-label">{t.fields.images}</p>{record?.images?.length ? record.images.map(image => <figure key={image.src}><Image src={image.src} alt={image.alt[locale]} width={960} height={640} unoptimized/>{image.caption && <figcaption>{image.caption[locale]}</figcaption>}</figure>) : <div className="record-photo-placeholder"><Icon kind={5}/><p>{t.placeholders.images}</p></div>}</div>
      <div><dl className="record-facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd className={!fact.value ? "record-pending" : undefined}>{fact.value ?? fact.placeholder}</dd></div>)}</dl><dl className="record-narrative"><div><dt>{t.fields.history}</dt><dd>{record?.shortHistory?.[locale] ?? t.placeholders.history}</dd></div><div><dt>{t.fields.role}</dt><dd>{record?.currentRole?.[locale] ?? t.placeholders.role}</dd></div></dl></div>
    </div>
    <dl className="record-provenance"><div><dt>{t.fields.sourceType}</dt><dd>{record?.sourceType?.[locale] ?? t.placeholders.sourceType}</dd></div><div><dt>{t.fields.contributor}</dt><dd>{record?.contributor?.[locale] ?? t.placeholders.contributor}</dd></div><div><dt>{t.fields.sourceDetails}</dt><dd>{record?.sourceDetails?.[locale] ?? t.placeholders.sourceDetails}</dd></div></dl>
  </article>;
}
