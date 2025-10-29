import RequestsCointainer from "@/components/dashboard/requests";
import { requestParamsInitialValues } from "@/lib/schemas/search-params/request-params";
import { getAllRequestsQueryOptions } from "@/service/requests/queries/use-get-requests";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const RequestsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getAllRequestsQueryOptions(requestParamsInitialValues)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RequestsCointainer />
    </HydrationBoundary>
  )
}

export default RequestsPage;
