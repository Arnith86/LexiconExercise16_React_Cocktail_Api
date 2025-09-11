import type { ReactElement, ReactNode } from "react";
import { PAGE_SIZE } from "../../helper/constants";
import { usePaginate } from "../../hooks/usePaginate";
import { NavLink } from "react-router";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { PaginationNumbering } from "../PaginationNumbering";

interface ISearchResultListProps {
  list: ICocktail[];
}

export function SearchResultList({
  list,
}: ISearchResultListProps): ReactElement {
  const {
    pageItems: paginatedList,
    metaData,
    actions,
  } = usePaginate(list, PAGE_SIZE);

  function renderPaginatedList(): ReactNode {
    if (paginatedList.length === 0) return <p>No cocktail found..</p>;

    return (
      <>
        {paginatedList.map((cocktail) => (
          <nav key={cocktail.id}>
            <NavLink className="link" to={`/cocktailinfo/${cocktail.id}`}>
              {cocktail.name}
            </NavLink>
          </nav>
        ))}
      </>
    );
  }

  return (
    <section className="search-result-list">
      {renderPaginatedList()}
      <PaginationNumbering metaData={metaData} actions={actions} />
    </section>
  );
}
