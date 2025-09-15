import { type ReactElement } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface IFavoriteButton {
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

/**
 * FavoriteButton component
 *
 * A reusable button that shows a favorite (heart) icon.
 * - The icon fills when `isFavorite` is true.
 * - Clicking the button triggers the `onFavoriteToggle` callback.
 *
 * @component
 * @param {IFavoriteButton} props - Props to control the button state and behavior.
 * @returns {ReactElement} The favorite toggle button.
 */
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
