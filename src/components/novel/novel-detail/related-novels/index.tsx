import NovelCard from "@/components/novel-card";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import Link from "next/link";

const RelatedNovels = async ({ genre }: { genre?: string }) => {
  const related = await getNovelSummaries({ sort: SortKey.NEWEST_RELEASES, genres: genre, size: 6 });
  return (
    <section className="w-full px-5 md:px-10 mt-24">
      <div className="max-w-[1024px] mx-auto w-full space-y-4.5">
        <p className="text-xl md:text-3xl font-semibold tracking-tight">Related Novels</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
    </section>
  )
}

export default RelatedNovels;
