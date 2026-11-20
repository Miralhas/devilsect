import LibraryFilters from "@/components/profile/library/library-filters";
import LibraryGrid from "@/components/profile/library/library-grid";
import LibraryHeader from "@/components/profile/library/library-header";
import ProfileHeader from "@/components/profile/profile-header";
import { initialLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { getUserLibraryByUsernameQueryOptions } from "@/service/library/queries/use-get-user-library-by-username";
import { getDynamicProfile } from "@/service/user/api/get-dynamic-profile";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Library"
};

export const instant = false;

const LibraryPage = async (props: PageProps<"/profile/[username]/library">) => {
  const { username } = await props.params;

  const profile = await getDynamicProfile(username);

  if (!profile) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.query(getUserLibraryByUsernameQueryOptions(
    profile.user.username,
    initialLibraryParams
  )).catch(noop);

  return (
    <div className="p-4 md:p-10 space-y-12">
      <ProfileHeader username={username} />
      <div className="w-full space-y-4 md:space-y-10">
        <div className="space-y-4 md:space-y-6 w-full">
          <LibraryHeader profile={profile} />
          <LibraryFilters />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LibraryGrid profile={profile} />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default LibraryPage;
