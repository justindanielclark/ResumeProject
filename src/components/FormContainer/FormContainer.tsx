import React from "react";
import AcceptButton from "../SimpleButton/AcceptButton";
import CancelButton from "../SimpleButton/CancelButton";

type Props = {
  title: string;
  children: React.ReactNode;
  prevHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  nextHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function FormContainer({ title, children, nextHandler, prevHandler }: Props) {
  return (
    <form>
      <h1 className="border-b-2 border-slate-700 text-xl font-bold">{title}</h1>
      {children}
      <div className="flex flex-row justify-between">
        {prevHandler ? (
          <CancelButton type="button" handleClick={prevHandler}>
            {"<<< Prev"}
          </CancelButton>
        ) : null}
        <AcceptButton type="button" handleClick={nextHandler}>
          {"Next >>>"}
        </AcceptButton>
      </div>
    </form>
  );
}

export default FormContainer;
