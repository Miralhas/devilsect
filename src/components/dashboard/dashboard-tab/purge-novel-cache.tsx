'use client'

import { Button } from "@/components/ui/button";
import { purgeNovelCache } from "@/service/actions";
import { cn } from "@/utils/common-utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const PurgeNovelCache = ({ novelSlug }: { novelSlug: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: purgeNovelCache,
    onSuccess: () => toast.success("Cache purged successfully!")
  })

  return (
    <Button
      onClick={() => mutate(novelSlug)}
      disabled={isPending}
      variant="cool"
      size="sm"
      className={cn("w-full max-w-[130px] text-xs", isPending && "animate-pulse")}
    >
      {isPending ? "Purging..." : "Purge Novel Cache"}
    </Button>
  )
}

export default PurgeNovelCache;
