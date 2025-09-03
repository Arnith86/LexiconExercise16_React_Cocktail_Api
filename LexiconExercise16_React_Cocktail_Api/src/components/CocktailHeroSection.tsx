import type { ReactElement } from "react";
import { FigureImage } from "./FigureImage";
import { TagButtons } from "./TagButtons";
import type { ICocktail } from "../mapRawCocktailData";

interface ICocktailHeroSectionProp {
  cocktail: ICocktail;
}

export function CocktailHeroSection({
  cocktail,
}: ICocktailHeroSectionProp): ReactElement {
  return (
    <section className="cocktail-hero-section">
      <h2>{cocktail.name}</h2>
      <FigureImage
        className="cocktail-thumbnail"
        url={cocktail.thumbnail}
        altText={`Image of ${cocktail.name}`}
      />
      <TagButtons tags={cocktail.tags} />
    </section>
  );
}
