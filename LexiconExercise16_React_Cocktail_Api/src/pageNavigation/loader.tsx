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
  searchCategory: {
    categoryType: string[];
    ingredientType: string[];
    glassType: string[];
  };
}

export interface IHomeDeferredReturn {
  cocktail: Promise<ICocktail>;
}

export interface IIngredientDataDeferredReturn {
  ingredientData: Promise<IIngredientData>;
}

export interface ISingleCocktailDeferredReturn {
  cocktail: Promise<ICocktail>;
}

export interface ISearchCategoryBlockingReturn {
  cocktails: Promise<ICocktail[]>;
}

export async function AppDeferredLoader(): Promise<IAppDeferredReturn> {
  const [categoryType, ingredientType, glassType] = await Promise.all([
    fetchSearchTypeOptions(SearchOptions.CATEGORY),
    fetchSearchTypeOptions(SearchOptions.INGREDIENT),
    fetchSearchTypeOptions(SearchOptions.GLASS),
  ]);

  return {
    searchCategory: {
      categoryType,
      ingredientType,
      glassType,
    },
  };
}

export async function HomeDeferredLoader(): Promise<IHomeDeferredReturn> {
  return { cocktail: fetchSingleCocktail() };
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
): Promise<ISingleCocktailDeferredReturn> {
  if (!args.params.id)
    throw new Response("Cocktail ID is missing from the URL.", { status: 400 });

  return { cocktail: fetchSingleCocktail(parseInt(args.params.id)) };
}

export async function IngredientDataDeferredLoader(
  args: LoaderFunctionArgs
): Promise<IIngredientDataDeferredReturn> {
  if (!args.params.name) {
    throw new Response("Ingredient name is missing from the URL.", {
      status: 400,
    });
  }

  return {
    ingredientData: fetchIngredient(args.params.name),
  };
}
