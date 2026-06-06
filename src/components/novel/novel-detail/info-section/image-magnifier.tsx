'use client'

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type RenderProp<T> = (value: T) => React.ReactNode;

const ImageMagnifier = ({ children }: {children: RenderProp<boolean>}) => {
  const [zoom, setZoom] = useState<boolean>(false);

  const handleZoom = () => {
    setZoom(prev => {
      if (prev) document.body.classList.remove("overflow-hidden");
      if (!prev) document.body.classList.add("overflow-hidden");
      return !prev;
    });
  }

  return (
    <AnimatePresence>
      {zoom ? (
        <div className="origin-bottom-left cursor-zoom-out" onClick={handleZoom}>
          <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/85" />
          <motion.div
            className="fixed mx-auto md:w-xl inset-8 overflow-hidden rounded-xl z-[75]"
            initial={{ opacity: 0, x: -300, y: -100, rotate: -10 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 300, y: 100, transition: { duration: 0.15 }, rotate: -10 }}
            transition={{ type: "spring", duration: 0.75 }}
            key={"zoom-out"}
            layout
          >
            {children(zoom)}
          </motion.div>
        </div>
      ) : (
        <div className="cursor-zoom-in" onClick={handleZoom} key={"zoom-in"}>
          {children(zoom)}
        </div>
      )}
    </AnimatePresence>
  )
}

export default ImageMagnifier;
