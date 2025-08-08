import { ReaderSettingsProvider } from "@/contexts/reader-settings-context";
import { PropsWithChildren } from "react";

const ChapterLayout = ({ children }: PropsWithChildren) => {
  return (
    <ReaderSettingsProvider>
      {children}
    </ReaderSettingsProvider>
  )
}

export default ChapterLayout;
