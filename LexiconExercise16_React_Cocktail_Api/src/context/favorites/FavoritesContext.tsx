import { createContext } from "react";
import type { ICocktail } from "../../helper/mapRawCocktailData";

export interface IFavoritesContext {
  favorites: ICocktail[];

  getFavorites: () => ICocktail[];
  isFavorite: (item: ICocktail) => boolean;
  toggleFavorite: (item: ICocktail) => void;
}

// JP Comment: The context variable provides the functionality
export const FavoritesContext = createContext<IFavoritesContext>(
  {} as IFavoritesContext
);
