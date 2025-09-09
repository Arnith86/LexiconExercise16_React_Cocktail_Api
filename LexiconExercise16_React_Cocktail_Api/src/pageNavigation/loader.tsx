import type { LoaderFunctionArgs } from "react-router";
import { fetchSingleCocktail } from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";

export interface ISingleCocktailDeferredReturn {
  cocktail: Promise<ICocktail>;
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
