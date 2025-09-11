import { useContext, type ReactElement } from "react";
import { FigureImage } from "../FigureImage";
import { TagButtons } from "../TagButtons";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { FavoriteButton } from "../FavoriteButton";
import { FavoritesContext } from "../../context/favorites/FavoritesContext";

interface ICocktailHeroSectionProp {
  cocktail: ICocktail;
}

export function CocktailHeroSection({
  cocktail,
}: ICocktailHeroSectionProp): ReactElement {
  const favoritesContext = useContext(FavoritesContext);

  return (
    <section className="cocktail-hero-section">
      <h2>{cocktail.name}</h2>
      <FavoriteButton
        isFavorite={favoritesContext.isFavorite(cocktail)}
        onFavoriteToggle={() => favoritesContext.toggleFavorite(cocktail)}
      />
      <FigureImage
        className="cocktail-thumbnail"
        url={cocktail.thumbnail}
        altText={`Image of ${cocktail.name}`}
      />
      <TagButtons tags={cocktail.tags} />
    </section>
  );
}
