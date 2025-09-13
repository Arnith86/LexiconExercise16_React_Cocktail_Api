import type { ReactElement, ReactNode } from "react";
import type { IPaginateActions, IPaginateMetaData } from "../hooks/usePaginate";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IPaginationNumberingProps {
  metaData: IPaginateMetaData;
  actions: IPaginateActions;
}

export function PaginationNumbering({
  metaData,
  actions,
}: IPaginationNumberingProps): ReactElement {
  const { currentPage, nrOfPages } = metaData;
  const { onNextPage, onPreviousPage, onMoveToPage } = actions;

  function renderPaginationNumbers(): ReactNode {
    return (
      <>
        {Array.from({ length: nrOfPages }).map((_, index) =>
          setNumberOfPage(index)
        )}
      </>
    );
  }

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
