import type { ReactElement } from "react";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { NavLink } from "react-router";
import { FigureImage } from "./FigureImage";
import { FavoriteButton } from "./FavoriteButton";
import { FAVORITES_KEY } from "../constants";

interface ICocktailProp {
  cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: ICocktailProp): ReactElement {
  return (
    <article className="cocktail-card">
      <FavoriteButton item={cocktail.id} keyString={FAVORITES_KEY} />
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
