import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { novelKeys } from "@/service/novels/queries/query-keys";

export const chapterKeys = {
  all: [...novelKeys.all, "chapter"],
  getNovelChapterSummaries: (params: PaginationSchemaParams & { novelSlug: string }) => [...chapterKeys.all, params]
}