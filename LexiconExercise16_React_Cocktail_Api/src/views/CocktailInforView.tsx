import { Navigate, useParams } from "react-router";
import type { ICocktail } from "../mapRawCocktailData";
import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { fetchSingleCocktail } from "../api-fetcher";
import { Image } from "../components/Image";
import { TagButtons } from "../components/TagButtons";

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
        <Image
          className="cocktail-thumbnail"
          url={cocktail.thumbnail}
          altText=""
        />
        <h2>{cocktail.name}</h2>
        <p>Category: {cocktail.category}</p>
        <TagButtons tags={cocktail.tags} />
      </>
    );
  }

  return <main className="cocktail-info-page">{renderCocktailInfo()} </main>;
};
