import { mapRawCocktailData, type ICocktail } from "./mapRawCocktailData";

export const fetchRandomCocktail = async (): Promise<ICocktail> => {
  const result = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  const data = await result.json();
  const cocktail = mapRawCocktailData(data.drinks[0]);

  return cocktail;
};
