import { env } from "@/env";
import { CommentParams, CommentParamsSchema } from "@/lib/schemas/comment-params-schema";
import { buildQueryString } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";

export const getChapterComments = async ({ chapterSlug, novelSlug }: { novelSlug: string, chapterSlug: string }): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/chapters/${chapterSlug}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}

export const getNovelReviews = async (params: CommentParams): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const { novelSlug, ...rest } = CommentParamsSchema.parse(params);
  const queryString = buildQueryString({ ...rest });
  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/reviews${queryString}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch novel reviews");
  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}