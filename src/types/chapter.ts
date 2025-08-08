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
  title: string;
  slug: string;
  body: string;
  novelSlug: string;
  previous: ChapterSummary | null;
  next: ChapterSummary | null;
};