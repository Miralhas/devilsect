import { CommentParams } from "@/lib/schemas/search-params/comment-params-schema";
import { getUserReviews } from "@/service/user/api/get-user-reviews";
import { userKeys } from "@/service/user/queries/query-keys";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props = {
  params: CommentParams;
  session?: RequestCookie;
};

export const getUserReviewsQueryOptions = ({ params, session }: Props) => queryOptions({
  queryFn: () => getUserReviews(params, session),
  queryKey: userKeys.getUserReviews(params),
})

export const useGetUserReviews = (props: Props) => useQuery(getUserReviewsQueryOptions(props));