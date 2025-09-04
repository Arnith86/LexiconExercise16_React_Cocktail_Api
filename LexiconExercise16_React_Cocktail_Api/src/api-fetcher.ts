import type { ImageSize } from "./helper/constants";
import {
  mapRawCocktailData,
  type ICocktail,
} from "./helper/mapRawCocktailData";
import {
  mapRawIngredientData,
  type IIngredientData,
} from "./helper/mapRawIngredientData";

export function fetchSingleCocktail(): Promise<ICocktail>;
export function fetchSingleCocktail(id?: number): Promise<ICocktail>;

export async function fetchSingleCocktail(id?: number): Promise<ICocktail> {
  const url = id
    ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    : "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const result = await fetch(url);
  const data = await result.json();
  const cocktail = mapRawCocktailData(data.drinks[0]);

  return cocktail;
}

export function fetchIngredientImage(name: string, size?: ImageSize): string {
  if (size)
    return `https://www.thecocktaildb.com/images/ingredients/${name}-${size}.png`;

  return `https://www.thecocktaildb.com/images/ingredients/${name}.png`;
}

export async function fetchIngredient(name: string): Promise<IIngredientData> {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );

  const data = await result.json();
  const ingredient: IIngredientData = mapRawIngredientData(data.ingredients[0]);

  return ingredient;
}
