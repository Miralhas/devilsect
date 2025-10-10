import { type NewReplyNotification as Notification } from "@/types/notification";
import { formatDate } from "@/utils/date-utils";
import { MessageCirclePlus } from "lucide-react";
import Link from "next/link";
import DeleteNotification from "./delete-notification";

const NewReplyNotification = ({ notification }: { notification: Notification }) => {
  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-1">
        <Link href={`${notification.uri}/comments`} className="rounded-sm flex items-center justify-center min-w-[45px] h-[45px] overflow-hidden border border-zinc-50/10">
          <MessageCirclePlus className="size-8 text-zinc-300/80 overflow-hidden group-hover:scale-105" />
        </Link>
        <div className="flex flex-col">
          <p className="text-xs text-[10px] text-zinc-300/90 inline-flex gap-1">{formatDate(notification.createdAt)}</p>
          <Link href={`${notification.uri}/comments`} className="inline-flex items-center justify-between gap-1 font-semibold text-xs md:text-sm text-zinc-300 hover:text-zinc-300/80 duration-200 transition-colors capitalize">
            {notification.title}
          </Link>

          <div className="flex items-baseline gap-1 md:max-w-[70%]">
            <p className="text-xs text-[10px] font-light">-</p>
            <div
              className="text-sm text-[13px] text-muted-foreground line-clamp-2"
              dangerouslySetInnerHTML={{ __html: notification.replyCommentContent }}
            >
            </div>
          </div>
        </div>
        <div className="self-center ml-auto md:pr-4">
          <DeleteNotification notificationId={notification.id} />
        </div>
      </div>
    </div>
  )
}

export default NewReplyNotification;
