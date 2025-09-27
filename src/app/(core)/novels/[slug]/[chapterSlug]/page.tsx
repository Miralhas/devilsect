import ChapterBody from "@/components/chapters/chapter-body";
import ChapterComments from "@/components/chapters/chapter-comments";
import Header from "@/components/chapters/header";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { capitalize } from "@/lib/utils";
import { getChapterBySlug } from "@/service/chapters/api/get-chapter-by-slug";
import { putView } from "@/service/novels/api/put-view";
import { getShallowUser } from "@/service/user/api/get-shallow-user";
import { Metadata } from "next";

type ChapterPageProps = {
  params: Promise<{ slug: string, chapterSlug: string }>;
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { chapterSlug, slug } = await params;
  const chapter = await getChapterBySlug(chapterSlug, slug);
  return {
    title: `${capitalize(chapter.novelTitle)} - Chapter - ${chapter.number}`,
    description: `Read ${chapter.title} - ${capitalize(chapter.novelTitle)} online now!`,
    openGraph: {siteName: "Devil Sect"}
  }
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
