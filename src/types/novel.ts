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
};

export type NovelStatus = 'ON_GOING' | 'COMPLETED';
export type DisplayStatus = 'On Going' | 'Completed';

export type NovelBanner = {
  src: string;
  name: string;
  description: string;
  status: NovelStatus;
  mc: string;
};
