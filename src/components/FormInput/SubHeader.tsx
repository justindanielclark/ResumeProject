import React from "react";
import plus from "../../assets/svgs/plus.svg";
import minus from "../../assets/svgs/minus.svg";

type Props = {
  title: string;
  handleAdd?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleRemove?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function SubHeader({ title, handleAdd, handleRemove }: Props) {
  return (
    <h2 className="w-full border-b border-slate-600 border-opacity-50 text-slate-100 px-1 bg-slate-800 font-bold text-lg sticky top-0 z-50">
      {handleAdd ? (
        <img
          src={plus}
          alt="addItem"
          className="h-4 w-4 absolute top-0 right-0 -translate-x-0.5 translate-y-0.5 cursor-pointer"
          onClick={handleAdd}
        />
      ) : undefined}
      {handleRemove ? (
        <img
          src={minus}
          alt="removeItem"
          className="h-4 w-4 absolute top-0 right-0 -translate-x-0.5 translate-y-0.5 cursor-pointer"
          onClick={handleRemove}
        />
      ) : undefined}
      {title}
    </h2>
  );
}

export default SubHeader;
