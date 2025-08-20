import LibraryTable from "@/components/profile/library/library-table";
import ProfileHeader from "@/components/profile/profile-header";
import { loadUserLibraryParams, mapFilter, mapSortKey } from "@/lib/schemas/user-library-params-schema";
import { getUserLibrary } from "@/services/novels/server-queries";
import { redirect } from "next/navigation";
import type { SearchParams } from 'nuqs/server';

type PageProps = {
  searchParams: Promise<SearchParams>
}

const LibraryPage = async ({ searchParams }: PageProps) => {
  const { size, sort, filter } = await loadUserLibraryParams(searchParams);
  const library = await getUserLibrary({ filter: mapFilter(filter), size, sort: mapSortKey(sort) });
  if (!library) redirect("/error");

  return (
    <div className="p-4 md:p-10 space-y-6 md:space-y-12">
      <ProfileHeader />
      <LibraryTable library={library} />
    </div>
  )
}

export default LibraryPage;
