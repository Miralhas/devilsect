import ProfileHeader from "@/components/profile/profile-header";
import CommentList from "@/components/profile/user-comments-and-reviews/chapter-comment/comment-list";
import CommentsPageHeader from "@/components/profile/user-comments-and-reviews/chapter-comment/comments-page-header";
import { initialCommentParams } from "@/lib/schemas/comment-params-schema";
import { deleteSession, getSession } from "@/lib/sessions";
import { getShallowUser } from "@/services/authentication/server-queries";
import { getUserComments } from "@/services/comments/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const CommentsPage = async () => {
  const session = await getSession();
  const user = await getShallowUser();

  if (!user) {
    await deleteSession();
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', 'comments', initialCommentParams],
    queryFn: () => getUserComments(initialCommentParams, session),
  })

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <CommentsPageHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentList session={session} user={user} />
      </HydrationBoundary>
    </section>
  )
}

export default CommentsPage;
