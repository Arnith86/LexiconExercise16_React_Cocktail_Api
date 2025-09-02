import { NavLink } from "react-router";
import type { ICocktail } from "../mapRawCocktailData";
import { CocktailCard } from "../components/CocktailCard";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchSingleCocktail } from "../api-fetcher";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);

  const getRandomCocktail = async () => {
    fetchSingleCocktail().then(setRandomCocktail);
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  return (
    <main>
      <p>This is the homeView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/ingredient">
          Ingredient Info
        </NavLink>
      </nav>

      {/** ToDo: Add a loader here!!!!!!!!!! */}
      {randomCocktail ? <CocktailCard cocktail={randomCocktail} /> : ""}
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
