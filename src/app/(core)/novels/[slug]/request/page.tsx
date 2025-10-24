import ChapterRequestButton from "@/components/chapter-request-button";
import { BookHeartIcon } from "lucide-react";

const RequestPage = () => {
  return (
    <section className="relative py-8 md:py-10 mb-12 rounded-xl w-full">
      <div className="flex flex-col items-center justify-center md:max-w-2xl mx-auto">
        <div className="bg-primary/40 border border-accent/90 rounded-full p-3 md:p-4 mb-3 md:mb-4">
          <BookHeartIcon className="size-6 md:size-7 text-accent" />
        </div>
        <div className="text-center space-y-2 md:space-y-4 mb-4 md:mb-6">
          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight">Request New Chapters</h2>
          <div className="space-y-1">
            <p className="text-sm leading-relaxed text-zinc-300 font-medium md:text-lg md:text-[17px]">
              You’ve reached the latest chapter!
            </p>
            <p className="text-sm text-[13px] leading-relaxed text-muted-foreground md:text-base md:text-[15px] max-w-lg">
              Want more? Send a request and we’ll update the novel as soon as new chapters are available.
            </p>
          </div>
        </div>
        <ChapterRequestButton />
        <div className="text-center">
          <p className="text-muted-foreground text-xs md:text-sm mt-4 md:mt-6 font-light">
            All requests are regularly reviewed by our team.
          </p>
        </div>
      </div>
    </section>
  )
}

export default RequestPage;
