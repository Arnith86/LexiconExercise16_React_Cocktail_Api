import type { ReactElement } from "react";
import { Instructions } from "./Instruction";
import type { ICocktail } from "../helper/mapRawCocktailData";

interface ICocktailTextInfoSectionProp {
  cocktail: ICocktail;
}

export function CocktailTextInfoSection({
  cocktail,
}: ICocktailTextInfoSectionProp): ReactElement {
  return (
    <section className="cocktail-text-info">
      <Instructions header="Category" content={cocktail.category} />
      <Instructions header="Instructions" content={cocktail.instructions} />
      <Instructions header="Glass" content={cocktail.glass} />
    </section>
  );
}
