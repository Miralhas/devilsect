import { Button } from "@/components/ui/button";
import { useMarkAsComplete } from "@/service/library/mutations/use-mark-as-complete";
import { useMarkAsIncomplete } from "@/service/library/mutations/use-mark-as-incomplete";
import { Library } from "@/types/library";
import { cn } from "@/utils/common-utils";
import { capitalize } from "@/utils/string-utils";
import { CheckCircle2Icon, MinusCircleIcon } from "lucide-react";
import { toast } from "sonner";

const CompleteActionButton = ({ item }: { item: Library }) => {
  const completeMutation = useMarkAsComplete();
  const incompleteMutation = useMarkAsIncomplete();
  const { completed } = item;

  const Icon = completed ? CheckCircle2Icon : MinusCircleIcon;
  const label = completed ? "Mark as Incomplete" : "Mark as Complete";

  const isPending = completeMutation.isPending || incompleteMutation.isPending;

  const handleAction = () => {
    switch (completed) {
      case true: {
        return incompleteMutation.mutate(item.libraryElementId, {
          onSuccess: () => toast.success(`Removed ${capitalize(item.novelTitle)} completion!`, { position: "top-center" }),
          onError: () => toast.success(`Failed to remove ${capitalize(item.novelTitle)} completion!`, { position: "top-center" }),
        });
      };
      case false: {
        return completeMutation.mutate(item.novelSlug, {
          onSuccess: () => toast.success(`Marked ${capitalize(item.novelTitle)} as completed!`, { position: "top-center" }),
          onError: () => toast.success(`Failed to mark ${capitalize(item.novelTitle)} as completed`, { position: "top-center" }),
        });
      }
    }
  }

  return (
    <Button
      variant="cool-secondary"
      className={cn("transition-colors duration-300 ease-in-out h-11 bg-green-900/15 hover:bg-green-900/10 border border-green-700/50 text-green-700", isPending && "animate-pulse", completed && "bg-primary/40 hover:bg-primary/20 border border-accent text-red-800/90")}
      type="button"
      onClick={handleAction}
      disabled={isPending}
    >
      <Icon className="size-5 ml-1.75" />
      {label}
    </Button>
  )
}

export default CompleteActionButton;
