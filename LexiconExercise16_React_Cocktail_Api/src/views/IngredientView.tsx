import { Suspense, type ReactElement } from "react";
import { Await, useLoaderData } from "react-router";
import type { IIngredientData } from "../helper/mapRawIngredientData";

import { TextSection } from "../components/TextSection";
import type { IIngredientDataDeferredReturn } from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";
import { fetchIngredientImage } from "../api-fetcher";
import { FigureImage } from "../components/FigureImage";

export const IngredientView = () => {
  const { ingredientData } = useLoaderData<IIngredientDataDeferredReturn>();

  const renderIngredientView = (
    ingredientData: IIngredientData
  ): ReactElement => {
    const ingredientImage = fetchIngredientImage(ingredientData.name);

    if (ingredientData) {
      return (
        <>
          <h2>{ingredientData.name}</h2>

          <FigureImage
            className={"ingredient-view-image"}
            url={ingredientImage}
            altText={`Image of ${ingredientData.name}`}
          />

          <TextSection
            header={"Description"}
            content={
              ingredientData.description ? ingredientData.description : "N/A"
            }
          />

          <TextSection
            header={"Alcoholic"}
            content={ingredientData.alcohol ? "Yes" : "No"}
          />

          <TextSection header={"Type"} content={ingredientData.type} />

          <TextSection
            header={"ABV ( alcohol by volume )"}
            content={ingredientData.abv ? `${ingredientData.abv}% ` : "N/A"}
          />
        </>
      );
    }

    return <div className="loader" />;
  };

  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={ingredientData}
          errorElement={"Ingredient could not be found.."}
        >
          {(ingD) => renderIngredientView(ingD)}
        </Await>
      </Suspense>
    </main>
  );
};
