import { InboxIcon } from "lucide-react";

const InboxPageHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-2 w-full">
        <div className="size-10 bg-primary/50 text-accent flex items-center justify-center border border-accent/70 rounded-md">
          <InboxIcon className="size-6" />
        </div>
        <h2 className="text-xl md:text-3xl font-semibold">Your Inbox</h2>
      </div>
      <p className="text-sm text-muted-foreground ">
        View all you notifications.
      </p>
    </div>
  )
}

export default InboxPageHeader;
