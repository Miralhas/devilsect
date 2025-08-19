import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteCompleteAction, revalidateFetchTag } from "@/services/user-library/action";
import { Library } from "@/types/library";
import { MinusCircleIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

const MarkAsIncompleteButton = ({ close, library: { libraryElementId, novelTitle } }: { library: Library, close: () => void }) => {
  const [state, action, isPending] = useActionState(deleteCompleteAction, { success: undefined });

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
    startTransition(() => action({ novelTitle, libraryId: libraryElementId }));
  }
  
  return (
    <Button
      variant="cool-secondary"
      className={cn("transition-colors duration-300 ease-in-out h-11 bg-primary/40 hover:bg-primary/20 border border-accent text-red-800/90", isPending && "animate-pulse")}
      type="button"
      onClick={handleAction}
      disabled={isPending}
    >
      <MinusCircleIcon className="size-5 ml-1.75" />
      Mark as Incomplete
    </Button>
  )
}


export default MarkAsIncompleteButton;
