import React from "react";

type Props = {
  required: boolean;
  error?: boolean;
  errorMessage?: string;
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
        <div className="flex justify-between pr-5">
          <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
            {label}
            {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
          </label>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return (
      <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
        {label}
        {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
      </label>
    );
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
    <div className="mb-1 flex flex-col justify-start first:mt-1 last:mb-2">
      {error && errorMessage ? generateTopLabel(error, errorMessage) : generateTopLabel(false, "")}
      <select
        className="mx-3 h-5  rounded-md px-1 outline-slate-500"
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
