import { fetchSingleCocktail } from "../api-fetcher";
import { type ICocktail } from "../helper/mapRawCocktailData";

export interface IHomeViewDeferredLoaderReturn {
  randomCocktail: Promise<ICocktail>;
}

export async function HomeViewDeferredLoader(): Promise<IHomeViewDeferredLoaderReturn> {
  return { randomCocktail: fetchSingleCocktail() };
}
