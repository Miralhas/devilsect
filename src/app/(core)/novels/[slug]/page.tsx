import AboutSection from "@/components/novel/novel-detail/about-section";
import InfoSection from "@/components/novel/novel-detail/info-section";
import NovelReviews from "@/components/novel/novel-detail/novel-reviews";
import RelatedNovels from "@/components/novel/novel-detail/related-novels";
import SkeletonLoader from "@/components/novel/novel-detail/related-novels/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { generateNovelJsonLDSchema } from "@/lib/json-ld/novel-schema";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getNovelBySlug } from "@/service/novels/api/get-novel-by-slug";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { putView } from "@/service/novels/api/put-view";
import { capitalize, getNovelDescription } from "@/utils/string-utils";
import type { Metadata } from 'next';
import { Suspense } from "react";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const novels = await getNovelSummaries({ size: 50, sort: SortKey.BAYESIAN_RANKING });
  const { results } = novels;
  return results.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: NovelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  return {
    title: capitalize(novel.title),
    description: getNovelDescription(novel),
  }
}

export const revalidate = 86400;

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);

  putView(slug);

  return (
    <section className="min-h-[100vh] pb-10 space-y-6">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateNovelJsonLDSchema(novel)).replace(/</g, '\\u003c'),
        }}
      />

      <InfoSection novel={novel} />
      <AboutSection novel={novel} />
      <Separator orientation="horizontal" className="mb-12" />
      <NovelReviews slug={novel.slug} />
      <Suspense fallback={<SkeletonLoader />}>
        <RelatedNovels genre={novel.genres[0]} />
      </Suspense>
    </section>
  )
}

export default NovelPage;
