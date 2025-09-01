'use client'

import defaultBlur from "@/lib/blur-data";
import Image from "next/image";
import { createWsrvLoader, WsrvParams } from "./wsrvLoader";
import { RefObject } from "react";

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
  imageRef?: RefObject<HTMLImageElement | null>;
} & WsrvParams;

const DynamicBlurImage = ({ src, alt, className, height, width, blurData, sizes, priority, imageRef, unoptimized = false, quality = 70, fill = true, ...rest }: Props) => {
  return (
    <Image
      src={src}
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
      loader={createWsrvLoader(rest)}
      unoptimized={unoptimized}
      ref={imageRef}
    />
  )
}

export default DynamicBlurImage;
