import ShowQuote from "@/components/not-found/show-quote";

const BG_IMAGE = `https://wsrv.nl/?url=https://static.devilsect.com/divine-tribulation.jpg&w=1920&q=25&output=webp&fit=cover&dpr=2&maxage=1y&il=true&af=true`;

const MaintenancePage = () => {
  return (
    <div className="h-screen bg-no-repeat bg-cover overlay" style={{
      backgroundImage: `url(${BG_IMAGE})`
    }}>
      <div className="h-full w-full grid place-items-center p-4 relative z-10">
        <div className="space-y-2 md:space-y-2 max-w-lg text-center">
          <h1 className="font-tilt-warp text-4xl md:text-5xl font-bold">Under Mainantance</h1>
          <p className="font-medium text-muted-foreground text-sm md:text-base">We are currently undergoing maintenance. Please comeback later!</p>
          <div className="mt-6">
            <ShowQuote />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenancePage;
