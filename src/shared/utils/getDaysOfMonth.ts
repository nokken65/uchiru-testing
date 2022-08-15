type GetDaysOfMonthFn = (month?: number, year?: number) => number[];

export const getDaysOfMonth: GetDaysOfMonthFn = (_month, _year) => {
  if (_month && (_month < 1 || _month > 12)) {
    throw new Error('Incorrect month.');
  }

  const month = _month || new Date().getUTCMonth() + 1;
  const year = _year ?? new Date().getUTCFullYear();

  const count = new Date(year, month, 1).getUTCDate();

  return [...Array(count)].map((_, i) => i + 1);
};
