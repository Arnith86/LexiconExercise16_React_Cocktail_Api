import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import { HomeView } from "../views/HomeView";
import { SearchView } from "../views/SearchView";
import { CocktailInfoView } from "../views/CocktailInfoView";
import { FavoritesView } from "../views/FavoritesView";
import { IngredientView } from "../views/IngredientView";
import { SingleCocktailDeferredLoader } from "./loader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={<HomeView />}
        loader={SingleCocktailDeferredLoader}
      />
      <Route path="/search" element={<SearchView />} />
      <Route
        path="/cocktailinfo/:id"
        element={<CocktailInfoView />}
        loader={SingleCocktailDeferredLoader}
      />
      <Route path="/favorites" element={<FavoritesView />} />
      <Route path="/ingredient/:name" element={<IngredientView />} />
    </Route>
  )
);
