import Footer from "@/components/footer";
import GlobalLoginDialog from "@/components/global-login-dialog";
import Header from "@/components/navbar/header";
import { ReaderSettingsProvider } from "@/contexts/reader-settings-context";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <ReaderSettingsProvider>
      <Header />
      {children}
      <Footer />
      <GlobalLoginDialog />
    </ReaderSettingsProvider>
  )
}

export default CoreLayout;
