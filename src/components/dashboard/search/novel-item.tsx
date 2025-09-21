import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { NovelSummary } from "@/types/novel";
import Link from "next/link";

const NovelItem = ({ novel }: { novel: NovelSummary }) => {
  return (
    <Link href={`/dashboard/${novel.slug}`} className="pr-1">
      <div className="group w-full border border-zinc-50/15 hover:border-accent/60 hover:bg-primary/10 rounded-md bg-zinc-950/50 p-2 flex gap-3 items-center transition-colors duration-300 ease-in-out hover:text-accent">
        <div className="aspect-[4/4] h-[40px] min-w-[40px] overflow-hidden rounded-none relative">
          <DynamicBlurImage
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`}
            alt={novel.title + " cover"}
            className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 25vw, 10vw"
            default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
          />
        </div>
        <div className="flex-1 gap-0.5 self-stretch flex flex-col py-1">
          <p className="font-bold text-sm text-[12px] md:text-[14px] overflow-hidden capitalize">{novel.title}</p>
          <p className="font-medium text-muted-foreground text-xs overflow-hidden capitalize">{novel.author}</p>
        </div>
      </div>
    </Link>
  )
}

export default NovelItem;
