import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";

export const chapterKeys = {
  all: ["novel", "chapter"],
  getNovelChapterSummaries: (params: PaginationSchemaParams & { novelSlug: string }) => [...chapterKeys.all, params]
}