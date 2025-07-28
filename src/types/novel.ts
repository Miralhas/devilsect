export type NovelStatus = 'ON_GOING' | 'COMPLETED';
export type DisplayStatus = 'On Going' | 'Completed';

export type NovelBanner = {
  src: string;
  name: string;
  description: string;
  status: NovelStatus;
  mc: string;
};
