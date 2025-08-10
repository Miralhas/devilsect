import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { ReaderSettingsProvider } from "@/contexts/reader-settings-context";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <ReaderSettingsProvider>
      <Header />
      {children}
      <Footer />
    </ReaderSettingsProvider>
  )
}

export default CoreLayout;
