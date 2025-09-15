import type { ReactElement } from "react";
import { fetchIngredientImage } from "../../api-fetcher";
import { FigureImage } from "../FigureImage";
import { NavLink } from "react-router";

interface IIngredientCardProp {
  ingredient: string;
  measure?: string;
}

/**
 * Ingredient component
 *
 * Renders a clickable card for an ingredient. The card includes:
 * - An image of the ingredient (fetched via `fetchIngredientImage`).
 * - The ingredient's name.
 * - An optional measure (if provided).
 *
 * The entire card is wrapped in a `NavLink` that navigates
 * to the ingredient's detail page.
 *
 * @param {IIngredientCardProp} props - The props containing ingredient details.
 * @returns {ReactElement} A rendered Ingredient card component.
 */
export function Ingredient(props: IIngredientCardProp): ReactElement {
  const { ingredient, measure } = props;

  const imageUrl = fetchIngredientImage(ingredient, "small");

  return (
    <NavLink to={`/ingredient/${ingredient}`} className={"ingredient-link"}>
      <article className="ingredient-card">
        <FigureImage
          className={"ingredient-image"}
          url={imageUrl}
          altText={`${ingredient} image`}
        />
        <p>{`${ingredient}`}</p>
        <p className="ingredient-measure">{`${measure}`}</p>
      </article>
    </NavLink>
  );
}
