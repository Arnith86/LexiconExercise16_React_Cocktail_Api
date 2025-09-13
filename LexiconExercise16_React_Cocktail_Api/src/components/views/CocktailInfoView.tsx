import { Await, useLoaderData } from "react-router";
import { Suspense, type ReactElement } from "react";
import { CocktailIngredients } from "../cocktailComponents/CocktailIngredients";
import { CocktailHeroSection } from "../cocktailComponents/CocktailHeroSection";
import { CocktailTextInfoSection } from "../cocktailComponents/CocktailTextInfoSection";
import { Spinner } from "../Spinner";
import type { ISingleCocktailDeferredReturn } from "../../pageNavigation/loader";
import { AwaitError } from "../AwaitError";

export const CocktailInfoView = () => {
  const { cocktail } = useLoaderData<ISingleCocktailDeferredReturn>();

  function renderCocktailInfo(): ReactElement {
    return (
      <>
        <Suspense fallback={<Spinner />}>
          <Await resolve={cocktail} errorElement={<AwaitError />}>
            {(c) => (
              <>
                <span className="Ingredients-and-hero">
                  <CocktailHeroSection cocktail={c} />
                  <CocktailIngredients ingredients={c.ingredients} />
                </span>
                <CocktailTextInfoSection cocktail={c} />
              </>
            )}
          </Await>
        </Suspense>
      </>
    );
  }

  return <main className="cocktail-info-view">{renderCocktailInfo()} </main>;
};
