import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";

export const userKeys = {
  all: ["user"],
  notificationCount: () => [...userKeys.all, "notifications"],
  allUsers: (params: PaginationSchemaParams) => [...userKeys.all, "list", params],
  userRatingOnNovel: (novelId: number) => [...userKeys.all, "rating", novelId]
};