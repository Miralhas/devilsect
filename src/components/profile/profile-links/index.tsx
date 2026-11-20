'use client'

import { DynamicProfileData } from '@/types/authentication';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { uri: "", name: "Info", readOnly: true },
  { uri: "/library", name: "Library", readOnly: true },
  { uri: "/history", name: "History", readOnly: true },
  { uri: "/reviews", name: "Reviews", readOnly: false },
  { uri: "/comments", name: "Comments", readOnly: false },
  { uri: "/inbox", name: "Inbox", readOnly: false },
] as const;

const getPath = (profile: DynamicProfileData, uri: string) => {
  const base = "/profile"
  return profile.readOnly ? `${base}/${profile.user.username}${uri}` : `${base}${uri}` 
}

const ProfileLinks = ({ profile }: { profile: DynamicProfileData }) => {
  const pathname = usePathname();
  
  const links = profile.readOnly ? NAV_LINKS.filter(l => l.readOnly) : NAV_LINKS;

  return (
    <ul className="w-full font-medium grid grid-cols-2 justify-items-center md:flex gap-4 md:justify-start md:gap-10">
      {links.map(link => (
        <div key={link.uri} className="w-full md:w-fit flex justify-center border-b md:border-none">
          <li key={link.uri}
            className='list-none text-base md:text-lg font-semibold pb-2 md:pb-4 relative w-fit col-span-1'
          >
            <Link key={link.name} href={getPath(profile, link.uri)}>
              {link.name}
            </Link>
            {getPath(profile, link.uri) === pathname ? (
              <div
                id="underline"
                className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-accent"
              />
            ) : null}
          </li>
        </div>
      ))}
    </ul>
  )
}

export default ProfileLinks;
