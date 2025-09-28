'use client'

import GenericPagination from "@/components/generic-pagination";
import Loading from "@/components/loading";
import { initialCommentParams, SortKey } from "@/lib/schemas/search-params/comment-params-schema";
import { useGetUserComments } from "@/service/comments/queries/use-get-user-comments";
import { User } from "@/types/authentication";
import { MessageCircleIcon } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import UserCommentFilters from "../user-comment-filters";
import UserChapterCommentContainer from "./user-chapter-comment-container";

type Props = {
  user: User;
  session: RequestCookie | undefined;
}

const CommentList = ({ session, user }: Props) => {
  const [page, setPage] = useState(initialCommentParams["page"]);
  const [sort, setSort] = useState(initialCommentParams["sort"]);

  const { data: comments, isLoading, isError } = useGetUserComments({
    session,
    params: { ...initialCommentParams, page, sort }
  })

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

  if (comments && comments?.results.length < 1) {
    return <Empty />
  }

  return (
    <Layout sort={sort} handleSort={handleSort}>
      <div className="space-y-2.5">
        {comments?.results.map(comment => (
          <UserChapterCommentContainer key={comment.id} comment={comment} user={user} />
        ))}
      </div>
      {comments && comments.totalPages > 1 ? (
        <GenericPagination handlePage={handlePage} query={comments} className="mt-7" />
      ) : null}
    </Layout>
  )
}

const Empty = () => {
  return (
    <div className="h-64 flex border flex-col items-center justify-center gap-2 text-muted-foreground">
      <div className="p-5 rounded-full bg-secondary justify-self-center border border-zinc-50/10">
        <MessageCircleIcon className="size-6.5" />
      </div>
      <p className="text-sm md:text-base">No comments have been written.</p>
    </div>
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

export default CommentList;
