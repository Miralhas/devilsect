'use client'

import RoleBadge from "@/components/profile/profile-header/role-badge";
import { createWsrvLoader } from "@/components/wsrvLoader";
import { env } from "@/env";
import { Role, UserInfo } from "@/types/authentication";
import { roleMap } from "@/utils/api-utils";
import { formatFullDateBR } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import { UserIcon } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "avatar", header: () => <UserIcon className="size-3.5 ms-0.5" aria-description="avatar" />, cell: ({ row }) => {
      return <Image
        loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
        height={20}
        width={20}
        src={`${env.NEXT_PUBLIC_BASE_URL}/users/${row.original.id}/image`}
        alt="user image"
        className="text-transparent rounded-full"
      />
    },
    enableSorting: false,
  },
  { accessorKey: "id", header: "Id" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "createdAt", header: "Created At", cell: ({ row }) => {
      const date = formatFullDateBR(row.original.createdAt);
      return <span className="capitalize">{date}</span>
    }
  },
  {
    accessorKey: "roles", header: "Roles", cell: ({ row }) => {
      const roles = row.original.roles;
      return (
        <div className="flex gap-2">
          {roles.map((r: Role) => <RoleBadge className="text-[10px] px-1 py-0.5" key={r} role={roleMap[r]} />)}
        </div>
      )
    }
  },
  {
    accessorKey: "lastActivity", header: "Last Activity", cell: ({ row }) => {
      const value = row.original.lastActivity as string | null;
      if (!value) {
        return <span className="capitalize">N/A</span>
      }
      const date = formatFullDateBR(value);
      return <span className="capitalize">{date}</span>
    }
  },
  { accessorKey: "registerType", header: "Register Type" },
  {
    accessorKey: "readCount", header: "Read Count", cell: ({ row }) => {
      return (
        <span className="inline-flex justify-center w-full">{row.original.readCount}</span>
      )
    }
  },
  {
    accessorKey: "bookmarkCount", header: "Bookmark Count", cell: ({ row }) => {
      return (
        <span className="inline-flex justify-center w-full">{row.original.bookmarkCount}</span>
      )
    }
  },
  {
    accessorKey: "reviewsCount", header: "Reviews Count", cell: ({ row }) => {
      return (
        <span className="inline-flex justify-center w-full">{row.original.reviewsCount}</span>
      )
    }
  },
  {
    accessorKey: "completedCount", header: "Completed Count", cell: ({ row }) => {
      return (
        <span className="inline-flex justify-center w-full">{row.original.completedCount}</span>
      )
    },
  },
]