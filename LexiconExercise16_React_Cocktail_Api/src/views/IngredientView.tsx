import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { IIngredientDataDeferredReturn } from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";
import { IngredientData } from "../components/ingredientComponents/IngredientData";
import { CocktailCardList } from "../components/ingredientComponents/cocktailCardList";
import { AwaitError } from "../components/AwaitError";

export const IngredientView = () => {
  const { ingredient } = useLoaderData<IIngredientDataDeferredReturn>();
  return (
    <main>
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
