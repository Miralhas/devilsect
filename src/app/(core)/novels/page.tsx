import ContentSection from "@/components/novel/content-section";
import PageHeader from "@/components/page-header";
import BlurCenter from "@/components/ui/blur-center";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { novelListInitalParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";
import { Book } from "lucide-react";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "Novels",
  description: "Discover new novels and mastepieces",
};

const NovelsPage = async () => {
  "use cache"
  cacheLife('days');

  const queryClient = new QueryClient();

  await queryClient.query(novelSummariesQueryOptions({
    enabled: true,
    params: { ...novelListInitalParams }
  })).catch(noop);

  return (
    <section id="main-content" className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative p-4 md:pt-12 space-y-10 min-h-screen pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Novels", "/novels")).replace(/</g, '\\u003c'),
        }}
      />
      <BlurCenter opacity="low" />
      <PageHeader description="Discover new novels and mastepieces" icon={Book} title="Novels" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContentSection key="content" />
      </HydrationBoundary>
    </section>
  );
}

export default NovelsPage;
