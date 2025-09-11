import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="min-h-screen">
      <div className="text-center text-2xl font-bold tracking-tight mt-12">Ranking</div>
      {children}
    </section>
  )
}

export default Layout;
