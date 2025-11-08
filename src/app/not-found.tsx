import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen bg-[url(https://wsrv.nl/?url=https://static.devilsect.com/divine-tribulation.jpg&w=1920&q=25&output=webp&fit=cover&dpr=2&maxage=1y&il=true&af=true)] bg-no-repeat bg-cover overlay">
      <div className="h-full w-full grid place-items-center p-4">
        <div className="space-y-2 max-w-lg text-center">
          <h1 className="font-tilt-warp text-7xl font-bold">404</h1>
          <p className="font-medium">This page either does not exist or has mysteriously disappeared.</p>
          <p className="text-xs text-muted-foreground">Or perhaps it was destroyed after a divine tribulation.</p>
          <Button asChild variant="cool" className="mt-4 h-10 w-full max-w-[180px]">
            <Link href="/">Home Page</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
