import { BookOpenText, HistoryIcon, UserIcon } from "lucide-react";
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
      className="bg-secondary w-full  absolute z-10 origin-top-right lg:hidden shadow-2xl"
      initial={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      transition={{ duration: .5, type: "spring" }}
      ref={containerRef}
      key="modal"
    >
      <ul className="p-4 text-foreground/70 flex flex-col gap-1" onClick={toggleMenu}>

        <li className="flex w-full items-center">
          <SearchInput />
        </li>

        {LEFT_SIDE_NAV_LINKS.map((link, index) => (
          <li key={link.title + "_" + index} className="w-full flex" >
            <NavItem {...link} />
          </li>
        ))}

        <Separator className="my-2" />

        <li className="flex flex-col">
          <NavItem href="/profile" title="Profile" icon={UserIcon} />
        </li>

        <li className="flex flex-col">
          <NavItem href="/profile/library" title="Library" icon={BookOpenText} />
        </li>

        <li className="flex flex-col">
          <NavItem href="/profile/history" title="History" icon={HistoryIcon} />
        </li>
      </ul>
    </motion.div>
  )
}

const NavItem = (link: NavLink) => {
  return (
    <Link href={link.href} className="flex items-center gap-2 relative text-base font-light tracking-wide text-foreground/80 hover:text-foreground top-[1px] ease-in duration-200 w-full transition-colors p-2 hover:bg-background hover:rounded-sm">
      {link.icon ? <link.icon className="size-5 " /> : null}
      {link.title}
    </Link>
  )
}

export default MobileMenu;
