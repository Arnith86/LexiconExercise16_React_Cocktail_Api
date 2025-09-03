import type { ReactElement } from "react";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { NavLink } from "react-router";
import { FigureImage } from "./FigureImage";

interface ICocktailProp {
  cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: ICocktailProp): ReactElement {
  return (
    <article className="cocktail-card">
      <FigureImage
        className={"cocktail-image"}
        url={cocktail.thumbnail}
        altText={`image of a ${cocktail.name}`}
      />

      <h2 className="cocktail-name">{cocktail.name}</h2>

      <NavLink
        className="link"
        to={`/cocktailinfo/${cocktail.id}`}
        state={{ cocktail }}
      >
        {"See More >"}
      </NavLink>
    </article>
  );
}
