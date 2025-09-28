import { queryOptions, useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/get-genres";
import { infoKeys } from "./query-keys";

const genresQueryOptions = () => queryOptions({
  queryFn: getGenres,
  queryKey: infoKeys.genres()
});
export const useGetGenres = () => useQuery(genresQueryOptions());