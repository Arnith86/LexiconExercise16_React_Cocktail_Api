import { Suspense, useState } from "react";
import type { ICocktail } from "../helper/mapRawCocktailData";
import { fetchCocktails } from "../api-fetcher";
import { SearchResultList } from "../components/drinkSearch/SearchResultList";
import { AdvancedSearchForm } from "../components/drinkSearch/SearchForm";
import {
  Await,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import type {
  IAppDeferredReturn,
  ISearchCategoryBlockingReturn,
} from "../pageNavigation/loader";
import { Spinner } from "../components/Spinner";

export const SearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listOfCocktails, setListOfCocktails] = useState<ICocktail[]>([]);
  const { cocktails } = useLoaderData<ISearchCategoryBlockingReturn>();
  const {
    searchCategory: { categoryType, ingredientType, glassType },
  } = useRouteLoaderData("app") as IAppDeferredReturn;

  return (
    <main>
      <h2>Cocktail search</h2>
      <Suspense fallback={<Spinner />}>
        <Await resolve={categoryType}>
          <AdvancedSearchForm
            categoryType={categoryType}
            glassType={glassType}
            ingredientType={ingredientType}
          />
        </Await>
      </Suspense>
      <SearchResultList list={listOfCocktails} />
    </main>
  );
};

async function filterOptions(
  chosenOptions: [keyof ICocktail, string][]
): Promise<ICocktail[]> {
  chosenOptions = chosenOptions.filter(([_, o]) => o !== "");

  const firstOption: [keyof ICocktail, string] | undefined =
    chosenOptions.shift();

  if (!firstOption) return []; // nothing to fetch

  let cocktails: ICocktail[] = await retrieveFirstPassFilteredCocktails(
    firstOption
  );

  console.log(cocktails);

  chosenOptions.forEach(() => {
    cocktails = filterInMemoryCocktailArray(cocktails, chosenOptions);
  });
  console.log(cocktails);

  return cocktails;
}

async function retrieveFirstPassFilteredCocktails(
  firstOption: [keyof ICocktail, string]
) {
  const [optionType, value] = firstOption;
  return await fetchCocktails(optionType, value);
}

//JP Comment:
// - keyof ICocktail means that it is a valid property names of ICocktail, represented as a string.
// - "every" checks if all properties in the tuple evaluates to true, only then does it return true.
// -- chosenOptions.every(([key, value]) => c[key] === value);
function filterInMemoryCocktailArray(
  cocktails: ICocktail[],
  chosenOptions: [keyof ICocktail, string][]
): ICocktail[] {
  const coc: ICocktail[] = cocktails.filter((c) => {
    chosenOptions.every(([key, value]) => c[key] == value);
  });
  console.log(coc);

  return cocktails.filter((c) => {
    chosenOptions.every(([key, value]) => {
      return key == value;
    });
  });
}

// Search Page++
// - The user should be able to to advanced searches.
// - The use should be able to search on one of thes parameters or a combination of them:
// - - Category
// - - Ingredient
// - - Glass type
// - - The search form should contain relevant validation.
// - Cache the results. If you revisit a beer, you shouldn't need to make another request to the API.

// function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   const chosenOptions: [keyof ICocktail, string][] = [
//     [SEARCH_OPTION_NAME, formData.get("cocktail-name-input") as string],
//     [
//       SEARCH_OPTION_INGREDIENT,
//       formData.get("ingredients-options-dropdown-input") as string,
//     ],
//     [
//       SEARCH_OPTION_CATEGORY,
//       formData.get("category-options-dropdown-input") as string,
//     ],
//     [
//       SEARCH_OPTION_GLASS,
//       formData.get("glass-options-dropdown-input") as string,
//     ],
//   ];

//   filterOptions(chosenOptions).then(setListOfCocktails);
//   event.currentTarget.reset();
// }
