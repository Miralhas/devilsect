'use client'

import CommentSection from "@/components/comments/comment-section";
import NewComment from "@/components/comments/new-comment";
import Loading from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import useCommentActions from "@/hooks/use-comment-actions";
import { useGetNovelReviews } from "@/services/comments/client-queries";
import { User } from "@/types/authentication";
import { CommentInput } from "@/types/threaded-comment";
import { PropsWithChildren } from "react";

const NovelReviews = ({ slug, currentUser }: { slug: string; currentUser?: User }) => {
  const isAuthenticated = currentUser !== undefined;
  const query = useGetNovelReviews({ novelSlug: slug });
  const { handleNewNovelReview } = useCommentActions();


  const onSubmit = (commentInput: CommentInput) => {
    handleNewNovelReview({ commentInput, novelSlug: slug })
  }

  if (query.isLoading || query.isError) {
    return (
      <Layout>
        <Loading className="min-h-[30vh]" />
      </Layout>
    )
  }

  return (
    <Layout>
      <NewComment isAuthenticated={isAuthenticated} onSubmit={onSubmit} />
      <Separator />
      <CommentSection comments={query.data} currentUser={currentUser} />
    </Layout>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="px-5 md:px-10">
      <div className="max-w-[1024px] mx-auto space-y-4">
        <p className="text-xl md:text-2xl font-semibold">User Reviews</p>
        {children}
      </div>
    </section>
  )
}

export default NovelReviews;
