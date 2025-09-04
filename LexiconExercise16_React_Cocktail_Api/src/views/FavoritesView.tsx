import { type ICocktail } from "../helper/mapRawCocktailData";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { FavoritesContext } from "../context/FavoritesContext";

export const FavoritesView = () => {
  const [favorites, setFavorites] = useState<ICocktail[]>();
  const favoritesContext = useContext(FavoritesContext);

  useEffect(() => {
    setFavorites(favoritesContext.favorites);
  }, [favoritesContext.favorites]);

  function renderFavorites(): ReactNode {
    return favorites?.map((cocktail) => {
      return (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          isFavorite={favoritesContext.isFavorite(cocktail)}
          onFavoriteToggle={() => favoritesContext.toggleFavorite(cocktail)}
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
