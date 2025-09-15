import { Await, NavLink, useLoaderData } from "react-router";
import { CocktailCard } from "../cocktailComponents/CocktailCard";
import { Suspense } from "react";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { AwaitError } from "../AwaitError";
import type { IHomeDeferredReturn } from "../../pageNavigation/loader";

/**
 * HomeView component
 *
 * Displays a random cocktail on the home page.
 * - Uses `useLoaderData` to fetch a deferred random cocktail.
 * - Uses React Router's `<Await>` and `<Suspense>` to handle asynchronous loading.
 * - Shows a spinner while the cocktail is being loaded.
 * - Displays an error element if the cocktail fails to load.
 * - Includes a button wrapped in a `NavLink` to fetch a new random cocktail.
 *
 * @component
 * @returns {JSX.Element} The rendered home page view with a random cocktail.
 */
export const HomeView = () => {
  const { cocktail: randomCocktail } = useLoaderData<IHomeDeferredReturn>();

  return (
    <main className="home-page">
      <p>One of many cocktails found in this Cocktail-Wiki</p>

      <Suspense fallback={<Spinner />}>
        <Await resolve={randomCocktail} errorElement={<AwaitError />}>
          {(rc: ICocktail) => <CocktailCard cocktail={rc} />}
        </Await>
      </Suspense>

      <NavLink className="link" to="/">
        <Button buttonType="button" className="random-cocktail-button">
          New random cocktail!
        </Button>
      </NavLink>
    </main>
  );
};
