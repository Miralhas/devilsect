'use client'

import Comment from "@/components/comments/comment-section/comment";
import Filter from "@/components/comments/comment-section/filter";
import NewComment from "@/components/comments/new-comment";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCommentActions from "@/hooks/use-comment-actions";
import { SortKey } from "@/lib/schemas/comment-params-schema";
import { useGetChapterComments } from "@/services/comments/client-queries";
import { User } from "@/types/authentication";
import { CommentInput } from "@/types/threaded-comment";
import { FrownIcon } from "lucide-react";
import { Fragment, PropsWithChildren, useState } from "react";

const ChapterComments = ({ chapterSlug, novelSlug, currentUser }: { chapterSlug: string; novelSlug: string; currentUser?: User }) => {
  const isAuthenticated = currentUser !== undefined;
  const [selectedFilter, setSelectedFilter] = useState<SortKey>(SortKey.TOP);
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetChapterComments({ chapterSlug, novelSlug, size: 5, sort: selectedFilter });
  const { handleNewChapterComment } = useCommentActions();


  const onSubmit = (commentInput: CommentInput) => {
    handleNewChapterComment({ commentInput, novelSlug, chapterSlug });
  }

  const isEmpty = !data?.pages[0].results.length;

  if (isLoading || isError) {
    return (
      <Layout>
        <Loading className="min-h-[30vh]" />
      </Layout>
    )
  }

  if (isEmpty) {
    return (
      <Layout>
        <NewComment isAuthenticated={isAuthenticated} onSubmit={onSubmit} />
        <Separator />
        <Empty />
      </Layout>
    )
  }

  return (
    <Layout>
      <NewComment isAuthenticated={isAuthenticated} onSubmit={onSubmit} />
      <Separator />
      <Filter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <div className="w-full space-y-3 md:space-y-3">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map(c => (
              <Comment key={c.id} comment={c} currentUser={currentUser} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="gradient"
          className="rounded-sm w-full max-w-xs"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More Comments'
              : 'No more comments to load'}
        </Button>
      </div>
    </Layout>
  )
}


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="space-y-4">
      <p className="text-xl md:text-2xl font-semibold">User Comments</p>
      {children}
    </section>
  )
}

const Empty = () => {
  return (
    <div className="grid place-items-center min-h-[30vh] border border-zinc-50/10">
      <div className="text-center">
        <div className="size-12 rounded-full flex items-center justify-center bg-secondary/50 border border-zinc-50/15 mx-auto mb-2">
          <FrownIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-zinc-300 font-semibold md:text-lg">No comments yet</p>
        <p className="text-muted-foreground text-sm">Join the community and start a discussion thread.</p>
      </div>
    </div>
  )
}

export default ChapterComments;
