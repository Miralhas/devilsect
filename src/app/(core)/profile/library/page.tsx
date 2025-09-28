import LibraryTable from "@/components/profile/library/library-table";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileLoading from "@/components/profile/profile-loading";
import { loadUserLibraryParams } from "@/lib/schemas/search-params/user-library-params-schema";
import { Metadata } from "next";
import type { SearchParams } from 'nuqs/server';
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Your Library"
};

type PageProps = {
  searchParams: Promise<SearchParams>
}

const LibraryPage = async ({ searchParams }: PageProps) => {
  const params = await loadUserLibraryParams(searchParams);

  return (
    <div className="p-4 md:p-10 space-y-12">
      <ProfileHeader />
      <Suspense fallback={<ProfileLoading />}>
        <LibraryTable params={params} />
      </Suspense>
    </div>
  )
}

export default LibraryPage;
