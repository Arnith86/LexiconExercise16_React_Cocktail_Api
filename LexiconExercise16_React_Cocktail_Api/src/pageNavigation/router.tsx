import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import { HomeView } from "../components/views/HomeView";
import { SearchView } from "../components/views/SearchView";
import { CocktailInfoView } from "../components/views/CocktailInfoView";
import { FavoritesView } from "../components/views/FavoritesView";
import { IngredientView } from "../components/views/IngredientView";
import {
  AppDeferredLoader,
  CocktailInfoViewDeferredLoader,
  HomeDeferredLoader,
  IngredientDataDeferredLoader,
  SearchCategoryDeferredLoader,
} from "./loader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      loader={AppDeferredLoader}
      id="app"
      shouldRevalidate={() => false}
    >
      <Route index element={<HomeView />} loader={HomeDeferredLoader} />
      <Route
        path="/search"
        element={<SearchView />}
        loader={SearchCategoryDeferredLoader}
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
