import RelatedNovels from "@/components/novel/novel-detail/related-novels";
import SkeletonLoader from "@/components/novel/novel-detail/related-novels/skeleton-loader";
import PageHeader from "@/components/page-header";
import SeriesBooks from "@/components/series/series-books";
import { generateSeriesJsonLDSchema } from "@/lib/json-ld/series-schema";
import { novelListInitalParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { getSeriesBySlug } from "@/service/series/api/get-series-by-slug";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { SquareLibrary } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  return {
    title: `${series.title}`,
    description: `Read '${series.title}' Online for Free,`,
  }
}

const SeriesDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(novelSummariesQueryOptions({
    enabled: true,
    params: {
      ...novelListInitalParams,
      series: series.slug,
    }
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSeriesJsonLDSchema(series)).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={SquareLibrary}
        title={series.title}
        description={""}
        titleClassName="text-2xl"
        descriptionClassName="text-sm md:text-base"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SeriesBooks series={series} />
      </HydrationBoundary>
      <Suspense fallback={<SkeletonLoader className="mt-36" title="Related Books" />}>
        <RelatedNovels genre="book" className="mt-36" title="Related Books" />
      </Suspense>
    </>
  )
}

export default SeriesDetailPage;
