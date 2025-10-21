import { BookHeartIcon } from "lucide-react";
import NovelRequestForm from "./novel-request-form";

const NovelRequest = () => {
  return (
    <section className="relative border-y border-zinc-50/10 py-8 md:py-10 rounde-xl">
      <div className="flex flex-col items-center justify-center md:max-w-2xl mx-auto">
        <div className="bg-primary/40 border border-accent/90 rounded-full p-3 md:p-4 mb-3 md:mb-4">
          <BookHeartIcon className="size-6 md:size-7 text-accent" />
        </div>
        <div className="text-center space-y-2.5 md:space-y-4 mb-4 md:mb-6">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Request a Novel</h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-lg md:text-[17px]">Can&apos;t find your favorite novel? Let us know and we&apos;ll do our best to add it to our collection.</p>
        </div>
        <NovelRequestForm />
        <div className="text-center">
          <p className="text-muted-foreground text-xs md:text-sm mt-4 md:mt-6 font-light">
            All requests are regularly reviewed by our team.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NovelRequest;
