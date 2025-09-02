import { NavLink } from "react-router";
import type { ICocktail } from "../mapRawCocktailData";
import { CocktailCard } from "../components/CocktailCard";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchSingleCocktail } from "../api-fetcher";
import { Spinner } from "../components/Spinner";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);

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
        <CocktailCard cocktail={randomCocktail} />
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
