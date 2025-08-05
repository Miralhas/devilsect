import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const NewReleasesSkeletonLoader = () => {
  return (
    <>
      <section className="w-full space-y-4">
        <div className="flex justify-between items-baseline">
          <p className="text-lg md:text-3xl font-semibold tracking-tight">New Releases</p>
          <Link href="/" className="text-sm md:text-base text-muted-foreground hover:text-zinc-200 transition-colors duration-200">All Releases</Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex flex-1 flex-col gap-3.5 h-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton className="w-full h-[85px]" key={i} />
            ))}
          </div>
          <div className="grid grid-cols-[repeat(3,minmax(80,115px))] md:grid-cols-[repeat(5,minmax(80,115px))] lg:grid-cols-[repeat(5,minmax(0,115px))] gap-4 justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton className="w-[115px] h-[172px]" key={i} />
            ))}
          </div>
        </div>
      </section >
      <section className="w-full space-y-4">
        <div className="w-full h-[628.5px]"></div>
      </section>
    </>
  )
}

export default NewReleasesSkeletonLoader;
