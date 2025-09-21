import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full max-w-[1280px] mx-auto">
      {children}
    </section>
  )
}

export default Layout;
