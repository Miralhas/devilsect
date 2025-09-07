import { env } from "@/env";
import { formatDate, mapRoles } from "@/lib/utils";
import { ThreadedComment } from "@/types/threaded-comment";
import Image from "next/image";
import { createWsrvLoader } from "../wsrvLoader";

const CommentHeader = ({ comment: { commenter, createdAt } }: { comment: ThreadedComment }) => {
  return (
    <div className="w-full flex gap-2 items-start">
      <div className="overflow-hidden rounded-full border border-zinc-50/10">
        <Image
          loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
          src={`${env.NEXT_PUBLIC_BASE_URL}/users/${commenter.id}/image`}
          height={40}
          width={40}
          alt="user profile image"
          className="text-transparent overflow-hidden"
        />
      </div>
      <div className="-space-y-1">
        <div className="flex gap-1">
          <p className="text-sm md:text-[15px] font-semibold">{commenter.username}</p>
          <span className="text-muted-foreground mt-0.25 text-sm">•</span>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(createdAt)}</p>
        </div>
        <span className="text-[11px] leading-none text-muted-foreground">{mapRoles(commenter.roles)}</span>
      </div>
    </div>
  )
}

export default CommentHeader;
