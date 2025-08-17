'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: "/profile", name: "Info" },
  { href: "/profile/library", name: "Library" },
  { href: "/profile/history", name: "History" },
  { href: "/profile/inbox", name: "Inbox" },
] as const;

const ProfileLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center gap-10 text-lg">
      {NAV_LINKS.map(link => (
        <Link key={link.name} href={link.href} className={cn("", {"text-accent": pathname===link.href})}>
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default ProfileLinks;
