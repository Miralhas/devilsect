import { CommentParams } from "@/lib/schemas/search-params/comment-params-schema";
import { getUserReviews } from "@/service/user/api/get-user-reviews";
import { userKeys } from "@/service/user/queries/query-keys";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Props = {
  params: CommentParams;
  session: string;
};

export const getUserReviewsQueryOptions = ({ params, session }: Props) => queryOptions({
  queryFn: () => getUserReviews(params, session),
  queryKey: userKeys.getUserReviews(params),
})

export const useGetUserReviews = (props: Props) => useQuery(getUserReviewsQueryOptions(props));