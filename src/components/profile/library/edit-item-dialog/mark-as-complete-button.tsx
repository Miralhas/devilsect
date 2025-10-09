'use client'

import { Button } from "@/components/ui/button";
import { revalidateFetchTag } from "@/service/library/actions/revalidate-fetch-tag";
import { setNovelLibraryCompleteAction } from "@/service/library/actions/set-novel-library-complete-action";
import { libraryKeys } from "@/service/library/queries/query-keys";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2Icon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const MarkAsCompleteButton = ({ close, library: { novelSlug, novelTitle } }: { library: Library, close: () => void }) => {
  const [state, action, isPending] = useActionState(setNovelLibraryCompleteAction, { success: undefined });
  const client = useQueryClient();

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      close()
      revalidateFetchTag();
      client.invalidateQueries({ queryKey: libraryKeys.all });
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state, client]);

  const handleAction = () => {
    startTransition(() => action({ novelSlug, novelTitle }));
  }

  return (
    <Button
      variant="cool-secondary"
      className={cn("transition-colors duration-300 ease-in-out h-11 bg-green-900/15 hover:bg-green-900/10 border border-green-700/50 text-green-700", isPending && "animate-pulse")}
      type="button"
      onClick={handleAction}
      disabled={isPending}
    >
      <CheckCircle2Icon className="size-5 ml-1.75" />
      Mark as Completed
    </Button>
  )
}

export default MarkAsCompleteButton;
