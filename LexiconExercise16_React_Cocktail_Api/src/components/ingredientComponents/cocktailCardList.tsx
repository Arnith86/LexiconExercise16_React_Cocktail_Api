import type { ReactElement, ReactNode } from "react";
import type { ICocktail } from "../../helper/mapRawCocktailData";
import { CocktailCard } from "../cocktailComponents/CocktailCard";

interface ICocktailCardList {
  cocktails: ICocktail[];
}
export function CocktailCardList(props: ICocktailCardList): ReactElement {
  const { cocktails } = props;

  function renderCocktailList(): ReactNode {
    return cocktails.map((c) => <CocktailCard key={c.id} cocktail={c} />);
  }

  return (
    <section className="cocktail-card-list">{renderCocktailList()}</section>
  );
}
