'use client'

import { Button } from "@/components/ui/button";
import { revalidatePath } from "@/service/actions";
import { cn } from "@/utils/common-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const PurgeAllCache = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => revalidatePath("/", "layout"),
    onSuccess: () => toast.success("Cache purged successfully!")
  })

  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      variant="cool"
      className={cn("w-full max-w-[155px]", isPending && "animate-pulse")}
    >
      {isPending ? "Purging..." : "Purge Data Cache"}
    </Button>
  )
}

export default PurgeAllCache;
