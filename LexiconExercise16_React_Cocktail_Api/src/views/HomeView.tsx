import { NavLink } from "react-router";

export const HomeView = () => {
  return (
    <main>
      <p>This is the homeView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/cocktailinfo">
          Cocktail Info
        </NavLink>
        <NavLink className="link" to="/ingredient">
          Ingredient Info
        </NavLink>
      </nav>
    </main>
  );
};
