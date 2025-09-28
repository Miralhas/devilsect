import { ChapterCommentParams, NovelReviewParams } from "@/lib/schemas/comment-params-schema"
import { chapterKeys } from "@/service/chapters/queries/query-keys"
import { novelKeys } from "@/service/novels/queries/query-keys"

export const commentKeys = {
  all: [...chapterKeys.all, "comment"],
  getChapterComments: (params: ChapterCommentParams) => [...commentKeys.all, "list", params],
}

export const reviewKeys = {
  all: [...novelKeys.all, "review"],
  getNovelReviews: (params: NovelReviewParams) => [...reviewKeys.all, "list", params],
}
