import React from "react";

type Props = {
  placeholder?: string;
  required: boolean;
  error: boolean;
  errorMessage: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  labelName: string;
  labelID: string;
  value?: string;
};

function TextInput({
  label,
  onChange,
  onBlur,
  required,
  placeholder,
  error,
  errorMessage,
  value,
  labelName,
  labelID,
}: Props) {
  const generateTopLabel = (error: boolean, errorMessage: string) => {
    if (error) {
      return (
        <div className="flex gap-4 items-end">
          <label className="font-bold">{label}</label>
          <p className="text-red-500 font-bold text-xs pb-1">{errorMessage}</p>
        </div>
      );
    }
    return <label className="font-bold">{label}</label>;
  };

  return (
    <div className="flex flex-col justify-start mt-1">
      {generateTopLabel(error, errorMessage)}
      <input
        className="placeholder-slate-500 px-2"
        type="text"
        name={labelName}
        id={labelID}
        value={value}
        onChange={onChange}
        onBlur={onBlur ? onBlur : undefined}
        required={required}
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
}

export default TextInput;
