import { daysInMonth, months, daysInFebruary } from "../../data/dateData";

type Props = {
  label: string;
  labelName: string;
  currentValue: boolean;
  currentText: string;
  dateValue: Date;
  handleChange: (date: Date, current: boolean) => void;
  required?: boolean;
  relatedIndex?: number;
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
}: Props) {
  const todaysDate = new Date();
  const years = [];
  for (let i = todaysDate.getFullYear(); todaysDate.getFullYear() <= i + 50; i--) {
    years.push(<option key={i}>{i}</option>);
  }
  const days = [];
  const daysInMonthLimit =
    dateValue.getMonth() === 1
      ? daysInFebruary(dateValue.getFullYear())
      : daysInMonth[dateValue.getMonth()];
  for (let i = daysInMonthLimit; i >= 1; i--) {
    days.push(<option key={i}>{i}</option>);
  }
  return (
    <div className="mb-1 flex flex-col justify-start first:mt-1 last:mb-2">
      <label className="relative px-2 text-sm font-bold underline" htmlFor={labelName}>
        {label}
        {required ? <span className="relative -top-1 inline-block text-xs">*</span> : undefined}
      </label>
      <div className="flex w-full flex-col items-center justify-center px-3 pt-1">
        <div className="flex h-6 w-full flex-row gap-1">
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
            {months.map((month) => (
              <option key={month}>{month}</option>
            ))}
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
            {days}
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
            {years}
          </select>
        </div>
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
