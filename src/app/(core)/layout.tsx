import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default CoreLayout;
