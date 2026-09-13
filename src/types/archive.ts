export type ArchiveStatus = "verified" | "documented" | "oral" | "memory" | "submitted" | "review";
export const archiveStatuses: ArchiveStatus[] = ["verified", "documented", "oral", "memory", "submitted", "review"];
export const storyCategories = ["elders", "weavers", "traders", "teachers", "contributors", "diaspora"] as const;
export const galleryCategories = ["historical", "textile", "village", "institutions", "culture", "people", "documents"] as const;
export type GalleryCategory = typeof galleryCategories[number];
export interface ArchiveImage { src: string; alt: string; }
export interface ArchiveAttachment { href: string; title: string; image?: ArchiveImage; }
export interface StoryRecordData {
  name: string; photo?: ArchiveImage; relationship: string; title: string; summary: string;
  story: string; period: string; role?: string; sourceType: string; contributor: string;
  status: ArchiveStatus; supporting: ArchiveAttachment[]; placeholder?: boolean;
}
export interface GalleryRecord {
  id: string; image?: ArchiveImage; title: string; caption: string; category: GalleryCategory;
  year: string; location: string; source: string; contributor: string; status: ArchiveStatus;
  relatedStory?: { href: string; title: string }; placeholder?: boolean;
}
