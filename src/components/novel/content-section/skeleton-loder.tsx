import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="relative grid grid-cols-3 md:grid-cols-6 gap-4 gap-y-6">
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
      <Skeleton className="h-full w-full relative aspect-[2/3]" />
    </div>
  )
}

export default SkeletonLoader;
