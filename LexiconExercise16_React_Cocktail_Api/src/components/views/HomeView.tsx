import { Await, NavLink, useLoaderData } from "react-router";
import { CocktailCard } from "../cocktailComponents/CocktailCard";
import { Suspense } from "react";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { AwaitError } from "../AwaitError";
import type { IHomeDeferredReturn } from "../../pageNavigation/loader";

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
