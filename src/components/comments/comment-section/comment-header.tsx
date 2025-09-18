import { createWsrvLoader } from "@/components/wsrvLoader";
import { env } from "@/env";
import { formatDate, mapRoles } from "@/lib/utils";
import { User } from "@/types/authentication";
import Image from "next/image";

const CommentHeader = ({ commenter, createdAt }: { commenter: User, createdAt: string; }) => {
  return (
    <div className="w-full flex gap-2 items-start overflow-hidden">
      <div className="overflow-hidden rounded-full border border-zinc-50/10">
        <Image
          loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
          src={`${env.NEXT_PUBLIC_BASE_URL}/users/${commenter.id}/image#${new Date().getTime().toString()}`}
          height={40}
          width={40}
          alt="user profile image"
          className="text-transparent overflow-hidden"
        />
      </div>
      <div className="-space-y-1">
        <div className="flex flex-col xs:flex-row gap-0 xs:gap-1">
          <div className="flex gap-2 items-center">
            <p className="text-sm md:text-[15px] font-semibold">{commenter.username}</p>
            <span className="text-[11px] leading-none text-muted-foreground inline-block xs:hidden mt-1">{mapRoles(commenter.roles)}</span>
          </div>
          <span className="text-muted-foreground mt-0.25 text-sm hidden xs:inline-block">•</span>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(createdAt)}</p>
        </div>
        <span className="text-[11px] leading-none text-muted-foreground hidden xs:inline-block">{mapRoles(commenter.roles)}</span>
      </div>
    </div>
  )
}

export default CommentHeader;
