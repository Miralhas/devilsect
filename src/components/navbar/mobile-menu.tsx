import { motion } from "motion/react";
import Link from "next/link";
import { LEFT_SIDE_NAV_LINKS } from "./header";
import SearchInput from "./search-input";

const MobileMenu = () => {
  return (
    <>
      <motion.div
        className="bg-[#111111] w-full h-[400px] absolute z-10 origin-top-right sm:hidden"
        initial={{ opacity: 0, scaleY: 0, scaleX: 1 }}
        animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleY: 0, scaleX: 1 }}
        transition={{ duration: .5, type: "spring" }}
        key="modal"
      >
        <ul className="p-4 text-foreground/70 flex flex-col gap-2">

          <li className="flex w-full sm:w-[320px] sm:flex-none items-center ms-auto">
            <SearchInput />
          </li>

          {LEFT_SIDE_NAV_LINKS.map((link, index) => (
            <li key={link.title + "_" + index} className="w-full flex" >
              <Link href={link.href} className="flex items-center gap-2 relative text-base font-medium tracking-wide text-foreground/70 hover:text-foreground top-[1px] ease-in duration-200 w-full transition-colors p-2 hover:bg-secondary/70 hover:rounded-sm">
                {link.icon ? <link.icon className="size-6 mt-1" /> : null}
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}

export default MobileMenu;
