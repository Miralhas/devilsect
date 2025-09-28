import { env } from "@/env";
import { ChapterCommentParams, CommentParamsSchema } from "@/lib/schemas/comment-params-schema";
import { buildQueryString } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";

export const getChapterComments = async (params: ChapterCommentParams): Promise<PaginatedQuery<ThreadedComment[]>> => {
  const parsed = CommentParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/novels/${params.novelSlug}/chapters/${params.chapterSlug}/reviews${queryString}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch novel reviews")
  };

  return await res.json() as PaginatedQuery<ThreadedComment[]>;
}