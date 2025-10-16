import Container from "@/components/container";
import { PropsWithChildren } from "react";

const HomeLayout = async ({ children }: PropsWithChildren) => {
  return (
    <section className="bg-[radial-gradient(80%_50%_at_50%_-20%,_rgba(255,0,0,0.015),_transparent)] bg-no-repeat">
      <Container className="">
        {children}
      </Container>
    </section>
  )
}

export default HomeLayout;
