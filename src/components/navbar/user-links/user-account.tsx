'use client'

import DynamicBlurImage from "@/components/dynamic-blur-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import useLogout from "@/hooks/use-logout";
import { User } from "@/types/authentication";
import { BookOpenText, LogOutIcon, Mail, UserIcon } from "lucide-react";
import Link from "next/link";

const UserAccount = ({ user }: { user: User }) => {
  const handleLogout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DynamicBlurImage
          src={`${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image#${new Date().getTime().toString()}`}
          width={32}
          height={32}
          fill={false}
          alt="account image"
          default={`https://static.devilsect.com/yin-yang.png`}
          className="rounded-full size-6 md:size-8 overflow-hidden object-cover object-center shadow-2xl ring-2 ring-secondary cursor-pointer user-profile-header-image"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] text-zinc-200 bg-zinc-900">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="text-zinc-200 mt-[2px]" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/library">
            <BookOpenText className="text-zinc-200 mt-[2px]" />
            Library
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/inbox">
            <Mail className="text-zinc-200 mt-[2px]" />
            Inbox
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mt-3" />
        <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
          <LogOutIcon className="text-zinc-200 mt-[2px]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccount;
