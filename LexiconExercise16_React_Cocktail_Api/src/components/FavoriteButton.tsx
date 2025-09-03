import { type ReactElement } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IFavoriteButton {
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function FavoriteButton({
  isFavorite,
  onFavoriteToggle,
}: IFavoriteButton): ReactElement {
  return (
    <Button
      buttonType="button"
      className={"favorite-button"}
      onClick={onFavoriteToggle}
    >
      <Icon iconName="favorite" isFilled={isFavorite} />
    </Button>
  );
}
