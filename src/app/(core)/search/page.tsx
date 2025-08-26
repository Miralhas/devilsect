import SearchContent from "@/components/search/search-content";
import SearchInput from "@/components/search/search-input";
import SkeletonLoader from "@/components/search/skeleton-loader";
import { Suspense } from "react";


const SearchPage = async () => {

  return (
    <>
      <section className='border border-zinc-50/15 bg-secondary/10 p-7 rounded-md self-start min-h-[50vh] space-y-8'>
        <SearchInput />
        <Suspense fallback={<SkeletonLoader />}>
          <SearchContent />
        </Suspense>
      </section>
      <section className="border border-zinc-50/15 bg-secondary/10 p-7 rounded-md self-start">
        {/* <Suspense fallback={<SkeletonLoader />}>
          <RelatedNovels />
        </Suspense> */}
      </section>
    </>
  )
}

export default SearchPage;
