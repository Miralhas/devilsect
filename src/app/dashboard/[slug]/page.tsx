import DashboardTab from "@/components/dashboard/dashboard-tab";
import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { getNovelBySlug } from "@/service/novels/api/get-novel-by-slug";
import Link from "next/link";

type NovelPageProps = {
  params: Promise<{ slug: string }>;
}

const DashboardNovelPage = async ({ params }: NovelPageProps) => {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);

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
            default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
          />
        </div>
        <h1 className="inline-flex flex-col">
          <Link href={`/novels/${slug}`} className="leading-none text-2xl font-extrabold tracking-tight text-balance capitalize inline-block">
            {novel.title}
          </Link>
          <p className="text-xs text-muted-foreground font-medium">{novel.author}</p>
        </h1>
      </div>
      <DashboardTab novel={novel} />
    </div>
  )
}

export default DashboardNovelPage;
