import SpinnerLoader from "@/components/ui/spinner-loader";
import dynamic from "next/dynamic";
import Announcements from "./announcements";

const CarouselNovel = dynamic(() => import("./carousel-novel"), {
  ssr: true,
  loading: () => <SpinnerLoader containerClassName="min-h-[30vh]" />
});

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row gap-12 lg:mt-2">
      <CarouselNovel />
      <Announcements />
    </section>
  )
}

export default HeroSection;
