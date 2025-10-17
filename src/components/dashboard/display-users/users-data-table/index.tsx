'use client'

import GenericPagination from "@/components/generic-pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allUsersInitialParams, useGetAllUsers } from "@/service/user/queries/use-get-all-users";
import { cn } from "@/utils/common-utils";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ColumnsIcon, SearchIcon, XIcon } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useMemo, useRef, useState } from "react";
import { columns } from "./columns";

const UsersDataTable = ({ session }: { session?: RequestCookie }) => {
  "use no memo"; // TODO: React compiler breaks data table functionality. Remove after tasntack table fix.

  const divRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string[] | undefined>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    completedCount: false,
    reviewsCount: false,
    bookmarkCount: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: allUsersInitialParams["page"],
    pageSize: allUsersInitialParams["size"],
  })

  const query = useGetAllUsers({ page: pagination.pageIndex, size: pagination.pageSize }, session);

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: query.data?.results ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    rowCount: query.data?.totalItems,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handlePage = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page }));
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }


  return (
    <section className="space-y-4" >
      <div className="overflow-hidden rounded-md border p-4 space-y-4 scroll-m-4" ref={divRef}>
        <div className="flex flex-col md:flex-row gap-y-2 md:items-center justify-between">
          <p className="text-lg font-semibold tracking-tight inline-flex gap-2 items-center">Users Table
            <span className="text-xs relative top-0.25 text-muted-foreground font-normal">{query.data?.totalItems} total users</span>
          </p>
          <div className="flex gap-4 ">
            <div className="relative w-full">
              <SearchIcon className="absolute top-2.5 left-2.25 size-3.5 text-muted-foreground" />
              <Input
                type="text"
                value={globalFilter}
                onChange={e => table.setGlobalFilter(String(e.target.value))}
                placeholder="Global filter..."
                className="w-full md:max-w-sm h-8 placeholder:text-xs pl-7"
              />
              {globalFilter?.length ? (
                <Button variant="pure" size="icon" className="absolute rounded-full right-0.5 -top-0.25 text-muted-foreground hover:text-inherit transition-colors ease-in-out duration-200 cursor-pointer" onClick={() => setGlobalFilter([])} >
                  <XIcon className="size-3.5" />
                </Button>
              ) : null}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="cool-secondary" className="items-center text-xs font-normal rounded-sm" size="sm">
                  <ColumnsIcon />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(header.column.getCanSort() && "cursor-pointer select-none")}
                      onClick={header.column.getToggleSortingHandler()} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {{
                        asc: <ChevronUp className="ml-0.5 size-3.5 inline-block" />,
                        desc: <ChevronDown className="ml-0.5 size-3.5 inline-block" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-zinc-300">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {query.data && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span>Showing {table.getRowModel().rows.length.toLocaleString()} of {query.data.totalItems} rows</span>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-22" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 9999].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <GenericPagination className="block w-max mx-0" query={query.data} handlePage={handlePage} />
          </div>
        </div>
      )}
    </section>
  )
}

export default UsersDataTable;
