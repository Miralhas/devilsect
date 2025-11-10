import RecentlyAddedSection from "@/components/updates/recently-added-section";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { getLatestQueryOptions, latestInitialParams } from "@/service/info/queries/use-get-latest-chapters";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Updates",
  description: "Recently updated chapters from ongoing web novels and light novels."
};

const UpdatesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getLatestQueryOptions(latestInitialParams))
  return (
    <section className="w-full space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Updates", "/updates")).replace(/</g, '\\u003c'),
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecentlyAddedSection />
      </HydrationBoundary>
    </section>
  )
}

export default UpdatesPage;
