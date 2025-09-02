import { mapRawCocktailData, type ICocktail } from "./mapRawCocktailData";

function fetchSingleCocktail(): Promise<ICocktail>;
function fetchSingleCocktail(id?: number): Promise<ICocktail>;

export const fetchSingleCocktail = async (id?: number): Promise<ICocktail> => {
  const url = id
    ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    : "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const result = await fetch(url);

  const data = await result.json();
  const cocktail = mapRawCocktailData(data.drinks[0]);

  return cocktail;
};

export const fetchRandomCocktail = async (): Promise<ICocktail> => {
  const result = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  const data = await result.json();
  const cocktail = mapRawCocktailData(data.drinks[0]);

  return cocktail;
};

export const fetchCocktailById = async (id: number): Promise<ICocktail> => {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await result.json();
  const cocktail = mapRawCocktailData(data.drinks[0]);

  return cocktail;
};
