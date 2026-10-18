import { getAccessToken } from "@/lib/sessions";
import { allUsersInitialParams, allUsersQueryOptions } from "@/service/user/queries/use-get-all-users";
import { dehydrate, HydrationBoundary, noop, QueryClient } from "@tanstack/react-query";
import UsersDataTable from "./users-data-table";

const DisplayUsers = async () => {
  const session = await getAccessToken();
  const queryClient = new QueryClient();

  await queryClient.query(allUsersQueryOptions(
    allUsersInitialParams,
    session
  )).catch(noop);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersDataTable session={session} />
      </HydrationBoundary>
    </>
  )
}

export default DisplayUsers;
