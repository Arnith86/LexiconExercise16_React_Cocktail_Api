import { NavLink } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { CocktailCard } from "../components/CocktailCard";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchSingleCocktail } from "../api-fetcher";
import { Spinner } from "../components/Spinner";
import { FAVORITES_KEY } from "../constants";
import { isFavorite, toggleFavorite } from "../helper/toggleFavorite";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);

  const getRandomCocktail = async () => {
    fetchSingleCocktail().then(setRandomCocktail);
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  /**Here until refactor is finished */
  const [favorite, setFavorite] = useState<boolean>(
    isFavorite(FAVORITES_KEY, randomCocktail?.id)
  );

  /**Here until refactor is finished */
  function onFavoriteToggle(): void {
    toggleFavorite(FAVORITES_KEY, randomCocktail?.id);
    setFavorite(isFavorite(FAVORITES_KEY, randomCocktail?.id));
  }

  return (
    <main className="home-page">
      <p>This is the homeView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/ingredient">
          Ingredient Info
        </NavLink>
      </nav>

      {randomCocktail ? (
        <CocktailCard
          cocktail={randomCocktail}
          isFavorite={favorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      ) : (
        <Spinner />
      )}
      <Button
        buttonType="button"
        className="random-cocktail-button"
        onClick={getRandomCocktail}
      >
        New random cocktail!
      </Button>
    </main>
  );
};
