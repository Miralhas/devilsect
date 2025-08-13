'use client'

import { Novel } from "@/types/novel";
import { BookOpenText, UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import NovelTags from "./novel-tags";
import NovelSummary from "./novel-summary";
import NovelDescription from "./novel-description";

const tabs = ["About", "Chapters"] as const;
type Tabs = typeof tabs[number];

const Tabs = ({ novel }: { novel: Novel }) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(tabs[0]);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full border-b border-zinc-50/15">
        <nav className="max-w-[1024px] mx-auto">
          <ul className="p-0 m-0 font-medium text-sm flex list-none w-fit gap-8 pt-4">
            {tabs.map((item) => (
              <motion.li
                key={item}
                initial={false}
                onClick={() => setSelectedTab(item)}
                className="list-none font-semibold text-xl px-2 py-[10px] relative cursor-pointer select-none tracking-tight"
              >
                <span className="relative right-0.25">{item}</span>
                {item === selectedTab ? (
                  <motion.div
                    layoutId="underline"
                    id="underline"
                    className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-accent"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab === "About" && (
            <div className="w-full max-w-[1024px] mx-auto border-b border-zinc-50/25 pb-6 space-y-8" ref={divRef}>
              <div className="md:flex gap-34 ">
                <div className="space-y-1 flex md:flex-col gap-2 md:gap-0">
                  <div className="flex items-center gap-1">
                    <BookOpenText className="size-4 mt-0.25 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm md:text-[15px] font-medium tracking-tight">Chapters</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm md:text-base font-semibold line-clamp-1 mb-0.5">{novel.chaptersCount} Chapters</p>
                  </div>
                </div>

                <div className="space-y-1 flex md:flex-col gap-2 md:gap-0">
                  <div className="flex items-center gap-1">
                    <UserIcon className="size-4 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm md:text-[15px] font-medium tracking-tight">Author</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm md:text-base font-semibold mb-1 line-clamp-1">{novel.author}</p>
                  </div>
                </div>
              </div>
              <NovelDescription novel={novel} />
              <NovelSummary description={novel.description} />
              <NovelTags tags={novel.tags} />
            </div>
          )}

          {selectedTab === "Chapters" && (
            <div className="w-full max-w-[1024px] mx-auto flex gap-4 flex-col">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="h-10 bg-primary/40 border border-accent w-full" key={index}></div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </>
  )
}

export default Tabs;
