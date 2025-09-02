import type { ReactElement } from "react";
import type { ICocktail } from "../mapRawCocktailData";
import { NavLink } from "react-router";
import { Image } from "./Image";

interface ICocktailProp {
  cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: ICocktailProp): ReactElement {
  return (
    <article className="cocktail-card">
      <Image
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
