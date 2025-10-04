import { AuthorsParams } from "@/lib/schemas/search-params/author-params-schema";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "../api/get-all-authors";
import { infoKeys } from "./query-keys";

export const getAuthorsQueryOptions = (params: AuthorsParams) => queryOptions({
  queryFn: () => getAllAuthors(params),
  queryKey: infoKeys.getAllAuthors(params),
});
export const useGetAuthors = (params: AuthorsParams) => useQuery(getAuthorsQueryOptions(params));