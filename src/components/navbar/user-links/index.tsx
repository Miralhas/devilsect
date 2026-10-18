'use client'

import LoginButton from "@/components/navbar/login-button";
import { useAuthContext } from "@/contexts/use-auth-context";
import { BookOpenText, HistoryIcon } from "lucide-react";
import Link from "next/link";
import UserAccount from "./user-account";
import UserInbox from "./user-inbox";

const UserLinks = () => {
  const { authState, isLoading } = useAuthContext();

  if (isLoading || !authState) {
    return <LoginButton isLoading={isLoading} />
  }

  return (
    <div className="flex gap-4 items-center shrink-0">
      <Link href="/profile/history" className="hidden sm:flex items-center gap-1 relative text-sm xl:text-[15px] font-light tracking-wide text-foreground/80 hover:text-foreground top-[1px] transition-all ease-in duration-200">
        <HistoryIcon className="size-4.5" />
        History
      </Link>

      <Link href="/profile/library" className="hidden sm:flex items-center relative text-sm xl:text-[15px] font-light tracking-wide text-foreground/80 hover:text-foreground top-[1px] transition-all ease-in duration-200 gap-1.5">
        <BookOpenText className="size-4.5" />
        Library
      </Link>

      <UserInbox />

      <div className="w-px h-4 bg-zinc-700" />

      <UserAccount user={authState.user} />
    </div>
  )
}

export default UserLinks;
