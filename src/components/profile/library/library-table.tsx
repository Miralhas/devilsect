import { mapFilter, mapSortKey } from "@/lib/schemas/user-library-params-schema";
import { redirect } from "next/navigation";
import LibraryFilters from "./library-filters";
import LibraryGrid from "./library-grid";
import LibraryHeader from "./library-header";
import { getUserLibrary } from "@/service/library/api/get-user-library";

type Props = {
  params: {
    size: number;
    filter: string;
    sort: string;
  }
}

const LibraryTable = async ({ params: { filter, size, sort } }: Props) => {
  const library = await getUserLibrary({ filter: mapFilter(filter), size, sort: mapSortKey(sort) }, "no-store");
  if (!library) redirect("/error");

  return (
    <div className="w-full space-y-4 md:space-y-10">
      <div className="space-y-4 md:space-y-6 w-full">
        <LibraryHeader />
        <LibraryFilters />
      </div>
      <LibraryGrid library={library.results} />
    </div>
  )
}

export default LibraryTable;
