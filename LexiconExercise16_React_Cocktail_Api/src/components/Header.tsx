import type { ReactElement } from "react";
import { NavLink } from "react-router";

/**
 * Header component
 *
 * Displays the main site header with the title and navigation links.
 * - Shows the site title in an `<h1>`.
 * - Provides navigation links to "Home", "Search", and "Favorites" pages using React Router's `NavLink`.
 * - `NavLink` allows styling for the active route via the `header-link` class.
 *
 * @component
 * @returns {ReactElement} The header section with site title and navigation.
 */
export function Header(): ReactElement {
  return (
    <section className="header">
      <h1>The Cocktail-wiki</h1>
      <nav>
        <NavLink className="header-link" to="/">
          Home
        </NavLink>
        <NavLink className="header-link" to="/search">
          Search
        </NavLink>
        <NavLink className="header-link" to="/favorites">
          Favorites
        </NavLink>
      </nav>
    </section>
  );
}
