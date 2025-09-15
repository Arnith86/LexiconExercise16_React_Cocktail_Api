import type { ReactElement, ReactNode } from "react";
import { PAGE_SIZE } from "../../helper/constants";
import { usePaginate } from "../../hooks/usePaginate";
import { NavLink } from "react-router";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { PaginationNumbering } from "../PaginationNumbering";

interface ISearchResultListProps {
  list: ICocktail[];
}

/**
 * SearchResultList component
 *
 * Renders a paginated list of cocktails retrieved from search results.
 * - Uses the `usePaginate` hook to handle pagination logic and state.
 * - Displays cocktail names as `NavLink`s that navigate to each cocktail's detail page.
 * - Shows a "No cocktail found.." message if the list is empty.
 * - Includes a pagination control (`PaginationNumbering`) below the results.
 *
 * @component
 * @param {ISearchResultListProps} props - The list of cocktails to render.
 * @returns {ReactElement} The rendered search results with pagination.
 */
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
            <NavLink className="text-link" to={`/cocktailinfo/${cocktail.id}`}>
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
