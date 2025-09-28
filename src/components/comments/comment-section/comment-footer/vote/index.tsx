import { Button } from "@/components/ui/button";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import useVote from "@/hooks/use-vote";
import { User } from "@/types/authentication";
import { ThreadedComment } from "@/types/threaded-comment";
import { cn } from "@/utils/common-utils";
import { LucideThumbsDown, LucideThumbsUp } from "lucide-react";

const Vote = ({ comment, user }: { comment: ThreadedComment; user?: User }) => {
  const isAuthenticated = user !== undefined;
  const { onDownVote, onUpVote, voteCount, isDownvoter, isUpvoter } = useVote({ comment, user });
  const { handleOpen } = useGlobalLoginContext();

  return (
    <div className="flex items-center gap-2">
      <Button className="transition-colors hover:text-accent/90 duration-100 hover:fill-accent/40" size="none" variant="pure" onClick={isAuthenticated ? onUpVote : handleOpen}>
        <LucideThumbsUp
          className={cn("size-4 cursor-pointer", isUpvoter && "fill-accent/40 text-accent/90")}
        />
      </Button>
      <span className="text-xs font-semibold">{voteCount}</span>
      <Button className="transition-colors hover:text-accent/90 duration-100 hover:fill-accent/40" size="none" variant="pure" onClick={isAuthenticated ? onDownVote : handleOpen}>
        <LucideThumbsDown
          className={cn("size-4 relative top-0.25 cursor-pointer", isDownvoter && "fill-accent/40 text-accent/90")}
        />
      </Button>
    </div>
  )
}

export default Vote;
