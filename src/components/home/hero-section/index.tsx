import Announcements from "./announcements";
import CarouselNovel from "./carousel-novel";

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row gap-12 font-inter lg:mt-2">
      <CarouselNovel />
      <Announcements />
    </section>
  )
}

export default HeroSection;
