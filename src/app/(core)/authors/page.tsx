import AuthorsContainer from "@/components/authors/authors-container";
import AuthorsFilter from "@/components/authors/authors-filter";
import PageHeader from "@/components/page-header";
import { initialAuthorsParams } from "@/lib/schemas/search-params/author-params-schema";
import { getAuthorsQueryOptions } from "@/service/info/queries/use-get-all-authors";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { VenetianMask } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors",
  description: "A curated collection of distinguished authors and their published works.",
};

const AuthorsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getAuthorsQueryOptions({
    ...initialAuthorsParams,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={VenetianMask}
        description="A curated collection of distinguished authors and their published works."
        title="Authors"
        descriptionClassName="text-sm md:text-base"
      />
      <div className="space-y-12">
        <div className="flex justify-end">
          <AuthorsFilter />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AuthorsContainer />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default AuthorsPage;
