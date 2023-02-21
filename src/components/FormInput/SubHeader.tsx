import React from "react";

type Props = {
  title: string;
};

function SubHeader({ title }: Props) {
  return (
    <h2 className="w-full border-b border-slate-600 border-opacity-50 relative text-slate-100 px-1 bg-slate-800 font-bold text-lg">
      {title}
    </h2>
  );
}

export default SubHeader;
