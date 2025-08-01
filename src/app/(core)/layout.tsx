import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1280px] grid gap-5 p-4">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default CoreLayout;
