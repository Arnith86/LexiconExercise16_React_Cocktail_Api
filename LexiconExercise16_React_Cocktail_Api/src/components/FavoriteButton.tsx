import { useEffect, useState, type ReactElement } from "react";
import { isFavorite, toggleFavorite } from "../helper/toggleFavorite";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IFavoriteButton {
  item: string | number;
  keyString: string;
}

export function FavoriteButton({
  item,
  keyString: key,
}: IFavoriteButton): ReactElement {
  const [favorite, setFavorite] = useState<boolean>(isFavorite(key, item));

  useEffect(() => {
    setFavorite;
  }, [favorite]);

  function handleClick(): void {
    toggleFavorite(key, item);
    setFavorite(isFavorite(key, item));
  }

  return (
    <Button
      buttonType="button"
      className={"favorite-button"}
      onClick={handleClick}
    >
      <Icon iconName="favorite" isFilled={favorite} />
    </Button>
  );
}
