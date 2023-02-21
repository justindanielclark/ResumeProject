import React from "react";
import plus from "../../assets/svgs/plus.svg";

type Props = {
  title: string;
  handleAdd: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

function SubHeaderWithAddButton({ title, handleAdd }: Props) {
  return (
    <div className="w-full border-b border-slate-600 border-opacity-50 relative text-slate-100 px-1 bg-slate-800">
      <h2 className="  font-bold text-lg">{title}</h2>
      <img
        className="absolute top-1/2 -translate-y-1/2 right-1 h-5 w-5 cursor-pointer"
        src={plus}
        onClick={handleAdd}
        alt="addItem"
      />
    </div>
  );
}

export default SubHeaderWithAddButton;
