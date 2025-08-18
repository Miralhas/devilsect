'use client'

import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import LibraryFilters from "./library-filters";
import LibraryGrid from "./library-grid";
import LibraryHeader from "./library-header";

const LibraryTable = ({ library }: { library: PaginatedQuery<Library[]> }) => {
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
