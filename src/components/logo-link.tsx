import Image from "next/image";
import Link from "next/link";

const LogoLink = () => {
  return (
    <Link href="/" className="mr-6 transition-all mt-[3px] items-center ease-in duration-200 flex gap-1.5 hover:opacity-80 hover:scale-[1.03]">
      <Image src="/devilsect-logo.png" width={25} height={25} quality={100} alt="Website logo" className="ml-2 w-auto h-7 xs:h-8" />
      <span className="text-base xs:text-2xl uppercase tracking-widest bg-gradient-to-r from-red-700/80 to-primary/70 bg-clip-text text-transparent font-tilt-warp">
        DevilSect
      </span>
    </Link>
  )
}

export default LogoLink;
