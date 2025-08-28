'use client'

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import SortBy from "./sort-by";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="w-full bg-secondary/10 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
              <SortBy />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section >
  )
}

export default FilterSection;
