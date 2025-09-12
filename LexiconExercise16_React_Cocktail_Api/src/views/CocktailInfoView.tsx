import { Await, useLoaderData } from "react-router";
import { Suspense, type ReactElement } from "react";
import { CocktailIngredients } from "../components/cocktailComponents/CocktailIngredients";
import { CocktailHeroSection } from "../components/cocktailComponents/CocktailHeroSection";
import { CocktailTextInfoSection } from "../components/cocktailComponents/CocktailTextInfoSection";
import { Spinner } from "../components/Spinner";
import type { ISingleCocktailDeferredReturn } from "../pageNavigation/loader";
import { AwaitError } from "../components/AwaitError";

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
