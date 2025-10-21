import Container from "@/components/container";
import { PropsWithChildren } from "react";

const HomeLayout = async ({ children }: PropsWithChildren) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950/20 to-zinc-950/40 backdrop-blur-sm">
      <Container className="">
        {children}
      </Container>
    </section>
  )
}

export default HomeLayout;
