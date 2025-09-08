import { BasicSearchForm } from "../components/drinkSearch/BasicSearchForm";
import { useState, type FormEvent } from "react";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { fetchCocktails } from "../api-fetcher";

import { SearchResultList } from "../components/drinkSearch/SearchResultList";

export const SearchView = () => {
  const [listOfCocktails, setListOfCocktails] = useState<ICocktail[]>([]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    fetchCocktails(formData.get("cocktail-name-input") as string).then(
      setListOfCocktails
    );

    event.currentTarget.reset();
  }

  return (
    <main>
      <h2>Cocktail search</h2>
      <BasicSearchForm onFormSubmit={handleFormSubmit} />
      <SearchResultList list={listOfCocktails} />
    </main>
  );
};
// Search Page
// - The user should be able to search for a cocktail using its name.
// - The page should have a form on it that is using the submit event.
// - The results of the search should be displayed in a list. Only the name of the cocktails should be in this list.
// - The list can contain a maximum of 10 results. If there are more than 10 cocktails in the results, the list should be paginated.
// - If you click on a cocktail in the list, you should go to the Cocktail Info Page.

// Search Page++
// - The user should be able to to advanced searches.
// - The use should be able to search on one of thes parameters or a combination of them:
// - - Category
// - - Ingredient
// - - Glass type
// - - The search form should contain relevant validation.
// - Cache the results. If you revisit a beer, you shouldn't need to make another request to the API.
