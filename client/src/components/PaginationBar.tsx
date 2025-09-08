"use client";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
  currentPage?: number;
  totalPage?: number;
}

export default function PaginationBar({
  currentPage = 1,
  totalPage = 1,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const current = Math.max(1, Math.min(currentPage, totalPage));
  const total = Math.max(1, totalPage);

  function getLink(page: number) {
    const pageSafe = Math.max(1, Math.min(page, total));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", pageSafe.toString());
    return `?${newSearchParams.toString()}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getLink(current - 1)}
            className={`${
              current === 1 ? "text-muted-foreground pointer-events-none" : ""
            }`}
          />
        </PaginationItem>

        {Array.from({ length: total }).map((_, i) => {
          const page = i + 1;
          const isEdge = page === 1 || page === total;
          const isNearCurrent = Math.abs(current - page) <= 2;

          if (!isEdge && !isNearCurrent) {
            if (i === 1 || i === total - 2) {
              return (
                <PaginationItem key={page} className="hidden md:block">
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem
              key={page}
              className={`block ${
                current === page ? "pointer-events-none font-bold" : ""
              }`}
            >
              <PaginationLink href={getLink(page)} isActive={current === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={getLink(current + 1)}
            className={`${
              current === total
                ? "text-muted-foreground pointer-events-none"
                : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
