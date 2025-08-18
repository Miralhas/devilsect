'use client'

import { Library } from "@/types/library";
import { PaginatedQuery } from "@/types/pagination";
import LibraryGrid from "../library-grid";
import { useLayoutEffect, useRef } from "react";

const LibraryTable = ({ library }: { library: PaginatedQuery<Library[]> }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const id = setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 250);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="w-full" ref={divRef}>
      <LibraryGrid library={library.results} />
    </div>
  )
}

export default LibraryTable;
