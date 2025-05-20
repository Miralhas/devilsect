'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import { logoutAction } from "@/services/authentication/actions";
import { User } from "@/types/authentication";
import { BookOpenText, LogOutIcon, Mail, UserIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserAccount = ({ user }: { user: User }) => {

  const handleLogout = async () => {
    await logoutAction();
    window.location.reload();
    // queryClient.invalidateQueries({ queryKey: ['user'] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ImageWithFallback src={`${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image`}
          width={32}
          height={32}
          alt="account image"
          className="rounded-full size-8 overflow-hidden object-cover object-center shadow-2xl ring-2 ring-secondary cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] text-zinc-200 bg-zinc-900">
        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserIcon className="text-zinc-200 mt-[2px]" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/library">
            <BookOpenText className="text-zinc-200 mt-[2px]" />
            Library
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/inbox">
            <Mail className="text-zinc-200 mt-[2px]" />
            Inbox
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mt-3" />
        {/* <form action={logoutAction}> */}
        <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
          {/* <Button variant="ghost"> */}
          <LogOutIcon className="text-zinc-200 mt-[2px]" />
          Log out
          {/* </Button> */}
        </DropdownMenuItem>
        {/* </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageWithFallback = ({ fallback = "/devilsect-logo.png", alt, src, ...props }: ImageProps & { fallback?: string }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      {...props}
    />
  )
}

export default UserAccount;
