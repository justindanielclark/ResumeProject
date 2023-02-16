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
    <form className="bg-slate-200 border-2 rounded-md border-slate-900 text-slate-800 p-4 relative animate-fadeOut origin-bottom">
      <h1 className="border-b-2 border-slate-700 text-xl font-bold mb-2">
        {title}
      </h1>
      {children}
      <div className="flex flex-row justify-between mt-2">
        {prevHandler ? (
          <CancelButton type="button" handleClick={prevHandler}>
            {"<<< Prev"}
          </CancelButton>
        ) : null}
        <AcceptButton
          className="ml-auto"
          type="button"
          handleClick={nextHandler}
        >
          {"Next >>>"}
        </AcceptButton>
      </div>
    </form>
  );
}

export default FormContainer;
