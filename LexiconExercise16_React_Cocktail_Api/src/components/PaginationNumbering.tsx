import type { ReactElement, ReactNode } from "react";
import type { IPaginateActions, IPaginateMetaData } from "../hooks/usePaginate";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IPaginationNumberingProps {
  /**
   * Metadata about pagination, including current page and total number of pages.
   */
  metaData: IPaginateMetaData;
  /**
   * Actions to navigate between pages: next, previous, and jump to a specific page.
   */
  actions: IPaginateActions;
}

/**
 * PaginationNumbering component
 *
 * Renders a pagination control with:
 * - Previous and Next buttons.
 * - Numbered page buttons that highlight the current page.
 *
 * Uses `metaData` for page information and `actions` for handling page navigation.
 *
 * @component
 * @param {IPaginationNumberingProps} props - Pagination metadata and actions.
 * @returns {ReactElement} A pagination control component.
 */
export function PaginationNumbering({
  metaData,
  actions,
}: IPaginationNumberingProps): ReactElement {
  const { currentPage, nrOfPages } = metaData;
  const { onNextPage, onPreviousPage, onMoveToPage } = actions;

  /**
   * Renders individual numbered page buttons.
   * Highlights the active page and binds onClick to move to that page.
   */
  function renderPaginationNumbers(): ReactNode {
    return (
      <>
        {Array.from({ length: nrOfPages }).map((_, index) =>
          setNumberOfPage(index)
        )}
      </>
    );
  }

  /**
   * Returns a Button component representing a single page number.
   * @param pageIndex - zero-based index of the page
   */
  function setNumberOfPage(pageIndex: number): ReactNode {
    const classList: string[] = ["pagination-number-button"];

    if (pageIndex + 1 === currentPage) classList.push("active-page-index");

    return (
      <Button
        key={pageIndex}
        className={`${classList.join(" ")} pagination-button`}
        buttonType="button"
        onClick={() => onMoveToPage(pageIndex + 1)}
      >
        {pageIndex + 1}
      </Button>
    );
  }

  /**
   * Renders the full pagination section including previous/next buttons and page numbers.
   */
  function renderPagination(): ReactNode {
    return (
      <>
        {nrOfPages > 1 && (
          <section className="pagination-numbers">
            <Button
              className={"previous-page-button pagination-button"}
              buttonType={"button"}
              onClick={onPreviousPage}
            >
              <Icon iconName="chevron_left" />
            </Button>
            {renderPaginationNumbers()}
            <Button
              className={"next-page-button pagination-button"}
              buttonType={"button"}
              onClick={onNextPage}
            >
              <Icon iconName="chevron_right" />
            </Button>
          </section>
        )}
      </>
    );
  }

  return <div className="pagination-numbering">{renderPagination()}</div>;
}
