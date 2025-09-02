import { NavLink } from "react-router";
import { fetchRandomCocktail } from "../api-fetcher";
import type { ICocktail } from "../mapRawCocktailData";
import { CocktailCard } from "../components/CocktailCard";
import { useEffect, useState } from "react";

export const HomeView = () => {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);

  useEffect(() => {
    fetchRandomCocktail().then(setRandomCocktail);
  }, []);

  return (
    <main>
      <p>This is the homeView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/cocktailinfo">
          Cocktail Info
        </NavLink>

        <NavLink className="link" to="/ingredient">
          Ingredient Info
        </NavLink>
      </nav>

      {randomCocktail ? <CocktailCard cocktail={randomCocktail} /> : ""}
    </main>
  );
};
