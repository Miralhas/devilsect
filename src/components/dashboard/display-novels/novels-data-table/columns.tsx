'use client'

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createWsrvLoader } from "@/components/wsrvLoader";
import { env } from "@/env";
import { NovelSummary } from "@/types/novel";
import { statusMap } from "@/utils/api-utils";
import { formatFullDateBR } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine, ImageIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<NovelSummary>[] = [
  {
    accessorKey: "image", header: () => <ImageIcon className="size-3.5 ms-0.5" aria-description="novel image" />, cell: ({ row }) => {
      return <Image
        loader={createWsrvLoader({ default: `https://static.devilsect.com/yin-yang-48x48.png` })}
        height={20}
        width={20}
        src={`${env.NEXT_PUBLIC_BASE_URL}/novels/${row.original.slug}/image`}
        alt="user image"
        className="text-transparent rounded-sm h-[20px]"
      />
    },
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-sm ">{row.original.id}</span>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <Link href={`/novels/${row.original.slug}`} className="font-medium max-w-[200px] capitalize">{row.original.title}</Link>,
  },
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.alias ? (
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="text-start w-full max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              {row.original.alias}
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] text-center bg-secondary border border-zinc-50/10 text-zinc-200">
              <p>{row.original.alias}</p>
            </TooltipContent>
          </Tooltip>
        ) : <span className="text-muted-foreground">Null</span>}
      </div>
    )
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <span className="text-sm ">{row.original.author}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm">{formatFullDateBR(row.original.createdAt)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === "COMPLETED" ? "cool" : "cool-secondary"}
          className="text-zinc-300 w-[82px]">
          {statusMap[status]}
        </Badge>
      )
    },
  },
  {
    accessorKey: "isHidden",
    header: "Visibility",
    cell: ({ row }) => (
      <Badge variant={row.original.isHidden ? "cool" : "cool-secondary"} className="text-zinc-300">
        {row.original.isHidden ? "Hidden" : "Visible"}
      </Badge>
    ),
  },
  {
    accessorKey: "chaptersCount",
    header: "Chapters",
    cell: ({ row }) => <span className="text-sm">{row.original.chaptersCount}</span>,
  },
  {
    accessorKey: "ratingValue",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.ratingValue
      return rating !== null ? (
        <div className="flex items-center gap-1">
          <StarIcon className="size-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
      ) : (
        <span className=" text-sm">N/A</span>
      )
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <span className="text-sm">{row.original.views.toLocaleString()}</span>,
  },
  {
    accessorKey: "bayesianScore",
    header: "Score",
    cell: ({ row }) => <span className="text-sm">{(row.original.bayesianScore * 20).toFixed(2)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="ml-2">
        <Link href={`/dashboard/${row.original.slug}`} className="text-muted-foreground transition-colors duration-100 ease-in hover:text-white">
          <FilePenLine className="size-4.5" />
        </Link>
      </div>
    )
  },
]