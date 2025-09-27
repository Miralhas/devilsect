import { env } from "@/env";
import { TagsParams, TagsSchema } from "@/lib/schemas/tags-schema";
import { buildQueryString } from "@/lib/utils";
import { Tag } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";

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
