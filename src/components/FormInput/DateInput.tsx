import { daysInMonth, months, daysInFebruary } from "../../data/dateData";

type Props = {
  label: string;
  labelName: string;
  error: boolean;
  errorMessage: string;
  dateValue: Date;
  handleChange: (date: Date, current?: boolean) => void;
  currentValue?: boolean;
  currentText?: string;
  required?: boolean;
};

type DateObjType = {
  date: number;
  month: number;
  year: number;
};

function DateInput({
  label,
  labelName,
  dateValue,
  currentValue,
  required,
  currentText,
  handleChange,
  error,
  errorMessage,
}: Props) {
  const todaysDate = new Date();

  const daysJSX: Array<JSX.Element> = [];
  const daysInMonthLimit =
    dateValue.getMonth() === 1
      ? daysInFebruary(dateValue.getFullYear())
      : daysInMonth[dateValue.getMonth()];
  for (let i = daysInMonthLimit; i >= 1; i--) {
    daysJSX.push(<option key={i}>{i}</option>);
  }
  const monthsJSX: Array<JSX.Element> = months.map((month) => <option key={month}>{month}</option>);
  const yearsJSX: Array<JSX.Element> = [];
  for (let i = todaysDate.getFullYear(); todaysDate.getFullYear() <= i + 50; i--) {
    yearsJSX.push(<option key={i}>{i}</option>);
  }

  function generateTopLabel(error: boolean, errorMessage: string) {
    if (error) {
      return (
        <div className="flex justify-between pr-5">
          <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
            {label}
            {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
          </label>
          <p className="pb-1 text-xs font-bold text-red-500">{errorMessage}</p>
        </div>
      );
    }
    return (
      <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
        {label}
        {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
      </label>
    );
  }
  function generateDateInput(
    dateValue: Date,
    daysJSX: Array<JSX.Element>,
    monthsJSX: Array<JSX.Element>,
    yearsJSX: Array<JSX.Element>,
    currentValue: boolean | undefined
  ) {
    return (
      <div className="flex h-6 w-full flex-row gap-1 px-3">
        <select
          className=" grow basis-7/12  rounded-md px-1  outline-slate-500"
          value={months[dateValue.getMonth()]}
          onChange={(e) => {
            handleChange(
              new Date(
                createDateString(
                  createDateObj(
                    dateValue.getDate(),
                    months.findIndex((val) => val === e.target.value),
                    dateValue.getFullYear()
                  )
                )
              ),
              currentValue
            );
          }}
        >
          {monthsJSX}
        </select>
        <select
          className=" grow basis-2/12 rounded-md px-1  outline-slate-500"
          value={dateValue.getDate()}
          onChange={(e) =>
            handleChange(
              new Date(
                createDateString(
                  createDateObj(
                    Number.parseInt(e.target.value),
                    dateValue.getMonth(),
                    dateValue.getFullYear()
                  )
                )
              ),
              currentValue
            )
          }
        >
          {daysJSX}
        </select>
        <select
          className=" grow basis-3/12 rounded-md px-1  text-right outline-slate-500 "
          value={dateValue.getFullYear()}
          onChange={(e) =>
            handleChange(
              new Date(
                createDateString(
                  createDateObj(
                    dateValue.getDate(),
                    dateValue.getMonth(),
                    Number.parseInt(e.target.value)
                  )
                )
              ),
              currentValue
            )
          }
        >
          {yearsJSX}
        </select>
      </div>
    );
  }
  function generateBody(
    dateValue: Date,
    daysJSX: Array<JSX.Element>,
    monthsJSX: Array<JSX.Element>,
    yearsJSX: Array<JSX.Element>,
    currentValue: boolean | undefined
  ) {
    if (currentValue !== undefined) {
      return (
        <div className="flex w-full flex-col items-center justify-center">
          {generateDateInput(dateValue, daysJSX, monthsJSX, yearsJSX, currentValue)}
          <div className="py-1">- or -</div>
          <div className="">
            <label htmlFor="currentlyEnrolled" className="">
              {currentText}
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              className="ml-2"
              checked={currentValue}
              onChange={() => handleChange(dateValue, !currentValue)}
            />
          </div>
        </div>
      );
    } else {
      return generateDateInput(dateValue, daysJSX, monthsJSX, yearsJSX, currentValue);
    }
  }
  return (
    <div className="mb-1 flex flex-col justify-start first:mt-1 last:mb-2">
      {generateTopLabel(error, errorMessage)}
      {generateBody(dateValue, daysJSX, monthsJSX, yearsJSX, currentValue)}
    </div>
  );
}

function createDateObj(date: number, month: number, year: number): DateObjType {
  //If February, check for leap year, otherwise limit date by month
  let daysLimit: number;
  if (month === 1) {
    daysLimit = daysInFebruary(year);
  } else {
    daysLimit = daysInMonth[month];
  }
  date = date > daysLimit ? daysLimit : date;
  return {
    date,
    month,
    year,
  };
}
function createDateString(dateObj: DateObjType): string {
  return `${months[dateObj.month]} ${dateObj.date}, ${dateObj.year}`;
}

export default DateInput;
