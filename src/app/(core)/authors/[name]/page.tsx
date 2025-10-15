import AuthorNovels from "@/components/authors/author-novels";
import PageHeader from "@/components/page-header";
import { generateAuthorJsonLDSchema } from "@/lib/json-ld/author-schema";
import { getAuthorByName } from "@/service/info/api/get-author-by-name";
import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UserPenIcon } from "lucide-react";
import { Metadata } from "next";

type Props = { params: Promise<{ name: string }> };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAuthorJsonLDSchema(author)).replace(/</g, '\\u003c'),
        }}
      />
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
