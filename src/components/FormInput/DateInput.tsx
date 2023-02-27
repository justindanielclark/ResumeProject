import React from "react";
import { daysInMonth, months, daysInFebruary } from "../../data/dateData";

type Props = {
  label: string;
  labelName: string;
  currentValue: boolean;
  currentText: string;
  dateValue: Date;
  onMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

function DateInput({
  label,
  labelName,
  dateValue,
  currentValue,
  required,
  currentText,
  onMonthChange,
  onDateChange,
  onYearChange,
}: Props) {
  const years = [];
  for (let i = dateValue.getFullYear(); dateValue.getFullYear() <= i + 50; i--) {
    years.push(<option key={i}>{i}</option>);
  }
  const days = [];
  const daysInMonthLimit =
    dateValue.getMonth() === 2
      ? daysInFebruary(dateValue.getFullYear())
      : daysInMonth[dateValue.getMonth()];
  for (let i = 1; i <= daysInMonthLimit; i++) {
    days.push(<option key={i}>{i}</option>);
  }
  return (
    <div className="mb-1 flex flex-col justify-start first:mt-1 last:mb-2">
      <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
        {label}
        {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
      </label>
      <div className="flex w-full flex-col items-center justify-center px-3 pt-1">
        <div className="flex h-6 w-full flex-row">
          <select className="grow basis-3/6 px-1 text-center" value={months[dateValue.getMonth()]}>
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <select className="grow basis-1/6 px-1 text-center" value={dateValue.getDate()}>
            {days}
          </select>
          <select className="grow basis-2/6 px-1 text-center" value={dateValue.getFullYear()}>
            {years}
          </select>
        </div>
        <div className="py-1">- or -</div>
        <div className="">
          <label htmlFor="currentlyEnrolled" className="">
            {currentText}
          </label>
          <input type="checkbox" name="" id="" className="ml-2" checked={currentValue} />
        </div>
      </div>
    </div>
  );
}

export default DateInput;
