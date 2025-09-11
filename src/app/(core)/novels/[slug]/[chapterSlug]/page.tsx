import ChapterBody from "@/components/chapters/chapter-body";
import ChapterComments from "@/components/chapters/chapter-comments";
import Header from "@/components/chapters/header";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { getShallowUser } from "@/services/authentication/server-queries";
import { getChapterBySlug } from "@/services/chapters/server-queries";
import { putView } from "@/services/novels/api";

type ChapterPageProps = {
  params: Promise<{ slug: string, chapterSlug: string }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapterSlug, slug } = await params;
  const chapter = await getChapterBySlug(chapterSlug, slug);
  const shallowUser = await getShallowUser();
  putView(slug);

  return (
    <Container className="max-w-[1024px] p-0 pb-12 gap-0 block min-h-screen space-y-4">
      <Header novelSlug={slug} next={chapter.next} previous={chapter.previous} />
      <ChapterBody chapter={chapter} />
      <Separator />
      <ChapterComments novelSlug={slug} chapterSlug={chapterSlug} currentUser={shallowUser} />
    </Container>
  )
}

export default ChapterPage;
