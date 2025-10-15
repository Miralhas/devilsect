import { ChapterSummary } from "./chapter";

export type DisplayStatus = 'Ongoing' | 'Completed';
export type NovelStatus = 'ON_GOING' | 'COMPLETED';

export type NovelSummary = {
  id: number;
  slug: string;
  title: string;
  alias: string | null;
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
  alias: string | null;
  title: string;
  author: string;
  status: NovelStatus;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
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

export type Tag = {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export type NovelInfo = {
  id: number;
  slug: string;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  chaptersCount: number;
}

export type AuthorInfo = {
  name: string;
  novelsCount: number;
}