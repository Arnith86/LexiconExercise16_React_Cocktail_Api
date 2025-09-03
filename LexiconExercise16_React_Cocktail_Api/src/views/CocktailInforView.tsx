import { Navigate, useParams } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { fetchSingleCocktail } from "../api-fetcher";
import { FigureImage } from "../components/FigureImage";
import { TagButtons } from "../components/TagButtons";
import { Instructions } from "../components/Instruction";
import { Ingredients } from "../components/Ingredients";
import { CocktailHeroSection } from "../components/CocktailHeroSection";
import { CocktailTextInfoSection } from "../components/CocktailTextInfoSection";

export const CocktailInfoView = () => {
  const { id } = useParams();

  if (id === undefined) return <Navigate replace to="/" />;

  const [cocktail, setCocktail] = useState<ICocktail | null>(null);

  useEffect(() => {
    if (!id) return;
    const cocktailId = parseInt(id, 10);

    fetchSingleCocktail(cocktailId)
      .then(setCocktail)
      .catch((err) => console.log("Error fetching cocktail", err));
  }, []);

  function renderCocktailInfo(): ReactElement {
    if (!cocktail) return <div className="loader"></div>;

    return (
      <>
        <Ingredients ingredients={cocktail.ingredients} />
        <CocktailHeroSection cocktail={cocktail} />
        <TagButtons tags={cocktail.tags} />
        <CocktailTextInfoSection cocktail={cocktail} />
      </>
    );
  }

  return <main className="cocktail-info-page">{renderCocktailInfo()} </main>;
};
