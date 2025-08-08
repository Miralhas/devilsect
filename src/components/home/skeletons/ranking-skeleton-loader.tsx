'use client'

import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

const RankingSkeletonLoader = () => {
  return (
    <section className="w-full space-y-4">
      <SectionHeader icon={Trophy} title="Ranking" viewMore={{ href: "/", title: "View More" }} />
      <div className="block md:hidden w-full space-y-3">
        <div className="col-span-1 row-start-1 relative w-full">
          <Skeleton className="w-full max-w-[160px] h-[42px] px-3 py-1.5" />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[75px]" />
        ))}
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 md:grid-rows-[min-content_max-content] gap-x-5 gap-y-7 pb-1">
        <div className="col-span-1 row-start-1 relative w-full">
          <Skeleton className="w-full max-w-[160px] h-[42px] px-3 lg:px-6 py-1.5" />
        </div>
        <div className="col-span-1 row-start-1 relative w-full">
          <Skeleton className="w-full max-w-[160px] h-[42px] px-3 lg:px-6 py-1.5" />
        </div>
        <div className="col-span-1 row-start-1 relative w-full">
          <Skeleton className="w-full max-w-[160px] h-[42px] px-3 lg:px-6 py-1.5" />
        </div>
        <div className="col-span-1 row-start-1 relative w-full">
          <Skeleton className="w-full max-w-[160px] h-[42px] px-3 lg:px-6 py-1.5" />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="col-span-1 space-y-3 w-full" key={index}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-full max-w-[295px] h-[75px]" />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default RankingSkeletonLoader;
