import ProfileHeader from "@/components/profile/profile-header";
import ReviewList from "@/components/profile/user-comments-and-reviews/reviews/review-list";
import ReviewPageHeader from "@/components/profile/user-comments-and-reviews/reviews/review-page-header";
import { initialCommentParams } from "@/lib/schemas/comment-params-schema";
import { deleteSession, getSession } from "@/lib/sessions";
import { getShallowUser } from "@/services/authentication/server-queries";
import { getUserReviews } from "@/services/comments/api";
import { redirect } from "next/navigation";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Reviews"
};

const ReviewsPage = async () => {
  const session = await getSession();
  const user = await getShallowUser();

  if (!user) {
    await deleteSession();
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', 'reviews', initialCommentParams],
    queryFn: () => getUserReviews(initialCommentParams, session),
  })

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <div className="space-y-6">
        <ReviewPageHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReviewList session={session} user={user} />
        </HydrationBoundary>
      </div>
    </section>
  )
}

export default ReviewsPage;
