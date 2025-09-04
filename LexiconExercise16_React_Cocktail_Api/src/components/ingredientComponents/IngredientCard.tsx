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

  const imageUrl = fetchIngredientImage(ingredient);

  return (
    <NavLink to={`/ingredient/${ingredient}`}>
      <article className="Ingredient">
        <FigureImage
          className={"ingredient-image"}
          url={imageUrl}
          altText={`${ingredient} image`}
        />
        <p>{`${measure} ${ingredient}`}</p>
      </article>
    </NavLink>
  );
}
