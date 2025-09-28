import { UserLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { userKeys } from "@/service/user/queries/query-keys";

export const libraryKeys = {
  all: userKeys.all,
  getUserLibrary: (params: UserLibraryParams) => [...libraryKeys.all, "library", params]
}