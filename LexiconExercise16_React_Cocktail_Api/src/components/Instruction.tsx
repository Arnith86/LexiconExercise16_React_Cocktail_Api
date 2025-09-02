import type { ReactElement } from "react";

interface IInstructionProp {
  //   className: string;
  header: string;
  content: string;
}

export function Instructions(props: IInstructionProp): ReactElement {
  const { header, content /** , className*/ } = props;

  return (
    // <section className={className}>
    <section>
      <h3>{header}</h3>
      <p>{content}</p>
    </section>
  );
}
