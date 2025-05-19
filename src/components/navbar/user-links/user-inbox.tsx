import { User } from "@/types/authentication";
import { Mail } from "lucide-react";
import Link from "next/link";

const UserInbox = async ({ user }: { user: User }) => {
  
  return (
    <Link href="/account/inbox" className="transition-transform duration-100 ease-out transform flex items-center gap-2 group hover:scale-[1.03] text-foreground/70 hover:text-foreground">
      <div className="relative">
        <span className="text-white rounded-full absolute -top-[11px] -right-[9px] text-[10px] bg-red-900/80 border border-red-500 px-[5px] w-fit h-fit flex items-center justify-center">
          <span className="relative bottom-[1px]">3</span>
        </span>
        <Mail className="size-5" />
      </div>
      <span className="text-sm mb-[2px] font-semibold sr-only">Inbox</span>
    </Link>
  )
}

export default UserInbox;
