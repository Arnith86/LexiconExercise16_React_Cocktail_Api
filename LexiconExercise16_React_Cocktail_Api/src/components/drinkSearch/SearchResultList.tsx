import type { ReactElement, ReactNode } from "react";
import { PAGE_SIZE } from "../../helper/constants";
import { usePaginate } from "../../hooks/usePaginate";
import { NavLink } from "react-router";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { Button } from "../Button";
import { Icon } from "../Icon";

interface ISearchResultListProps<T> {
  list: ICocktail[];
}

export function SearchResultList<T>({
  list,
}: ISearchResultListProps<T>): ReactElement {
  const {
    pageItems: paginatedList,
    currentPage,
    nrOfPages,
    onNextPage,
    onPreviousPage,
  } = usePaginate(list, PAGE_SIZE);

  function renderPagination(): ReactNode {
    return (
      <>
        {paginatedList.length &&
          paginatedList.map((cocktail) => (
            <nav key={cocktail.id}>
              <NavLink className="link" to={`/cocktailinfo/${cocktail.name}`}>
                {cocktail.name}
              </NavLink>
            </nav>
          ))}
      </>
    );
  }

  function renderPaginationNumbers(): ReactNode {
    return (
      <section className="pagination-numbers">
        <div>1</div>
        <Button
          className={"previous-page-button"}
          buttonType={"button"}
          onClick={onPreviousPage}
        >
          <Icon iconName="chevron_left" />
        </Button>
        <Button
          className={"next-page-button"}
          buttonType={"button"}
          onClick={onNextPage}
        >
          <Icon iconName="chevron_right" />
        </Button>
        <div>{nrOfPages}</div>
      </section>
    );
  }

  return (
    <section className="search-result-list">
      {renderPagination()}
      {renderPaginationNumbers()}
    </section>
  );
}
