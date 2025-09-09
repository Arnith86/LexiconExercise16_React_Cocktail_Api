import { Suspense, useContext, type ReactNode } from "react";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import {
  FavoritesContext,
  type IFavoritesContext,
} from "../context/FavoritesContext";
import { Await, useLoaderData } from "react-router";
import type { IFavoriteCocktailsDeferredReturn } from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";
import type { ICocktail } from "../helper/mapRawCocktailData";

export const FavoritesView = () => {
  const { favorites } = useLoaderData<IFavoriteCocktailsDeferredReturn>();
  // const favoritesContext = useContext(FavoritesContext);

  function renderFavorites(fav: ICocktail[]): ReactNode {
    if (areThereFavorites(fav.length)) {
      return fav.map((cocktail) => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
      });
    }

    return <p>There are no favorites yet..</p>;
  }

  return (
    <main>
      <h2>Your Favorites</h2>
      <Suspense fallback={<Spinner />}>
        <Await resolve={favorites} errorElement={"Error fetching favorites.. "}>
          {(fav) => (
            <section className="favorite-list">{renderFavorites(fav)}</section>
          )}
        </Await>
      </Suspense>
    </main>
  );
};

function areThereFavorites(favLength: number) {
  return favLength > 0;
}
