'use client'

import { env } from "@/env";
import { useGetComments } from "@/services/comments/client-queries";
import { FrownIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import Loading from "../loading";
import Comment from "./comment";
import CommentEditor from "./comment-editor";

type Props =
  | { type: "NOVEL", slug: string, isAuthenticated: boolean }
  | { type: "CHAPTER", novelSlug: string, chapterSlug: string, isAuthenticated: boolean }

const getUrl = (props: Props) => {
  const baseCommentsUrl = `${env.NEXT_PUBLIC_BASE_URL}/novels`
  if (props.type === "CHAPTER") {
    return `${baseCommentsUrl}/${props.novelSlug}/chapters/${props.chapterSlug}/reviews`;
  }
  return `${baseCommentsUrl}/${props.slug}/reviews`;
}

const CommentSection = (props: Props) => {
  const query = useGetComments({ url: getUrl(props) });

  if (query.isLoading || query.isError) {
    return (
      <Layout>
        <Loading className="min-h-[30vh]" />
      </Layout>
    )
  }

  if (!query.data?.results.length) {
    return <Empty isAuthenticated={props.isAuthenticated} />
  }

  return (
    <Layout isAuthenticated={props.isAuthenticated}>
      <div className="w-full space-y-3 md:space-y-3">
        {query.data?.results.map(c => {
          return <Comment key={c.id} comment={c} />
        })}
      </div>
    </Layout>
  )
}

const Empty = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="grid place-items-center min-h-[30vh] border border-zinc-50/10">
        <div className="text-center">
          <div className="size-12 rounded-full flex items-center justify-center bg-secondary/50 border border-zinc-50/15 mx-auto mb-2">
            <FrownIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-zinc-300 font-semibold md:text-lg">No comments yet</p>
          <p className="text-muted-foreground text-sm">Join the community and start a discussion thread.</p>
        </div>
      </div>
    </Layout>
  )
}

const Layout = ({ children, isAuthenticated = false }: PropsWithChildren<{ isAuthenticated?: boolean }>) => {
  return (
    <div className="space-y-4">
      <p className="text-xl md:text-2xl font-semibold">User Comments</p>
      <div className="space-y-4">
        <CommentEditor isAuthenticated={isAuthenticated} />
        <Separator />
        {children}
      </div>
    </div>
  )
}

export default CommentSection;
