import React from "react";
import plus from "../../assets/svgs/plus.svg";
import AcceptButton from "../SimpleButton/AcceptButton";
import CancelButton from "../SimpleButton/CancelButton";

type Props = {
  title: string;
  children: React.ReactNode;
  nextHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  prevHandler?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleAdd?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function FormContainer({ title, children, nextHandler, prevHandler, handleAdd }: Props) {
  return (
    <form className="bg-slate-300 border-2 rounded border-slate-900 text-slate-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-h-96 overflow-hidden">
      {handleAdd ? (
        <img
          src={plus}
          alt="addItem"
          className="w-4 h-4 absolute z-50 top-0 right-0 -translate-x-0.5 translate-y-0.5 cursor-pointer"
          onClick={handleAdd}
        />
      ) : undefined}
      <h1 className="py-2 px-1 border-b-2 text-slate-100 bg-slate-800 border-slate-700 text-2xl font-bold sticky">
        {title}
      </h1>
      <div className="overflow-y-auto max-h-72">{children}</div>
      <div className="flex flex-row justify-between bg-slate-800 p-2">
        {prevHandler ? (
          <CancelButton type="button" handleClick={prevHandler}>
            {"<<< Prev"}
          </CancelButton>
        ) : null}
        <AcceptButton className="ml-auto" type="button" handleClick={nextHandler}>
          {"Next >>>"}
        </AcceptButton>
      </div>
    </form>
  );
}

export default FormContainer;
