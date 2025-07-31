import NovelCard from "@/components/novel-card";
import { NOVELS_DATA } from "./data";

const NewReleases = () => {
  return (
    <section className="w-full space-y-3">
      <p className="text-3xl font-bold tracking-tight">New Releases</p>
      <div className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 gap-y-6 md:gap-4">
        {NOVELS_DATA.slice(0,12).map(novel => (
          <NovelCard {...novel} key={novel.id} />
        ))}
      </div>
    </section>
  )
}

export default NewReleases;
