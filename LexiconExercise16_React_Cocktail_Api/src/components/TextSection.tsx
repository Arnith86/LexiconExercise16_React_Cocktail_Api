import type { ReactElement } from "react";

interface ITextSectionProp {
  header: string;
  content: string;
}

/**
 * TextSection component
 *
 * A simple reusable component for displaying a header and corresponding text.
 * - Renders the header in an `<h3>` element.
 * - Renders the content in a `<p>` element.
 *
 * @component
 * @param {ITextSectionProp} props - Props containing the header and content strings.
 * @returns {ReactElement} A section containing a header and text paragraph.
 */
export function TextSection(props: ITextSectionProp): ReactElement {
  const { header, content } = props;

  return (
    <section className="text-section">
      <h3>{header}</h3>
      <p>{content}</p>
    </section>
  );
}
