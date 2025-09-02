import { useState, type ReactElement } from "react";
import type { IIngredient } from "../mapRawCocktailData";
import { Image } from "./Image";
import { fetchIngredientImage } from "../api-fetcher";

interface IIngredients {
  ingredients: IIngredient[];
}

export function Ingredients({ ingredients }: IIngredients): ReactElement {
  //   const [ingredientList, setIngredientList] = useState<IIngredient[]>([]);

  return (
    <section className="Ingredient-list">
      {ingredients.map((ing) => {
        const imageUrl = fetchIngredientImage(ing.ingredient);
        return (
          <section className="Ingredient">
            <Image
              className={"ingredient-image"}
              url={imageUrl}
              altText={`${ing.ingredient} image`}
            />
            <p>{`${ing.measure} ${ing.ingredient}`}</p>
          </section>
        );
      })}
    </section>
  );
}
