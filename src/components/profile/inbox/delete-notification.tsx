'use client'

import { Button } from "@/components/ui/button";
import { deleteNotificationAction } from "@/service/notifications/actions/delete-notification-action";
import { cn } from "@/utils/common-utils";
import { XIcon } from "lucide-react";
import { startTransition, useActionState } from "react";

const DeleteNotification = ({ notificationId }: { notificationId: number }) => {
  const [, action, isPending] = useActionState(deleteNotificationAction, { success: undefined });

  const onDelete = () => {
    startTransition(() => action(notificationId));
  }

  return (
    <Button
      variant="pure"
      size='none'
      disabled={isPending}
      onClick={onDelete}
    >
      <XIcon className={cn("text-zinc-300/90 hover:text-white size-4 md:size-5 cursor-pointer", isPending ?? "animate-pulse")} />
    </Button>
  )
}

export default DeleteNotification;
