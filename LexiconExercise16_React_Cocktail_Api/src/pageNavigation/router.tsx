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

/**
 * Application router configuration.
 *
 * The router is structured as a nested route tree:
 * - `/` (root) -> App component with `AppDeferredLoader` for search options.
 *   - Index route: HomeView, lazy loads a random cocktail.
 *   - `/search`: SearchView, lazy loads cocktails based on search parameters.
 *   - `/cocktailinfo/:id`: CocktailInfoView, lazy loads a single cocktail by ID.
 *   - `/favorites`: FavoritesView, no loader needed.
 *   - `/ingredient/:name`: IngredientView, lazy loads ingredient data and related cocktails.
 */
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
