import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { FavoritesContextProvider } from "./context/FavoritesContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesContextProvider>
      <RouterProvider router={router} />
    </FavoritesContextProvider>
  </StrictMode>
);
