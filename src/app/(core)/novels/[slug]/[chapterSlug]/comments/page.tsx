import ChapterComments from "@/components/chapters/chapter-comments";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { getShallowUser } from "@/service/authentication/api/get-shallow-user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string, chapterSlug: string }>;
}

const ChapterCommentsPage = async ({ params }: Props) => {
  const { chapterSlug, slug } = await params;
  const shallowUser = await getShallowUser();

  return (
    <Container className="max-w-[1024px] p-0 block pb-12 gap-0 min-h-screen space-y-16 pt-12">
      <div className="flex justify-center w-full">
        <Link
          href={`/novels/${slug}/${chapterSlug}`}
          className="text-2xl md:text-3xl font-semibold inline-flex gap-1 items-center transition-opacity hover:opacity-80 duration-200 ease-in"
        >
          <ArrowLeft className="size-8" strokeWidth={3} />
          Go back to Chapter
        </Link>
      </div>
      <Separator />
      <ChapterComments novelSlug={slug} chapterSlug={chapterSlug} currentUser={shallowUser} />
    </Container>
  )
}

export default ChapterCommentsPage;
