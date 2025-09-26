import { env } from "@/env";
import { PaginationSchema, PaginationSchemaParams } from "@/lib/schemas/pagination-schema";
import { buildQueryString } from "@/lib/utils";
import { UserInfo } from "@/types/authentication";
import { PaginatedQuery } from "@/types/pagination";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getAllUsers = async (params: PaginationSchemaParams, session?: RequestCookie) => {
  if (!session) throw new Error("Unauthorized: Missing or invalid session");

  const parsedParams = PaginationSchema.parse(params);
  const queryString = buildQueryString(parsedParams);

  const res = await fetch(env.NEXT_PUBLIC_BASE_URL + `/users${queryString}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${session.value}` },
    next: { tags: ["users"] },
  });

  if (!res.ok) throw new Error("failed to fetch users");

  return res.json() as Promise<PaginatedQuery<UserInfo[]>>;
}
