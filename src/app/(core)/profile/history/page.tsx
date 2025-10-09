import HistoryGrid from "@/components/profile/history/history-grid";
import HistoryHeader from "@/components/profile/history/history-header";
import ProfileHeader from "@/components/profile/profile-header";
import { initialHistoryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { getSession } from "@/lib/sessions";
import { getUserLibraryQueryOptionsSession } from "@/service/library/queries/use-get-user-library-with-session";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Reading History"
};

const HistoryPage = async () => {
  const session = await getSession();
  const queryClient = new QueryClient();

  if (!session) {
    redirect("/error")
  }

  await queryClient.prefetchQuery(getUserLibraryQueryOptionsSession(initialHistoryParams, session!));

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <div className="w-full space-y-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HistoryHeader />
          <HistoryGrid session={session!} />
        </HydrationBoundary>
      </div>
    </section>
  )
}

export default HistoryPage;
