import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { PropsWithChildren } from "react";

const CoreLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default CoreLayout;
