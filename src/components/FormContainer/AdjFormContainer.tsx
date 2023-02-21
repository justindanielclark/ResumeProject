import React from "react";
import AcceptButton from "../SimpleButton/AcceptButton";
import CancelButton from "../SimpleButton/CancelButton";

type Props = {
  title: string;
  children: React.ReactNode;
  adjustable: boolean;
  handleAddSubsection: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  prevHandler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  nextHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function AdjFormContainer({
  title,
  children,
  adjustable,
  handleAddSubsection,
  nextHandler,
  prevHandler,
}: Props) {
  function generateTopSection(): JSX.Element {
    if (adjustable) {
      return (
        <div className="flex flex-row justify-between">
          <h1 className="border-b-2 border-slate-700 text-xl font-bold mb-2">{title}</h1>
          <AcceptButton handleClick={handleAddSubsection}>+</AcceptButton>
        </div>
      );
    }
    return <h1 className="border-b-2 border-slate-700 text-xl font-bold mb-2">{title}</h1>;
  }

  return (
    <form className="bg-slate-200 border-2 rounded-md border-slate-900 text-slate-800 p-4 absolute top-1/2 left-1/2 h-fit -translate-x-1/2 -translate-y-1/2 w-96">
      {generateTopSection()}
      {children}
      <div className="flex flex-row justify-between mt-2">
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

export default AdjFormContainer;
