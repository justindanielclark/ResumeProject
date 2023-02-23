import React from "react";

type Props = {
  //Required
  required: boolean;
  label: string;
  labelName: string;
  labelID: string;
  //Optional
  type?: "tel" | "email" | "text" | "password" | "search" | "date";
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
};

function TextInput({
  label,
  onChange,
  onBlur,
  onKeyDown,
  required,
  placeholder,
  error,
  errorMessage,
  value,
  labelName,
  labelID,
  type,
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
      <input
        className="placeholder-slate-500 px-2 outline-slate-500  rounded-md mx-3 h-6"
        type={type ? type : "text"}
        name={labelName}
        id={labelID}
        value={value}
        onChange={onChange ? onChange : undefined}
        onBlur={onBlur ? onBlur : undefined}
        onKeyDown={onKeyDown ? onKeyDown : undefined}
        required={required}
        placeholder={placeholder ? placeholder : ""}
        spellCheck={false}
      />
    </div>
  );
}

export default TextInput;
