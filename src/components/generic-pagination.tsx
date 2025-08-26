import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { nuqsSearchParams, searchSerializer } from "@/lib/schemas/search-params-schema";
import { cn } from "@/lib/utils";
import { PaginatedQuery } from "@/types/pagination";
import { useQueryStates } from "nuqs";
import { MouseEvent, useMemo } from "react";

const DELTA = 2;
const FIRST_PAGE = 1;

function GenericPagination<T>({ query }: { query: PaginatedQuery<T> }) {
  const [value, setValue] = useQueryStates(nuqsSearchParams);

  const last = query.totalPages;
  const current = query.currentPage + 1;

  const range = useMemo(() => {
    const r = []
    const left = current - DELTA;
    const right = current + DELTA + 1;
    for (let i = 1; i <= last; i++) {
      if (i >= left && i < right) {
        r.push(i);
      }
    }
    return r;
  }, [last, current]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    setValue({ page: index })
  }

  return (
    <Pagination className="border-t pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={searchSerializer({ q: value.q, page: Number(query.previous) + 1 })}
            aria-disabled={query.previous === null}
            tabIndex={query.previous === null ? -1 : undefined}
            className={
              query.previous === null ? "pointer-events-none opacity-50" : undefined
            }
            text={false} />
        </PaginationItem>

        {range.includes(FIRST_PAGE) ? null : (
          <>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                className=""
                href={searchSerializer({ q: value.q, page: FIRST_PAGE })}
                onClick={(e) => handleClick(e, FIRST_PAGE)}>
                {FIRST_PAGE}
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
              className={cn(current === page && "border border-primary bg-primary/30 text-accent")}
              href={searchSerializer({ q: value.q, page: page })}
              onClick={(e) => handleClick(e, page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {range.includes(last) ? null : (
          <>
            <PaginationItem className="hidden md:block">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="hidden md:block">
              <PaginationLink
                className=""
                href={searchSerializer({ q: value.q, page: last })}
                onClick={(e) => handleClick(e, last)}>
                {last}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem >
          <PaginationNext
            href={searchSerializer({ q: value.q, page: Number(query.next) + 1 })}
            text={false}
            aria-disabled={query.next === null}
            tabIndex={query.next === null ? -1 : undefined}
            className={
              query.next === null ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default GenericPagination;
