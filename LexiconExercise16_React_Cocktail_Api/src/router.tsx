import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "./App";
import { HomeView } from "./views/HomeView";
import { SearchView } from "./views/SearchView";
import { CocktailInfoView } from "./views/CocktailInforView";
import { FavoritesView } from "./views/FavoritesView";
import { IngredientView } from "./views/IngredientView";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeView />} />
      <Route path="/search" element={<SearchView />} />
      <Route path="/cocktailinfo" element={<CocktailInfoView />} />
      <Route path="/favorites" element={<FavoritesView />} />
      <Route path="/ingredient" element={<IngredientView />} />
    </Route>
  )
);
