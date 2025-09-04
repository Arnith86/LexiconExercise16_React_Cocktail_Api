import { type ICocktail } from "../helper/mapRawCocktailData";
import { useEffect, useState, type ReactNode } from "react";
import { FAVORITES_KEY } from "../helper/constants";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { useToggleFavorite } from "../hooks/useToggleFavorite";

export const FavoritesView = () => {
  const [favorites, setFavorites] = useState<ICocktail[]>();
  const favorite = useToggleFavorite<ICocktail>(FAVORITES_KEY);

  useEffect(() => {
    setFavorites(favorite.favorites);
  }, [favorite.favorites]);

  function renderFavorites(): ReactNode {
    return favorites?.map((cocktail) => {
      return (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          isFavorite={favorite.actions.isFavorite(cocktail)}
          onFavoriteToggle={() => favorite.actions.toggleFavorite(cocktail)}
        />
      );
    });
  }

  return (
    <main>
      <h2>Your Favorites</h2>
      <section className="favorite-list">{renderFavorites()}</section>
    </main>
  );
};
