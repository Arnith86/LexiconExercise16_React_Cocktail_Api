import type { ReactElement } from "react";

interface IFigureImageProp {
  className: string;
  url: string;
  altText: string;
}

/**
 * FigureImage component
 *
 * A reusable component for displaying images with semantic `<figure>` and `<img>` elements.
 * - Wraps the image in a `<figure>` for better semantic structure.
 * - Accepts additional CSS classes via `className`.
 * - Requires `url` for the image source and `altText` for accessibility.
 *
 * @component
 * @param {IFigureImageProp} props - Props controlling the image source, alt text, and styling.
 * @returns {ReactElement} A figure containing an image element.
 */
export function FigureImage(props: IFigureImageProp): ReactElement {
  const { className, url, altText } = props;

  return (
    <figure className={`g-figure ${className}`}>
      <img className="g-image" src={url} alt={altText} />
    </figure>
  );
}
