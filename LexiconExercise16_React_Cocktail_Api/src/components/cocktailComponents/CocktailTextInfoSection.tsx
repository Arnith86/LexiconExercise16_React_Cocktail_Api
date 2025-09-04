import type { ReactElement } from "react";
import { TextSection } from "../TextSection";
import type { ICocktail } from "../../helper/mapRawCocktailData";

interface ICocktailTextInfoSectionProp {
  cocktail: ICocktail;
}

export function CocktailTextInfoSection({
  cocktail,
}: ICocktailTextInfoSectionProp): ReactElement {
  return (
    <section className="cocktail-text-info">
      <TextSection header="Category" content={cocktail.category} />
      <TextSection header="Instructions" content={cocktail.instructions} />
      <TextSection header="Glass" content={cocktail.glass} />
    </section>
  );
}
