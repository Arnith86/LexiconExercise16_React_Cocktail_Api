import type { ReactElement, ReactNode } from "react";

/**
 * The type of option being rendered (e.g., "Category", "Glass", "Ingredient").
 * Used for the label text and element identifiers.
 */
interface IDropDownOptionsProp {
  optionType: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * DropDownOptions component
 *
 * Renders a labeled dropdown `<select>` input that allows users
 * to choose from a list of options.
 *
 * Features:
 * - Displays a label derived from the `optionType` prop.
 * - Includes an empty option by default for "no selection".
 * - Uses the `value` prop to control the selected option.
 * - Invokes the `onChange` callback when a new option is selected.
 *
 * @param {IDropDownOptionsProp} props - Props containing dropdown configuration.
 * @returns {ReactElement} The rendered dropdown input.
 */
export function DropDownOptions(props: IDropDownOptionsProp): ReactElement {
  const { optionType, options, value, onChange } = props;

  function renderTypeOptions(options: string[]): ReactNode {
    return (
      <>
        <option key="empty" value="">
          {""}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </>
    );
  }

  return (
    <section className="dropbox-input">
      <label
        htmlFor={`${optionType}`}
        className="left-side"
      >{`${optionType}:`}</label>
      <select
        name={`${optionType}`}
        className={`${optionType}-options-dropdown right-side`}
        id={`${optionType}`}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {renderTypeOptions(options)}
      </select>
    </section>
  );
}
