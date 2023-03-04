import React from "react";
import BreadCrumpDataType from "../../types/breadcrumbData";

type Props = {
  propState: Array<BreadCrumpDataType>;
  current: number;
};

function BreadcrumbBox({ propState, current }: Props) {
  function generateLIs(propState: Array<BreadCrumpDataType>): Array<JSX.Element> {
    const genericTailwindClasses =
      "last:border-b-0 border-b-2 p-1 text-center text-sm first:rounded-tl-lg last:rounded-bl-lg";
    return propState.map((item, idx) => {
      let specificTailwindClasses: string;
      if (current === idx) {
        specificTailwindClasses = "bg-yellow-500";
      } else if (item.prevRendered) {
        if (item.error) {
          specificTailwindClasses =
            "text-red-50 odd:bg-red-700 even:bg-red-800 border-red-600 cursor-pointer hover:underline";
        } else {
          specificTailwindClasses =
            "text-emerald-50 odd:bg-emerald-700 even:bg-emerald-800 border-emerald-600 cursor-pointer hover:underline";
        }
      } else {
        specificTailwindClasses =
          "text-stone-50 odd:bg-stone-700 even:bg-stone-800 border-stone-600 cursor-default";
      }
      return (
        <li
          key={idx}
          onClick={item.handleClick}
          className={`${genericTailwindClasses} ${specificTailwindClasses}`}
        >
          {item.name}
        </li>
      );
    });
  }

  return (
    <nav className="flex items-center justify-center ">
      <ul className="flex flex-col rounded-bl-lg rounded-tl-lg border-2 border-r-0 border-slate-900">
        {generateLIs(propState)}
      </ul>
    </nav>
  );
}

export default BreadcrumbBox;
