export const FAVORITES_KEY = "favoriteCocktails";

export type ImageSize = "small" | "medium" | "large";

export const PAGE_SIZE = 10;

export const SEARCH_TYPE_NAME = "name";
export const SEARCH_TYPE_CATEGORY = "category";
export const SEARCH_TYPE_INGREDIENT = "ingredients";
export const SEARCH_TYPE_GLASS = "glass";

export const SearchOptions = {
  CATEGORY: "c",
  INGREDIENT: "i",
  GLASS: "g",
} as const;

export type SearchOptionTypes =
  (typeof SearchOptions)[keyof typeof SearchOptions];
