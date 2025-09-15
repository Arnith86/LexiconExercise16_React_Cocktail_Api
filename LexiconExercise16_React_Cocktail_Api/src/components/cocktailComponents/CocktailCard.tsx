import { useContext, type ReactElement } from "react";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { NavLink } from "react-router";
import { FigureImage } from "../FigureImage";
import { FavoriteButton } from "../FavoriteButton";
import { FavoritesContext } from "../../context/favorites/FavoritesContext";

interface ICocktailProp {
  cocktail: ICocktail;
}

/**
 * CocktailCard component
 *
 * Renders a card displaying information about a cocktail,
 * including its image, name, favorite toggle button,
 * and a navigation link to detailed cocktail information.
 *
 * @param {ICocktailProp} props - Props containing the cocktail object.
 * @returns {ReactElement} The rendered CocktailCard component.
 */
export function CocktailCard({ cocktail }: ICocktailProp): ReactElement {
  const favoritesContext = useContext(FavoritesContext);

  return (
    <article className="cocktail-card">
      <FigureImage
        className={"cocktail-image"}
        url={cocktail.thumbnail}
        altText={`image of a ${cocktail.name}`}
      />

      <span className="name-and-favorite">
        <FavoriteButton
          isFavorite={favoritesContext.isFavorite(cocktail)}
          onFavoriteToggle={() => favoritesContext.toggleFavorite(cocktail)}
        />
        <h2 className="cocktail-name">{cocktail.name}</h2>
      </span>

      <NavLink className="text-link" to={`/cocktailinfo/${cocktail.id}`}>
        {"See More >"}
      </NavLink>
    </article>
  );
}
