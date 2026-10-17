import AuthorsContainer from "@/components/authors/authors-container";
import AuthorsFilter from "@/components/authors/authors-filter";
import PageHeader from "@/components/page-header";
import { generateBreadcrumbJsonLDSchema } from "@/lib/json-ld/bread-crumb-schema";
import { initialAuthorsParams } from "@/lib/schemas/search-params/author-params-schema";
import { getAuthorsQueryOptions } from "@/service/info/queries/use-get-all-authors";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { VenetianMask } from "lucide-react";
import { Metadata } from "next";
import { noop } from '@tanstack/react-query'
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "Authors",
  description: "A curated collection of distinguished authors and their published works.",
};

const AuthorsPage = async () => {
  "use cache"
  cacheLife('weeks');

  const queryClient = new QueryClient();

  await queryClient.query(getAuthorsQueryOptions({
    ...initialAuthorsParams,
  })).catch(noop);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLDSchema("Authors", "/authors")).replace(/</g, '\\u003c'),
        }}
      />
      <PageHeader
        icon={VenetianMask}
        description="A curated collection of distinguished authors and their published works."
        title="Authors"
        descriptionClassName="text-sm md:text-base"
      />
      <div className="space-y-6 md:space-y-8">
        <AuthorsFilter />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AuthorsContainer />
        </HydrationBoundary>
      </div>
    </div>
  );
}

export default AuthorsPage;
