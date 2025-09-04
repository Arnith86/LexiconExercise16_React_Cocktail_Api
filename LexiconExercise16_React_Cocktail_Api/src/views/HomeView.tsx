import { NavLink } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { CocktailCard } from "../components/cocktailComponents/CocktailCard";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchSingleCocktail } from "../api-fetcher";
import { Spinner } from "../components/Spinner";
import { FavoritesContext } from "../context/FavoritesContext";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);
  const favoritesContext = useContext(FavoritesContext);

  const getRandomCocktail = async () => {
    fetchSingleCocktail().then(setRandomCocktail);
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

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
          isFavorite={favoritesContext.isFavorite(randomCocktail)}
          onFavoriteToggle={() =>
            favoritesContext.toggleFavorite(randomCocktail)
          }
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
