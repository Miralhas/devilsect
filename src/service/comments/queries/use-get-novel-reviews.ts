import { NovelReviewParams } from "@/lib/schemas/search-params/comment-params-schema";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { getNovelReviews } from "../api/get-novel-reviews";
import { reviewKeys } from "./query-keys";

const getNovelReviewsQueryOptions = (params: NovelReviewParams) => infiniteQueryOptions({
  queryFn: ({ pageParam }) => getNovelReviews({ ...params, page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.next,
  queryKey: reviewKeys.getNovelReviews(params),
  initialPageParam: 0,
  structuralSharing: false
})

export const useGetNovelReviews = (params: NovelReviewParams) => useInfiniteQuery(
  getNovelReviewsQueryOptions(params)
);