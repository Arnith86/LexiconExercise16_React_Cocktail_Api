import type { LoaderFunctionArgs } from "react-router";
import { fetchIngredient, fetchSingleCocktail } from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";
import type { IIngredientData } from "../helper/mapRawIngredientData";

export interface ISingleCocktailDeferredReturn {
  cocktail: Promise<ICocktail>;
}

export interface IIngredientDataDeferredReturn {
  ingredientData: Promise<IIngredientData>;
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

export async function IngredientDataDeferredLoader(
  args: LoaderFunctionArgs
): Promise<IIngredientDataDeferredReturn> {
  if (!args.params.name) {
    throw new Error(`Param 'name' not assigned.`);
  }

  return {
    ingredientData: fetchIngredient(args.params.name),
  };
}
