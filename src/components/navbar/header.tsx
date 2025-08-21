'use client'

import { Book, Gem, LucideIcon, RefreshCcw } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoLink from "../logo-link";
import LoginButton from "./login-button";
import MenuButton from "./menu-button";
import SearchInput from "./search-input";

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const UserLinks = dynamic(() => import("./user-links"), { ssr: false, loading: () => <LoginButton isLoading /> });


export type NavLink = {
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
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && previous > 150) {
      setIsNavHidden(true);
      return;
    }
    setIsNavHidden(false);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      const isClickOutsideMenu = menuRef.current && !menuRef.current.contains(event.target as Node);
      const isClickOutsideButton = menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node);

      if (isMenuOpen && isClickOutsideMenu && isClickOutsideButton) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isNavHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="bg-zinc-950 w-full border-b-2 border-secondary shadow-2xl sticky top-0 z-50"
    >
      <nav className="mx-auto w-full max-w-[1280px] flex items-center p-3 md:p-4 gap-4 relative">
        <LogoLink />

        <div className="hidden lg:flex items-center gap-4">
          {LEFT_SIDE_NAV_LINKS.map((link, index) => (
            <Link
              href={link.href} key={link.title + "_" + index}
              className="flex items-center gap-1 relative text-sm xl:text-base font-light tracking-wide text-foreground/80 hover:text-foreground top-[1px] transition-all ease-in duration-200">
              {link.icon ? <link.icon className="size-4" /> : null}
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center w-full justify-end">

          <div className="hidden w-full lg:flex lg:w-[230px] xl:w-[320px] sm:flex-none items-center ">
            <SearchInput />
          </div>

          <UserLinks />

          <div className="flex gap-4 items-center lg:hidden">
            <div className="w-px h-4 bg-zinc-700 lg:hidden" />
            <span className="sr-only">Toggle Menu</span>
            <div ref={menuButtonRef}>
              <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>

      </nav>

      <AnimatePresence>
        {isMenuOpen ? <MobileMenu containerRef={menuRef} toggleMenu={toggleMenu} /> : null}
      </AnimatePresence>
    </motion.div>
  )
}

export default Header;
