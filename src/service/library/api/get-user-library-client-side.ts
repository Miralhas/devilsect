import { UserLibraryParams, UserLibraryParamsSchema } from "@/lib/schemas/user-library-params-schema";
import { buildQueryString } from "@/lib/utils";
import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";

export const getUserLibraryClientSide = async (params: UserLibraryParams) => {
  const parsed = UserLibraryParamsSchema.parse(params);
  const queryString = buildQueryString(parsed);

  const res = await fetch(`/api/user/library${queryString}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch user novel on library");
  };

  return await res.json() as PaginatedQuery<Library[]>;
}; 