import React from "react";

type Props = {
  placeholder?: string;
  required: boolean;
  error: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  labelName: string;
  labelID: string;
  value?: string;
};

function TextInput({
  label,
  onChange,
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
        <div className="flex gap-4">
          <label className="font-bold">{label}</label>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return <label className="font-bold">{label}</label>;
  };

  return (
    <div className="flex flex-col justify-start">
      {generateTopLabel(error, errorMessage)}
      <input
        type="text"
        name={labelName}
        id={labelID}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
}

export default TextInput;
