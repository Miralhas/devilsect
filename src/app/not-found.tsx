import HomePageButton from "@/components/not-found/home-page-button";
import ShowQuote from "@/components/not-found/show-quote";

const BG_IMAGE = `https://wsrv.nl/?url=https://static.devilsect.com/divine-tribulation.jpg&w=1920&q=25&output=webp&fit=cover&dpr=2&maxage=1y&il=true&af=true`;

const NotFound = () => {
  return (
    <div className="h-screen bg-no-repeat bg-cover overlay" style={{
      backgroundImage: `url(${BG_IMAGE})`
    }}>
      <div className="h-full w-full grid place-items-center p-4 relative z-10">
        <div className="space-y-5 md:space-y-8 max-w-lg text-center">
          <h1 className="font-tilt-warp text-7xl font-bold">404</h1>
          <p className="font-medium">This page either does not exist or has mysteriously disappeared.</p>
          <ShowQuote>
            <HomePageButton className="w-full sm:max-w-[180px]" />
          </ShowQuote>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
