import { Suspense } from "react";
import { SearchResultList } from "../drinkSearch/SearchResultList";
import { SearchForm } from "../drinkSearch/SearchForm";
import { Await, useLoaderData, useRouteLoaderData } from "react-router";
import type {
  IAppDeferredReturn,
  ISearchCategoryDeferredReturn,
} from "../../pageNavigation/loader";
import { Spinner } from "../Spinner";
import { AwaitError } from "../AwaitError";

/**
 * SearchView component
 *
 * Displays the cocktail search page with:
 * 1. A search form that allows filtering by name, category, glass, or ingredient.
 * 2. A list of cocktails matching the search criteria.
 *
 * - Uses `useLoaderData` to get the list of cocktails for the current search.
 * - Uses `useRouteLoaderData` to get deferred search metadata (categories, glass types, ingredients).
 * - Uses `<Suspense>` and `<Await>` to handle asynchronous loading for both the form and results.
 * - Shows a spinner while loading and an error element if the cocktails fail to load.
 *
 * @component
 * @returns {JSX.Element} The search page view with form and results.
 */
export const SearchView = () => {
  const { cocktails } = useLoaderData<ISearchCategoryDeferredReturn>();
  const { searchCategory } = useRouteLoaderData("app") as IAppDeferredReturn;

  return (
    <main className="search-view">
      <h2>Cocktail search</h2>
      <Suspense fallback={<Spinner />}>
        <Await resolve={searchCategory}>
          {(sc) => (
            <SearchForm
              categoryType={sc.categoryType}
              glassType={sc.glassType}
              ingredientType={sc.ingredientType}
            />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <Await resolve={cocktails} errorElement={<AwaitError />}>
          {(c) => <SearchResultList list={c} />}
        </Await>
      </Suspense>
    </main>
  );
};
