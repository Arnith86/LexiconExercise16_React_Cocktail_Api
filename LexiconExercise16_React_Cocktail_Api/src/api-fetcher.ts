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

/**
 * Fetches a single cocktail.
 * - If `id` is provided, fetches the cocktail by ID and caches it in session storage.
 * - If no `id` is provided, fetches a random cocktail.
 * @param {number} [id] - Optional cocktail ID.
 * @returns {Promise<ICocktail>} The cocktail data.
 */
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

/**
 * Fetches cocktails filtered by a type and value.
 * @param {string} type - The type of search (name, ingredients, category, glass).
 * @param {string} name - The search value.
 * @returns {Promise<ICocktail[]>} Array of cocktail objects.
 */
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

  // Map the filtered drinks to full cocktail objects using their IDs
  const cocktails: ICocktail[] = await Promise.all(
    data.drinks.map((c: { idDrink: number }) => {
      return fetchSingleCocktail(c.idDrink);
    })
  );

  return cocktails;
}

/**
 * Returns the correct API URL for fetching cocktails by type.
 * @param {string} type - Type of search.
 * @param {string} [name] - Optional search value.
 * @returns {string | undefined} The API URL.
 */
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

/**
 * Generates the URL for an ingredient image.
 * @param {string} name - Ingredient name.
 * @param {ImageSize} [size] - Optional image size suffix.
 * @returns {string} Image URL.
 */
export function fetchIngredientImage(name: string, size?: ImageSize): string {
  const encodedName = encodeURIComponent(name);
  if (size)
    return `https://www.thecocktaildb.com/images/ingredients/${encodedName}-${size}.png`;

  return `https://www.thecocktaildb.com/images/ingredients/${encodedName}.png`;
}

/**
 * Fetches ingredient data by name.
 * @param {string} name - Ingredient name.
 * @returns {Promise<IIngredientData>} Ingredient details.
 */
export async function fetchIngredient(name: string): Promise<IIngredientData> {
  const result = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );

  const data = await result.json();

  if (!data.ingredients || data.ingredients.length === 0) {
    throw new Error(`No ingredient found for name=${name}`);
  }

  const ingredient: IIngredientData = mapRawIngredientData(data.ingredients[0]);

  return ingredient;
}

/**
 * Fetches a list of search options for a given type (category, ingredient, glass).
 * @param {SearchOptionTypes} type - The search option type.
 * @returns {Promise<string[]>} Array of option strings.
 */
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
