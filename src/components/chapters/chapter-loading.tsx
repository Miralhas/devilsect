import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../container";
import { Skeleton } from "../ui/skeleton";

const ChapterLoading = () => {
  return (
    <>
      <Container className="max-w-[1024px] p-0 gap-0 block min-h-screen space-y-4">
        <Header />
        <div className="w-full px-4 max-w-[840px] mx-auto">
          <section className="grid place-items-center opacity-30 min-h-[80vh]">
            <div className="h-24 aspect-square rounded-full bg-[radial-gradient(25%_25%_at_50%_25%,#000_24%,#fff_26%_99%,transparent_101%),radial-gradient(25%_25%_at_50%_75%,#fff_24%,#000_26%_99%,transparent_101%),conic-gradient(#000_50%,#fff_0)] border border-black animate-spin" />
          </section>
        </div>
      </Container>
    </>
  )
}

const Header = () => {
  return (
    <div className="w-full">
      <div className="max-w-[840px] mx-auto px-2">
        <div className="flex justify-between p-3 items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[42px] w-[28px] rounded-xs" />
            <Skeleton className="h-[16px] w-[200px]" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className={"p-1 items-center justify-center rounded-full border-2 border-accent text-white"}
            >
              <span><ChevronLeft className="size-6 relative right-[1px]" strokeWidth={3} /></span>
            </div>

            <div
              className={"p-1 items-center justify-center rounded-full border-2 border-accent text-white"}
            >
              <span><ChevronRight className="size-6 relative left-[1px] bottom-[1px]" strokeWidth={3} /></span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[#424242]" />
    </div>
  )
}

export default ChapterLoading;
