import React from "react";
import { DerivedButtonProps, BaseButton } from "./BaseButton";

function AcceptButton({ children, handleClick, className }: DerivedButtonProps) {
  const uniqueClasses = [
    "text-slate-100",
    "bg-green-700",
    "hover:bg-green-800",
    "border-r-green-900",
    "border-b-green-900",
  ];
  return (
    <BaseButton
      handleClick={handleClick}
      addlClasses={className ? [...uniqueClasses, className] : uniqueClasses}
    >
      {children}
    </BaseButton>
  );
}

export default AcceptButton;
