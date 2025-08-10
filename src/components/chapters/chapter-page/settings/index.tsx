'use client'

import { Chapter } from "@/types/chapter";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { RefObject, useState } from "react";
import PrevAndNextButtons from "./prev-and-next-buttons";
import ShowChaptersSheet from "./show-chapters-sheet";
import FontSettings from "./font-settings";

type SettingsProps = {
  divRef: RefObject<HTMLDivElement | null>;
  chapter: Chapter;
}

const Settings = ({ divRef, chapter }: SettingsProps) => {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (divRef.current && latest >= (divRef.current.clientHeight - 1000)) {
      setIsNavHidden(true);
      return;
    }

    if (previous && latest+1 > previous) {
      setIsNavHidden(true);
      return;
    }

    setIsNavHidden(false);
  });

  return (
    <AnimatePresence>
      {!isNavHidden ? (
        <motion.div
          className="bg-[#302f2f] fixed bottom-0 left-0 right-0 z-50 w-full"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="max-w-[1280px] mx-auto flex items-center px-4 h-14">
            <ShowChaptersSheet chapter={chapter} />
            <div className="ms-auto flex items-center gap-4 text-zinc-300">
              <FontSettings />
              <PrevAndNextButtons {...chapter} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Settings;
