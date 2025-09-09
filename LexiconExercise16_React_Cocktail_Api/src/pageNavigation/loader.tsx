import type { LoaderFunctionArgs } from "react-router";
import { fetchSingleCocktail } from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";
import { FAVORITES_KEY } from "../helper/constants";
import { loadFromLocalStorage } from "../helper/localStorageContainer";

export interface ISingleCocktailDeferredReturn {
  cocktail: Promise<ICocktail>;
}

export interface IFavoriteCocktailsDeferredReturn {
  favorites: Promise<ICocktail[]>;
}

export async function SingleCocktailDeferredLoader(): Promise<ISingleCocktailDeferredReturn>;
export async function SingleCocktailDeferredLoader(
  args: LoaderFunctionArgs
): Promise<ISingleCocktailDeferredReturn>;

export async function SingleCocktailDeferredLoader(
  args?: LoaderFunctionArgs
): Promise<ISingleCocktailDeferredReturn> {
  if (args?.params.id !== undefined) {
    return { cocktail: fetchSingleCocktail(parseInt(args?.params.id)) };
  }

  return { cocktail: fetchSingleCocktail() };
}

export async function FavoriteCocktailsDeferredLoader(): Promise<IFavoriteCocktailsDeferredReturn> {
  const favorites: ICocktail[] = loadFromLocalStorage(FAVORITES_KEY);

  return { favorites: Promise.resolve(favorites) };
}
