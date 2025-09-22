'use client'

import Image from "next/image";
import Link from "next/link";
import { createWsrvLoader } from "./wsrvLoader";

const LogoLink = () => {
  return (
    <Link href="/" className="me-8 transition-opacity mt-[3px] items-center ease-in duration-200 flex gap-1.5 hover:opacity-80 ">
      <Image priority fill={false} loader={createWsrvLoader({})} src="https://static.devilsect.com/devilsect-logo.png"
        width={20}
        height={0}
        alt="Website logo"
        className="ml-2 w-auto h-7 xs:h-8"
      />
      <p className="text-base xs:text-2xl uppercase tracking-widest bg-gradient-to-r from-red-700/80 to-primary/70 bg-clip-text text-transparent font-tilt-warp">
        DevilSect
      </p>
    </Link>
  )
}

export default LogoLink;
