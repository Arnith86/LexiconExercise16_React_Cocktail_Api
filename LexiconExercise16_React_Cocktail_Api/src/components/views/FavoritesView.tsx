import { useContext, type ReactNode } from "react";
import { CocktailCard } from "../cocktailComponents/CocktailCard";

import { Spinner } from "../Spinner";
import {
  FavoritesContext,
  type IFavoritesContext,
} from "../../context/favorites/FavoritesContext";

/**
 * FavoritesView component
 *
 * Displays a list of the user's favorite cocktails.
 * - If favorites exist, each cocktail is rendered using the `CocktailCard` component.
 * - If favorites are still loading (`undefined`), a `Spinner` is displayed.
 * - If there are no favorites, a placeholder message is shown.
 *
 * This component consumes the `FavoritesContext` to access and render
 * the current list of favorites.
 *
 * @returns {JSX.Element} The rendered favorites view.
 */
export const FavoritesView = () => {
  const favoritesContext = useContext(FavoritesContext);

  function renderFavorites(): ReactNode {
    if (areThereFavorites(favoritesContext)) {
      return favoritesContext.favorites.map((cocktail) => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
      });
    }

    if (!favoritesContext.favorites) return <Spinner />;
    return <p>There are no favorites yet..</p>;
  }

  return (
    <main className="favorite-view">
      <h2>Your Favorites</h2>
      <section className="favorite-list">{renderFavorites()}</section>
    </main>
  );
};

function areThereFavorites(favoritesContext: IFavoritesContext) {
  return favoritesContext.favorites.length > 0;
}
