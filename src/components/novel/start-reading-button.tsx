import { getUserLibrary } from "@/services/novels/server-queries";
import { Novel } from "@/types/novel";
import Link from "next/link";
import { Button } from "../ui/button";
import { delay } from "@/lib/utils";

type StartReadingButtonProps = {
  novel: Novel;

}

const StartReadingButton = async ({ novel }: StartReadingButtonProps) => {
  await delay(2000)
  const paginatedUserLibrary = await getUserLibrary({novelSlug: novel.slug});
  const hasNovelOnHistory = !!paginatedUserLibrary && paginatedUserLibrary?.totalItems > 0;
  return (
    <>
      <Button variant="pure" asChild className="transition-opacity ease-in-out duration-300 hover:opacity-80 bg-gradient-to-r from-accent to-primary/60 text-lg h-[60px] w-full max-w-[300px] text-white font-bold capitalize tracking-tighter">
        {hasNovelOnHistory ? (
          <Link href={`/novels/${novel.slug}/${paginatedUserLibrary?.results[0].chapterSlug}`}>
            Read Chapter {''}
            {paginatedUserLibrary?.results[0].chapterNumber}
          </Link>
        ) : (
          <Link href={`/novels/${novel.slug}/${novel.firstChapter.slug}`}>Start Reading</Link>
        )}
      </Button>
    </>
  )
}

export default StartReadingButton;
