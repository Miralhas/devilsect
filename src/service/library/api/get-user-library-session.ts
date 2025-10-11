import { env } from "@/env";
import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/search-params/user-library-params-schema";
import { ApiResponseError } from "@/types/api";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import { INVALID_SESSION_MESSAGE } from "@/utils/constants";
import { buildQueryString } from "@/utils/string-utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getUserLibrarySession = async (params: UserLibraryParams, session: RequestCookie) => {
  if (!session) throw new Error(INVALID_SESSION_MESSAGE);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const parsed = UserLibraryParamsSchema.parse(params);

  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library${queryString}`

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    console.error(`Error trying to [GET] user Library: ${error.detail}`);
  }

  return await res.json() as PaginatedQuery<Library[]>;
}