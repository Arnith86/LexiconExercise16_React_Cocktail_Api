import type { ReactElement } from "react";
import { NavLink } from "react-router";

export function Header(): ReactElement {
  return (
    <section className="header">
      <h1>The Cocktail-wiki</h1>
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
    </section>
  );
}
