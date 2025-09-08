import type { FormEvent, ReactElement } from "react";
import { Button } from "../Button";

interface IBasicSearchFormProp {
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BasicSearchForm(props: IBasicSearchFormProp): ReactElement {
  const { onFormSubmit } = props;

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="cocktail-name-input">Drink name:</label>
      <input
        type="text"
        required
        id="cocktail-name-input"
        name="cocktail-name-input"
        placeholder="What are you searching for?"
      />

      <Button className={"submit-basic-search-button"} buttonType={"submit"}>
        {"Search"}
      </Button>
    </form>
  );
}
