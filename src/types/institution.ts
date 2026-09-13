import type { Locale } from "@/content/translations";

export const institutionCategoryIds = ["education", "religion", "commerce", "culture", "services", "community"] as const;
export type InstitutionCategory = typeof institutionCategoryIds[number];
export const institutionStatuses = ["verified", "submitted", "oral", "review"] as const;
export type InstitutionStatus = typeof institutionStatuses[number];
export type LocalizedInstitutionText = Record<Locale, string>;

/** A future, sourced record. No sample institution is instantiated as real data. */
export interface InstitutionRecordData {
  id: string;
  name: LocalizedInstitutionText;
  category: InstitutionCategory;
  establishedYear?: number;
  founder?: LocalizedInstitutionText;
  location?: LocalizedInstitutionText;
  shortHistory?: LocalizedInstitutionText;
  currentRole?: LocalizedInstitutionText;
  images?: Array<{ src: string; alt: LocalizedInstitutionText; caption?: LocalizedInstitutionText }>;
  sourceType?: LocalizedInstitutionText;
  sourceDetails?: LocalizedInstitutionText;
  contributor?: LocalizedInstitutionText;
  status: InstitutionStatus;
}
