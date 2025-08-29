'use client'

import { Button } from "@/components/ui/button";
import { nuqsNovelSummariesParams } from "@/lib/schemas/novel-summaries-params-schema";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useState } from "react";
import ChaptersCount from "./chapters-count";
import Genres from "./genres";
import SortBy from "./sort-by";
import Status from "./status";

const FilterSection = () => {
  const [isActive, setIsActive] = useState(false);
  const onActive = () => setIsActive(prev => !prev);
  const [, setValues] = useQueryStates(nuqsNovelSummariesParams);

  const onClearAll = () => {
    setValues(null);
  }

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
            className="w-full bg-secondary/10 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10 p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-900/80 to-primary font-bold">Novels Filter</h2>
              <Button variant="extra-cool-secondary" size="extra-cool" className="text-muted-foreground" onClick={onClearAll}>
                <XIcon className="size-5" />
                <span>Clear All</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
              <SortBy />
              <Status />
              <ChaptersCount />
              <Genres />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section >
  )
}

export default FilterSection;
