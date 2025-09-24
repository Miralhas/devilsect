import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account using your email and password or Google account."
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
    </>
  )
}

export default Layout;
