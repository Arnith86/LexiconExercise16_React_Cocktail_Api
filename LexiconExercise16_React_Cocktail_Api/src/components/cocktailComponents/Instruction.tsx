import type { ReactElement } from "react";

interface IInstructionProp {
  header: string;
  content: string;
}

export function Instructions(props: IInstructionProp): ReactElement {
  const { header, content } = props;

  return (
    <section>
      <h3>{header}</h3>
      <p>{content}</p>
    </section>
  );
}
