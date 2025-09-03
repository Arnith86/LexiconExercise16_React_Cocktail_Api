import { Navigate, useParams } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { useEffect, useState, type ReactElement } from "react";
import { fetchSingleCocktail } from "../api-fetcher";
import { Ingredients } from "../components/Ingredients";
import { CocktailHeroSection } from "../components/CocktailHeroSection";
import { CocktailTextInfoSection } from "../components/CocktailTextInfoSection";
import { isFavorite, toggleFavorite } from "../helper/toggleFavorite";
import { FAVORITES_KEY } from "../constants";

export const CocktailInfoView = () => {
  const { id } = useParams();

  /**Here until refactor is finished */
  const [favorite, setFavorite] = useState<boolean>(
    isFavorite(FAVORITES_KEY, id)
  );

  /**Here until refactor is finished */
  useEffect(() => {
    setFavorite;
  }, [favorite]);

  /**Here until refactor is finished */
  function onFavoriteToggle(): void {
    toggleFavorite(FAVORITES_KEY, id);
    setFavorite(isFavorite(FAVORITES_KEY, id));
  }

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
        <CocktailHeroSection
          cocktail={cocktail}
          isFavorite={favorite}
          onFavoriteToggle={onFavoriteToggle}
        />
        <CocktailTextInfoSection cocktail={cocktail} />
      </>
    );
  }

  return <main className="cocktail-info-page">{renderCocktailInfo()} </main>;
};
