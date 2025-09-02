import type { ReactElement } from "react";

interface IImageProp {
  className: string;
  url: string;
  altText: string;
}

export function Image({ className, url, altText }: IImageProp): ReactElement {
  return (
    <figure className={`g-figure ${className}`}>
      <img className="g-image" src={url} alt={altText} />
    </figure>
  );
}
