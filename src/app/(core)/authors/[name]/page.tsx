import { getAuthorByName } from "@/service/info/api/get-author-by-name";
import { Metadata } from "next";
import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/page-header";
import { UserPenIcon } from "lucide-react";
import AuthorNovels from "@/components/authors/author-novels";
import { getAllAuthors } from "@/service/info/api/get-all-authors";
import { SortKey } from "@/lib/schemas/search-params/author-params-schema";

type Props = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  const { results: authors } = await getAllAuthors({ size: 50, sort: SortKey.COUNT });
  return authors.map(a => ({ name: a.name.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const authorName = decodeURIComponent((await params).name);
  const author = await getAuthorByName(authorName);

  return {
    title: `Author - ${author.name}`,
    description: `Browse the works published by ${author.name}.`,
  }
}

const AuthorPage = async ({ params }: Props) => {
  const authorName = decodeURIComponent((await params).name);
  const author = await getAuthorByName(authorName);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(novelSummariesQueryOptions({
    enabled: true,
    params: {
      ...novelSummariesInitialParams,
      size: 18,
      author: author.name
    }
  }));
  return (
    <>
      <PageHeader
        icon={UserPenIcon}
        title={author.name}
        description={`Browse the works published by ${author.name}.`}
        descriptionClassName="text-sm md:text-base"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuthorNovels author={author} />
      </HydrationBoundary>
    </>
  )
}

export default AuthorPage;
