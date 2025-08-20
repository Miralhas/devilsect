'use client'

import FilterButtons from "./filter-buttons";
import FilterSelect from "./filter-select";
import SizeFilter from "./size-filter";
import SortFilter from "./sort-filter";

const LibraryFilters = () => {
  return (
    <section className="flex gap-2 items-center flex-wrap">
      <div className="hidden md:block">
        <FilterButtons />
      </div>
      <div className="block md:hidden">
        <FilterSelect />
      </div>
      <SortFilter />
      <SizeFilter />
    </section>
  )
}

export default LibraryFilters;
