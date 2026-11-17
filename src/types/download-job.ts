export type DownloadJobStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CLEANED';

export type DownloadJob = {
  id: number;
  slug: string;
  start: number;
  end: number;
  status: DownloadJobStatus;
  path: string | null;
  error: string | null;
  createdAt: string;
};