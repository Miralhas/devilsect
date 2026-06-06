'use client'

import defaultBlur from "@/lib/blur-data";
import Image from "next/image";
import { createWsrvLoader, WsrvParams } from "./wsrvLoader";
import { RefObject } from "react";
import ImageMagnifier from "./novel/novel-detail/info-section/image-magnifier";
import { cn } from "@/utils/common-utils";

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
  loading?: "eager" | "lazy";
  magnifier?: boolean;
  magnifiedClassName?: string;
} & WsrvParams;

const DynamicBlurImage = ({ src, alt, className, height, width, blurData, sizes, priority, imageRef, unoptimized = false, quality = 70, fill = true, magnifier = false, loading, magnifiedClassName, ...rest }: Props) => {

  if (magnifier) {
    return (
      <ImageMagnifier>
        {(zoom) => (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            quality={quality}
            placeholder="blur"
            blurDataURL={!!blurData ? blurData : defaultBlur}
            className={cn(className, zoom && magnifiedClassName)}
            sizes={sizes}
            priority={priority}
            loader={createWsrvLoader(rest)}
            unoptimized={unoptimized}
            ref={imageRef}
            loading={loading}
          />
        )}
      </ImageMagnifier>
    )
  }

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
      loading={loading}
    />
  )
}

export default DynamicBlurImage;
