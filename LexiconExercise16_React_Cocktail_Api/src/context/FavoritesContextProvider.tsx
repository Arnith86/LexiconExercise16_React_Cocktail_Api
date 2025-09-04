import type { ReactElement, ReactNode } from "react";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import { FAVORITES_KEY } from "../helper/constants";
import { FavoritesContext, type IFavoritesContext } from "./FavoritesContext";
import type { ICocktail } from "../helper/mapRawCocktailData";

interface IFavoritesContextProviderProps {
  children: ReactNode;
}

// JP Comment: The provider component provides the actual data. See it as the publisher of the data.
export function FavoritesContextProvider({
  children,
}: IFavoritesContextProviderProps): ReactElement {
  const favorites = useToggleFavorite<ICocktail>(FAVORITES_KEY);

  const values: IFavoritesContext = {
    favorites: favorites.favorites,
    getFavorites: () => favorites.getFavorites(),
    isFavorite: (item: ICocktail) => favorites.isFavorite(item),
    toggleFavorite: (item: ICocktail) => favorites.toggleFavorite(item),
  };

  // JP Comment:  Every component needs to return a JSX element and this is a special one from React.
  //              It exists on the context object. The value prop is the data that is shared to the
  //              children components.
  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}
