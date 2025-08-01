import NovelCard from "@/components/novel-card";
import { SortKey } from "@/lib/schemas/novel-summaies-params-schema";
import { getNovelSummariesPaginated } from "@/services/novels/server-queries";
import Link from "next/link";

const NewReleases = async () => {
  const res = await getNovelSummariesPaginated({ size: 12, sort: SortKey.NEWEST_RELEASES });

  return (
    <section className="w-full space-y-3">
      <div className="flex justify-between items-baseline">
        <p className="text-3xl font-bold tracking-tight">New Releases</p>
        <Link href="/" className="text-muted-foreground hover:text-zinc-200 transition-colors duration-200">All Releases</Link>
      </div>
      <div className="h-[25rem] flex flex-col lg:flex-row">
        <div className="flex flex-1 flex-col gap-3 h-full py-3 pe-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="w-full h-[85px] border rounded-xl bg-muted-foreground/5 px-4 py-3 flex gap-3 items-center transition-transform duration-200 ease-in-out hover:translate-x-1 hover:-translate-y-1" key={index}>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(3,minmax(80,115px))] md:grid-cols-[repeat(5,minmax(80,115px))] lg:grid-cols-[repeat(5,minmax(80,115px))] gap-4 py-4 lg:ps-4 justify-around place-items-stretch">
          {res.results.map(novel => (
            <NovelCard {...novel} key={novel.id} />
          ))}
        </div>
      </div>
    </section >
  )
}

export default NewReleases;
