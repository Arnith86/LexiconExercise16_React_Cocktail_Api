import type { ReactElement, ReactNode } from "react";

interface IDropDownOptionsProp {
  optionType: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

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
    <section>
      <label htmlFor={`${optionType}`}>{`${optionType}:`}</label>
      <select
        name={`${optionType}`}
        className={`${optionType}-options-dropdown`}
        id={`${optionType}`}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {renderTypeOptions(options)}
      </select>
    </section>
  );
}
