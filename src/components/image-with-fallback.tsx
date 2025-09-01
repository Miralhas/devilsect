'use client'

import defaultBlur from "@/lib/blur-data";
import Image, { ImageProps } from "next/image";
import { RefObject, useState } from "react";
import wsrvLoader from "./wsrvLoader";

const ImageWithFallback = ({ fallback = "/yin-yang.png", imageRef, alt, src, ...props }: ImageProps & { fallback?: string; imageRef?: RefObject<HTMLImageElement | null> }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      blurDataURL={defaultBlur}
      id="navbar-user-image"
      ref={imageRef}
      loader={wsrvLoader}
    />
  )
}

export default ImageWithFallback;
