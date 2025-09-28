'use client'

import { cn } from "@/utils/common-utils";
import Image from "next/image";
import { Ref } from "react";
import { createWsrvLoader } from "../wsrvLoader";

type Props = {
  ref?: Ref<HTMLDivElement>;
  className?: string
  url: string;
}

const ImageCard = ({ url, className, ref }: Props) => {
  return (
    <div className={cn("rounded-sm overflow-hidden border border-white/10 w-[45px] h-[60.5px]", className)} ref={ref}>
      <Image
        src={url}
        loader={createWsrvLoader({ default: "https://static.devilsect.com/No-Image-Placeholder.svg" })}
        height={64.5}
        width={45}
        alt="novel cover"
        className="object-cover h-full text-transparent"
      />
    </div>
  )
}

export default ImageCard;
