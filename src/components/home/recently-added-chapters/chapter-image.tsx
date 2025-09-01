import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { RecentlyAddedChapter } from "@/types/recently-added-chapters";

const ChapterImage = ({ novelSlug, title }: RecentlyAddedChapter) => {
  const imgSrc = `${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSlug}/image`;
  return (
    <div className="w-full max-w-[45px] aspect-[3/4] overflow-hidden relative rounded-r-sm">
      <DynamicBlurImage
        src={imgSrc}
        alt={title + " cover"}
        className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
        sizes="(max-width: 768px) 20vw, 10vw"
        fill
        default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
      />
      <div className="absolute inset-0 rounded-r-sm book-cover" />
    </div>
  )
}

export default ChapterImage;
