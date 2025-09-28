import { env } from "@/env";
import { TagsParams, TagsSchema } from "@/lib/schemas/tags-schema";
import { Tag } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

export const getNovelTags = async (params: TagsParams) => {
  const parsed = TagsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/tags${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<Tag[]>
}
