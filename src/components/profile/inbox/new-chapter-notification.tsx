import wsrvLoader from "@/components/wsrvLoader";
import { env } from "@/env";
import { type NewChapterNotification as Notification } from "@/types/notification";
import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import Link from "next/link";
import DeleteNotification from "./delete-notification";

const NewChapterNotification = ({ notification }: { notification: Notification }) => {
  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-1 md:items-center">
        <Link href={`/novels/${notification.novelSlug}`} className="rounded-sm min-w-[45px] h-[45px] overflow-hidden border border-zinc-50/10">
          <Image
            loader={wsrvLoader}
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${notification.novelSlug}/image`}
            height={40}
            width={40}
            alt="novel cover"
            className="text-transparent overflow-hidden group-hover:scale-105 object-cover w-[45px] h-[45px]"
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-xs text-[10px] text-zinc-300/90 inline-flex gap-1">{formatDate(notification.createdAt)}</p>
          <Link href={`/novels/${notification.novelSlug}/${notification.chapterSlug}`} className="inline-flex items-center justify-between gap-1 font-semibold text-sm text-zinc-300 group-hover:text-zinc-300/80 duration-200 transition-colors capitalize">
            {notification.title}
          </Link>

          <Link href={`/novels/${notification.novelSlug}/${notification.chapterSlug}`}>
            <div
              className="text-sm text-[13px] text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: notification.description }}
            >
            </div>
          </Link>
        </div>
        <div className="self-center ml-auto md:pr-4">
          <DeleteNotification notificationId={notification.id} />
        </div>
      </div>
    </div>
  )
}

export default NewChapterNotification;
