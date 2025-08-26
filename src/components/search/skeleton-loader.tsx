import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
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
