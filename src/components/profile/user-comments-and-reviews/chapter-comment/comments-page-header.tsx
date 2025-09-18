import { MessageCircleIcon } from "lucide-react";

const CommentsPageHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-2 w-full">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <MessageCircleIcon className="size-6" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">Your Comments</h2>
      </div>
      <p className="text-sm text-muted-foreground ">
        View and manage your chapter comments. <span className="text-xs font-light">(Replies are not shown)</span>
      </p>
    </div>
  )
}

export default CommentsPageHeader;
