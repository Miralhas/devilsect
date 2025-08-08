import Container from "@/components/container";
import { PropsWithChildren } from "react";

const HomeLayout = async ({ children }: PropsWithChildren) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default HomeLayout;
