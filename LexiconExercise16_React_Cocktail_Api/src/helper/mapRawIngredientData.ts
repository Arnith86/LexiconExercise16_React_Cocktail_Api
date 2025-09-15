export interface IIngredientData {
  id: number;
  name: string;
  description?: string;
  type: string;
  alcohol: boolean;
  abv?: number;
}

/**
 * Maps raw API ingredient data into the structured IIngredientData format.
 *
 * @param rawIngredient - The raw ingredient object from the API
 * @returns {IIngredientData} The mapped ingredient data
 *
 * @example
 * const raw = {
 *   idIngredient: "11000",
 *   strIngredient: "Vodka",
 *   strDescription: "A clear distilled alcoholic beverage",
 *   strType: "Spirit",
 *   strAlcohol: "Yes",
 *   strABV: "40"
 * };
 * const ingredient = mapRawIngredientData(raw);
 * // ingredient.alcohol === true
 * // ingredient.abv === 40
 */

export function mapRawIngredientData(rawIngredient: any): IIngredientData {
  return {
    id: parseInt(rawIngredient.idIngredient),
    name: rawIngredient.strIngredient,
    description: rawIngredient.strDescription,
    type: rawIngredient.strType,
    alcohol: rawIngredient.strAlcohol.toLowerCase() === "yes",
    abv: parseFloat(rawIngredient.strABV),
  };
}
