import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
