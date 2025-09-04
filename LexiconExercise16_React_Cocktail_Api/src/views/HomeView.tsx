import { NavLink } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchSingleCocktail } from "../api-fetcher";
import { Spinner } from "../components/Spinner";
import { FAVORITES_KEY } from "../constants";
import { useToggleFavorite } from "../hooks/useToggleFavorite";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);
  const favorite = useToggleFavorite<string>(FAVORITES_KEY);

  const getRandomCocktail = async () => {
    fetchSingleCocktail().then(setRandomCocktail);
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  function onFavoriteToggle(): void {
    randomCocktail && favorite.actions.toggleFavorite(randomCocktail.id);
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
          isFavorite={favorite.actions.isFavorite(randomCocktail.id)}
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
