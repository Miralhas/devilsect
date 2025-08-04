import { LucideIcon } from "lucide-react";
import Link from "next/link";

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  viewMore?: { title: string, href: string }
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { title, viewMore } = props;
  return (
    <>
      <div className="flex justify-between items-baseline border-b pb-3">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-gradient-to-r from-red-700/50 to-primary/50 rounded-full">
            <props.icon className="size-4 md:size-5" />
          </div>
          <p className="text-lg md:text-3xl font-bold tracking-tight bg-gradient-to-r from-red-700/80 to-primary bg-clip-text text-transparent">{title}</p>
        </div>
        {viewMore ? (
          <Link href={viewMore.href} className="text-sm md:text-base text-muted-foreground hover:text-zinc-200 transition-colors duration-200">{viewMore.title}</Link>
        ) : null}
      </div>
    </>
  )
}

export default SectionHeader;
