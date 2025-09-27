import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUserRatingOnNovel } from "../api/get-user-rating-on-novel";
import { userKeys } from "./query-keys";

const getUserRatingOnNovelQueryOptions = (novelId: number) => queryOptions({
  retry: 0,
  refetchOnWindowFocus: false,
  queryFn: () => getUserRatingOnNovel(novelId),
  queryKey: userKeys.userRatingOnNovel(novelId),
});

export const useGetUserRatingOnNovel = (novelId: number) => useQuery(getUserRatingOnNovelQueryOptions(novelId));