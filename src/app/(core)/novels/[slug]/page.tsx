import AboutSection from "@/components/novel/novel-detail/about-section";
import InfoSection from "@/components/novel/novel-detail/info-section";
import NovelReviews from "@/components/novel/novel-detail/novel-reviews";
import RelatedNovels from "@/components/novel/novel-detail/related-novels";
import SkeletonLoader from "@/components/novel/novel-detail/related-novels/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { generateNovelJsonLDSchema } from "@/lib/json-ld/novel-schema";
import { SortKey } from "@/lib/schemas/search-params/novel-summaries-params-schema";
import { getAllNovelSlugs } from "@/service/novels/api/get-all-novel-slugs";
import { getNovelBySlug } from "@/service/novels/api/get-novel-by-slug";
import { getNovelSummaries } from "@/service/novels/api/get-novel-summaries";
import { putView } from "@/service/novels/api/put-view";
import { Novel } from "@/types/novel";
import { capitalize, getNovelDescription } from "@/utils/string-utils";
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { Suspense } from "react";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const novels = await getAllNovelSlugs();
  const { results } = novels;
  return results.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: NovelPageProps): Promise<Metadata> {
  "use cache"
  cacheLife('days');

  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  return {
    title: capitalize(novel.title),
    description: getNovelDescription(novel),
  }
}

const NovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  putView(slug);

  const novel = await getNovelBySlug(slug);

  return (
    <section id="main-content" className="min-h-[100vh] pb-10 space-y-6">
      <CachedWrapper novel={novel} />
    </section>
  );
}

const CachedWrapper = async ({ novel }: { novel: Novel }) => {
  'use cache'
  cacheLife('days');

  return (
    <>
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
      <Suspense fallback={<Fallback />}>
        <div className="w-full px-5 md:px-10 mt-24">
          <RelatedNovels genre={novel.genres[0]} className="max-w-[1024px] mx-auto" />
        </div>
      </Suspense>
    </>
  )
}

const Fallback = () => {
  return (
    <div className="w-full px-5 md:px-10 mt-24">
      <SkeletonLoader className="max-w-[1024px]" />
    </div>
  )
}

export default NovelPage;
