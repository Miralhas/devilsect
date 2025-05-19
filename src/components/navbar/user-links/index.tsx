import { BookOpenText, Mail } from "lucide-react";
import Link from "next/link";
import UserAccount from "./user-account";
import { getCurrentUser } from "@/services/authentication/queries";
import LoginButton from "@/components/navbar/login-button";
import UserInbox from "./user-inbox";

const UserLinks = async () => {
  const user = await getCurrentUser();

  if (!user) return <LoginButton />

  return (
    <>
      <Link href="/account/library" className="hidden sm:flex transition-transform duration-100 ease-out transform  text-foreground/70 hover:text-foreground items-center gap-2 relative group hover:scale-[1.03]">
        <BookOpenText className="size-5" />
        <span className="text-sm mb-[2px] font-semibold sr-only md:not-sr-only">Library</span>
      </Link>

      <UserInbox user={user} />

      <div className="w-px h-4 bg-zinc-700" />

      <UserAccount user={user} />
    </>
  )
}

export default UserLinks;
