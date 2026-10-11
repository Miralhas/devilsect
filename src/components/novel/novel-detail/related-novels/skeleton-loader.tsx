import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/common-utils";

type Props = {
  className?: string
  title?: string;
};

const SkeletonLoader = ({ className, title = "Related Novels" }: Props) => {
  return (
    <div className={cn("mx-auto w-full space-y-4.5", className)}>
      <div className="py-2 border-b border-zinc-50/15">
        <h2 className="text-zinc-300 text-xl md:text-2xl tracking-tight font-medium">{title}</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-10 gap-3">
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
    </div>
  )
}

export default SkeletonLoader;
