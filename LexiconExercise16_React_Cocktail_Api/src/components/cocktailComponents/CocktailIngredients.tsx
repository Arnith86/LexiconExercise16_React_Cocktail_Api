import { type ReactElement, type ReactNode } from "react";
import type { IIngredient } from "../../helper/mapRawCocktailData";
import { Ingredient } from "../ingredientComponents/IngredientCard";

interface ICocktailIngredientsProp {
  ingredients: IIngredient[];
}

export function CocktailIngredients({
  ingredients,
}: ICocktailIngredientsProp): ReactElement {
  function renderCocktailIngredient(ing: IIngredient): ReactNode {
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
        return renderCocktailIngredient(ing);
      })}
    </section>
  );
}
