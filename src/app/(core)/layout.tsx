import Footer from "@/components/footer";
import GlobalLoginDialog from "@/components/global-login-dialog";
import Header from "@/components/navbar/header";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <GlobalLoginDialog />
    </>
  )
}

export default CoreLayout;
