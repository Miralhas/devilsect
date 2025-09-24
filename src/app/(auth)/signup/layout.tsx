import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create your account."
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
    </>
  )
}

export default Layout;
