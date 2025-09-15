import { useState } from "react";

export interface IPaginateMetaData {
  currentPage: number;
  nrOfPages: number;
}

export interface IPaginateActions {
  onNextPage(): void;
  onPreviousPage(): void;
  onMoveToPage: (pageNumber: number) => void;
}

export interface IPaginate<T> {
  pageItems: T[];
  metaData: IPaginateMetaData;
  actions: IPaginateActions;
}

/**
 * Custom React hook for paginating an array of items
 *
 * @template T - Type of the items in the list
 * @param list - Array of items to paginate
 * @param pageSize - Number of items per page
 * @returns An object containing the current page items, metadata, and pagination actions
 *
 * @example
 * const { pageItems, metaData, actions } = usePaginate(myItems, 10);
 * actions.onNextPage();
 */
export function usePaginate<T>(list: T[], pageSize: number): IPaginate<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const nrOfPages = Math.ceil(list.length / pageSize);
  const pageStart: number = (currentPage - 1) * pageSize;
  const pageEnd: number = pageStart + pageSize;

  const metaData: IPaginateMetaData = {
    currentPage,
    nrOfPages,
  };

  const actions: IPaginateActions = {
    onNextPage: () => setCurrentPage((prev) => Math.min(prev + 1, nrOfPages)),
    onPreviousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
    onMoveToPage: (pageNumber) => setCurrentPage(pageNumber),
  };

  return {
    pageItems: list.slice(pageStart, pageEnd),
    metaData,
    actions,
  };
}
