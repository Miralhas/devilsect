import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { TagsParams } from "@/lib/schemas/tags-schema";

export const infoKeys = {
  all: ["info"],
  genres: () => [...infoKeys.all, "genre", "list"],
  tags: (params: TagsParams) => [...infoKeys.all, "tag", "list", params],
  latestChapters: (params: PaginationSchemaParams) => [...infoKeys.all, "latest", "list", params],
}