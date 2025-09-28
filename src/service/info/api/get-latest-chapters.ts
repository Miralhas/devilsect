import { env } from "@/env";
import { PaginationSchema, PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { PaginatedQuery } from "@/types/pagination";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import { buildQueryString } from "@/utils/string-utils";

export const getLatestChapters = async (params: PaginationSchemaParams): Promise<PaginatedQuery<RecentlyAddedChapter[]>> => {
  const parsed = PaginationSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/latest-chapters${queryString}`;

  const res = await fetch(url);

  if (!res.ok) {
    const data: ApiResponseError = await res.json();
    throw new ApiError(data);
  }

  return await res.json() as PaginatedQuery<RecentlyAddedChapter[]>;
}