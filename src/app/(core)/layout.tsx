import Header from "@/components/navbar/header";
import { PropsWithChildren } from "react";

const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] grid grid-rows-[min-content_max-content] gap-5 p-4">
        {children}
      </div>
    </>
  )
}

export default CoreLayout;
