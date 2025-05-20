import { cn } from "@/lib/utils";
import { useUserNotificationCount } from "@/services/authentication/client-queries";
import { Mail } from "lucide-react";
import Link from "next/link";

const UserInbox = () => {
  const { data, isError, isLoading } = useUserNotificationCount();

  const hasNotifications = data && data?.count > 0;

  return (
    <Link href="/account/inbox" className="transition-transform duration-100 ease-out transform flex items-center gap-2 group hover:scale-[1.03] text-foreground/80 hover:text-foreground">
      <div className="relative">
        {isLoading || isError || !hasNotifications ? null : (
          <span className="text-white rounded-full absolute -top-[11px] -right-[9px] text-[10px] bg-red-900/80 border border-red-500 px-[5px] w-fit h-fit flex items-center justify-center">
            <span className="relative bottom-[1px]">{data.count}</span>
          </span>
        )}
        <Mail className={cn("size-5 group-hover:text-foreground", {"text-zinc-500": !hasNotifications})} />
      </div>
      <span className="text-sm mb-[2px] font-semibold sr-only">Inbox</span>
    </Link>
  )
}

export default UserInbox;
