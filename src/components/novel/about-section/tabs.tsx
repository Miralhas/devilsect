'use client'

import { Novel } from "@/types/novel";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AboutTab from "./about-tab";
import ChaptersTab from "./chapters-tab";

const tabs = ["About", "Chapters"] as const;
type Tabs = typeof tabs[number];

const Tabs = ({ novel }: { novel: Novel }) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(tabs[0]);

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
          {selectedTab === "About" && <AboutTab novel={novel} />}
          {selectedTab === "Chapters" && <ChaptersTab novel={novel} />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Tabs;
