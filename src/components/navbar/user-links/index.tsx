'use client'

import LoginButton from "@/components/navbar/login-button";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import UserAccount from "./user-account";
import UserInbox from "./user-inbox";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";

const UserLinks = () => {
  const { data, isLoading, isError } = useCurrentUserQuery();

  if (isLoading || isError || !data) {
    return <LoginButton />
  }

  return (
    <>
      <Link href="/account/library" className="hidden sm:flex transition-transform duration-100 ease-out transform text-foreground/80 hover:text-foreground items-center gap-2 relative group hover:scale-[1.03]">
        <BookOpenText className="size-5" />
        <span className="text-sm mb-[2px]  sr-only md:not-sr-only">Library</span>
      </Link>

      <UserInbox />

      <div className="w-px h-4 bg-zinc-700" />

      <UserAccount user={data} />
    </>
  )
}

export default UserLinks;
