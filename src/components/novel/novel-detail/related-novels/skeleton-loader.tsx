import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <section className="w-full px-5 md:px-10">
      <div className="max-w-[1024px] mx-auto w-full space-y-4.5">
        <p className="text-xl md:text-3xl font-semibold tracking-tight text-white">Related Novels</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
          <Skeleton className="h-full w-full relative aspect-[2/3]" />
        </div>
      </div>
    </section>
  )
}

export default SkeletonLoader;
