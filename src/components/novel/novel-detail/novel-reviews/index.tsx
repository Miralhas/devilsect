import CommentSection from "@/components/comment-section";

const NovelReviews = ({ slug }: { slug: string }) => {
  return (
    <section className="px-5 md:px-10">
      <div className="max-w-[1024px] mx-auto space-y-2">
        <CommentSection type="NOVEL" slug={slug} />
      </div>
    </section>
  )
}

export default NovelReviews;
