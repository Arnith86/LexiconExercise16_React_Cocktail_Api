import { type ReactElement, type ReactNode } from "react";
import type { IIngredient } from "../../helper/mapRawCocktailData";
import { Ingredient } from "./IngredientCard";

interface ICocktailIngredientsProp {
  ingredients: IIngredient[];
}

/**
 * CocktailIngredients component
 *
 * Displays the list of ingredients for a given cocktail.
 * Renders each ingredient using the `Ingredient` component,
 * including optional measurement information when available.
 *
 * @param {ICocktailIngredientsProp} props - Props containing an array of ingredients.
 * @returns {ReactElement} The rendered CocktailIngredients component.
 */
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
    <section className="cocktail-ingredients">
      <h2>Ingredients</h2>

      <div className="ingredient-list">
        {ingredients.map((ing) => {
          return renderCocktailIngredient(ing);
        })}
      </div>
    </section>
  );
}
