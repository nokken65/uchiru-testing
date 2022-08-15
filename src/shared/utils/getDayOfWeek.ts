type GetDayOfWeekFn = (day?: number, month?: number, year?: number) => string;

export const getDayOfWeek: GetDayOfWeekFn = (_day, _month, _year) => {
  if (_month && (_month < 1 || _month > 12)) {
    throw new Error('Incorrect month.');
  }
  const year = _year ?? new Date().getUTCFullYear();
  const month = _month ? _month - 1 : new Date().getUTCMonth();
  const day = _day ?? new Date().getUTCDate();

  const dayOfWeek = new Date(year, month, day).getUTCDay();

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return days[dayOfWeek];
};
