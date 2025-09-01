import { mapRawCocktailData } from "./mapRawCocktailData";

const fetchDrinks = async (): Promise<object> => {
  const result = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  const data = await result.json();
  const someDrink = mapRawCocktailData(data.drinks[0]);
  console.log(someDrink);
  return data;
};

function App() {
  fetchDrinks();
  return <></>;
}

export default App;
