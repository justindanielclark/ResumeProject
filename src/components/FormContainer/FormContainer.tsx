import React from "react";
import plus from "../../assets/svgs/plus.svg";
import AcceptButton from "../SimpleButton/AcceptButton";
import CancelButton from "../SimpleButton/CancelButton";

type FormAnimatingTypes = "forward" | "backwards" | "none";

type Props = {
  title: string;
  children: React.ReactNode;
  nextHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  prevHandler?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleAdd?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  animating: FormAnimatingTypes;
  handleAnimationEnd?: () => void;
};

function FormContainer({
  title,
  children,
  nextHandler,
  prevHandler,
  handleAdd,
  animating,
  handleAnimationEnd,
}: Props) {
  let animatingClass = "";
  switch (animating) {
    case "forward": {
      animatingClass = "animate-left -translate-x-full";
      break;
    }
    case "backwards": {
      animatingClass = "animate-right";
      break;
    }
  }
  return (
    <form className={`relative min-w-full ${animatingClass}`} onAnimationEnd={handleAnimationEnd}>
      {handleAdd !== undefined ? (
        <img
          src={plus}
          alt="addItem"
          className="absolute top-0 right-0 z-50 h-4 w-4 -translate-x-0.5 translate-y-0.5 cursor-pointer"
          onClick={handleAdd}
          tabIndex={0}
        />
      ) : undefined}
      <h1 className="sticky border-b-2 border-slate-700 bg-slate-800 py-2 px-1 text-2xl font-bold text-slate-100">
        {title}
      </h1>
      <div className="h-60 items-center justify-center overflow-y-auto">{children}</div>
      <div className="flex flex-row justify-between bg-slate-800 p-2">
        {prevHandler ? (
          <CancelButton
            type="button"
            handleClick={
              animating === "backwards" || animating === "forward" ? undefined : prevHandler
            }
          >
            {"Back"}
          </CancelButton>
        ) : null}
        <AcceptButton
          className="ml-auto"
          type="button"
          handleClick={
            animating === "backwards" || animating === "forward" ? undefined : nextHandler
          }
        >
          {"Confirm"}
        </AcceptButton>
      </div>
    </form>
  );
}

export default FormContainer;
export type { FormAnimatingTypes };
export { FormContainer };
