import { Await, NavLink, useLoaderData } from "react-router";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { Suspense } from "react";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import type { IHomeViewDeferredLoaderReturn } from "../pageNavigation/loader";
import type { ICocktail } from "../helper/mapRawCocktailData";

export const HomeView = () => {
  const { randomCocktail } = useLoaderData<IHomeViewDeferredLoaderReturn>();

  return (
    <main className="home-page">
      <p>One of many cocktails found in this Cocktail-Wiki</p>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={randomCocktail}
          errorElement={<div>Place and error message here!</div>}
        >
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
