'use client'

import { Book, BookOpenText, Gem, LucideIcon, Mail, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";
import SearchInput from "./search-input";
import { AnimatePresence } from "motion/react";

type NavLink = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export const LEFT_SIDE_NAV_LINKS: NavLink[] = [
  { title: "Novels", href: "/novels", icon: Book },
  { title: "Ranking", href: "/ranking", icon: Gem },
  { title: "Updates", href: "/latest-updates", icon: RefreshCcw },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-950 w-full relative border-b-2 border-secondary shadow-2xl ">

      <nav className="mx-auto w-full max-w-[1440px] flex items-center p-4 gap-4">

        <Link href="/" className="text-2xl mr-4 font-semibold transition-all mt-[3px] items-center ease-in duration-200 flex gap-1 hover:opacity-85 hover:scale-[1.03] bg-gradient-to-r from-red-700/80 to-primary/70 bg-clip-text text-transparent">
          <Image src="/devilsect-logo.png" width={25} height={25} quality={100} alt="Website logo" className="ml-2 h-7 w-6" />
          <span className="sr-only sm:not-sr-only uppercase tracking-widest">DevilSect</span>
        </Link>

        <div className="hidden sm:flex items-center gap-4">
          {LEFT_SIDE_NAV_LINKS.map((link, index) => (
            <Link href={link.href} key={link.title + "_" + index} className="flex items-center gap-1 relative text-base font-medium tracking-wide text-foreground/70 hover:text-foreground top-[1px] transition-all ease-in duration-200">
              {link.icon ? <link.icon className="size-4 mt-1" /> : null}
              {link.title}
            </Link>
          ))}
        </div>

        <div className="hidden sm:flex w-full sm:w-[320px] sm:flex-none items-center ms-auto ">
          <SearchInput />
        </div>

        <Link href="/account/library" className="hidden sm:flex text-foreground/70 hover:text-foreground items-center gap-2 relative group hover:scale-[1.03]">
          <BookOpenText className="size-5 " />
          <span className="text-sm mb-[2px] font-semibold ">Library</span>
        </Link>

        <Link href="/account/inbox" className="ms-auto sm:ms-0 flex items-center gap-2 group hover:scale-[1.03] text-foreground/70 hover:text-foreground">
          <div className="relative">
            <span className="text-white rounded-full absolute -top-[11px] -right-[9px] text-[10px] bg-red-900/80 border border-red-500 px-[5px] w-fit h-fit flex items-center justify-center">
              <span className="relative bottom-[1px]">3</span>
            </span>
            <Mail className="size-5" />
          </div>
          <span className="text-sm mb-[2px] font-semibold sr-only sm:not-sr-only">Inbox</span>
        </Link>


        <div className="w-px h-4 bg-zinc-700" />

        <Link href="/login" className="flex items-center gap-2 hover:underline">
          <Image src="https://github.com/miralhas.png" width={30} height={30} alt="account image" className="rounded-full size-9" />
        </Link>

        <div className="w-px h-4 bg-zinc-700 sm:hidden" />

        <div>
          <span className="sr-only">Toggle Menu</span>
          <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

      </nav>

      <AnimatePresence>
        {isMenuOpen ? <MobileMenu /> : null}
      </AnimatePresence>
    </div>
  )
}

export default Header;
