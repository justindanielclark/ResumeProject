import React from "react";
import { DerivedButtonProps, BaseButton } from "./BaseButton";

function CancelButton({ children, handleClick }: DerivedButtonProps) {
  const uniqueClasses = [
    "text-slate-100",
    "bg-red-700",
    "border-r-red-900",
    "border-b-red-900",
  ];
  return (
    <BaseButton handleClick={handleClick} addlClasses={uniqueClasses}>
      {children}
    </BaseButton>
  );
}

export default CancelButton;
