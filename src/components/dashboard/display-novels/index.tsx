import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/service/novels/queries/use-get-novel-summaries";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";
import NovelsDataTable from "./novels-data-table";

const DisplayNovels = async () => {
  const queryClient = new QueryClient();

  await queryClient.query(novelSummariesQueryOptions({
    params: novelSummariesInitialParams,
    enabled: true
  })).catch(noop);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NovelsDataTable />
      </HydrationBoundary>
    </>
  )
}

export default DisplayNovels;
