import { novelSummariesInitialParams, novelSummariesQueryOptions } from "@/services/novels/client-queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NovelsDataTable from "./novels-data-table";


const DisplayNovels = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(novelSummariesQueryOptions({ params: novelSummariesInitialParams, enabled: true }));
  
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NovelsDataTable />
      </HydrationBoundary>
    </>
  )
}

export default DisplayNovels;
