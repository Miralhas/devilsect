import ChapterBody from "@/components/chapters/chapter-body";
import Header from "@/components/chapters/header";
import Container from "@/components/container";
import { getChapterBySlug } from "@/services/chapters/server-queries";
import { putView } from "@/services/novels/api";

type ChapterPageProps = {
  params: Promise<{ slug: string, chapterSlug: string }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapterSlug, slug } = await params;
  const chapter = await getChapterBySlug(chapterSlug, slug);
  putView(slug);

  return (
    <>
      <Container className="max-w-[1024px] p-0 gap-0 block h-[1000vh] space-y-4">
        <Header novelSlug={slug} next={chapter.next} previous={chapter.previous} />
        <ChapterBody chapter={chapter} />
      </Container>
    </>
  )
}

export default ChapterPage;
