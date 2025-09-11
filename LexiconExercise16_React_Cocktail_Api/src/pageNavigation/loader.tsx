import type { LoaderFunctionArgs } from "react-router";
import {
  fetchIngredient,
  fetchSearchTypeOptions,
  fetchSingleCocktail,
} from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";
import type { IIngredientData } from "../helper/mapRawIngredientData";
import { SearchOptions } from "../helper/constants";

export interface IAppDeferredReturn {
  cocktail: ICocktail;
  categoryType: string[];
  ingredientType: string[];
  glassType: string[];
}

export interface IIngredientDataDeferredReturn {
  ingredientData: Promise<IIngredientData>;
}

export interface ISingleCocktailBlockingReturn {
  cocktail: Promise<ICocktail>;
}

export interface ISearchCategoryBlockingReturn {
  cocktails: Promise<ICocktail[]>;
}

export async function AppDeferredLoader(): Promise<IAppDeferredReturn> {
  const [cocktail, categoryType, ingredientType, glassType] = await Promise.all(
    [
      fetchSingleCocktail(),
      fetchSearchTypeOptions(SearchOptions.CATEGORY),
      fetchSearchTypeOptions(SearchOptions.INGREDIENT),
      fetchSearchTypeOptions(SearchOptions.GLASS),
    ]
  );

  return {
    cocktail,
    categoryType,
    ingredientType,
    glassType,
  };
}

export async function SearchCategoryBlockingLoader(
  args: LoaderFunctionArgs
): Promise<ISearchCategoryBlockingReturn> {
  const url = new URL(args.request.url);
  const name = url.searchParams.get("name") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const ingredients = url.searchParams.get("ingredients") ?? "";
  const glass = url.searchParams.get("glass") ?? "";

  if (!name && !category && !ingredients && !glass)
    return { cocktails: Promise.resolve([]) };

  return { cocktails: Promise.resolve([]) };
}

export async function CocktailInfoViewDeferredLoader(
  args: LoaderFunctionArgs
): Promise<ISingleCocktailBlockingReturn> {
  if (!args.params.id)
    throw new Response("Cocktail ID is missing from the URL.", { status: 400 });

  return { cocktail: fetchSingleCocktail(parseInt(args.params.id)) };
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
