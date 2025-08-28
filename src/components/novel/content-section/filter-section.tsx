'use client'
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const FilterSection = () => {
  const [isActive, setIsActive] = useState(false);
  const onActive = () => setIsActive(prev => !prev);

  return (
    <motion.section layout={"position"} className="w-full flex flex-col items-end gap-y-4">
      <Button
        variant="cool-secondary"
        className="items-center h-13 text-base bg-secondary/30 uppercase gap-3 w-max"
        onClick={onActive}
      >
        <SlidersHorizontal className="size-5 w-max" />
        <span className="relative left-1">Filters</span>
        <motion.div
          className="cursor-pointer w-max"
          animate={{
            rotate: isActive ? 180 : 0
          }}
        >
          <ChevronDown className="size-7 w-max relative" />
        </motion.div>
      </Button>
      <AnimatePresence mode="popLayout">
        {isActive ? (
          <motion.div
            layoutId="filter-panel"
            layout="size"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="min-h-[30vh] w-full border border-primary bg-primary/30 text-white/80 grid place-items-center overflow-hidden"
          >

            <p>filter</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section >
  )
}

export default FilterSection;
