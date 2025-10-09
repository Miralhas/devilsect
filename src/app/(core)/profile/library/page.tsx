import LibraryFilters from "@/components/profile/library/library-filters";
import LibraryGrid from "@/components/profile/library/library-grid";
import LibraryHeader from "@/components/profile/library/library-header";
import ProfileHeader from "@/components/profile/profile-header";
import { initialLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { getSession } from "@/lib/sessions";
import { getUserLibraryQueryOptionsSession } from "@/service/library/queries/use-get-user-library-with-session";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Library"
};

const LibraryPage = async () => {
  const session = await getSession();

  if (!session) redirect("/error");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserLibraryQueryOptionsSession(initialLibraryParams, session!));

  return (
    <div className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <div className="w-full space-y-4 md:space-y-10">
        <div className="space-y-4 md:space-y-6 w-full">
          <LibraryHeader />
          <LibraryFilters />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LibraryGrid session={session} />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default LibraryPage;
