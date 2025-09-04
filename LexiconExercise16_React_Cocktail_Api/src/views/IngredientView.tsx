import { useEffect, useState, type ReactElement } from "react";
import { Navigate, useParams } from "react-router";
import { fetchIngredient, fetchIngredientImage } from "../api-fetcher";
import type { IIngredientData } from "../helper/mapRawIngredientData";
import { FigureImage } from "../components/FigureImage";
import { TextSection } from "../components/TextSection";

export const IngredientView = () => {
  const { name } = useParams<{ name: string }>();
  const [ingredient, setIngredient] = useState<IIngredientData | null>(null);

  if (!name) return <Navigate replace to={"/"} />;

  const ingredientImageUrl = fetchIngredientImage(name);

  useEffect(() => {
    fetchIngredient(name)
      .then(setIngredient)
      .catch((err) => {
        throw new Error("Ingredient could not be found..", err);
      });
  }, []);

  const renderIngredientView = (): ReactElement => {
    if (ingredient) {
      return (
        <>
          <h2>{ingredient.name}</h2>
          <FigureImage
            className={"ingredient-view-image"}
            url={ingredientImageUrl}
            altText={`Image of ${name}`}
          />
          <TextSection
            header={"Description"}
            content={ingredient.description ? ingredient.description : "N/A"}
          />
          <TextSection
            header={"Alcoholic"}
            content={ingredient.alcohol ? "Yes" : "No"}
          />
          <TextSection header={"Type"} content={ingredient.type} />
          <TextSection
            header={"ABV ( alcohol by volume )"}
            content={ingredient.abv ? `${ingredient.abv}% ` : "N/A"}
          />
        </>
      );
    }

    return <div className="loader" />;
  };

  return <main>{renderIngredientView()}</main>;
};
