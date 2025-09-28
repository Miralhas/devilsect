'use client'

import Link from "next/link";
import LogoImage from "./logo-image";

const LogoLink = () => {
  return (
    <Link href="/" className="me-8 transition-opacity mt-[3px] items-center ease-in duration-200 flex gap-1.5 hover:opacity-80 ">
      <LogoImage
        width={25}
        height={25}
        className="ml-2 w-auto h-7 xs:h-8"
      />
      <p className="text-base xs:text-2xl uppercase tracking-widest bg-gradient-to-r from-red-700/80 to-primary/70 bg-clip-text text-transparent font-tilt-warp">
        DevilSect
      </p>
    </Link>
  )
}

export default LogoLink;