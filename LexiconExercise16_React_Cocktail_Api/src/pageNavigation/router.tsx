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
import {
  AppDeferredLoader,
  CocktailInfoViewDeferredLoader,
  IngredientDataDeferredLoader,
  SearchCategoryBlockingLoader,
} from "./loader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeView />} loader={AppDeferredLoader} id="app" />
      <Route
        path="/search"
        element={<SearchView />}
        loader={SearchCategoryBlockingLoader}
        // shouldRevalidate={() => false}
      />
      <Route
        path="/cocktailinfo/:id"
        element={<CocktailInfoView />}
        loader={CocktailInfoViewDeferredLoader}
      />
      <Route path="/favorites" element={<FavoritesView />} />
      <Route
        path="/ingredient/:name"
        element={<IngredientView />}
        loader={IngredientDataDeferredLoader}
      />
    </Route>
  )
);
