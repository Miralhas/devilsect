'use client'

import { ImageLoaderProps } from "next/image";

const wsrvLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const encodedSrc = encodeURIComponent(src);
  return `https://cdn.devilsect.com/?url=${encodedSrc}&w=${width}&q=${quality || 70}`;
};  

export default wsrvLoader;  