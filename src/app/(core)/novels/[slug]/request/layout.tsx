import { PropsWithChildren } from "react";

const RequestLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full min-h-[calc(100vh-(70px+187px))] grid place-items-center p-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black relative overflow-hidden">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
      {children}
    </section>
  )
}

export default RequestLayout;
