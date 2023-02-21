import React from "react";
import minus from "../../assets/svgs/minus.svg";

type Props = {
  //Required
  required: boolean;
  label: string;
  labelName: string;
  labelID: string;
  //Optional
  type?: "tel" | "email" | "text" | "password" | "search";
  handleDelete: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
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
  handleDelete,
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
        <div className="flex gap-4 items-end">
          <label className="font-bold text-sm px-2 underline">
            {required ? <span className="text-xs absolute inline-block -top-1">*</span> : undefined}
            {label}
          </label>
          <p className="text-red-500 font-bold text-xs pb-1">{errorMessage}</p>
        </div>
      );
    }
    return (
      <label className="font-bold text-sm px-2 underline">
        {required ? <span className="text-xs absolute inline-block -top-1">*</span> : undefined}
        {label}
      </label>
    );
  };

  return (
    <div className="flex flex-col justify-start mb-1 first:mt-1 last:mb-2">
      {error && errorMessage ? generateTopLabel(error, errorMessage) : generateTopLabel(false, "")}
      <div className="w-full flex flex-row relative">
        <input
          className="placeholder-slate-500 px-2 outline-slate-500  rounded-md basis-full mx-3"
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
        <img
          src={minus}
          alt="removeField"
          className="h-4 w-4 cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default TextInput;
