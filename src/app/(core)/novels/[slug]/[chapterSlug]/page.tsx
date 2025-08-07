import Container from "@/components/container";
import { env } from "@/env";
import Image from "next/image";
import Link from "next/link";

type ChapterPageProps = {
  params: Promise<{ slug: string, chapterSlug: string }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapterSlug, slug } = await params;
  console.log(chapterSlug);
  return (
    <section className="min-h-[200vh]">
      <Container className="max-w-[1024px] min-h-[90vh] p-0 gap-0 block">
        <div className="max-w-[840px] mx-auto flex items-center p-2">
          <Image 
            alt="cover"
            src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${slug}/image`}
            width={30}
            height={40}
            className="object-cover inline-block indent-[100%] whitespace-nowrap overflow-hidden"
          />
          <Link href={`/novels/${slug}`}>{slug}</Link>
        </div>
        <hr className="border-[#424242]"/>
      </Container>
    </section>
  )
}

export default ChapterPage;
