import type { ImageSize, SearchOptionTypes } from "./helper/constants";
import {
  mapRawCocktailData,
  type ICocktail,
} from "./helper/mapRawCocktailData";
import {
  mapRawIngredientData,
  type IIngredientData,
} from "./helper/mapRawIngredientData";
import {
  getSessionCocktail,
  hasSessionCocktail,
  setSessionCocktail,
} from "./helper/SessionStorageContainer";

export function fetchSingleCocktail(): Promise<ICocktail>;
export function fetchSingleCocktail(id?: number): Promise<ICocktail>;

export async function fetchSingleCocktail(id?: number): Promise<ICocktail> {
  const url = id
    ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    : "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  if (id && hasSessionCocktail(id)) {
    return getSessionCocktail(id)!;
  }

  const result = await fetch(url);
  const data = await result.json();

  if (!data.drinks || data.drinks.length === 0)
    throw new Error(`No cocktail found for id=${id ?? "random"}.`);

  const cocktail = mapRawCocktailData(data.drinks[0]);

  if (id) setSessionCocktail(parseInt(cocktail.id), cocktail);

  return cocktail;
}

export async function fetchCocktails(
  type: string,
  name: string
): Promise<ICocktail[]> {
  const url = getFetchCocktailsUrl(type, name);

  if (!url) throw new Error("Filter option list could not be located.");

  const result = await fetch(url);
  const data = await result.json();

  if (!data.drinks || data.drinks === "no data found")
    throw new Error(`No cocktails found..`);

  const cocktails: ICocktail[] = await Promise.all(
    data.drinks.map((c: { idDrink: number }) => {
      return fetchSingleCocktail(c.idDrink);
    })
  );

  return cocktails;
}

function getFetchCocktailsUrl(type: string, name?: string): string | undefined {
  switch (type) {
    case "name":
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    case "ingredients":
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
    case "category":
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    case "glass":
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${name}`;
    default:
      break;
  }
}

export function fetchIngredientImage(name: string, size?: ImageSize): string {
  const encodedName = encodeURIComponent(name);
  if (size)
    return `https://www.thecocktaildb.com/images/ingredients/${encodedName}-${size}.png`;

  return `https://www.thecocktaildb.com/images/ingredients/${encodedName}.png`;
}

export async function fetchIngredient(name: string): Promise<IIngredientData> {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );

  const data = await result.json();
  const ingredient: IIngredientData = mapRawIngredientData(data.ingredients[0]);

  return ingredient;
}

export async function fetchSearchTypeOptions(
  type: SearchOptionTypes
): Promise<string[]> {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?${type}=list`
  );

  const data = await result.json();

  if (!data.drinks) return [];

  return data.drinks.map(
    (d: any) => d.strCategory ?? d.strIngredient1 ?? d.strGlass
  );
}
