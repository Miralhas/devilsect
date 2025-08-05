import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto w-full max-w-[1280px] grid gap-5 p-4">
      {children}
    </div>
  )
}

export default Container;
