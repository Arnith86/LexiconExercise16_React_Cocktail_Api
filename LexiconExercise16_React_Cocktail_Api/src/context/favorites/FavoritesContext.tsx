import { createContext } from "react";
import type { ICocktail } from "../../helper/mapRawCocktailData";

export interface IFavoritesContext {
  favorites: ICocktail[];

  getFavorites: () => ICocktail[];
  isFavorite: (item: ICocktail) => boolean;
  toggleFavorite: (item: ICocktail) => void;
}

// JP Comment: The context variable provides the functionality
/**
 * FavoritesContext
 *
 * Provides global access to favorite cocktails and related actions.
 * - `favorites`: the current favorite cocktails.
 * - `getFavorites()`: returns the favorites array.
 * - `isFavorite(item)`: checks if a cocktail is favorited.
 * - `toggleFavorite(item)`: adds/removes a cocktail from favorites.
 *
 * Usage:
 * ```ts
 * const favoritesContext = useContext(FavoritesContext);
 * favoritesContext.toggleFavorite(cocktail);
 * ```
 */
export const FavoritesContext = createContext<IFavoritesContext>(
  {} as IFavoritesContext
);
