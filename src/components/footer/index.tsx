import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-zinc-950 border-b-2 border-secondary shadow-2xl">
      <footer className="w-full max-w-[1440px] flex items-center justify-between mx-auto p-4">
        <Link href="/" className="mr-6 transition-opacity mt-[3px] items-center ease-in duration-200 flex gap-1.5 hover:opacity-80">
          <Image src="/devilsect-logo.png" width={25} height={25} quality={100} alt="Website logo" className="ml-2 w-auto h-7" />
          <span className="text-base xs:text-xl uppercase tracking-widest font-tilt-warp text-accent-foreground/85">
            DevilSect
          </span>
        </Link>
        <p className="text-sm text-foreground/80 font-medium leading-none ">Copyright 2025 © Devil Sect</p>
        <div className="space-x-3">
          <Link href="/privacy" className="text-sm text-foreground/80 leading-none font-medium transition-colors duration-200 ease-out hover:text-foreground">Privacy Policy</Link>
          <Link href="/contact" className="text-sm text-foreground/80 leading-none font-medium transition-colors duration-200 ease-out hover:text-foreground">Contact</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
