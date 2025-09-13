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
