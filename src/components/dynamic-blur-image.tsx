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
  priority?: boolean;
  onErrorImage?: string;
  unoptimized?: boolean;
};

const DynamicBlurImage = ({ src, alt, className, height, width, blurData, sizes, priority, onErrorImage, unoptimized = false, quality = 70, fill = true }: Props) => {
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
      priority={priority}
      onError={() => {
        setImgSrc(onErrorImage ?? "/ds.webp")
      }}
      unoptimized={unoptimized}
    />
  )
}

export default DynamicBlurImage;
