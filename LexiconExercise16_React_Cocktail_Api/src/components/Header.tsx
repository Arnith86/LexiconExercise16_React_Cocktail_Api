import type { ReactElement } from "react";
import { NavLink } from "react-router";

export function Header(): ReactElement {
  return (
    <>
      <h1>Cocktail-wiki</h1>
      <nav>
        <NavLink className="link" to="/">
          Home
        </NavLink>
        <NavLink className="link" to="/search">
          Search
        </NavLink>
        <NavLink className="link" to="/favorites">
          Favorites
        </NavLink>
      </nav>
    </>
  );
}
