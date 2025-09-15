import type { ReactElement } from "react";
import { TextSection } from "../TextSection";
import type { ICocktail } from "../../helper/mapRawCocktailData";

interface ICocktailTextInfoSectionProp {
  cocktail: ICocktail;
}

/**
 * CocktailTextInfoSection component
 *
 * Displays additional information about a cocktail, including:
 * - The cocktail category
 * - Preparation instructions
 * - Recommended glass type
 *
 * Each piece of information is rendered using the `TextSection` component.
 *
 * @param {ICocktailTextInfoSectionProp} props - Props containing the cocktail object.
 * @returns {ReactElement} The rendered CocktailTextInfoSection component.
 */
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
