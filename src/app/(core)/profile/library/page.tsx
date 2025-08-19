import LibraryTable from "@/components/profile/library/library-table";
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
    <div className="px-4 md:px-10 pt-4 md:pt-6 space-y-4 pb-4">
      <LibraryTable library={library} />
      <p className="text-sm text-muted-foreground text-center">
        Add more stories and keep track of your progress.
      </p>
    </div>
  )
}

export default LibraryPage;
