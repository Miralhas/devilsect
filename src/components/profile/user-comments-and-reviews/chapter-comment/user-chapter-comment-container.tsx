'use client'

import { createWsrvLoader } from "@/components/wsrvLoader";
import { env } from "@/env";
import { User } from "@/types/authentication";
import { UserChapterComment } from "@/types/threaded-comment";
import { formatDate } from "@/utils/date-utils";
import Image from "next/image";
import Link from "next/link";
import UserCommentFooter from "../user-comment-footer";

const UserChapterCommentContainer = ({ comment, user }: { comment: UserChapterComment; user: User }) => {
  return (
    <>
      <div className="bg-zinc-950/50 border group border-white/10 rounded-lg min-h-[80px] relative p-3 md:p-5 space-y-3 transition-all duration-200 ease-in-out">
        <div className="flex gap-1 ">
          <Link href={`/novels/${comment.novelSlug}`} className="rounded-sm min-w-[40px] h-[40px] overflow-hidden border border-zinc-50/10">
            <Image
              loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
              src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${comment.novelSlug}/image`}
              height={40}
              width={40}
              alt="user profile image"
              className="text-transparent overflow-hidden group-hover:scale-105"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <Link
              href={`/novels/${comment.novelSlug}/${comment.chapterSlug}/comments`}
              className="inline-flex gap-1 font-semibold text-sm text-zinc-300 hover:text-zinc-300/80 duration-200 transition-colors capitalize"
            >
              {comment.novelTitle}
              <span className="text-muted-foreground text-sm hidden xs:inline-block">•</span>
              <span className="font-normal text-[13px]">{comment.chapterTitle}</span>
            </Link>

            <p className="text-xs text-zinc-300/90 inline-flex gap-1">{user.username}<span className="text-xs font-light text-muted-foreground">commented {formatDate(comment.createdAt)}</span></p>
            <div
              className="text-sm text-zinc-300 my-2"
              dangerouslySetInnerHTML={{ __html: comment.message }}
            >
            </div>
            <UserCommentFooter voteCount={comment.voteCount} />
          </div>
        </div>
      </div>
    </>
  )
}



export default UserChapterCommentContainer;
