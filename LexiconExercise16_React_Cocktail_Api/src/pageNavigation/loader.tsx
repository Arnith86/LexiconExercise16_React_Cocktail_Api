import type { LoaderFunctionArgs } from "react-router";
import {
  fetchCocktails,
  fetchIngredient,
  fetchSearchTypeOptions,
  fetchSingleCocktail,
} from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";
import type { IIngredientData } from "../helper/mapRawIngredientData";
import {
  SEARCH_TYPE_CATEGORY,
  SEARCH_TYPE_GLASS,
  SEARCH_TYPE_INGREDIENT,
  SEARCH_TYPE_NAME,
  SearchOptions,
} from "../helper/constants";

export interface IAppDeferredReturn {
  searchCategory: Promise<{
    categoryType: string[];
    ingredientType: string[];
    glassType: string[];
  }>;
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

export interface ISearchCategoryDeferredReturn {
  cocktails: Promise<ICocktail[]>;
}

export async function AppDeferredLoader(): Promise<IAppDeferredReturn> {
  const searchCategory = Promise.all([
    fetchSearchTypeOptions(SearchOptions.CATEGORY),
    fetchSearchTypeOptions(SearchOptions.INGREDIENT),
    fetchSearchTypeOptions(SearchOptions.GLASS),
  ]).then(([categoryType, ingredientType, glassType]) => ({
    categoryType,
    ingredientType,
    glassType,
  }));

  return { searchCategory };
}

export async function HomeDeferredLoader(): Promise<IHomeDeferredReturn> {
  return { cocktail: fetchSingleCocktail() };
}

export async function SearchCategoryDeferredLoader(
  args: LoaderFunctionArgs
): Promise<ISearchCategoryDeferredReturn> {
  const url = new URL(args.request.url);
  const name = url.searchParams.get(SEARCH_TYPE_NAME) ?? "";
  const category = url.searchParams.get(SEARCH_TYPE_CATEGORY) ?? "";
  const ingredients = url.searchParams.get(SEARCH_TYPE_INGREDIENT) ?? "";
  const glass = url.searchParams.get(SEARCH_TYPE_GLASS) ?? "";

  if (!name && !category && !ingredients && !glass)
    return { cocktails: Promise.resolve([]) };

  let cocktails: ICocktail[] = await fetchCocktails(SEARCH_TYPE_NAME, name);

  const filterCocktails = async () => {
    if (category) cocktails = cocktails.filter((c) => c.category === category);

    if (ingredients)
      cocktails = cocktails.filter((c) =>
        c.ingredients.some(
          (ingredientObject) => ingredientObject.ingredient === ingredients
        )
      );

    if (glass) cocktails = cocktails.filter((c) => c.glass === glass);

    return cocktails;
  };

  return { cocktails: filterCocktails() };
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
