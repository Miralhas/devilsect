import { getSession } from "@/lib/sessions";
import { allUsersInitialParams, allUsersQueryOptions } from "@/service/user/queries/use-get-all-users";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import UsersDataTable from "./users-data-table";

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
