'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginatedQuery } from "@/types/pagination";
import { cn } from "@/utils/common-utils";
import { MouseEvent, useMemo } from "react";

const DELTA = 2;
const FIRST_PAGE = 0;

type Props<T> = {
  query: PaginatedQuery<T>;
  handlePage: (page: number) => void;
  className?: string;
}

function GenericPagination<T>({ query, handlePage, className }: Props<T>) {
  const last = query.totalPages - 1;
  const current = query.currentPage;

  const range = useMemo(() => {
    const r = []
    const left = current - DELTA;
    const right = current + DELTA + 1;
    for (let i = 0; i <= last; i++) {
      if (i >= left && i < right) {
        r.push(i);
      }
    }
    return r;
  }, [last, current]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, page: number) => {
    e.preventDefault();
    handlePage(page);
  }

  return (
    <Pagination className={cn("", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => handleClick(e, query.previous!)}
            aria-disabled={query.previous === null}
            disabled={query.previous === null}
            text={false} />
        </PaginationItem>

        {range.includes(FIRST_PAGE) ? null : (
          <>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                onClick={(e) => handleClick(e, 0)}
              >
                {FIRST_PAGE + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden md:block">
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}


        {range.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={(e) => handleClick(e, page)}
              className={cn(current === page && "")}
              isActive={current === page}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )
        )}

        {range.includes(last) ? null : (
          <>
            <PaginationItem className="hidden md:block">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                onClick={(e) => handleClick(e, last)}
              >
                {last + 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            text={false}
            onClick={(e) => handleClick(e, query.next!)}
            aria-disabled={query.next === null}
            disabled={query.next === null}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination >
  )
}

export default GenericPagination;

// gist that helped me - https://gist.github.com/kottenator/9d936eb3e4e3c3e02598