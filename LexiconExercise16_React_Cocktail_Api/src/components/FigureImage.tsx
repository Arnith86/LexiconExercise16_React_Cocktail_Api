import type { ReactElement } from "react";

interface IFigureImageProp {
  className: string;
  url: string;
  altText: string;
}

export function FigureImage(props: IFigureImageProp): ReactElement {
  const { className, url, altText } = props;

  return (
    <figure className={`g-figure ${className}`}>
      <img className="g-image" src={url} alt={altText} />
    </figure>
  );
}
