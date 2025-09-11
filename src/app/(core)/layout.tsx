import Footer from "@/components/footer";
import GlobalLoginDialog from "@/components/global-login-dialog";
import Header from "@/components/navbar/header";
import { ReaderSettingsProvider } from "@/contexts/reader-settings-context";
import { getShallowUser } from "@/services/authentication/server-queries";
import { PropsWithChildren, Suspense } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  const shallowUser = getShallowUser();
  return (
    <ReaderSettingsProvider>
      <Header />
      {children}
      <Footer />
      <Suspense fallback={null}>
        <GlobalLoginDialog shallowUser={shallowUser} />
      </Suspense>
    </ReaderSettingsProvider>
  )
}

export default CoreLayout;
