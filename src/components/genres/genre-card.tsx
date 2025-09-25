'use client'

import { env } from "@/env";
import { Genre } from "@/types/novel";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import ImageCard from "./image-card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const MotionCard = motion.create(ImageCard);

const variants = {
  first: { scale: 1.05, x: -40, rotate: -15 },
  second: { scale: 1.05, x: -20, rotate: 0 },
  third: { scale: 1.05, x: 0, rotate: 15 },
  initial: {
    x: 0,
    scale: 1,
    rotate: 0,
  }
};

const getVariant = (index: number) => {
  switch (index) {
    case 0: return { name: "first", className: "relative z-10" }
    case 1: return { name: "second", className: "absolute left-2.5 z-[5]" }
    case 2: return { name: "third", className: "absolute left-5" }
    default: return { name: "first", className: "relative z-10" }
  }
}

const getRandomSlugs = (slugs: string[], total = 3) => {
  return slugs.filter((_, index) => index < total).map(() => {
    const randint = Math.floor(Math.random() * slugs.length);
    return slugs[randint];
  });
}

const GenreCard = ({ genre, slugs }: { genre: Genre; slugs: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const randomSlugs = useMemo(() => {
    return getRandomSlugs(slugs);
  }, [slugs])

  return (
    <motion.div
      className="group bg-zinc-950/50 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 shadow-sm group hover:border-none hover:shadow-accent/70 hover:text-accent ease-in-out hover:translate-x-1 hover:-translate-y-1 p-4 relative"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center pr-5">
        <p className="text-base font-medium leading-none relative z-[20]">{genre.name}</p>
        <motion.div className="flex gap-1 ml-auto relative">
          {randomSlugs.map((n, i) => (
            <MotionCard
              key={i}
              variants={variants}
              animate={isHovered ? getVariant(i).name : isMobile ? getVariant(i).name : "initial"}
              transition={{ delay: 0.1 * i, duration: 0.25 }}
              className={cn(getVariant(i).className, isHovered || isMobile && "shadow-sm shadow-accent")}
              url={`${env.NEXT_PUBLIC_BASE_URL}/novels/${n}/image`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default GenreCard;

