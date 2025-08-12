'use client'

import defaultBlur from "@/lib/blur-data";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  blurData?: string;
  quality?: number;
  sizes?: string;
};

const DynamicBlurImage = ({ src, alt, className, height, width, blurData, sizes, quality = 70, fill = true }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      quality={quality}
      placeholder="blur"
      blurDataURL={!!blurData ? blurData : defaultBlur}
      className={className}
      sizes={sizes}
      onError={() => {
        setImgSrc("/ds.webp")
      }}
    />
  )
}

export default DynamicBlurImage;
