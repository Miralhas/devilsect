import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

const NewReleasesSkeletonLoader = () => {
  return (
    <>
      <section className="w-full space-y-4">
        <SectionHeader icon={Clock} title="New Releases" viewMore={{ href: "/", title: "View More" }} />
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex flex-1 flex-col gap-3.5 h-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton className="w-full h-[85px]" key={i} />
            ))}
          </div>
          <div className="grid grid-cols-[repeat(3,minmax(80,115px))] md:grid-cols-[repeat(5,minmax(80,115px))] lg:grid-cols-[repeat(5,minmax(0,115px))] gap-4 justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton className="w-full max-w-[115px] h-[172px] [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block" key={i} />
            ))}
          </div>
        </div>
      </section >
    </>
  )
}

export default NewReleasesSkeletonLoader;
