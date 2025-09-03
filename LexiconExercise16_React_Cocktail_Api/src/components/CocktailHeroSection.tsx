import { type ReactElement } from "react";
import { FigureImage } from "./FigureImage";
import { TagButtons } from "./TagButtons";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { FavoriteButton } from "./FavoriteButton";
import { FAVORITES_KEY } from "../constants";

interface ICocktailHeroSectionProp {
  cocktail: ICocktail;
}

export function CocktailHeroSection({
  cocktail,
}: ICocktailHeroSectionProp): ReactElement {
  return (
    <section className="cocktail-hero-section">
      <h2>{cocktail.name}</h2>
      <FavoriteButton item={cocktail.id} keyString={FAVORITES_KEY} />
      <FigureImage
        className="cocktail-thumbnail"
        url={cocktail.thumbnail}
        altText={`Image of ${cocktail.name}`}
      />
      <TagButtons tags={cocktail.tags} />
    </section>
  );
}
