'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useChangeRequestStatus } from "@/service/requests/mutations/use-change-request-status";
import { RequestUnion } from "@/types/request";
import { cn } from "@/utils/common-utils";
import { formatFullDateBR } from "@/utils/date-utils";
import { KeyRound } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";

const badgeClasses: Record<RequestUnion["status"], string> = {
  COMPLETED: "bg-green-700/30 border border-green-700/90",
  DENIED: "bg-primary/40 border border-accent/90",
  PENDING: "bg-yellow-700/30 border border-yellow-700/90",
}

const BaseRequestWrapper = ({ children, request }: PropsWithChildren<{ request: RequestUnion }>) => {
  const { createdAt, status, type, user, id } = request;
  const mutation = useChangeRequestStatus();
  const [locked, setLocked] = useState(status !== "PENDING");

  const onDeny = () => {
    mutation.mutate({ action: "deny", id: id }, {
      onSuccess: () => {
        toast.success("Request Denied successfully!");
        setLocked(true);
      },
      onError: () => toast.error("Failed to deny request!"),
    });
  }

  const onComplete = () => {
    mutation.mutate({ action: "complete", id: id }, {
      onSuccess: () => {
        toast.success("Request Completed successfully!");
        setLocked(true);
      },
      onError: () => toast.error("Failed to complete request!"),
    });
  }

  return (
    <div className={cn("border border-zinc-50/15 p-4 rounded-md text-sm bg-secondary/20 space-y-1.5 relative", mutation.isPending && "animate-pulse")}>
      <div className="flex gap-2 items-center">
        <p className="text-xs text-zinc-300"><span className="font-light text-xs text-zinc-300/80">ID: </span> {id}</p>
        <span className="text-muted-foreground text-xs">/</span>
        <p className="text-xs text-muted-foreground">{formatFullDateBR(createdAt)}</p>
      </div>
      <p className="font-semibold"><span className="font-light text-xs text-zinc-300/80">Type:</span> {type}</p>
      <Badge className={cn("md:absolute right-5 top-5 w-full max-w-[90px]", badgeClasses[status])}>
        {status}
      </Badge>
      <p><span className="font-light text-xs text-zinc-300/80">From:</span> {user.username} / {user.email}</p>
      <Separator className="my-4" />
      {children}
      <div className="flex gap-2 items-center mt-4">
        <Button
          variant="pure"
          size="sm"
          className="text-sm text-[13px] bg-green-700/30 border border-green-700/90 rounded-sm w-full max-w-[100px]"
          onClick={onComplete}
          disabled={locked || mutation.isPending}
        >
          Complete
        </Button>
        <Button
          variant="cool"
          size="sm"
          className="text-sm text-[13px] rounded-sm w-full max-w-[100px]"
          onClick={onDeny}
          disabled={locked || mutation.isPending}
        >
          Deny
        </Button>
        {status !== "PENDING" && (
          <Button
            className="ml-2 text-muted-foreground transition-all duration-200 hover:text-accent hover:scale-105"
            variant="pure"
            size="none"
            onClick={() => setLocked(prev => !prev)}
          >
            <KeyRound className="size-4.5" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default BaseRequestWrapper;
