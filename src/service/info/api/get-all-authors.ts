import { env } from "@/env";
import { AuthorsParams, AuthorsParamsSchema } from "@/lib/schemas/search-params/author-params-schema";
import { AuthorInfo } from "@/types/novel";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

export const getAllAuthors = async (params: AuthorsParams): Promise<PaginatedQuery<AuthorInfo[]>> => {
  const parsed = AuthorsParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  
  const url = `${env.NEXT_PUBLIC_BASE_URL}/authors${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("failed to fetch novel chapters");
  }

  return await res.json() as Promise<PaginatedQuery<AuthorInfo[]>>;
}