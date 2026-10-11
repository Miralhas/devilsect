import NovelCard from "@/components/novel-card";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { allowedValues } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { cn } from "@/utils/common-utils";
import Link from "next/link";

const getRandomKey = () => {
  const randint = Math.floor(Math.random() * allowedValues.sort.length);
  return allowedValues.sort[randint];
}

type Props = {
  genre?: string;
  className?: string;
  title?: string;
}

const RelatedNovels = async ({ genre, className, title = "Related Novels" }: Props) => {
  const related = await getNovelSummaries({ sort: getRandomKey(), genres: genre, size: 30 });
  return (
    <div className={cn("space-y-4.5", className)}>
      <div className="py-2 border-b border-zinc-50/15">
        <h2 className="text-zinc-300 text-xl md:text-2xl tracking-tight font-medium">{title}</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-10 gap-3">
        {related.results.map(async (novel) => {
          const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novel.slug}/image`);
          return (
            <Link
              key={novel.id}
              className="group space-y-2 [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:block"
              href={`/novels/${novel.slug}`}>
              <NovelCard novelSummary={novel} size="lg" imageSizes="(max-width: 768px) 30vw, 10vw" blurData64={base64} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedNovels;
