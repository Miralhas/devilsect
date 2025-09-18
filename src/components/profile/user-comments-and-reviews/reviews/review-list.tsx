'use client'

import GenericPagination from "@/components/generic-pagination";
import Loading from "@/components/loading";
import { initialCommentParams, SortKey } from "@/lib/schemas/comment-params-schema";
import { getUserReviews } from "@/services/comments/api";
import { User } from "@/types/authentication";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import UserCommentFilters from "../user-comment-filters";
import UserReviewContainer from "./review";

type Props = {
  user: User;
  session: RequestCookie | undefined;
}

const ReviewList = ({ user, session }: Props) => {
  const [page, setPage] = useState(initialCommentParams["page"]);
  const [sort, setSort] = useState(initialCommentParams["sort"]);

  const { data: reviews, isLoading, isError } = useQuery({
    queryFn: () => getUserReviews({ ...initialCommentParams, page, sort }, session),
    queryKey: ['user', 'reviews', { ...initialCommentParams, page, sort }],
  });

  const handlePage = (page: number) => {
    setPage(page);
  }

  const handleSort = (sort: SortKey) => {
    setSort(sort);
  }

  if (isError) {
    redirect("/error");
  }

  if (isLoading) {
    return (
      <Layout sort={sort} handleSort={handleSort}>
        <Loading />
      </Layout>
    )
  }

  if (reviews && reviews?.results.length < 1) {
    return <Empty />
  }

  return (
    <Layout sort={sort} handleSort={handleSort}>
      <div className="space-y-2.5">
        {reviews?.results.map(review => (
          <UserReviewContainer key={review.id} comment={review} user={user} />
        ))}
      </div>
      {reviews && reviews.totalPages > 1 ? (
        <GenericPagination handlePage={handlePage} query={reviews!} className="mt-7" />
      ) : null}
    </Layout>
  )
}

const Layout = ({ handleSort, sort, children }: PropsWithChildren<{ handleSort: (sort: SortKey) => void; sort: SortKey }>) => {
  return (
    <div className="w-full space-y-5">
      <UserCommentFilters onChangeFilter={handleSort} value={sort} />
      {children}
    </div>
  )
}

const Empty = () => {
  return (
    <div className="h-64 flex border flex-col items-center justify-center gap-2 text-muted-foreground">
      <div className="p-5 rounded-full bg-secondary justify-self-center border border-zinc-50/10">
        <StarIcon className="size-6.5" />
      </div>
      <p className="text-sm md:text-base">No reviews have been written.</p>
    </div>
  )
}

export default ReviewList;
