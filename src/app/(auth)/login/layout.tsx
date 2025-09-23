import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Login"
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
    </>
  )
}

export default Layout;
