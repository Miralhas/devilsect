import { PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { AuthorsParams } from "@/lib/schemas/search-params/author-params-schema";
import { TagsParams } from "@/lib/schemas/tags-schema";

export const infoKeys = {
  all: ["info"],
  genres: () => [...infoKeys.all, "genre", "list"],
  tags: (params: TagsParams) => [...infoKeys.all, "tag", "list", params],
  latestChapters: (params: PaginationSchemaParams) => [...infoKeys.all, "latest", "list", params],
  getAllAuthors: (params: AuthorsParams) => [...infoKeys.all, "author", "list", params]
}