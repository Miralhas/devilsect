import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const RecentlyAddedChapterSkeletonLoader = () => {
  return (
    <section className="space-y-4 w-full">
      <SectionHeader icon={Clock} title="Recently Added Chapters" viewMore={{ href: "/", title: "View More" }} />
      <div className="grid gap-3 [&:nth-child(n+6)]:hidden md:[&:nth-child(n+6)]:block">
        <ChapterSkeleton />
        <ChapterSkeleton />
        <ChapterSkeleton />
        <ChapterSkeleton />
        <ChapterSkeleton />

        <ChapterSkeleton hidden />
        <ChapterSkeleton hidden />
        <ChapterSkeleton hidden />
        <ChapterSkeleton hidden />
        <ChapterSkeleton hidden />
      </div>
    </section>
  )
}


const ChapterSkeleton = ({ hidden }: { hidden?: boolean }) => {
  return (
    <div className={cn("w-full flex flex-col gap-1", { "hidden": hidden })}>
      <Skeleton className="w-full h-[75px]" />
    </div>
  )
}

export default RecentlyAddedChapterSkeletonLoader;
