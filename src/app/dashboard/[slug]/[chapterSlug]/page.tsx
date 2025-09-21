import UpdateChapterForm from "@/components/dashboard/chapter-page/update-chapter-form";
import DynamicBlurImage from "@/components/dynamic-blur-image";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { getChapterBySlug } from "@/services/chapters/server-queries";
import Link from "next/link";

type NovelPageProps = {
  params: Promise<{ slug: string; chapterSlug: string; }>;
}

const DashboardChapterPage = async ({ params }: NovelPageProps) => {
  const { chapterSlug, slug } = await params;
  const chapter = await getChapterBySlug(chapterSlug, slug);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-[50px] aspect-[3/4]">
          <DynamicBlurImage
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
            height={60}
            width={40}
            fill={false}
            alt="novel image"
            className="object-cover inline-block"
          />
        </div>
        <h1 className="inline-flex flex-col">
          <Link href={`/novels/${slug}/${chapterSlug}`} className="leading-none text-2xl font-extrabold tracking-tight text-balance capitalize inline-block">
            {chapter.title}
          </Link>
        </h1>
      </div>
      <div className="space-y-3">
        <Separator />
        <UpdateChapterForm chapter={chapter} />
      </div>
    </div>
  )
}

export default DashboardChapterPage;
