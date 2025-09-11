import { Suspense } from "react";
import { SearchResultList } from "../components/drinkSearch/SearchResultList";
import { AdvancedSearchForm } from "../components/drinkSearch/SearchForm";
import { Await, useLoaderData, useRouteLoaderData } from "react-router";
import type {
  IAppDeferredReturn,
  ISearchCategoryDeferredReturn,
} from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";

export const SearchView = () => {
  const { cocktails } = useLoaderData<ISearchCategoryDeferredReturn>();
  const { searchCategory } = useRouteLoaderData("app") as IAppDeferredReturn;

  return (
    <main>
      <h2>Cocktail search</h2>
      <Suspense fallback={<Spinner />}>
        <Await resolve={searchCategory}>
          {(sc) => (
            <AdvancedSearchForm
              categoryType={sc.categoryType}
              glassType={sc.glassType}
              ingredientType={sc.ingredientType}
            />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <Await resolve={cocktails}>
          {(c) => <SearchResultList list={c} />}
        </Await>
      </Suspense>
    </main>
  );
};

// Search Page++
// - The user should be able to to advanced searches.
// - The use should be able to search on one of thes parameters or a combination of them:
// - - Category
// - - Ingredient
// - - Glass type
// - - The search form should contain relevant validation.
// - Cache the results. If you revisit a beer, you shouldn't need to make another request to the API.
