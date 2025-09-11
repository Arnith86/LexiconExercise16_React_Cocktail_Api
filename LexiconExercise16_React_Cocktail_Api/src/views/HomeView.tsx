import { Await, NavLink, useLoaderData } from "react-router";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { Suspense } from "react";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import type { ICocktail } from "../helper/mapRawCocktailData";
import type { IAppDeferredReturn } from "../pageNavigation/loader";
import { AwaitError } from "../components/AwaitError";

export const HomeView = () => {
  const { cocktail: randomCocktail } = useLoaderData<IAppDeferredReturn>();

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
