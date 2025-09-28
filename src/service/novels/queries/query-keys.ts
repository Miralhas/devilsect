import { NovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";

export const novelKeys = {
  all: ["novel"],
  getNovelMetrics: (id: number) => [novelKeys.all, "detail", "metrics", id],
  getNovelSummaries: (params: NovelSummariesParams) => [novelKeys.all, "list", params]
}