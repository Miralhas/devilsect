'use client'

import { motion } from "motion/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: "/profile", name: "Info" },
  { href: "/profile/library", name: "Library" },
  { href: "/profile/history", name: "History" },
  { href: "/profile/reviews", name: "Reviews" },
  { href: "/profile/comments", name: "Comments" },
  { href: "/profile/inbox", name: "Inbox" },
] as const;

const ProfileLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full font-medium grid grid-cols-2 justify-items-center md:flex gap-4 md:justify-start md:gap-10">
      {NAV_LINKS.map(link => (
        <div key={link.href} className="w-full md:w-fit flex justify-center border-b md:border-none">
          <motion.li key={link.href}
            className='list-none text-base md:text-lg font-semibold pb-2 md:pb-4 relative w-fit col-span-1'
            initial={false}
          >
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
            {link.href === pathname ? (
              <motion.div
                layoutId="underline"
                id="underline"
                className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-accent"
              />
            ) : null}
          </motion.li>
        </div>
      ))}
    </ul>
  )
}

export default ProfileLinks;
