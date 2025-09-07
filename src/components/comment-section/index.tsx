'use client'

import { env } from "@/env";
import { useGetComments } from "@/services/comments/client-queries";
import { FrownIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import Loading from "../loading";
import Comment from "./comment";

type Props =
  | { type: "NOVEL", slug: string }
  | { type: "CHAPTER", novelSlug: string, chapterSlug: string }

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
    return <Empty />
  }

  return (
    <Layout>
      <hr />
      <div className="py-4 w-full space-y-3 md:space-y-4">
        {query.data?.results.map(c => {
          return <Comment key={c.id} comment={c} />
        })}
      </div>
    </Layout>
  )
}

const Empty = () => {
  return (
    <Layout>
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

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="max-w-[1024px] mx-auto space-y-2 px-5 md:px-0">
      <p className="text-xl md:text-2xl font-semibold">User Comments</p>
      <div className="p-3 border border-zinc-50/15 rounded-sm mb-3">
        <p className="text-sm text-muted-foreground">
          Please refrain from posting spoilers to preserve the reading experience for everyone.
        </p>
      </div>
      <div className="">
        {children}
      </div>
    </section>
  )
}

export default CommentSection;
