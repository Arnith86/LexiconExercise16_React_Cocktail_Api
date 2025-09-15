import { Await, useLoaderData } from "react-router";
import { Suspense, type ReactElement } from "react";
import { CocktailIngredients } from "../cocktailComponents/CocktailIngredients";
import { CocktailHeroSection } from "../cocktailComponents/CocktailHeroSection";
import { CocktailTextInfoSection } from "../cocktailComponents/CocktailTextInfoSection";
import { Spinner } from "../Spinner";
import type { ISingleCocktailDeferredReturn } from "../../pageNavigation/loader";
import { AwaitError } from "../AwaitError";

/**
 * CocktailInfoView component
 *
 * Displays detailed information about a single cocktail.
 * - Uses `useLoaderData` to retrieve the cocktail data asynchronously.
 * - Uses React Router's `<Await>` and `<Suspense>` to handle deferred loading.
 * - Shows a spinner while loading, and an error element if the data fails to load.
 * - Renders the cocktail details in three sections:
 *    1. Hero section with name, image, and favorite button
 *    2. Ingredients section
 *    3. Text information section (category, instructions, glass)
 *
 * @component
 * @returns {ReactElement} The rendered cocktail information view.
 */
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
