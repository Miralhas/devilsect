'use client'

import { Button } from "@/components/ui/button";
import { revalidatePath } from "@/service/actions";
import { useRemoveNotification } from "@/service/notifications/mutations/remove-notification-mutation";
import { cn } from "@/utils/common-utils";
import { XIcon } from "lucide-react";

const DeleteNotification = ({ notificationId }: { notificationId: number }) => {
  const { mutate, isPending } = useRemoveNotification();

  const onDelete = () => mutate(notificationId, {
    onSuccess: () => revalidatePath("/profile/inbox"),
  });

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
