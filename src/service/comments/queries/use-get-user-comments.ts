import { CommentParams } from "@/lib/schemas/comment-params-schema";
import { getUserComments } from "@/service/user/api/get-user-comments";
import { userKeys } from "@/service/user/queries/query-keys";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props = {
  params: CommentParams;
  session?: RequestCookie;
};

export const getUserCommentsQueryOptions = ({ params, session }: Props) => queryOptions({
  queryFn: () => getUserComments(params, session),
  queryKey: userKeys.getUserComments(params),
});

export const useGetUserComments = (props: Props) => useQuery(getUserCommentsQueryOptions(props));