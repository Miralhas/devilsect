import { env } from "@/env";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";

export const getChapterComments = async ({ chapterSlug, novelSlug }: { novelSlug: string, chapterSlug: string }): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters/${chapterSlug}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}

export const getNovelReviews = async (novelSlug: string): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}