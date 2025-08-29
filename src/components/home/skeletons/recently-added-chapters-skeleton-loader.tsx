import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

const RecentlyAddedChapterSkeletonLoader = () => {
  return (
    <section className="space-y-4 w-full">
      <SectionHeader icon={Clock} title="Recently Added Chapters" viewMore={{ href: "/", title: "View More" }} />
      <div className="grid gap-3">
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex-col gap-1 hidden md:flex">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex-col gap-1 hidden md:flex">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex-col gap-1 hidden md:flex">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex-col gap-1 hidden md:flex">
          <Skeleton className="w-full h-[75px]" />
        </div>
        <div className="w-full flex-col gap-1 hidden md:flex">
          <Skeleton className="w-full h-[75px]" />
        </div>
      </div>
    </section>
  )
}

export default RecentlyAddedChapterSkeletonLoader;
