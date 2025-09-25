import { Button } from "@/components/ui/button";

const StartReadingButtonLoading = () => {
  return (
    <>
      <Button variant="pure" className="animate-pulse bg-gradient-to-r from-accent to-primary/60 text-lg h-[60px] w-full lg:max-w-[335px] text-white font-bold capitalize tracking-tighter">
        Start Reading
      </Button>
    </>
  )
}

export default StartReadingButtonLoading;
