export type ChapterSummary = {
  id: number;
  title: string;
  slug: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type Chapter = {
  id: number;
  novelId: number;
  title: string;
  slug: string;
  body: string;
  number: number;
  novelSlug: string;
  previous: ChapterSummary | null;
  next: ChapterSummary | null;
  novelChaptersCount: number;
};