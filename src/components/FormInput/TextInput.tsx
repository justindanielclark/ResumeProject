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
        <div className="flex justify-between pr-5">
          <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
            {label}
            {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
          </label>
          <p className="pb-1 text-xs font-bold text-red-500">{errorMessage}</p>
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

  return (
    <div className="mb-1 flex flex-col justify-start first:mt-1 last:mb-2">
      {error && errorMessage ? generateTopLabel(error, errorMessage) : generateTopLabel(false, "")}
      <input
        className="mx-3 h-5 rounded-md  px-2 placeholder-slate-500 outline-slate-500"
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
