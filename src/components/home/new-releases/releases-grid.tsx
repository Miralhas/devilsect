import NovelCard from "@/components/novel-card";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { NovelSummary } from "@/types/novel";
import Link from "next/link";

type Props = {
  novels: NovelSummary[];
}

const ReleasesGrid = ({ novels }: Props) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
      {novels.map(async (novel) => {
        const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);
        return (
          <Link
            href={`/novels/${novel.slug}`}
            className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block max-w-[115px] self-stretch justify-self-stretch"
            key={novel.id}
          >
            <NovelCard titleClassName="md:text-xs" novelSummary={novel} imageSizes="(max-width: 768px) 25vw, 10vw" blurData64={base64} />
          </Link>
        )
      })}
    </div>
  )
}

export default ReleasesGrid;
