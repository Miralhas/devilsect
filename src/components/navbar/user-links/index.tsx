'use client'

import LoginButton from "@/components/navbar/login-button";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";
import dynamic from "next/dynamic";

const LibraryLink = dynamic(() => import("./library-link"), { ssr: false, loading: () => <div className="w-[75px]"></div> });
const UserAccount = dynamic(() => import("./user-account"), { ssr: false, loading: () => <div className="w-[20px]"></div> });
const UserInbox = dynamic(() => import("./user-inbox"), { ssr: false, loading: () => <div className="w-[32px]"></div> });

const UserLinks = () => {
  const { data, isLoading, isError } = useCurrentUserQuery();

  if (isLoading || isError || !data) {
    return <LoginButton isLoading={isLoading} />
  }

  return (
    <>
      <LibraryLink />

      <UserInbox />

      <div className="w-px h-4 bg-zinc-700" />

      <UserAccount user={data} />
    </>
  )
}

export default UserLinks;
