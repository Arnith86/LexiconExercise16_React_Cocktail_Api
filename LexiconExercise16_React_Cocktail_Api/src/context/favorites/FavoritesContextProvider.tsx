import type { ReactElement, ReactNode } from "react";
import { FAVORITES_KEY } from "../../helper/constants";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { FavoritesContext, type IFavoritesContext } from "./FavoritesContext";
import { useFavoriteManipulation } from "../../hooks/useFavoriteManipulation";

interface IFavoritesContextProviderProps {
  children: ReactNode;
}

// JP Comment: The provider component provides the actual data. See it as the publisher of the data.

/**
 * FavoritesContextProvider component
 *
 * Provides the actual data and actions for managing favorite cocktails.
 * Wrap any component tree that needs access to favorite-related state inside this provider.
 *
 * - Uses `useFavoriteManipulation` hook to manage favorite items stored in local storage (or other persistence).
 * - Provides context values: `favorites`, `getFavorites`, `isFavorite`, and `toggleFavorite`.
 *
 * @component
 * @param {IFavoritesContextProviderProps} props - Contains children components.
 * @returns {ReactElement} A context provider wrapping children with favorite functionality.
 */
export function FavoritesContextProvider({
  children,
}: IFavoritesContextProviderProps): ReactElement {
  const favorites = useFavoriteManipulation<ICocktail>(FAVORITES_KEY);

  const values: IFavoritesContext = {
    favorites: favorites.favorites,
    getFavorites: () => favorites.getFavorites(),
    isFavorite: (item: ICocktail) => favorites.isFavorite(item),
    toggleFavorite: (item: ICocktail) => favorites.toggleFavorite(item),
  };

  // JP Comment:  Every component needs to return a JSX element and this is a special one from React.
  //              It exists on the context object. The value prop is the data that is shared to the
  //              children components.
  /**
   * Render the FavoritesContext.Provider with the prepared values.
   * - All children components will have access to these values via `useContext(FavoritesContext)`.
   */
  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}
