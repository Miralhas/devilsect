import { BookOpenText } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LEFT_SIDE_NAV_LINKS, NavLink } from "./header";
import SearchInput from "./search-input";
import { RefObject } from "react";

type MobileMenuProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
}

const MobileMenu = ({ containerRef, toggleMenu }: MobileMenuProps) => {
  return (
    <motion.div
      className="bg-secondary w-full h-[400px] absolute z-10 origin-top-right lg:hidden shadow-2xl"
      initial={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      transition={{ duration: .5, type: "spring" }}
      ref={containerRef}
      key="modal"
    >
      <ul className="p-4 text-foreground/70 flex flex-col gap-2" onClick={toggleMenu}>

        <li className="flex w-full items-center">
          <SearchInput />
        </li>

        {LEFT_SIDE_NAV_LINKS.map((link, index) => (
          <li key={link.title + "_" + index} className="w-full flex" >
            <NavItem {...link} />
          </li>
        ))}

        <Separator className="my-2" />

        <li className="flex w-full items-center">
          <NavItem href="/account/library" title="Library" icon={BookOpenText} />
        </li>
      </ul>
    </motion.div>
  )
}

const NavItem = (link: NavLink) => {
  return (
    <Link href={link.href} className="flex items-center gap-2 relative text-base font-medium tracking-wide text-foreground/70 hover:text-foreground top-[1px] ease-in duration-200 w-full transition-colors p-2 hover:bg-secondary/70 hover:rounded-sm">
      {link.icon ? <link.icon className="size-6 " /> : null}
      {link.title}
    </Link>
  )
}

export default MobileMenu;
