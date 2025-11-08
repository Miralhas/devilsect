import HomePageButton from "@/components/home-page-button";

const BG_IMAGE = `https://wsrv.nl/?url=https://static.devilsect.com/divine-tribulation.jpg&w=1920&q=25&output=webp&fit=cover&dpr=2&maxage=1y&il=true&af=true`;

const NotFound = () => {
  return (
    <div className="h-screen bg-no-repeat bg-cover overlay" style={{
      backgroundImage: `url(${BG_IMAGE})`
    }}>
      <div className="h-full w-full grid place-items-center p-4 relative z-10">
        <div className="space-y-2 max-w-lg text-center">
          <h1 className="font-tilt-warp text-7xl font-bold">404</h1>
          <p className="font-medium">This page either does not exist or has mysteriously disappeared.</p>
          <p className="text-xs text-muted-foreground">Or perhaps it was destroyed after a divine tribulation.</p>
          <HomePageButton className="mt-4 w-full max-w-[180px]" />
        </div>
      </div>
    </div>
  )
}

export default NotFound;
