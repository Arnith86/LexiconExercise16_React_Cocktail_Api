import { useContext, type ReactElement } from "react";
import { FigureImage } from "../FigureImage";
import { TagButtons } from "../TagButtons";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { FavoriteButton } from "../FavoriteButton";
import { FavoritesContext } from "../../context/favorites/FavoritesContext";

interface ICocktailHeroSectionProp {
  cocktail: ICocktail;
}

/**
 * CocktailHeroSection component
 *
 * Displays the main "hero" section of a cocktail page.
 * Includes the cocktail name, favorite toggle button,
 * thumbnail image, and associated tags.
 *
 * @param {ICocktailHeroSectionProp} props - Props containing the cocktail object.
 * @returns {ReactElement} The rendered CocktailHeroSection component.
 */
export function CocktailHeroSection({
  cocktail,
}: ICocktailHeroSectionProp): ReactElement {
  const favoritesContext = useContext(FavoritesContext);

  return (
    <section className="cocktail-hero-section">
      <div className="name-and-favorite">
        <h2>{cocktail.name}</h2>
        <FavoriteButton
          isFavorite={favoritesContext.isFavorite(cocktail)}
          onFavoriteToggle={() => favoritesContext.toggleFavorite(cocktail)}
        />
      </div>
      <FigureImage
        className="cocktail-thumbnail"
        url={cocktail.thumbnail}
        altText={`Image of ${cocktail.name}`}
      />
      <TagButtons tags={cocktail.tags} />
    </section>
  );
}
