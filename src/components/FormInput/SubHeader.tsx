import React from "react";

type Props = {
  title: string;
};

function SubHeader({ title }: Props) {
  return (
    <h2 className="mx-auto w-fit border-b-2 border-slate-600 font-bold text-md">
      {title}
    </h2>
  );
}

export default SubHeader;
