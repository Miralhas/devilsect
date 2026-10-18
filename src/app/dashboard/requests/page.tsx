import RequestsCointainer from "@/components/dashboard/requests";
import { requestParamsInitialValues } from "@/lib/schemas/search-params/request-params";
import { getAllRequestsQueryOptions } from "@/service/requests/queries/use-get-requests";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";

const RequestsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.query(
    getAllRequestsQueryOptions(requestParamsInitialValues)
  ).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RequestsCointainer />
    </HydrationBoundary>
  )
}

export default RequestsPage;
