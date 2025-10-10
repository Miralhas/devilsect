import { NotificationUnion } from "@/types/notification";
import { InboxIcon } from "lucide-react";
import NewChapterNotification from "./new-chapter-notification";
import NewReplyNotification from "./new-reply-notification";

const renderNotification = (notification: NotificationUnion) => {
  switch (notification.type) {
    case "NEW_CHAPTER": return <NewChapterNotification notification={notification} />;
    case "NEW_REPLY": return <NewReplyNotification notification={notification} />;
  }
}

const Notifications = ({ notifications }: { notifications: NotificationUnion[] }) => {
  const isEmpty = notifications.length <= 0;

  if (isEmpty) {
    return (
      <div className="h-64 flex border flex-col items-center justify-center gap-2 text-muted-foreground">
        <div className="p-5 rounded-full bg-secondary justify-self-center border border-zinc-50/10">
          <InboxIcon className="size-6.5" />
        </div>
        <p className="text-sm md:text-base">Your inbox is empty...</p>
      </div>
    )
  }

  return (
    <div className="p-1 space-y-2.5">
      {notifications.map(notification => (
        <div key={notification.id}>
          <div className="bg-zinc-950/50 border group border-white/10 rounded-lg min-h-[50px] relative transition-all duration-200 ease-in-out">
            <div className="p-1 z-10 bg-accent/50 border border-accent rounded-full absolute -top-1 -left-1"></div>
            {renderNotification(notification)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notifications;
