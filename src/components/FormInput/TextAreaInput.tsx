import React from "react";

type Props = {
  //Required
  required: boolean;
  label: string;
  labelName: string;
  labelID: string;
  //Optional
  rows?: number;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
};

function TextAreaInput({
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
  rows,
}: Props) {
  const generateTopLabel = (error: boolean, errorMessage: string) => {
    if (error) {
      return (
        <div className="flex justify-between pr-3">
          <label className="font-bold text-sm relative px-2 underline" htmlFor={labelName}>
            {label}
            {required ? <span className="text-xs relative inline-block -top-1">*</span> : undefined}
          </label>
          <p className="text-red-500 font-bold text-xs pb-1">{errorMessage}</p>
        </div>
      );
    }
    return (
      <label className="font-bold text-sm relative px-2 underline" htmlFor={labelName}>
        {label}
        {required ? <span className="text-xs relative inline-block -top-1">*</span> : undefined}
      </label>
    );
  };

  return (
    <div className="flex flex-col justify-start mb-1 first:mt-1 last:mb-2">
      {error && errorMessage ? generateTopLabel(error, errorMessage) : generateTopLabel(false, "")}
      <textarea
        className="placeholder-slate-500 px-2 outline-slate-500  rounded-md mx-3 resize-none"
        name={labelName}
        id={labelID}
        value={value}
        onChange={onChange ? onChange : undefined}
        onBlur={onBlur ? onBlur : undefined}
        required={required}
        placeholder={placeholder ? placeholder : ""}
        spellCheck={false}
        rows={rows ? rows : 4}
      />
    </div>
  );
}

export default TextAreaInput;
