'use client'

import { Button } from "@/components/ui/button";
import { useGetUserLibrary } from "@/service/library/queries/use-get-user-library";
import { Novel } from "@/types/novel";
import Link from "next/link";
import StartReadingButtonLoading from "./start-reading-button-loading";
import BookmarkNovel from "./bookmark-novel";

type StartReadingButtonProps = {
  novel: Novel;
};

const StartReadingButton = ({ novel }: StartReadingButtonProps) => {
  const { data, isLoading } = useGetUserLibrary({
    novelSlug: novel.slug,
    size: 1,
  });

  if (isLoading) return <StartReadingButtonLoading />

  const library = data?.results[0];

  const href = library?.chapterNumber
    ? `/novels/${novel.slug}/${library.chapterSlug}`
    : `/novels/${novel.slug}/${novel.firstChapter.slug}`;

  const label = library?.chapterNumber
    ? `Read Chapter ${library.chapterNumber}`
    : "Start Reading";

  return (
    <div className="flex w-full flex-col gap-2 lg:max-w-[335px]">
      <BookmarkNovel novel={novel} library={library} />

      <Button
        variant="pure"
        asChild
        className="h-[60px] bg-linear-to-r from-accent to-primary/60 text-lg font-bold capitalize tracking-tighter text-white transition-opacity duration-300 ease-in-out hover:opacity-80"
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

export default StartReadingButton;