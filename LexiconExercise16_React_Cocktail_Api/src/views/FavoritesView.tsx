import { NavLink } from "react-router";

export const FavoritesView = () => {
  return (
    <main>
      <p>This is the FavoritesView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/cocktailinfo">
          Cocktail Info
        </NavLink>
      </nav>
    </main>
  );
};
