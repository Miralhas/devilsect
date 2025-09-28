'use client'

import Link from "next/link";
import LogoImage from "../logo-image";

const CURRENT_YEAR = new Date().getUTCFullYear()

const Footer = () => {
  return (
    <div className="w-full bg-zinc-950 border-b-2 border-secondary shadow-2xl">
      <footer className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between mx-auto p-4 gap-5 md:gap-0">
        <Link href="/" className="mr-6 transition-opacity mt-[3px] items-center ease-in duration-200 flex gap-1.5 hover:opacity-80">
          <LogoImage
            width={25}
            height={25}
            className="ml-2 w-auto h-7"
          />
          <span className="text-base md:text-xl uppercase tracking-widest font-tilt-warp text-accent-foreground/85">
            DevilSect
          </span>
        </Link>
        <p className="text-xs md:text-sm text-foreground/80 font-medium leading-none ">Copyright {CURRENT_YEAR} © Devil Sect</p>
        <div className="space-x-3 text-xs md:text-sm">
          <Link href="/privacy" className="text-foreground/80 leading-none font-medium transition-colors duration-200 ease-out hover:text-foreground">Privacy Policy</Link>
          <Link href="/contact" className="text-foreground/80 leading-none font-medium transition-colors duration-200 ease-out hover:text-foreground">Contact</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
