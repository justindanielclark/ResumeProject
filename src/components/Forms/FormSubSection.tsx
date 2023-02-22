import React from "react";
import minus from "../../assets/svgs/minus.svg";

type Props = {
  onDeleteClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  children: Array<JSX.Element> | JSX.Element;
};

function FormSubsection({ children, onDeleteClick }: Props) {
  return (
    <section className="relative even:bg-slate-200 odd:bg-slate-300 p-0.5">
      {onDeleteClick ? (
        <img
          src={minus}
          onClick={onDeleteClick}
          alt="deleteButtonImage"
          className="h-4 w-4 absolute -right-0.5 -top-0.5 translate-y-1/4 -translate-x-1/4 cursor-pointer z-50"
        />
      ) : undefined}
      {children}
    </section>
  );
}

export default FormSubsection;
