import PopularNovels from "@/components/search/popular-novels";
import SearchContent from "@/components/search/search-content";
import SearchInput from "@/components/search/search-input";
import SkeletonLoader from "@/components/search/skeleton-loader";
import { Suspense } from "react";


const SearchPage = () => {
  return (
    <>
      <section className='border border-zinc-50/10 grid grid-rows-[min-content_1fr] bg-secondary/10 p-7 rounded-md min-h-[45vh] space-y-8'>
        <SearchInput />
        <Suspense fallback={<SkeletonLoader />}>
          <SearchContent />
        </Suspense>
      </section>

      <section className="border border-zinc-50/10 bg-secondary/10 p-7 rounded-md self-start">
        <PopularNovels />
      </section>
    </>
  )
}

export default SearchPage;
