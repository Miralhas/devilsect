'use client'

import { Button } from "@/components/ui/button";
import { purgeDataCache } from "@/service/dashboard/actions/purge-data-cache";
import { cn } from "@/utils/common-utils";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const PurgeCache = () => {
  const [state, action, pending] = useActionState(purgeDataCache, false);

  useEffect(() => {
    if (state) toast.success("Cache purged successfully!");
  }, [state]);

  return (
    <Button onClick={() => startTransition(() => action(true))} disabled={pending} variant="cool" className={cn("w-full max-w-[155px]",pending && "animate-pulse")}>
      {pending ? "Purging..." : "Purge Data Cache"}
    </Button>
  )
}

export default PurgeCache;
