import { type ReactElement } from "react";
import { FigureImage } from "./FigureImage";
import { TagButtons } from "./TagButtons";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { FavoriteButton } from "./FavoriteButton";

interface ICocktailHeroSectionProp {
  cocktail: ICocktail;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function CocktailHeroSection({
  cocktail,
  isFavorite,
  onFavoriteToggle,
}: ICocktailHeroSectionProp): ReactElement {
  return (
    <section className="cocktail-hero-section">
      <h2>{cocktail.name}</h2>
      <FavoriteButton
        isFavorite={isFavorite}
        onFavoriteToggle={onFavoriteToggle}
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
