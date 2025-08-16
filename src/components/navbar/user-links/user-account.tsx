'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { env } from "@/env";
import defaultBlur from "@/lib/blur-data";
import { logoutAction } from "@/services/authentication/actions";
import { User } from "@/types/authentication";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpenText, LogOutIcon, Mail, UserIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserAccount = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    queryClient.invalidateQueries({ queryKey: ['user'] });
    router.refresh();
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
        <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
          <LogOutIcon className="text-zinc-200 mt-[2px]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageWithFallback = ({ fallback = "/yin-yang.png", alt, src, ...props }: ImageProps & { fallback?: string }) => {
  const [error, setError] = useState(false);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      {...props}
      blurDataURL={defaultBlur}
    />
  )
}

export default UserAccount;
