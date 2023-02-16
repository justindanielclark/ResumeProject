import React from "react";

type DerivedButtonProps = {
  children: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

type Props = DerivedButtonProps & {
  addlClasses: Array<string>;
};

function BaseButton({ children, handleClick, addlClasses, type }: Props) {
  const baseClasses = [
    "rounded-lg",
    "py-1",
    "px-2",
    "border-t-0",
    "border-r-2",
    "border-b-2",
    "border-l-0",
  ];

  function createFinalClasses(
    baseClasses: Array<string>,
    addlClasses: Array<string>
  ): string {
    const combinedClasses = [...baseClasses, ...addlClasses];
    return combinedClasses.join(" ");
  }
  return (
    <button
      type={type ? type : "button"}
      className={createFinalClasses(baseClasses, addlClasses)}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(e);
      }}
    >
      {children}
    </button>
  );
}

export type { DerivedButtonProps };
export { BaseButton };
export default BaseButton;
