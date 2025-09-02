import type { ReactElement } from "react";
import { Button } from "./Button";

interface ITagButtonsProp {
  tags: string[];
}

export function TagButtons({ tags }: ITagButtonsProp): ReactElement {
  return (
    <section className="cocktail-tags">
      {tags.map((tag) => (
        <Button className={"tag-button"} buttonType={"button"} key={tag}>
          {tag}
        </Button>
      ))}
    </section>
  );
}
