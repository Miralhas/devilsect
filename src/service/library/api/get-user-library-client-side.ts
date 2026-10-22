'use client'

import { env } from "@/env";
import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/search-params/user-library-params-schema";
import { ApiError } from "@/service/api-error";
import { withAuth } from "@/service/with-auth-request";
import { ApiResponseError } from "@/types/api";
import { AuthState } from "@/types/authentication";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import { buildQueryString } from "@/utils/string-utils";

const request = async (authState: AuthState, params: UserLibraryParams) => {
  const parsed = UserLibraryParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authState.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library${queryString}`;

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });

  if (!res.ok) {
    const data = await res.json() as ApiResponseError;
    throw new ApiError(data);
  }

  return await res.json() as PaginatedQuery<Library[]>;
};

export const getUserLibraryClientSide = withAuth(request);