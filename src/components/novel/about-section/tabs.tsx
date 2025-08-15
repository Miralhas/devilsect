'use client'

import SpinnerLoader from "@/components/ui/spinner-loader";
import { Novel } from "@/types/novel";
import { AnimatePresence, motion } from "motion/react";
import dynamic from 'next/dynamic';
import { useState } from "react";

const AboutTab = dynamic(() => import("./about-tab"));
const ChaptersTab = dynamic(() => import("./chapters-tab"), { ssr: false, loading: () => <SpinnerLoader containerClassName="min-h-[30vh]" /> });


const tabs = ["About", "Chapters"] as const;
type Tabs = typeof tabs[number];

const Tabs = ({ novel }: { novel: Novel }) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(tabs[0]);

  return (
    <>
      <div className="w-full border-b border-zinc-50/15">
        <div className="px-5 md:px-10">
          <nav className="max-w-[1024px] mx-auto">
            <ul className="p-0 m-0 font-medium text-sm flex list-none w-fit gap-4 md:gap-8">
              {tabs.map((item) => (
                <motion.li
                  key={item}
                  initial={false}
                  onClick={() => setSelectedTab(item)}
                  className="list-none font-semibold text-base md:text-xl px-2 py-[10px] relative cursor-pointer select-none tracking-tight"
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
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? selectedTab : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="px-5 md:px-10"
        >
          {selectedTab === "About" && <AboutTab novel={novel} />}
          {selectedTab === "Chapters" && <ChaptersTab novel={novel} />}
        </motion.div>
      </AnimatePresence>

    </>
  )
}

export default Tabs;
