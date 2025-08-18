'use client'

import FilterButtons from "./filter-buttons";
import SizeFilter from "./size-filter";
import SortFilter from "./sort-filter";

const LibraryFilters = () => {
  return (
    <section className="flex gap-4 flex-wrap-reverse md:justify-between">
      <FilterButtons />
      <div className="flex gap-4 items-center">
        <SortFilter />
        <SizeFilter />
      </div>
    </section>
  )
}

export default LibraryFilters;
