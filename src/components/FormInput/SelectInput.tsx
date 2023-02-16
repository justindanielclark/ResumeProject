import React from "react";

type Props = {
  required: boolean;
  error: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  labelName: string;
  labelID: string;
  value?: string;
  addDataAttribute?: true;
  options: Array<string>;
};

function SelectInput({
  label,
  onChange,
  required,
  error,
  errorMessage,
  value,
  labelName,
  labelID,
  options,
  addDataAttribute,
}: Props) {
  const generateTopLabel = (error: boolean, errorMessage: string) => {
    if (error) {
      return (
        <div className="flex gap-4">
          <label className="font-bold">{label}</label>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return <label className="font-bold">{label}</label>;
  };
  const generateOptions = (options: Array<string>) => {
    return options.map((option, index) => {
      if (addDataAttribute) {
        return (
          <option key={option} data-attr={index}>
            {option}
          </option>
        );
      } else {
        return <option key={option}>{option}</option>;
      }
    });
  };

  return (
    <div className="flex flex-col justify-start">
      {generateTopLabel(error, errorMessage)}
      <select
        className="pl-1"
        name={labelName}
        id={labelID}
        value={value ? value : undefined}
        onChange={onChange}
        required={required}
      >
        {generateOptions(options)}
      </select>
    </div>
  );
}
export default SelectInput;
