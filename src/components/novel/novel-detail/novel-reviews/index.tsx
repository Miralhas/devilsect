import CommentSection from "@/components/comment-section";
import { getShallowUser } from "@/services/authentication/server-queries";

const NovelReviews = async ({ slug }: { slug: string }) => {
  const shallowUser = await getShallowUser();

  
  const isAuthenticated = shallowUser !== undefined;
  console.log(shallowUser, isAuthenticated);

  return (
    <section className="px-5 md:px-10">
      <div className="max-w-[1024px] mx-auto space-y-2">
        <CommentSection type="NOVEL" slug={slug} isAuthenticated={isAuthenticated} />
      </div>
    </section>
  )
}

export default NovelReviews;
