import { PropsWithChildren } from "react";

const AnnouncementsLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full max-w-[1280px] mx-auto">
      {children}
    </section>
  )
}

export default AnnouncementsLayout;
