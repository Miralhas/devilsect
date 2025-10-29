'use client'

import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ChapterErrorDrawer from "./chapter-error-drawer";
import ChapterErrorPopover from "./chapter-error-popover";

const ChapterError = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <ChapterErrorPopover open={open} onOpenChange={setOpen} />
      ) : (
        <ChapterErrorDrawer open={open} onOpenChange={setOpen} />
      )}
    </>
  )
}

export default ChapterError;
