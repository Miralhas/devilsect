'use client'

import { Button } from "@/components/ui/button";
import { purgeNovelCache } from "@/service/dashboard/actions/purge-data-cache";
import { cn } from "@/utils/common-utils";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const PurgeNovelCache = ({ novelSlug }: { novelSlug: string }) => {
  const purgeAction = purgeNovelCache.bind(null, novelSlug)
  const [state, action, pending] = useActionState(purgeAction, false);

  useEffect(() => {
    if (state) toast.success("Cache purged successfully!");
  }, [state]);

  return (
    <Button onClick={() => startTransition(() => action(true))} disabled={pending} variant="cool" size="sm" className={cn("w-full max-w-[130px] text-xs", pending && "animate-pulse")}>
      {pending ? "Purging..." : "Purge Novel Cache"}
    </Button>
  )
}

export default PurgeNovelCache;
