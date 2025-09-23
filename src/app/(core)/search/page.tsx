import type { Metadata } from 'next';
import PopularNovels from "@/components/search/popular-novels";
import SearchContent from "@/components/search/search-content";
import SearchInput from "@/components/search/search-input";

export const metadata: Metadata = {
  title: "Search"
};

const SearchPage = async () => {
  return (
    <>
      <section className='border border-zinc-50/10 grid grid-rows-[min-content_1fr] bg-secondary/10 p-7 rounded-md min-h-[45vh] space-y-8 backdrop-blur-sm'>
        <SearchInput />
        <SearchContent key="search" />
      </section>
      <PopularNovels />
    </>
  )
}

export default SearchPage;
