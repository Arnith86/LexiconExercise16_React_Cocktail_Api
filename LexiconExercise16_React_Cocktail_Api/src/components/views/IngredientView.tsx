import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { IIngredientDataDeferredReturn } from "../../pageNavigation/loader";
import { Spinner } from "../Spinner";
import { IngredientData } from "../ingredientComponents/IngredientData";
import { CocktailCardList } from "../ingredientComponents/cocktailCardList";
import { AwaitError } from "../AwaitError";

/**
 * IngredientView component
 *
 * Displays detailed information about a single ingredient along with the cocktails
 * that include it.
 * - Uses `useLoaderData` to fetch ingredient data asynchronously.
 * - Uses React Router's `<Suspense>` and `<Await>` to handle deferred loading.
 * - Shows a spinner while loading and an error element if the data fails to load.
 * - Renders:
 *    1. `IngredientData` for detailed ingredient information.
 *    2. `CocktailCardList` for the cocktails that use this ingredient.
 *
 * @component
 * @returns {JSX.Element} The rendered ingredient view page.
 */
export const IngredientView = () => {
  const { ingredient } = useLoaderData<IIngredientDataDeferredReturn>();
  return (
    <main className="ingredient-view">
      <Suspense fallback={<Spinner />}>
        <Await resolve={ingredient} errorElement={<AwaitError />}>
          {(ingD) => (
            <>
              {<IngredientData ingredientData={ingD.ingredientData} />}
              {<CocktailCardList cocktails={ingD.cocktails} />}
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
};
