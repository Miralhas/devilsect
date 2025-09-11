import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { getBlurData } from "@/lib/get-blur-data";
import { NovelSummary } from "@/types/novel";

const CardImage = async ({ novelSummary }: { novelSummary: NovelSummary }) => {
  const { base64 } = await getBlurData(`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSummary.slug}/image`);
  return (
    <>
      <DynamicBlurImage
        src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${novelSummary.slug}/image`}
        alt={novelSummary.title + " cover"}
        className="w-full h-auto object-cover object-center align-middle duration-300 transition-transform ease-in-out group-hover:scale-110"
        blurData={base64}
        sizes="(max-width: 768px) 25vw, 10vw"
        default={`https://static.devilsect.com/No-Image-Placeholder.svg`}
      />
    </>
  )
}

export default CardImage;
