import { env } from "@/env";
import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/user-library-params-schema";
import { getSession } from "@/lib/sessions";
import { buildQueryString } from "@/lib/utils";
import { ApiResponseError } from "@/types/api";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";

export const getUserLibrary = async (
  params: UserLibraryParams, cache: RequestCache = "default"
): Promise<PaginatedQuery<Library[]> | undefined> => {
  const session = await getSession();
  if (!session) return;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${session?.value}`);

  const parsed = UserLibraryParamsSchema.parse(params);

  const queryString = buildQueryString(parsed);

  const url = `${env.NEXT_PUBLIC_BASE_URL}/library${queryString}`

  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
    next: { tags: ["library"] },
    cache
  });

  if (!res.ok) {
    const error: ApiResponseError = await res.json();
    console.error(`Error trying to [GET] user Library: ${error.detail}`);
  }

  return await res.json() as PaginatedQuery<Library[]>;
}