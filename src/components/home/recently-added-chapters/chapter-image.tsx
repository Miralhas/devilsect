import { env } from "@/env";
import defaultBlur from "@/lib/blur-data";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";
import Image from "next/image";

const ChapterImage = ({ novelSlug, title }: RecentlyAddedChapter) => {
  const imgSrc = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/image`;
  return (
    <div className="h-[60px] max-w-[45px] min-w-[45px] w-full aspect-[3/4] overflow-hidden relative rounded-r-sm">
      <Image
        src={imgSrc}
        alt={title + " cover"}
        placeholder="blur"
        blurDataURL={defaultBlur}
        className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
        sizes="10vw"
        fill
      />
      <div className="absolute inset-0 rounded-r-sm book-cover" />
    </div>
  )
}

export default ChapterImage;
