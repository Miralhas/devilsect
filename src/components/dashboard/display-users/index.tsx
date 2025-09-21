import { allUsersInitialParams, allUsersQueryOptions } from "@/services/authentication/client-queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import UsersDataTable from "./users-data-table";
import { getSession } from "@/lib/sessions";

const DisplayUsers = async () => {
  const session = await getSession();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(allUsersQueryOptions(allUsersInitialParams, session));

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersDataTable session={session} />
      </HydrationBoundary>
    </>
  )
}

export default DisplayUsers;
