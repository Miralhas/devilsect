'use client'

import FilterButtons from "./filter-buttons";
import FilterSelect from "./filter-select";
import SizeFilter from "./size-filter";
import SortFilter from "./sort-filter";

const LibraryFilters = () => {
  return (
    <section className="flex flex-col md:flex-row gap-2 items-center">
      <div className="block md:hidden w-full">
        <FilterSelect />
      </div>
      <div className="hidden md:block">
        <FilterButtons />
      </div>

      <div className="grid grid-cols-2 w-full md:w-max ml-auto gap-2">
        <SortFilter />
        <SizeFilter />
      </div>
    </section>
  )
}

export default LibraryFilters;
