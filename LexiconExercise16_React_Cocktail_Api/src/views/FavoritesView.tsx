import { useContext, type ReactNode } from "react";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import {
  FavoritesContext,
  type IFavoritesContext,
} from "../context/FavoritesContext";
import { Spinner } from "../components/Spinner";

export const FavoritesView = () => {
  const favoritesContext = useContext(FavoritesContext);

  function renderFavorites(): ReactNode {
    if (areThereFavorites(favoritesContext)) {
      return favoritesContext.favorites.map((cocktail) => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
      });
    }

    if (!favoritesContext.favorites) return <Spinner />;
    return <p>There are no favorites yet..</p>;
  }

  return (
    <main>
      <h2>Your Favorites</h2>
      <section className="favorite-list">{renderFavorites()}</section>
    </main>
  );
};

function areThereFavorites(favoritesContext: IFavoritesContext) {
  return favoritesContext.favorites.length > 0;
}
