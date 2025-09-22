'use client'

import { User } from "@/types/authentication";
import { PaginatedQuery } from "@/types/pagination";
import { ThreadedComment } from "@/types/threaded-comment";
import { FrownIcon } from "lucide-react";
import Comment from "./comment";
import Filter from "./filter";

type Props = {
  comments?: PaginatedQuery<ThreadedComment[]>;
  currentUser?: User;
}

const CommentSection = ({ comments, currentUser }: Props) => {

  if (!comments?.results.length) {
    return <Empty />
  }

  return (
    <>
      <Filter />
      <div className="w-full space-y-3 md:space-y-3">
        {comments.results.map(c => {
          return <Comment key={c.id} comment={c} currentUser={currentUser} />
        })}
      </div>
    </>
  )
}

const Empty = () => {
  return (
    <div className="grid place-items-center min-h-[30vh] border border-zinc-50/10">
      <div className="text-center">
        <div className="size-12 rounded-full flex items-center justify-center bg-secondary/50 border border-zinc-50/15 mx-auto mb-2">
          <FrownIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-zinc-300 font-semibold md:text-lg">No comments yet</p>
        <p className="text-muted-foreground text-sm">Join the community and start a discussion thread.</p>
      </div>
    </div>
  )
}

export default CommentSection;
