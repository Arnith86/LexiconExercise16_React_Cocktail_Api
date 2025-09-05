import { useState } from "react";

interface IPaginateReturn<T> {
  pageItems: T[];
  currentPage: number;
  nrOfPages: number;
  onNextPage(): void;
  onPreviousPage(): void;
}

export function usePaginate<T>(
  list: T[],
  pageSize: number
): IPaginateReturn<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const nrOfPages = Math.ceil(list.length / pageSize);
  const pageStart: number = (currentPage - 1) * pageSize;
  const pageEnd: number = pageStart + pageSize;

  return {
    pageItems: list.slice(pageStart, pageEnd),
    currentPage,
    nrOfPages,
    onNextPage: () => setCurrentPage((prev) => Math.min(prev + 1, nrOfPages)),
    onPreviousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
  };
}
