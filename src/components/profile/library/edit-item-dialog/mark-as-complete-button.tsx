import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { completeAction, revalidateFetchTag } from "@/services/user-library/action";
import { Library } from "@/types/library";
import { CheckCircle2Icon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const MarkAsCompleteButton = ({ close, library: { novelSlug, novelTitle } }: { library: Library, close: () => void }) => {
  const [state, action, isPending] = useActionState(completeAction, { success: undefined });

  useEffect(() => {
    if (state.success === undefined) return;

    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      close()
      revalidateFetchTag()
      return;
    }

    toast.error(state.message, { position: "top-center" });

  }, [state]);

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
