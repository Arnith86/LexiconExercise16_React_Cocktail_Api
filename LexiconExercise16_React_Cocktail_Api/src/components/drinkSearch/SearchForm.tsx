import { useState, type FormEvent, type ReactElement } from "react";
import { Button } from "../Button";
import { DropDownOptions } from "./DropDownOptions";

import { useSearchParams } from "react-router";
import {
  SEARCH_TYPE_INGREDIENT,
  SEARCH_TYPE_CATEGORY,
  SEARCH_TYPE_GLASS,
} from "../../helper/constants";

interface IAdvancedSearchFormProp {
  categoryType: string[];
  glassType: string[];
  ingredientType: string[];
}

export function SearchForm(props: IAdvancedSearchFormProp): ReactElement {
  const { categoryType, glassType, ingredientType } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState<string>(searchParams.get("name") ?? "");
  const [category, setCategory] = useState<string>(
    searchParams.get("category") ?? ""
  );
  const [ingredients, setIngredients] = useState<string>(
    searchParams.get("ingredients") ?? ""
  );
  const [glass, setGlass] = useState<string>(searchParams.get("glass") ?? "");

  function handleFormSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setSearchParams({
      name: name,
      category: category,
      ingredients: ingredients,
      glass: glass,
    });
  }

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <div className="form-name-input">
        <label htmlFor="name" className="left-side">
          Drink name:
        </label>
        <input
          className="right-side"
          type="text"
          required
          id="cocktail-name-input"
          name="name"
          placeholder="name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <DropDownOptions
        optionType={SEARCH_TYPE_INGREDIENT}
        options={ingredientType}
        value={ingredients}
        onChange={setIngredients}
      />

      <DropDownOptions
        optionType={SEARCH_TYPE_CATEGORY}
        options={categoryType}
        value={category}
        onChange={setCategory}
      />

      <DropDownOptions
        optionType={SEARCH_TYPE_GLASS}
        options={glassType}
        value={glass}
        onChange={setGlass}
      />

      <Button className={"submit-search-button"} buttonType={"submit"}>
        Search
      </Button>
    </form>
  );
}
