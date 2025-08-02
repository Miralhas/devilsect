import Image from "next/image";
import { getPlaiceholder } from "plaiceholder"

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

const DynamicBlurImage = async ({ src, alt, className, height, width, fill=true }: Props) => {
  const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <Image src={src} alt={alt} width={width} height={height} fill={fill} placeholder="blur" blurDataURL={base64} className={className} />
  )
}

export default DynamicBlurImage;
