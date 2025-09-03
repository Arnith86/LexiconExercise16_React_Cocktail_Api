import type { ReactElement } from "react";
import { fetchIngredientImage } from "../api-fetcher";
import { Image } from "./FigureImage";

interface IIngredientCardProp {
  ingredient: string;
  measure?: string;
}

export function Ingredient(props: IIngredientCardProp): ReactElement {
  const { ingredient, measure } = props;

  const imageUrl = fetchIngredientImage(ingredient);

  return (
    <article className="Ingredient">
      <Image
        className={"ingredient-image"}
        url={imageUrl}
        altText={`${ingredient} image`}
      />
      <p>{`${measure} ${ingredient}`}</p>
    </article>
  );
}
