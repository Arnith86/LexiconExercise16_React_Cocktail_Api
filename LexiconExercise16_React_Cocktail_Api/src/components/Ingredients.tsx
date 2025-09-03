import { type ReactElement, type ReactNode } from "react";
import type { IIngredient } from "../mapRawCocktailData";
import { Ingredient } from "./IngredientCard";

interface IIngredientsProp {
  ingredients: IIngredient[];
}

export function Ingredients({ ingredients }: IIngredientsProp): ReactElement {
  function renderIngredient(ing: IIngredient): ReactNode {
    if (!ing.measure) return <Ingredient ingredient={ing.ingredient} />;

    return (
      <Ingredient
        ingredient={ing.ingredient}
        measure={ing.measure}
        key={ing.ingredient}
      />
    );
  }

  return (
    <section className="Ingredients">
      <h2>Ingredients</h2>
      {ingredients.map((ing) => {
        return renderIngredient(ing);
      })}
    </section>
  );
}
