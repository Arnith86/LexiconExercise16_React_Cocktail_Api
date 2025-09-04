import { Navigate, useParams } from "react-router";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { useContext, useEffect, useState, type ReactElement } from "react";
import { fetchSingleCocktail } from "../api-fetcher";
import { CocktailIngredients } from "../components/cocktailComponents/CocktailIngredients";
import { CocktailHeroSection } from "../components/cocktailComponents/CocktailHeroSection";
import { CocktailTextInfoSection } from "../components/cocktailComponents/CocktailTextInfoSection";
import { FavoritesContext } from "../context/FavoritesContext";

export const CocktailInfoView = () => {
  const { id } = useParams();
  if (id === undefined) return <Navigate replace to="/" />;

  const favoritesContext = useContext(FavoritesContext);
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
        <CocktailIngredients ingredients={cocktail.ingredients} />
        <CocktailHeroSection
          cocktail={cocktail}
          isFavorite={favoritesContext.isFavorite(cocktail)}
          onFavoriteToggle={() => favoritesContext.toggleFavorite(cocktail)}
        />
        <CocktailTextInfoSection cocktail={cocktail} />
      </>
    );
  }

  return <main className="cocktail-info-page">{renderCocktailInfo()} </main>;
};
