import ProfileHeader from "@/components/profile/profile-header";
import CommentList from "@/components/profile/user-comments-and-reviews/chapter-comment/comment-list";
import CommentsPageHeader from "@/components/profile/user-comments-and-reviews/chapter-comment/comments-page-header";
import { initialCommentParams } from "@/lib/schemas/comment-params-schema";
import { deleteSession, getSession } from "@/lib/sessions";
import { getUserCommentsQueryOptions } from "@/service/comments/queries/use-get-user-comments";
import { getShallowUser } from "@/service/user/api/get-shallow-user";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Comments"
};

const CommentsPage = async () => {
  const session = await getSession();
  const user = await getShallowUser();

  if (!user) {
    await deleteSession();
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserCommentsQueryOptions({ params: initialCommentParams, session }))

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <div className="space-y-6">
        <CommentsPageHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CommentList session={session} user={user} />
        </HydrationBoundary>
      </div>
    </section>
  )
}

export default CommentsPage;
