import { type ICocktail } from "../helper/mapRawCocktailData";
import { useEffect, useState, type ReactNode } from "react";
import { FAVORITES_KEY } from "../constants";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { fetchSingleCocktail } from "../api-fetcher";
import { useToggleFavorite } from "../hooks/useToggleFavorite";

export const FavoritesView = () => {
  const [favorites, setFavorites] = useState<ICocktail[]>();
  const favorite = useToggleFavorite<string>(FAVORITES_KEY);

  useEffect(() => {
    const storedFavorites: string[] = favorite.favorites;

    //JP Comment: waits for all async cocktail fetches to resolve, before setting useState.
    Promise.all(
      storedFavorites.map((id) => fetchSingleCocktail(parseInt(id, 10)))
    ).then(setFavorites);
  }, [favorite.favorites]);

  function renderFavorites(): ReactNode {
    return favorites?.map((cocktail) => {
      return (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          isFavorite={favorite.actions.isFavorite(cocktail.id)}
          onFavoriteToggle={() => favorite.actions.toggleFavorite(cocktail.id)}
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
