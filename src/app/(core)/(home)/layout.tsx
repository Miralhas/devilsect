import Container from "@/components/container";
import { PropsWithChildren } from "react";

const HomeLayout = async ({ children }: PropsWithChildren) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950/20 to-zinc-950/40 backdrop-blur-sm">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      <div className="absolute -left-20 top-1/2 bottom-1/2 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      <div className="absolute -right-20 top-1/2 bottom-1/2 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      <Container className="relative">
        {children}
      </Container>
    </section>
  )
}

export default HomeLayout;
