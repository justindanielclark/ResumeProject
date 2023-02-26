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
  console.log({ handleAdd });
  return (
    <form className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded border-2 border-slate-900 bg-slate-300 text-slate-800">
      {handleAdd !== undefined ? (
        <img
          src={plus}
          alt="addItem"
          className="absolute top-0 right-0 z-50 h-4 w-4 -translate-x-0.5 translate-y-0.5 cursor-pointer"
          onClick={handleAdd}
        />
      ) : undefined}
      <h1 className="sticky border-b-2 border-slate-700 bg-slate-800 py-2 px-1 text-2xl font-bold text-slate-100">
        {title}
      </h1>
      <div className="max-h-60 overflow-y-auto">{children}</div>
      <div className="flex flex-row justify-between bg-slate-800 p-2">
        {prevHandler ? (
          <CancelButton type="button" handleClick={prevHandler}>
            {"Back"}
          </CancelButton>
        ) : null}
        <AcceptButton className="ml-auto" type="button" handleClick={nextHandler}>
          {"Confirm"}
        </AcceptButton>
      </div>
    </form>
  );
}

export default FormContainer;
