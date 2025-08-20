'use client'

import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import HistoryGrid from "./history-grid";

const HistoryTable = ({ library }: { library: PaginatedQuery<Library[]> }) => {
  return (
    <div className="w-full space-y-8" >
      <HistoryGrid library={library.results} />
    </div>
  )
}

export default HistoryTable;
