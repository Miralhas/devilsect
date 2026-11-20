import { env } from "@/env";
import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/search-params/user-library-params-schema";
import { ApiError } from "@/service/api-error";
import { ApiResponseError } from "@/types/api";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

export const getUserLibraryByUsername = async (username: string, params: UserLibraryParams) => {
  const parsed = UserLibraryParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library/${username}${queryString}`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }

  return await res.json() as PaginatedQuery<Library[]>;
};