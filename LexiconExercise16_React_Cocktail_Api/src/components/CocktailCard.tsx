import type { ReactElement } from "react";
import type { ICocktail } from "../mapRawCocktailData";

interface ICocktailProp {
  cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: ICocktailProp): ReactElement {
  return (
    <article className="cocktail-card">
      <figure className="cocktail-figure">
        <img className="cocktail-image" src={cocktail.thumbnail} />
      </figure>

      <h2 className="cocktail-name">{cocktail.name}</h2>

      <p> {"See More >"}</p>
    </article>
  );
}
