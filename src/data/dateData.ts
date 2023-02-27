const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31,
] as const;

type Month31Type = (typeof dates)[number];
type Month30Type = Omit<Month31Type, "31">;
type Month29Type = Omit<Month31Type, "31" | "30">;
type Months = {
  January: Month31Type;
  February: Month29Type;
  March: Month31Type;
  April: Month30Type;
  May: Month31Type;
  June: Month30Type;
  July: Month31Type;
  August: Month31Type;
  September: Month30Type;
  October: Month31Type;
  November: Month30Type;
  December: Month31Type;
};

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function daysInFebruary(year: number): 28 | 29 {
  if (year % 400 === 0) return 29;
  if (year % 100 === 0) return 28;
  if (year % 4 === 0) return 29;
  return 28;
}

export { months, daysInMonth, daysInFebruary };
