import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { IIngredientDataDeferredReturn } from "../../pageNavigation/loader";
import { Spinner } from "../Spinner";
import { IngredientData } from "../ingredientComponents/IngredientData";
import { CocktailCardList } from "../ingredientComponents/cocktailCardList";
import { AwaitError } from "../AwaitError";

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
