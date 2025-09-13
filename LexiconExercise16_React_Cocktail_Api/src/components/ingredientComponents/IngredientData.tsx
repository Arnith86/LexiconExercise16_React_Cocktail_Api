import type { ReactElement } from "react";
import type { IIngredientData } from "../../helper/mapRawIngredientData";
import { TextSection } from "../TextSection";
import { FigureImage } from "../FigureImage";
import { fetchIngredientImage } from "../../api-fetcher";

interface IIngredientDataProp {
  ingredientData: IIngredientData;
}
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
