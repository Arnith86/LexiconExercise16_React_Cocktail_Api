import { Await, useLoaderData } from "react-router";
import { Suspense, type ReactElement } from "react";
import { CocktailIngredients } from "../components/cocktailComponents/CocktailIngredients";
import { CocktailHeroSection } from "../components/cocktailComponents/CocktailHeroSection";
import { CocktailTextInfoSection } from "../components/cocktailComponents/CocktailTextInfoSection";
import type { ISingleCocktailDeferredReturn } from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";

export const CocktailInfoView = () => {
  const { cocktail } = useLoaderData<ISingleCocktailDeferredReturn>();

  function renderCocktailInfo(): ReactElement {
    return (
      <>
        <Suspense fallback={<Spinner />}>
          <Await resolve={cocktail} errorElement={"Error fetching cocktail"}>
            {(c) => (
              <>
                <CocktailIngredients ingredients={c.ingredients} />
                <CocktailHeroSection cocktail={c} />
                <CocktailTextInfoSection cocktail={c} />
              </>
            )}
          </Await>
        </Suspense>
      </>
    );
  }

  return <main className="cocktail-info-page">{renderCocktailInfo()} </main>;
};
