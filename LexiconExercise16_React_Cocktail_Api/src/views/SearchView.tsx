import { NavLink } from "react-router";

export const SearchView = () => {
  return (
    <main>
      <p>This is the SearchView!</p>
      <nav>
        {/**Here for testing */}
        <NavLink className="link" to="/cocktailinfo">
          Cocktail Info
        </NavLink>
      </nav>
    </main>
  );
};
