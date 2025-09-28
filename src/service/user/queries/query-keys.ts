import { CommentParams } from "@/lib/schemas/comment-params-schema";
import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";

export const userKeys = {
  all: ["user"],
  notificationCount: () => [...userKeys.all, "notifications"],
  allUsers: (params: PaginationSchemaParams) => [...userKeys.all, "list", params],
  userRatingOnNovel: (novelId: number) => [...userKeys.all, "rating", novelId],
  getUserReviews: (params: CommentParams) => [...userKeys.all, "reviews", params],
  getUserComments: (params: CommentParams) => [...userKeys.all, "comments", params],
};