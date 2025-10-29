import { env } from "@/env";
import { RequestParams, RequestParamsSchema } from "@/lib/schemas/search-params/request-params";
import { PaginatedQuery } from "@/types/pagination";
import { RequestUnion } from "@/types/request";
import { buildQueryString } from "@/utils/string-utils";

export const getAllRequests = async (params: RequestParams) => {
  const parsed = RequestParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);
  const url = `${env.NEXT_PUBLIC_BASE_URL}/requests${queryString}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch requests: ${res.status} ${res.statusText}`);
  }

  return await res.json() as PaginatedQuery<RequestUnion[]>;
}