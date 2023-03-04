import React from "react";
import minus from "../../assets/svgs/minus.svg";

type Props = {
  onDeleteClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  children: Array<JSX.Element> | JSX.Element;
};

function FormSubsection({ children, onDeleteClick }: Props) {
  return (
    <section className="relative p-0.5 odd:bg-slate-300 even:bg-slate-200">
      {onDeleteClick ? (
        <img
          src={minus}
          onClick={onDeleteClick}
          alt="deleteButtonImage"
          className="absolute -right-0.5 -top-0.5 z-40 h-4 w-4 translate-y-1/4 -translate-x-1/4 cursor-pointer"
        />
      ) : undefined}
      {children}
    </section>
  );
}

export default FormSubsection;
