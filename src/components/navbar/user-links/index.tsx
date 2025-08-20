'use client'

import LoginButton from "@/components/navbar/login-button";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";
import LibraryLink from "./library-link";
import UserInbox from "./user-inbox";
import UserAccount from "./user-account";

const UserLinks = () => {
  const { data, isLoading, isError } = useCurrentUserQuery();

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
