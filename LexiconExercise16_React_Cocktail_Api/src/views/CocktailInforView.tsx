import { useParams } from "react-router";
import type { ICocktail } from "../mapRawCocktailData";
import { useEffect, useState } from "react";
import { fetchSingleCocktail } from "../api-fetcher";

export const CocktailInfoView = () => {
  const { id } = useParams();

  const [cocktail, setCocktail] = useState<ICocktail | null>(null);

  useEffect(() => {
    if (!id) return;
    const cocktailId = parseInt(id, 10);

    fetchSingleCocktail(cocktailId)
      .then(setCocktail)
      .catch((err) => console.log("Error fetching cocktail", err));
  }, []);

  return (
    <main>
      <p>{cocktail?.category}</p>
    </main>
  );
};
