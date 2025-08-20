'use client'

import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import HistoryGrid from "./history-grid";
import { useLayoutEffect, useRef } from "react";

const HistoryTable = ({ library }: { library: PaginatedQuery<Library[]> }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   const id = setTimeout(() => {
  //     if (divRef.current) {
  //       divRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  //     }
  //   }, 250);

  //   return () => clearTimeout(id);
  // }, []);

  return (
    <div className="w-full space-y-8" ref={divRef}>
      <HistoryGrid library={library.results} />
    </div>
  )
}

export default HistoryTable;
