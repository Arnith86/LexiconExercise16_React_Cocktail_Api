import { useContext, type ReactNode } from "react";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { FavoritesContext } from "../context/FavoritesContext";

export const FavoritesView = () => {
  const favoritesContext = useContext(FavoritesContext);

  function renderFavorites(): ReactNode {
    return favoritesContext.favorites.map((cocktail) => {
      return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
    });
  }

  return (
    <main>
      <h2>Your Favorites</h2>
      <section className="favorite-list">{renderFavorites()}</section>
    </main>
  );
};
