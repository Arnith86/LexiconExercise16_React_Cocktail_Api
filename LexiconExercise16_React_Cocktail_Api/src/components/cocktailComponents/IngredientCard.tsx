import type { ReactElement } from "react";
import { fetchIngredientImage } from "../../api-fetcher";
import { FigureImage } from "../FigureImage";
import { NavLink } from "react-router";

interface IIngredientCardProp {
  ingredient: string;
  measure?: string;
}

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
