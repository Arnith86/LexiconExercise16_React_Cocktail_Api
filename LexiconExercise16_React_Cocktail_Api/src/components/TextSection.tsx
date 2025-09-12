import type { ReactElement } from "react";

interface ITextSectionProp {
  header: string;
  content: string;
}

export function TextSection(props: ITextSectionProp): ReactElement {
  const { header, content } = props;

  return (
    <section className="text-section">
      <h3>{header}</h3>
      <p>{content}</p>
    </section>
  );
}
