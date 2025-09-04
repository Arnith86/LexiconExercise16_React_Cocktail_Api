export interface IIngredientData {
  id: number;
  name: string;
  description: string;
  type: string;
  alcohol: boolean;
  abv: number;
}

export function mapRawIngredientData(rawIngredient: any): IIngredientData {
  return {
    id: parseInt(rawIngredient.idIngredient),
    name: rawIngredient.strIngredient,
    description: rawIngredient.strDescription,
    type: rawIngredient.strType,
    alcohol: rawIngredient.strAlcohol.toLowerCase() === "yes",
    abv: parseFloat(rawIngredient.strABV) || 0,
  };
}
