import type { ReactElement } from "react";
import type { IIngredientData } from "../../helper/mapRawIngredientData";
import { TextSection } from "../TextSection";
import { FigureImage } from "../FigureImage";
import { fetchIngredientImage } from "../../api-fetcher";

interface IIngredientDataProp {
  ingredientData: IIngredientData;
}

/**
 * IngredientData component
 *
 * Displays detailed information about a single ingredient, including:
 * - Name
 * - Image (fetched via `fetchIngredientImage`)
 * - Metadata: alcoholic status, type, and ABV
 * - Description text
 *
 * The component is split into two main sections:
 * 1. Hero section: shows the name, image, and metadata
 * 2. Text info section: shows the description
 *
 * @param {IIngredientDataProp} props - Props containing the ingredient data.
 * @returns {ReactElement} The rendered ingredient data view.
 */
export function IngredientData(props: IIngredientDataProp): ReactElement {
  const { ingredientData } = props;

  const renderIngredientComponent = (
    ingredientData: IIngredientData
  ): ReactElement => {
    const ingredientImage = fetchIngredientImage(ingredientData.name);

    return (
      <section className="ingredient-data">
        <section className="ingredient-hero-section">
          <h2>{ingredientData.name}</h2>

          <FigureImage
            className={"ingredient-view-image"}
            url={ingredientImage}
            altText={`Image of ${ingredientData.name}`}
          />

          <div className="ingredient-meta-data">
            <TextSection
              header={"Alcoholic"}
              content={ingredientData.alcohol ? "Yes" : "No"}
            />

            <TextSection
              header={"Type"}
              content={ingredientData.type ? `${ingredientData.type} ` : "N/A"}
            />

            <TextSection
              header={"ABV ( alcohol by volume )"}
              content={ingredientData.abv ? `${ingredientData.abv}% ` : "N/A"}
            />
          </div>
        </section>

        <section className="ingredient-text-info">
          <TextSection
            header={"Description"}
            content={
              ingredientData.description ? ingredientData.description : "N/A"
            }
          />
        </section>
      </section>
    );
  };

  return renderIngredientComponent(ingredientData);
}
