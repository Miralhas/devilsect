import HistoryGrid from "@/components/profile/history/history-grid";
import HistoryHeader from "@/components/profile/history/history-header";
import ProfileHeader from "@/components/profile/profile-header";
import { initialHistoryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { getUserLibraryByUsernameQueryOptions } from "@/service/library/queries/use-get-user-library-by-username";
import { getDynamicProfile } from "@/service/user/api/get-dynamic-profile";
import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Reading History"
};

export const instant = false;

const HistoryPage = async (props: PageProps<"/profile/[username]/history">) => {
  const { username } = await props.params;
  const profile = await getDynamicProfile(username);

  if (!profile) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.query(getUserLibraryByUsernameQueryOptions(
    profile.user.username,
    initialHistoryParams,
  )).catch(noop);

  return (
    <section className="p-4 md:p-10 space-y-12">
      <ProfileHeader username={username} />
      <div className="w-full space-y-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HistoryHeader profile={profile} />
          <HistoryGrid profile={profile} />
        </HydrationBoundary>
      </div>
    </section>
  )
}

export default HistoryPage;
