import { Ellipsis, LucideThumbsDown, LucideThumbsUp, MessageCircleMore } from "lucide-react";

const UserCommentFooter = ({ voteCount }: { voteCount: number }) => {
  return (
    <div className="flex gap-5 items-center text-muted-foreground">
      <div className="flex items-center gap-2">
        <LucideThumbsUp className="size-4 opacity-60" />
        <span className="text-xs font-semibold">{voteCount}</span>
        <LucideThumbsDown className="size-4 relative top-0.25 opacity-60" />
      </div>
      <div className="flex gap-1.5 items-center opacity-60">
        <MessageCircleMore className="size-4" strokeWidth={2.5} />
        <span className="text-xs">Reply</span>
      </div>
      <div className="flex items-center opacity-60">
        <Ellipsis className="size-5 relative top-0.5" />
      </div>
    </div>
  )
}

export default UserCommentFooter;
