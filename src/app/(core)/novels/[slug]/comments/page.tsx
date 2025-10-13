import NovelReviews from "@/components/novel/novel-detail/novel-reviews";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
}

const NovelCommentsPage = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <section className="min-h-screen pb-12 space-y-16 pt-12">
      <div className="flex justify-center w-full">
        <Link
          href={`/novels/${slug}`}
          className="text-2xl md:text-3xl font-semibold inline-flex gap-1 items-center transition-opacity hover:opacity-80 duration-200 ease-in"
        >
          <ArrowLeft className="size-8" strokeWidth={3} />
          Go back to Novel
        </Link>
      </div>
      <Separator />
      <NovelReviews slug={slug} />
    </section>
  )
}

export default NovelCommentsPage;
