import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
}

const CarouselSkeleton = ({icon, title }: Props) => {
  return (
    <section className="w-full space-y-4">
      <SectionHeader icon={icon} title={title} />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-4" id="elders-choice-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="w-full relative aspect-[2/3]" key={i}>
            <Skeleton className="h-full w-full col-span-1" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CarouselSkeleton;
