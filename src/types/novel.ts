import { ChapterSummary } from "./chapter";

export type NovelStatus = 'ON_GOING' | 'COMPLETED';
export type DisplayStatus = 'Ongoing' | 'Completed';

export type NovelSummary = {
  id: number;
  slug: string;
  title: string;
  author: string;
  status: NovelStatus;
  description: string;
  isHidden: boolean;
  chaptersCount: number;
  ratingValue: number | null;
  views: number;
  bayesianScore: number;
  createdAt: string;
};

export type Novel = {
  id: number;
  slug: string;
  title: string;
  author: string;
  status: NovelStatus;
  isHidden: boolean;
  description: string;
  chaptersCount: number;
  metrics: Metrics;
  genres: string[];
  tags: string[];
  firstChapter: ChapterSummary;
  lastChapter: ChapterSummary;
};

export type Metrics = {
  views: number;
  ratingValue: number | null;
  ratingSize: number;
  bayesianScore: number;
};

export type NovelBanner = {
  src: string;
  name: string;
  description: string;
  status: NovelStatus;
  mc: string;
  slug: string;
};

export type EldersChoice = {
  id: number;
  novel: NovelSummary
}

export type Genre = {
  id: number;
  name: string;
  description: string;
  slug: string;
}