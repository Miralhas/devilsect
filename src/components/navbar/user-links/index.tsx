'use client'

import LoginButton from "@/components/navbar/login-button";
import { useCurrentUser } from "@/service/user/queries/use-get-current-user";
import LibraryLink from "./library-link";
import UserAccount from "./user-account";
import UserInbox from "./user-inbox";

const UserLinks = () => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading || isError || !data) {
    return <LoginButton isLoading={isLoading} />
  }

  return (
    <div className="flex gap-4 items-center md:ms-3">
      <LibraryLink />

      <UserInbox />

      <div className="w-px h-4 bg-zinc-700" />

      <UserAccount user={data} />
    </div>
  )
}

export default UserLinks;
